import { openDatabase, readContent } from './database.mjs';
const db = openDatabase();
const content = readContent(db);
console.log(`Migrasi siap. Revisi ${content.revision}; bahasa: ${Object.keys(content.data.localizedCv).join(', ')}`);
db.close();
