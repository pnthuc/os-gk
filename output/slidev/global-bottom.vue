<script setup>
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentPage, total, isPresenter, next, prev, go } = useNav()
const page = computed(() => String(currentPage.value).padStart(2, '0'))
</script>

<template>
  <footer v-if="!isPresenter" class="deck-folio">
    <span class="folio-course">CSC10007 – Ôn giữa kỳ</span>
    <nav aria-label="Điều hướng bài học" @keydown.right.prevent.stop="next()" @keydown.left.prevent.stop="prev()">
      <button type="button" class="folio-button" @click.stop="go(2)">Mục lục</button>
      <button type="button" class="folio-button" @click.stop="prev()">← Trước</button>
      <span class="folio-page" aria-label="Số trang">{{ page }} / {{ total }}</span>
      <button type="button" class="folio-button folio-next" @click.stop="next()">Tiếp →</button>
    </nav>
  </footer>
</template>

<style>
.deck-folio {
  position: absolute; inset: auto 65px 8px; z-index: 7;
  display: flex; justify-content: space-between; align-items: center;
  border-top: 1px solid #c9d7cc; padding-top: 6px; pointer-events: none;
  font: 650 13px/1.2 "Segoe UI", Arial, sans-serif; color: #506969;
}
.deck-folio nav { display: flex; gap: 9px; align-items: center; }
.folio-page { min-width: 50px; text-align: center; font-variant-numeric: tabular-nums; }
.folio-button {
  pointer-events: auto; padding: 4px 8px; border: 1px solid #c4d4c8;
  border-radius: 4px; background: #edf3eb; color: #29564c; cursor: pointer;
}
.folio-button:hover, .folio-button:focus-visible { background: #ddeae0; }
.folio-next { background: #246e62; border-color: #246e62; color: #fff; }
.folio-next:hover, .folio-next:focus-visible { background: #184d44; }
</style>
