<script setup>
import { ref, computed } from 'vue'
import questions from './questions.json'
const chapter=ref(1),index=ref(0),shown=ref(false)
const group=computed(()=>questions.filter(q=>q.chapter===Number(chapter.value)))
const current=computed(()=>group.value[index.value]||group.value[0])
const chapters=[...new Map(questions.map(q=>[q.chapter,{n:q.chapter,name:q.chapterName}])).values()]
function change(){index.value=0;shown.value=false}
function move(delta){index.value=Math.max(0,Math.min(group.value.length-1,index.value+delta));shown.value=false}
const preview=computed(()=>current.value.answer.replace(/[#*]/g,'').replace(/\$([^$]+)\$/g,'$1'))
</script>

<template>
  <section class="qb" @keydown.stop @click.stop>
    <div class="qb-controls"><label>Chương <select v-model="chapter" @change="change" aria-label="Chọn chương ôn tập"><option v-for="c in chapters" :value="c.n" :key="c.n">{{c.n}}. {{c.name}}</option></select></label><span>{{index+1}} / {{group.length}}</span></div>
    <p class="qb-level">Câu {{current.id}} – {{current.level}}</p>
    <h2 data-testid="question">{{current.question}}</h2>
    <div class="qb-actions"><button @click="move(-1)" :disabled="index===0">Câu trước</button><button class="qb-primary" @click="shown=!shown">{{shown?'Ẩn đáp án':'Xem đáp án'}}</button><button @click="move(1)" :disabled="index>=group.length-1">Câu tiếp</button></div>
    <div v-if="shown" class="answer qb-answer" data-testid="answer">{{preview}}</div>
    <p v-else class="note">Tự trả lời, sau đó mở đáp án để đối chiếu.<br/>Các bài liên chương có lời giải dài, có thể cuộn trong khung đáp án.</p>
  </section>
</template>

<style scoped>
.qb-controls{display:flex;justify-content:space-between;align-items:center;gap:18px;font-size:17px;margin-bottom:19px}.qb-controls label{display:flex;align-items:center;gap:10px}.qb-controls select{max-width:680px;padding:7px 10px;border:1px solid #b5cbc0;border-radius:5px;background:#edf3eb;color:#173438}.qb-level{color:#186b60;font-size:16px}.qb h2{font-size:27px;line-height:1.3;min-height:65px}.qb-actions{display:flex;gap:12px;margin-top:20px}.qb-actions button{padding:8px 14px;border:1px solid #b5cbc0;border-radius:5px;font-size:17px;background:#e7efe6;color:#173438}.qb-actions .qb-primary{background:#246e62;border-color:#246e62;color:white}.qb-actions button:disabled{opacity:.4}.qb-answer{white-space:pre-line;max-height:190px;overflow:auto;font-size:19px;line-height:1.45}.qb .note{margin-top:20px}
</style>
