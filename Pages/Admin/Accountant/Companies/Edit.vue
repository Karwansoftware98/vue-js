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
  company: {
    type: Object,
    default: () => ({}),
  },
})

const form = useForm({
  _method: 'put',
  name: props.company.name,
  phone: props.company.phone,
  address: props.company.address,
  note: props.company.note,
 
})
</script>

<template>
  <LayoutAuthenticated>
    <Head title="Update company" />
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiAccountKey"
        title="Update company"
        main
      >
        <BaseButton
          :route-name="route('companies.index')"
          :icon="mdiArrowLeftBoldOutline"
          label="Back"
          color="white"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <CardBox
        form
        @submit.prevent="form.post(route('companies.update', props.company.id))"
      >
        <FormField
          label="Enter Name"
          :class="{ 'text-red-400': form.errors.name }"
        >
          <FormControl
            v-model="form.name"
            type="text"
            placeholder="Name"
            :error="form.errors.name"
          >
            <div class="text-red-400 text-sm" v-if="form.errors.name">
              {{ form.errors.name }}
            </div>
          </FormControl>
        </FormField>

        <FormField
          label="Address"
          :class="{ 'text-red-400': form.errors.address }"
        >
          <FormControl
            v-model="form.address"
            type="text"
            placeholder="Email"
            :error="form.errors.address"
          >
            <div class="text-red-400 text-sm" v-if="form.errors.address">
              {{ form.errors.adress }}
            </div>
          </FormControl>
        </FormField>

        <FormField
          label="phone"
          :class="{ 'text-red-400': form.errors.phone }"
        >
          <FormControl
            v-model="form.phone"
            type="text"
            placeholder="phone number"
            :error="form.errors.phone"
          >
            <div class="text-red-400 text-sm" v-if="form.errors.phone">
              {{ form.errors.phone }}
            </div>
          </FormControl>
        </FormField>

        <FormField
          label="note"
          :class="{ 'text-red-400': form.errors.note }"
        >
          <FormControl
            v-model="form.note"
            type="text"
            placeholder="note"
            :error="form.errors.note"
          >
            <div class="text-red-400 text-sm" v-if="form.errors.note">
              {{ form.errors.note }}
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
