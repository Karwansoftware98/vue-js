<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3"
import {
  mdiAccountKey,
  mdiPlus,
  mdiSquareEditOutline,
  mdiTrashCan,
  mdiAlertBoxOutline,
mdiCurrencyUsd,
mdiBankPlus,
} from "@mdi/js"
import LayoutAuthenticated from "@/Layouts/LayoutAuthenticated.vue"
import SectionMain from "@/Components/SectionMain.vue"
import SectionTitleLineWithButton from "@/Components/SectionTitleLineWithButton.vue"
import BaseButton from "@/Components/BaseButton.vue"
import CardBox from "@/Components/CardBox.vue"
import BaseButtons from "@/Components/BaseButtons.vue"
import NotificationBar from "@/Components/NotificationBar.vue"
import Pagination from "@/Components/Admin/Pagination.vue"
import Sort from "@/Components/Admin/Sort.vue"
import CardBoxModal from '@/Components/CardBoxModal.vue'
import FormField from "@/Components/FormField.vue";
import FormControl from "@/Components/FormControl.vue";
import { computed } from "@vue/runtime-core";

import {  ref } from 'vue'

const props = defineProps({
  advance: {
    type: Object,
    default: () => ({}),
  },
  filters: {
    type: Object,
    default: () => ({}),
  },
  can: {
    type: Object,
    default: () => ({}),
  },
  currency: {
    type: Object,
    default: () => ({}),
  },
  employee_trans_type: {
    type: Object,
    default: () => ({}),
  },

})

const form1 = useForm({

  employee_advance_id:'',
  employee_id:'',
  currency_id:'',
  employee_transaction_type_id:1,
  treasurer_id:'',
  amount:'',
  date:'',
  status:''
})
let isModalActive = ref(false)
let modalData= ref(false)
const form = useForm({
  search: props.filters.search,
})
function formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
const formDelete = useForm({})

function destroy(id) {
  if (confirm("Are you sure you want to delete?")) {
    formDelete.delete(route("employee.destroy", id))
  }
}

let MoadalData = computed(() => {
   isModalActive = ref(true)
});

function getTableRow(advance){
  isModalActive.value=true;
  form1.currency_id=advance.currency.id
  form1.employee_advance_id=advance.id
  form1.employee_id=advance.employee_id
  form1.status=advance.status

}
</script>

