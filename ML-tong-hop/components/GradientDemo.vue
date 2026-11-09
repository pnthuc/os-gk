<script setup>
import { ref, computed } from 'vue'
const rate=ref('0.1'), iteration=ref(0), bias=ref(0), slope=ref(0)
const data=[{x:1,y:1},{x:2,y:3},{x:4,y:3}]
const loss=computed(()=>data.reduce((a,p)=>a+(bias.value+slope.value*p.x-p.y)**2,0)/3)
const format=v=>Math.abs(v)>=1000?v.toExponential(3):v.toFixed(4)
function reset(){iteration.value=0;bias.value=0;slope.value=0}
function learn(n=1){for(let j=0;j<n;j++){const db=data.reduce((a,p)=>a+2*(bias.value+slope.value*p.x-p.y),0)/3;const dw=data.reduce((a,p)=>a+2*(bias.value+slope.value*p.x-p.y)*p.x,0)/3;bias.value-=Number(rate.value)*db;slope.value-=Number(rate.value)*dw;iteration.value++;if(!Number.isFinite(loss.value)||loss.value>1e25)break}}
const lower=computed(()=>Math.min(-1,bias.value,bias.value+4.6*slope.value))
const upper=computed(()=>Math.max(5,bias.value,bias.value+4.6*slope.value))
const px=x=>58+x/4.8*500
function py(value){const offset=value-lower.value;const span=upper.value-lower.value;const fraction=offset/span;return 242-fraction*210}
const line=computed(()=>`${px(0)},${py(bias.value)} ${px(4.6)},${py(bias.value+4.6*slope.value)}`)
</script>

<template>
  <div class="gd-demo" @keydown.stop @click.stop>
    <div class="gd-controls"><label>Tốc độ học <select v-model="rate" aria-label="Tốc độ học" @change="reset"><option>0.01</option><option>0.1</option><option>0.3</option></select></label><button @click="learn(1)" :disabled="loss>1e25">Học 1 bước</button><button @click="learn(10)" :disabled="loss>1e25">Thêm 10 bước</button><button @click="reset">Đặt lại</button></div>
    <div class="gd-grid">
      <svg viewBox="0 0 610 285" role="img" aria-label="Đồ thị ba điểm dữ liệu và đường hồi quy hiện tại">
        <line x1="58" y1="32" x2="58" y2="242" stroke="#94aaa4"/>
        <line x1="58" y1="242" x2="563" y2="242" stroke="#94aaa4"/>
        <template v-for="x in [0,1,2,3,4]" :key="x"><line :x1="px(x)" y1="32" :x2="px(x)" y2="242" stroke="#d9e3d9"/><text :x="px(x)" y="265" text-anchor="middle" font-size="16" fill="#506969">{{x}}</text></template>
        <template v-for="fraction in [0,.5,1]" :key="fraction"><line x1="58" :y1="py(lower+(upper-lower)*fraction)" x2="560" :y2="py(lower+(upper-lower)*fraction)" stroke="#d9e3d9"/><text x="48" :y="py(lower+(upper-lower)*fraction)+5" text-anchor="end" font-size="14" fill="#506969">{{format(lower+(upper-lower)*fraction)}}</text></template>
        <polyline :points="line" fill="none" stroke="#186b60" stroke-width="3"/>
        <circle v-for="p in data" :key="p.x" :cx="px(p.x)" :cy="py(p.y)" r="6" fill="#bb6c2d"/>
        <text x="579" y="244" font-size="18" fill="#173438">x</text><text x="50" y="23" font-size="18" fill="#173438">y</text>
      </svg>
      <dl class="gd-values"><dt>Bước học</dt><dd data-testid="gd-step">{{iteration}}</dd><dt>Bias</dt><dd>{{format(bias)}}</dd><dt>Độ dốc</dt><dd>{{format(slope)}}</dd><dt>MSE</dt><dd data-testid="gd-loss">{{format(loss)}}</dd></dl>
    </div>
    <div class="note">Điểm nâu: dữ liệu (1,1), (2,3), (4,3). Đường xanh: mô hình hiện tại.<br/>Nghiệm: bias = 1, độ dốc = 4/7, MSE ≈ 0,380952.</div>
  </div>
</template>

<style scoped>
.gd-grid svg text{font-size:16px!important;font-family:"Segoe UI",sans-serif}
.gd-controls{display:flex;align-items:center;gap:12px;font-size:17px;margin-bottom:7px}.gd-controls label{display:flex;align-items:center;gap:8px}.gd-controls button,.gd-controls select{padding:6px 10px;border:1px solid #b5cbc0;border-radius:5px;background:#e7efe6;color:#173438}.gd-controls button:hover{background:#dceadf}.gd-controls button:disabled{opacity:.4}.gd-grid{display:grid;grid-template-columns:1fr 180px;gap:30px;align-items:center}.gd-grid svg{width:100%;height:270px}.gd-values{font-size:17px}.gd-values dt{color:#506969;font-size:14px}.gd-values dd{font-weight:750;font-variant-numeric:tabular-nums;margin:0 0 9px;color:#186b60}.gd-demo .note{font-size:17px}
</style>
