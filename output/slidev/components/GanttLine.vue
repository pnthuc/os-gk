<script setup>
import { computed } from 'vue'

const props = defineProps({
  segments: { type: Array, required: true },
  label: { type: String, required: true }
})
const colors = ['#23796c', '#426b9b', '#9a652d', '#6d648f']
const end = computed(() => props.segments.at(-1)[2])
</script>

<template>
  <figure class="gantt-figure" :aria-label="label + ' ' + segments.map(([p,a,b]) => 'P' + p + ' chạy từ ' + a + ' đến ' + b).join(', ')">
    <figcaption>{{ label }}</figcaption>
    <div class="gantt-segments">
      <div v-for="([p,a,b], i) in segments" :key="a"
        class="gantt-segment"
        :style="{ width: (100 * (b-a)/end) + '%', background: colors[p-1] }">
        <b>P{{ p }}</b><span class="gantt-tick">{{ a }}</span>
        <span v-if="i === segments.length - 1" class="gantt-end">{{ b }}</span>
      </div>
    </div>
  </figure>
</template>

<style scoped>
.gantt-figure { margin: 13px 11px 33px 0; }
figcaption { color: #385b55; font-size: 16px; font-weight: 700; margin-bottom: 5px; }
.gantt-segments { display: flex; }
.gantt-segment {
  position: relative; text-align: center; padding: 10px 0; line-height: 1;
  border-right: 2px solid #f4f7f1; color: white; font-size: 18px;
}
.gantt-tick, .gantt-end { position: absolute; top: calc(100% + 7px); color: #385b55; font-size: 15px; }
.gantt-tick { left: 0; transform: translateX(-50%); }
.gantt-end { right: 0; transform: translateX(50%); }
</style>
