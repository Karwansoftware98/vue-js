<script setup>
import { ref, computed } from 'vue'
import { Link, usePage } from '@inertiajs/vue3'
import { useStyleStore } from '@/Stores/style.js'
import { mdiMinus, mdiPlus } from '@mdi/js'
import { getButtonColor } from '@/colors.js'
import BaseIcon from '@/Components/BaseIcon.vue'
import AsideMenuList from '@/Components/AsideMenuList.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isDropdownList: Boolean,
})

const itemHref = computed(() => props.item.route ? route(props.item.route, props.item.data ?{'type':props.item.data }: null) : props.item.href)

const emit = defineEmits(['menu-click'])

const styleStore = useStyleStore()

const hasColor = computed(() => props.item && props.item.color)

const asideMenuItemActiveStyle = computed(() => hasColor.value ? '' : styleStore.asideMenuItemActiveStyle)

const isDropdownActive = ref(false)

const componentClass = computed(() => (
  [
    props.isDropdownList ? 'py-3 px-6 text-sm' : 'py-3',
    hasColor.value
      ? getButtonColor(props.item.color, false, true)
      : styleStore.asideMenuItemStyle
  ]
))

const hasDropdown = computed(() => !!props.item.menu)

const menuClick = event => {
    emit('menu-click', event, props.item)
    if (hasDropdown.value) {
        isDropdownActive.value = !isDropdownActive.value
    }
};
// console.log(usePage().props.auth.can);

let objRef = ref(usePage().props.auth.can);
let obj = objRef.value
let modifiedObj = Object.keys(obj).reduce((acc, key) => {
  let value = obj[key].name;
  if (typeof value === 'string') {
    let valueParts = value.split(' ');
    let modifiedValue = valueParts[0];
    acc[key] = { name: modifiedValue };
  }
  return acc;
}, {});
// function searchUserInput(userInput) {
// let result = userInput?.split(".")[0];

//   for (let key in obj) {
//     let name = obj[key].name;
//     if (typeof name === 'string' && name?.toLowerCase().includes(result?.toLowerCase())) {
//       return true; // Match found
//     }
//   }
//   return false; // No match found
// }

</script>
<template>
  <li


  >

    <component
      :is="item.route ? Link : 'a'"
      :href="itemHref"
      :target="item.target ?? null"
      class="flex cursor-pointer text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white  bg-gray-100  dark:bg-slate-800"
      :class="componentClass"
      @click="menuClick"
    >
      <BaseIcon
        v-if="item.icon"
        :path="item.icon"
        class="flex-none "
        :class="props.item.route && route().current(props.item.route) ? 'dark:text-white text-slate-500' : ''"
        w="w-16"
        :size="18"
      />
      <span
        class="grow "
        :class="props.item.route && route().current(props.item.route) ? 'dark:text-white text-slate-500' : '' "
      >{{ item.label }}</span>
      <BaseIcon
        v-if="hasDropdown"
        :path="isDropdownActive ? mdiMinus : mdiPlus"
        class="flex-none"
        :class="props.item.route && route().current(props.item.route) ? 'dark:text-white text-slate-500' : ''"
        w="w-12"
      />
    </component>
    <AsideMenuList
      v-if="hasDropdown"
      :menu="item.menu"
      :class="[ styleStore.asideMenuDropdownStyle, isDropdownActive ? 'block' : 'hidden' ]"
      is-dropdown-list
    />
  </li>
</template>
