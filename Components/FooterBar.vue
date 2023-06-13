<script setup>
import { computed } from 'vue'
import { containerMaxW } from '@/config.js';
import BaseLevel from '@/Components/BaseLevel.vue'
import JustboilLogo from '@/Components/JustboilLogo.vue'

const year = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="flex justify-center py-2 px-6 ">
      <div >
        <b>&copy; {{year}}&nbsp; <a
        >Golden Energy</a> .</b>

      </div>

  </footer>
</template>
