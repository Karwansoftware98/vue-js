<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3"
import {
  mdiAccountKey,
  mdiArrowLeftBoldOutline
} from "@mdi/js"
import LayoutAuthenticated from "@/Layouts/LayoutAuthenticated.vue"
import SectionMain from "@/Components/SectionMain.vue"
import SectionTitleLineWithButton from "@/Components/SectionTitleLineWithButton.vue"
import CardBox from "@/Components/CardBox.vue"
import FormField from '@/Components/FormField.vue'
import FormControl from '@/Components/FormControl.vue'
import FormCheckRadioGroup from '@/Components/FormCheckRadioGroup.vue'
import BaseDivider from '@/Components/BaseDivider.vue'
import BaseButton from '@/Components/BaseButton.vue'
import BaseButtons from '@/Components/BaseButtons.vue'

const props = defineProps({
  currency: {
    type: Object,
    default: () => ({}),
  }
})

const form = useForm({
  exchange_value: '',
  date: '',
  

})
</script>

<template>
  <LayoutAuthenticated>
    <Head title="Add crrency" />
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiAccountKey"
        title="Add crrency"
        main
      >
        <BaseButton
          :route-name="route('currency.index')"
          :icon="mdiArrowLeftBoldOutline"
          label="Back"
          color="white"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <CardBox
        form
        @submit.prevent="form.post(route('currency.store'))"
      >
        <FormField
          label="Name"
          :class="{ 'text-red-400': form.errors.exchange_value }"
        >
          <FormControl
            v-model="form.exchange_value"
            type="number"
            placeholder="Enter value"
            :error="form.errors.exchange_value"
          >
            <div class="text-red-400 text-sm" v-if="form.errors.exchange_value">
              {{ form.errors.exchange_value }}
            </div>
          </FormControl>
        </FormField>


        <FormField
          label=""
          :class="{ 'text-red-400': form.errors.date }"
        >
          <FormControl
            v-model="form.date"
            type="date"
            placeholder="address"
            :error="form.errors.date"
          >
            <div class="text-red-400 text-sm" v-if="form.errors.date">
              {{ form.errors.date }}
            </div>
          </FormControl>
        </FormField>

      

        

        <BaseDivider />

   
   

        <template #footer>
          <BaseButtons>
            <BaseButton
              type="submit"
              color="info"
              label="Submit"
              :class="{ 'opacity-25': form.processing }"
              :disabled="form.processing"
            />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
