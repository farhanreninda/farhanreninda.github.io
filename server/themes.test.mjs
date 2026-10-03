import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { withBuiltInThemes, naturalTheme } from "../src/cms/themes.ts";
import { validateDocument, copySchema } from "../src/cms/schema.ts";

test("Tema bawaan ditambahkan tanpa mengubah data, tema aktif, atau tema khusus", async () => {
  const { data } = JSON.parse(
    await readFile(
      new URL("../public/cms/content.json", import.meta.url),
      "utf8",
    ),
  );
  const old = structuredClone(data);
  old.themes = [
    old.themes.find((theme) => theme.id === "existing"),
    { id: "custom", name: "Pilihan", light: {}, dark: {} },
  ];
  old.activeThemeId = "custom";
  const before = structuredClone(old);
  const migrated = withBuiltInThemes(old);
  assert.deepEqual(old, before);
  assert.equal(migrated.activeThemeId, "custom");
  assert.deepEqual(migrated.localizedCv, old.localizedCv);
  assert.deepEqual(migrated.siteCopy, old.siteCopy);
  assert.deepEqual(migrated.settings, old.settings);
  assert.deepEqual(
    migrated.themes.find((theme) => theme.id === "natural"),
    naturalTheme,
  );
  assert.deepEqual(withBuiltInThemes(migrated), migrated);
  for (const id of ["natural", "existing", "custom"]) {
    migrated.activeThemeId = id;
    assert.deepEqual(validateDocument(migrated, copySchema), []);
    assert.deepEqual(migrated.localizedCv, before.localizedCv);
  }
  migrated.themes.find((theme) => theme.id === "natural").name = "Uji";
  assert.equal(naturalTheme.name, "Portfolio Natural");
});
