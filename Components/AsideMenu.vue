<script setup>
import { useLayoutStore } from '@/Stores/layout.js'
import menu from '@/menu.js'
import AsideMenuLayer from '@/Components/AsideMenuLayer.vue'
import OverlayLayer from '@/Components/OverlayLayer.vue'

const layoutStore = useLayoutStore()
</script>

<template>
  <AsideMenuLayer
    :menu="menu"
    :class="[{'hidden ': !layoutStore.isAsideLgActive}]"
  />
  <OverlayLayer
    v-show="layoutStore.isAsideLgActive"
    z-index="z-30"
    @overlay-click="layoutStore.isAsideLgActive = false"
  />
</template>
