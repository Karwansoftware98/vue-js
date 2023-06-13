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
import { computed } from "@vue/runtime-core"

const props = defineProps({
  roles: {
    type: Object,
    default: () => ({}),
  },

  stockElement: {
    type: Object,
    default: () => ({}),
  },
  l_invoice_id: {
    type: Object,
    default: () => ({}),
  }
})

const form = useForm({
    date:'',
  stock_element_id: '',
  our_amount:'',
  company_amount:'',
  factory_price:'',
  l_invoice_id:props.l_invoice_id



})

let total = computed(() => {
 // return form.purchase_balance-form.sales_balance;
})
</script>

<template>
  <LayoutAuthenticated>
    <Head title="Add Stock" />
    <SectionMain >
      <SectionTitleLineWithButton
        :icon="mdiAccountKey"
        title="Add Stock Balance"
        main
      >
        <BaseButton
          :route-name="route('stockrate.index')"
          :icon="mdiArrowLeftBoldOutline"
          label="Back"
          color="white"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <CardBox
        form
        @submit.prevent="form.post(route('stockrate.store'))"
      >
        <FormField
          label="Chose Warehouse"
          :class="{ 'text-red-400': form.errors.stock_element_id }"
        >
   
        <select v-model="form.stock_element_id" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option v-for="st in stockElement" :key="st.id" v-bind:value="st.id">{{st.name}}</option>
        </select>
        </FormField>
        <FormField
        label="Gold Amount"
        :class="{ 'text-red-400': form.errors.date }"
      >
        <FormControl
          v-model="form.date"
          type="date"
          placeholder="Enter date"
          :error="form.errors.date"
        >
          <div class="text-red-400 text-sm" v-if="form.errors.date">
            {{ form.errors.date }}
          </div>
        </FormControl>
      </FormField>
        <FormField
          label="Gold Amount"
          :class="{ 'text-red-400': form.errors.our_amount }"
        >
          <FormControl
            v-model="form.our_amount"
            type="text"
            placeholder="Enter Gold Amount"
            :error="form.errors.our_amount"
          >
            <div class="text-red-400 text-sm" v-if="form.errors.our_amount">
              {{ form.errors.our_amount }}
            </div>
          </FormControl>
        </FormField>
    

        <FormField
        label="Company Amount"
        :class="{ 'text-red-400': form.errors.company_amount }"
      >
        <FormControl
          v-model="form.company_amount"
          type="number"
          placeholder="Enter gold weight"
          :error="form.errors.company_amount"
        >
          <div class="text-red-400 text-sm" v-if="form.errors.company_amount">
            {{ form.errors.company_amount }}
          </div>
        </FormControl>
      </FormField>

      <FormField
      label="factory price"
      :class="{ 'text-red-400': form.errors.factory_price }"
    >
      <FormControl
        v-model="form.factory_price"
        type="text"
        placeholder="Enter factory price"
        :error="form.errors.factory_price"
      >
        <div class="text-red-400 text-sm" v-if="form.errors.factory_price">
          {{ form.errors.factory_price }}
        </div>
      </FormControl>
    </FormField>

    

       


<p>balance : $ {{total}}</p>    
    
      




       



     

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
