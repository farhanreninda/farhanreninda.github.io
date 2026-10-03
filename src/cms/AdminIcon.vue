<script setup lang="ts">
defineProps<{ name: string }>();
const icons: Record<string, string> = {
  overview: 'dashboard', profile: 'person', skills: 'bolt', experiences: 'work', projects: 'code_blocks',
  educations: 'school', certificates: 'verified', copy: 'translate', settings: 'settings', media: 'perm_media',
  themes: 'palette', arrow: 'arrow_forward', external: 'open_in_new', refresh: 'sync', save: 'cloud_upload',
  exit: 'logout', sun: 'light_mode', moon: 'dark_mode', lock: 'admin_panel_settings', grip: 'drag_indicator',
  trash: 'delete', quote: 'format_quote', focus: 'track_changes', contact: 'contact_mail', location: 'location_on',
  terminal: 'terminal', check: 'check_circle', plus: 'add', search: 'search', edit: 'edit', code: 'code',
};
</script>
<template><span class="material-icon" aria-hidden="true">{{ icons[name] || name }}</span></template>
<style scoped>
.material-icon { font-family: 'Material Symbols Outlined'; font-weight: 400; font-style: normal; font-size: 20px; line-height: 1; letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; font-feature-settings: 'liga'; -webkit-font-smoothing: antialiased; flex: 0 0 auto; }
</style>