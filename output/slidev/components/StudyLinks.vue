<script setup>
const guide = `${import.meta.env.BASE_URL}tai-lieu-on-tap.pdf`
const localCheatSheet = import.meta.env.VITE_LOCAL_CHEAT_SHEET === '1'
  ? `${import.meta.env.BASE_URL}os_doc.pdf`
  : null
</script>

<template>
  <p class="resource-links">
    <a :href="guide" target="_blank" rel="noopener">Tài liệu và lời giải đầy đủ</a>
    <a v-if="localCheatSheet" :href="localCheatSheet" target="_blank" rel="noopener">Cheat sheet 23CNTN</a>
  </p>
</template>
