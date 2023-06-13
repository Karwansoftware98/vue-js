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
import VueMultiselect from "vue-multiselect";
import NotificationBar from "@/Components/NotificationBar.vue"

const props = defineProps({
  roles: {
    type: Object,
    default: () => ({}),
  },
  employee: {
    type: Object,
    default: () => ({}),
  },
 
  currency: {
    type: Object,
    default: () => ({}),
  },
  treasurer: {
    type: Object,
    default: () => ({}),
  }
})

const form = useForm({
  employee_id:'',
  amount: '',
  monthly_due: '',
  date:'',
  currency_id:'',
  treasurer_id:''

})
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<template>
  <LayoutAuthenticated>
    <Head title="Add Employee Advance" />
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiAccountKey"
        title="Add Employee Advance"
        main
      >
        <BaseButton
          :route-name="route('advance.index')"
          :icon="mdiArrowLeftBoldOutline"
          label="Back"
          color="white"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <NotificationBar
      v-if="$page.props.flash.message"
      color="danger"
      :icon="mdiAlertBoxOutline"
    >
      {{ $page.props.flash.message }}
    </NotificationBar>
      <CardBox
        form
        @submit.prevent="form.post(route('advance.store'))"
      >
      <FormField
      label="Chose Employee"
      :class="{ 'text-red-400': form.errors.employee_id }"
  >
      <VueMultiselect
      v-model="form.employee_id"
      :options="props.employee"
      placeholder="select employee"
      label="name"
      track-by="id"
      :option-height="104"
      class="text-black"
  >
  </VueMultiselect>
 </FormField>


        <FormField
          label=""
          :class="{ 'text-red-400': form.errors.amount }"
        >
          <FormControl
            v-model="form.amount"
            type="number"
            placeholder="amount"
            :error="form.errors.amount"
          >
            <div class="text-red-400 text-sm" v-if="form.errors.amount">
              {{ form.errors.amount }}
            </div>
          </FormControl>
        </FormField>

        <FormField
          label="Monthly Due"
          :class="{ 'text-red-400': form.errors.monthly_due }"
        >
          <FormControl
            v-model="form.monthly_due"
            type="number"
            placeholder="Monthly Due"
            :error="form.errors.monthly_due"
          >
            <div class="text-red-400 text-sm" v-if="form.errors.monthly_due">
              {{ form.errors.monthly_due }}
            </div>
          </FormControl>
        </FormField>
        <FormField
          label="date"
          :class="{ 'text-red-400': form.errors.date }"
        >
          <FormControl
            v-model="form.date"
            type="date"
            placeholder="retirement date"
            :error="form.errors.date"
          >
            <div class="text-red-400 text-sm" v-if="form.errors.date">
              {{ form.errors.date }}
            </div>
          </FormControl>
        </FormField>
        
        
        <FormField
            label="Chose treasurer"
            :class="{ 'text-red-400': form.errors.treasurer_id }"
        >
            <select
                v-model="form.treasurer_id"
                id="comapnydepartment"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option
                    v-for="st in treasurer"
                    :key="st.id"
                    v-bind:value="st.id"
                >
                    {{ st.name }}
                </option>
            </select>
        </FormField>
        <FormField
            label="Chose currency"
            :class="{ 'text-red-400': form.errors.currency_id }"
        >
            <select
                v-model="form.currency_id"
                id="comapnydepartment"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option
                    v-for="st in currency"
                    :key="st.id"
                    v-bind:value="st.id"
                >
                    {{ st.name }}
                </option>
            </select>
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
