<script setup>
import { computed } from 'vue'
import { mdiClose } from '@mdi/js'
import BaseButton from '@/Components/BaseButton.vue'
import BaseButtons from '@/Components/BaseButtons.vue'
import CardBox from '@/Components/CardBox.vue'
import LoadLayer from '@/Components/LoadLayer.vue'
import { useStyleStore } from '@/Stores/style'

const styleStore = useStyleStore();

const props = defineProps({
  title: {
    type: String,
    default: null
  },
  largeTitle: {
    type: String,
    default: null
  },
  button: {
    type: String,
    default: 'info'
  },
  buttonLabel: {
    type: String,
    default: 'Done'
  },
  hasCancel: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const value = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const confirmCancel = mode => {
  value.value = false
  emit(mode)
}

const confirm = () => confirmCancel('confirm')

const cancel = () => confirmCancel('cancel');
</script>

<template>
  <LoadLayer
    v-show="value"
    @overlay-click="cancel"
  >
    <CardBox
    :class="[
            { dark: styleStore.darkMode },
        ]"
      v-show="value"
      :title="title"
      class="shadow-lg max-h-modal w-11/12 lg:w-4/12 xl:w-4/12  z-50 bg-white dark:bg-slate-800 dark:text-slate-100"
      :header-icon="mdiClose"
      modal
      @header-icon-click="cancel"
    >
      <div class=" space-y-3 ">
        <h1
          v-if="largeTitle"
          class="text-2xl text-white justify-center place-self-center"
        >
          {{ largeTitle }}
        </h1>
        <slot />
      </div>


    </CardBox>
  </LoadLayer>
</template>




