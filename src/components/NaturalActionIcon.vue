<script setup lang="ts">
withDefaults(defineProps<{ name: string; size?: number; color?: string }>(), { size: 18, color: "inherit" });
const paths: Record<string, string> = {
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'm6 6 12 12M6 18 18 6',
  light_mode: 'M12 3V1m0 22v-2M3 12H1m22 0h-2M5.6 5.6 4.2 4.2m15.6 15.6-1.4-1.4M5.6 18.4l-1.4 1.4M19.8 4.2l-1.4 1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  dark_mode: 'M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z',
  person: 'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2H4Z',
  arrow_downward: 'M12 3v18m-7-7 7 7 7-7',
  download: 'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
  code: 'm8 5-7 7 7 7m8-14 7 7-7 7',
  business_center: 'M8 6V3h8v3M3 6h18v15H3V6Zm0 6h18M9 10v4h6v-4H9Z',
  chat: 'M3 3h18v14H8l-5 4V3Zm4 5h10M7 12h7',
};
</script>
<template>
  <span class="action-symbol" :style="{ fontSize: size + 'px', color }" aria-hidden="true">{{ name }}</span>
  <svg class="mobile-action-icon" :style="{ color }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="paths[name]" /></svg>
</template>
<style scoped>
.action-symbol { font-family: 'Material Symbols Outlined'; font-size: 18px; line-height: 1; }
.mobile-action-icon { display: none; }
@media (max-width: 700px) {
  .action-symbol { display: none; }
  .mobile-action-icon { display: block; width: 20px; height: 20px; flex: 0 0 20px; }
}
</style>
