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
  employeeDetail: {
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

})

console.log(props.employeeDetail);
const form1 = useForm({

  advance_id:'',
  employee_id:'',
  currency_id:'',
  employee_trans_type_id:1,
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
  form1.advance_id=advance.id
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
                <Sort label="بڕ " attribute="بڕ" />
              </th>
              <th>
                <Sort label="جۆر" attribute="جۆر" />
              </th>
              <th>
                <Sort label="دراو" attribute="دراو" />
              </th>

              <th>
                <Sort label="چۆنیەتی" attribute=" " />
              </th>




              <th v-if="can.edit || can.delete">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="employeeDetail in employeeDetail.data" :key="employeeDetail.id">
              <td data-label="ناو ">
                <Link
                  :href="route('employeedetail.show', employeeDetail.id)"
                  class="
                    no-underline
                    hover:underline
                    text-cyan-600
                    dark:text-cyan-400
                  "
                >
                  {{ employeeDetail.employee.name}}
                </Link>
              </td>

              <td data-label="بەروار">
                {{ employeeDetail.date }}
              </td>

              <td data-label="بڕ">
                {{ employeeDetail.amount }}
              </td>
              <td data-label="جۆر">
                {{ employeeDetail.employee_transaction_type.name }}
              </td>


              <td data-label="دراو">
                {{ employeeDetail.currency.name }}
              </td>



              <td data-label="چۆنیەتی" v-if="employeeDetail.status==1">
                Open
              </td>
              <td data-label="چۆنیەتی" v-else-if="employeeDetail.status==0">
                Closed
              </td>

              <td
                v-if="can.edit || can.delete"
                class="before:hidden lg:w-4 whitespace-nowrap"
              >
                <div class="flex flex-row space-x-2">




                  <BaseButton
                    v-if="can.edit"
                    :route-name="route('employeedetail.edit', employeeDetail.id)"
                    color="info"
                    :icon="mdiSquareEditOutline"
                    small
                  />
                  <BaseButton
                    v-if="can.delete"
                    color="danger"
                    :icon="mdiTrashCan"
                    small
                    @click="destroy(employeeDetail.id)"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="py-4">
          <Pagination :data="employeeDetail" />
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