<template>
  <LayoutAuthenticated>
    <Head title="Employee Advances" />
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiBankPlus"
        title="Employee Advances"
        main
      >
        <BaseButton
          v-if="can.delete"
          :route-name="route('advance.create')"
          :icon="mdiPlus"
          label="Add"
          color="info"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <NotificationBar
        v-if="$page.props.flash.message"
        color="success"
        :icon="mdiAlertBoxOutline"
      >
        {{ $page.props.flash.message }}
      </NotificationBar>
      <Teleport  to="body" >

        <CardBoxModal
        v-model="isModalActive"
        title="ئەژمارکردن"
        v-if="form1.status==1"
        >
        <NotificationBar
        v-if="$page.props.flash.message"
        color="success"
        :icon="mdiAlertBoxOutline"
      >
        {{ $page.props.flash.message }}
      </NotificationBar>
        <form @submit.prevent="form1.post(route('employeedetail.store'))">

        <FormField
                    label="بڕ"
                    :class="{ 'text-red-400': form1.errors.amount }"
                >
                    <FormControl
                        v-model="form1.amount"
                        type="number"
                        :error="form1.errors.amount"
                    >
                        <div
                            class="text-red-400 text-sm"
                            v-if="form1.errors.amount||form1.amount>0&&form1.amount<=1000&&form1.currency_id==2"
                        >
                            {{ form1.errors.amount?form1.errors.amount:'لۆ تەماتەیە' }}
                        </div>
                    </FormControl>
                </FormField>

        <FormField
                    label="بەروار"
                    :class="{ 'text-red-400': form1.errors.date }"
                >
                    <FormControl
                        v-model="form1.date"
                        type="date"
                        :error="form1.errors.date"
                    >
                        <div
                            class="text-red-400 text-sm"
                            v-if="form1.errors.date"
                        >
                            {{ form1.errors.date }}
                        </div>
                    </FormControl>
                </FormField>
                <FormField
                label="ئەژمارکردن لەسەر"
                :class="{ 'text-red-400': form1.errors.employee_transaction_type_id }"
            >
                <select
                    v-model="form1.employee_transaction_type_id"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >

                <option value="1">{{employee_trans_type[0]['name']}}</option>

                </select>
            </FormField>



            <BaseButtons>
              <BaseButton
                type="submit"
                color="info"
                label="Submit"
                :class="{ 'opacity-25': form1.processing }"
                :disabled="form1.processing"
              />
            </BaseButtons>
        </form>
        </CardBoxModal>
        </Teleport>

      <CardBox class="mb-6" has-table>
        <form @submit.prevent="form.get(route('advance.index'))">
          <div class="py-2 flex">
            <div class="flex pl-4">
              <input
                type="search"
                v-model="form.search"
                class="
                  rounded-md
                  shadow-sm
                  border-gray-300
                  focus:border-indigo-300
                  focus:ring
                  focus:ring-indigo-200
                  focus:ring-opacity-50
                "
                placeholder="Search"
              />
              <BaseButton
                label="Search"
                type="submit"
                color="info"
                class="ml-4 inline-flex items-center px-4 py-2"
              />
            </div>
          </div>
        </form>
      </CardBox>
      <CardBox class="mb-6" has-table>
        <table>
          <thead>
            <tr>
              <th>
                <Sort label="ناو" attribute="ناو" />
              </th>
              <th>
                <Sort label="بەروار" attribute="بەروار" />
              </th>
              <th>
                <Sort label="بڕی سولفە" attribute="بڕی سولفە" />
              </th>
              <th>
                <Sort label="وەرگیراوە" attribute="وەرگیراوە" />
              </th>
              <th>
                <Sort label="مانگانە" attribute="مانگانە" />
              </th>

              <th>
                <Sort label="دراو" attribute="دراو" />
              </th>
              <th>
                <Sort label="گەنجینە" attribute="گەنجینە" />
              </th>
              <th>
                <Sort label="چۆنیەتی" attribute=" " />
              </th>




              <th v-if="can.edit || can.delete">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="advance in advance.data" :key="advance.id">
              <td data-label="ناو ">
                <Link
                  :href="route('advance.show', advance.id)"
                  class="
                    no-underline
                    hover:underline
                    text-cyan-600
                    dark:text-cyan-400
                  "
                >
                  {{ advance.employee.name}}
                </Link>
              </td>

              <td data-label="بەروار">
                {{ advance.date }}
              </td>

              <td data-label="بڕ">
                {{formatPrice(advance.amount) }}
              </td>
              <td data-label="وەرگیراوە">
                {{formatPrice(advance.balance) }}
              </td>
              <td data-label="مانگانە">
                {{formatPrice(advance.monthly_due) }}
              </td>

              <td data-label="دراو">
                {{ advance.currency.name }}
              </td>

              <td data-label="گەنجینە">
                {{advance.treasurer.name}}
              </td>

              <td data-label="چۆنیەتی" v-if="advance.status==1">
                Open
              </td>
              <td data-label="چۆنیەتی" v-else-if="advance.status==0">
                Closed
              </td>

              <td
                v-if="can.edit || can.delete"
                class="before:hidden lg:w-4 whitespace-nowrap"
              >
                <div class="flex flex-row space-x-2">

                  <BaseButton
                    v-if="can.edit"
                    color="success"
                    :icon="mdiCurrencyUsd"
                    small
                    @click="getTableRow(advance)"
                  />


                  <BaseButton
                    v-if="can.edit"
                    :route-name="route('advance.edit', advance.id)"
                    color="info"
                    :icon="mdiSquareEditOutline"
                    small
                  />
                  <BaseButton
                    v-if="can.delete"
                    color="danger"
                    :icon="mdiTrashCan"
                    small
                    @click="destroy(advance.id)"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="py-4">
          <Pagination :data="advance" />
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
