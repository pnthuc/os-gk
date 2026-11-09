<template>
  <div class="fork-wrap">
    <svg class="fork-diagram" viewBox="0 0 850 232" role="img" aria-label="Cây tiến trình. Ban đầu có P0. Fork lần một tạo P1. Fork lần hai tạo P2 từ P0 và P3 từ P1.">
      <g class="fork-node">
        <rect x="365" y="3" width="120" height="40" rx="8"/>
        <text x="425" y="30">P0</text>
      </g>
      <g v-click="1">
        <path d="M425 43 V65 H225 V86 M425 65 H625 V86"/>
        <g class="fork-node">
          <rect x="165" y="86" width="120" height="40" rx="8"/><text x="225" y="113">P0</text>
          <rect x="565" y="86" width="120" height="40" rx="8"/><text x="625" y="113">P1</text>
        </g>
        <text class="fork-count" x="58" y="114">2 tiến trình</text>
      </g>
      <g v-click="2">
        <path d="M225 126 V151 H125 V174 M225 151 H325 V174 M625 126 V151 H525 V174 M625 151 H725 V174"/>
        <g class="fork-node">
          <rect x="73" y="174" width="104" height="40" rx="8"/><text x="125" y="201">P0</text>
          <rect x="273" y="174" width="104" height="40" rx="8"/><text x="325" y="201">P2</text>
          <rect x="473" y="174" width="104" height="40" rx="8"/><text x="525" y="201">P1</text>
          <rect x="673" y="174" width="104" height="40" rx="8"/><text x="725" y="201">P3</text>
        </g>
        <text class="fork-count" x="58" y="167">4 tiến trình</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.fork-diagram { width: min(100%, 820px); height: 239px; display: block; margin: 2px auto 0; }
path { fill: none; stroke: #5b877b; stroke-width: 2; }
rect { fill: #dceee4; stroke: #74a391; }
text { fill: #19433c; text-anchor: middle; font: 700 20px "Segoe UI", Arial, sans-serif; }
.fork-count { font-size: 14px; }
</style>
