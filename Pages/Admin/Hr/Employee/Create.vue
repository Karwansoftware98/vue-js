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
import NotificationBar from "@/Components/NotificationBar.vue"

const props = defineProps({
  roles: {
    type: Object,
    default: () => ({}),
  },
  company_destination: {
    type: Object,
    default: () => ({}),
  },
  company_postion: {
    type: Object,
    default: () => ({}),
  },
  company_department: {
    type: Object,
    default: () => ({}),
  },
  currency: {
    type: Object,
    default: () => ({}),
  }
})

const form = useForm({
  name: '',
  birthday: '',
  hired_date:'',
  retirement_date:'',
  phone: '',
  company_destination_id:'',
  company_position_id:'',
  company_department_id:'',
  salary:'',
  currency_id:''

})
</script>

<template>
  <LayoutAuthenticated>
    <Head title="Add Employee" />
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiAccountKey"
        title="Add Employee"
        main
      >
        <BaseButton
          :route-name="route('employee.index')"
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
        @submit.prevent="form.post(route('employee.store'))"
      >
        <FormField
          label="Name"
          :class="{ 'text-red-400': form.errors.name }"
        >
          <FormControl
            v-model="form.name"
            type="text"
            placeholder="Enter Name"
            :error="form.errors.name"
          >
            <div class="text-red-400 text-sm" v-if="form.errors.name">
              {{ form.errors.name }}
            </div>
          </FormControl>
        </FormField>


        <FormField
          label=""
          :class="{ 'text-red-400': form.errors.birthday }"
        >
          <FormControl
            v-model="form.birthday"
            type="date"
            placeholder="birthday"
            :error="form.errors.birthday"
          >
            <div class="text-red-400 text-sm" v-if="form.errors.birthday">
              {{ form.errors.birthday }}
            </div>
          </FormControl>
        </FormField>

        <FormField
          label="hired date"
          :class="{ 'text-red-400': form.errors.hired_date }"
        >
          <FormControl
            v-model="form.hired_date"
            type="date"
            placeholder="hired date"
            :error="form.errors.hired_date"
          >
            <div class="text-red-400 text-sm" v-if="form.errors.hired_date">
              {{ form.errors.hired_date }}
            </div>
          </FormControl>
        </FormField>
        <FormField
          label="retirement date"
          :class="{ 'text-red-400': form.errors.retirement_date }"
        >
          <FormControl
            v-model="form.retirement_date"
            type="date"
            placeholder="retirement date"
            :error="form.errors.retirement_date"
          >
            <div class="text-red-400 text-sm" v-if="form.errors.retirement_date">
              {{ form.errors.retirement_date }}
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
            label="Chose department"
            :class="{ 'text-red-400': form.errors.company_department_id }"
        >
            <select
                v-model="form.company_department_id"
                id="comapnydepartment"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option
                    v-for="st in company_department"
                    :key="st.id"
                    v-bind:value="st.id"
                >
                    {{ st.name }}
                </option>
            </select>
        </FormField>
        <FormField
            label="Chose destination"
            :class="{ 'text-red-400': form.errors.company_destination_id }"
        >
            <select
                v-model="form.company_destination_id"
                id="comapnydepartment"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option
                    v-for="st in company_destination"
                    :key="st.id"
                    v-bind:value="st.id"
                >
                    {{ st.name }}
                </option>
            </select>
        </FormField>
        <FormField
            label="Chose postion"
            :class="{ 'text-red-400': form.errors.company_position_id }"
        >
            <select
                v-model="form.company_position_id"
                id="comapnydepartment"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option
                    v-for="st in company_postion"
                    :key="st.id"
                    v-bind:value="st.id"
                >
                    {{ st.name }}
                </option>
            </select>
        </FormField>
        <FormField
        label="Salary"
        :class="{ 'text-red-400': form.errors.name }"
      >
        <FormControl
          v-model="form.salary"
          type="number"
          placeholder="Enter Salary"
          :error="form.errors.salary"
        >
          <div class="text-red-400 text-sm" v-if="form.errors.salary">
            {{ form.errors.salary }}
          </div>
        </FormControl>
      </FormField>

      <FormField
      label="Chose Currency"
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
