<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3"
import {
  mdiAccountKey,
  mdiPlus,
  mdiSquareEditOutline,
  mdiTrashCan,
  mdiAlertBoxOutline,
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
import { computed } from "vue"

const props = defineProps({
    treasurerTransaction: {
    type: Object,
    default: () => ({}),
  },
  treasurer: {
    type: Object,
    default: () => ({}),
  },
 
  currency: {
    type: Object,
    default: () => ({}),
  },
    usd_balance: {
    type: Array,
    default: [],
  },
    iqd_balance: {
    type: Object,
    default: () => ({}),
  },
  iqd_to_usd: {
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

const form = useForm({
  // search: props.filters.search,
  treasurer_id:props.filters.treasurer_id,
  currency_id:props.filters.currency_id
})
function formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
const formDelete = useForm({})

function destroy(id) {
  if (confirm("Are you sure you want to delete?")) {
    formDelete.delete(route("treasurertranaction.destroy", id))
  }
}
let is_exchange = computed(() => {
    return props.treasurerTransaction.statement_id? true:false;
});
console.log(props.sum_exchenged_usd_to_iqd);
</script>

<template>
  <LayoutAuthenticated>
    <Head title="Transactions" />
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiAccountKey"
        title="Transactions"
        main
      >
        <BaseButton
          v-if="can.delete"
          :route-name="route('treasurertranaction.create')"
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
        <form @submit.prevent="form.get(route('treasurertranaction.index'))">
          <div class="py-2 flex">
            <div class="flex pl-4">
              <!-- <input
                type="search"
                v-model="form.search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                placeholder="Search"
              /> -->
          
              <select
                        v-model="form.currency_id"
                        id="countries"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                    <option selected ></option>
                        <option
                            v-for="st in props.currency"
                            :key="st.id"
                            v-bind:value="st.id"
                        >
                            {{ st.name }}
                        </option>
                    </select>
           
            </div>

            <div class="flex pl-4">
        
              <select
                        v-model="form.treasurer_id"
                        id="countries"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                    <option selected ></option>

                        <option
                            v-for="st in props.treasurer"
                            :key="st.id"
                            v-bind:value="st.id"
                        >
                            {{ st.name }}
                        </option>
                    </select>
              
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
      <CardBox class="mb-6 " has-table>
          <div class="py-2  flex justify-center">
            <div class="flex pl-8">
          <p class="text-lg">balance in USD : ${{formatPrice(props.usd_balance[0])}}</p>
             
            </div>
            <div class="flex pl-8">
          <p class="text-lg">balance in IQD : {{formatPrice(props.iqd_balance[0])}} :NOW ${{ formatPrice( Number(iqd_to_usd))}}</p>
             
            </div>
          </div>
      </CardBox>
      <CardBox class="mb-6" has-table>
        <table>
          <thead>
            <tr>
              <th>
                <Sort label="نوسینگە" attribute="ناو" />
              </th>
              <th>
                <Sort label="بەروار" attribute="name" />
              </th>
              <th>
                <Sort label="وەرگیراوە" attribute="name" />
              </th>
           
              <th>
                <Sort label="دراوە" attribute="usd_total_sales_balance" />
              </th>
              <th>
                <Sort label="جۆری دراو " attribute="usd_total_purchases_balance" />
              </th>
              <th>
                <Sort label="جۆری مامەڵە " attribute="usd_total_purchases_balance" />
              </th>
          
             
              <th v-if="can.edit || can.delete">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="transaction in treasurerTransaction.data" :key="transaction.id">
              <td data-label="ناوی کۆمپانیا">
                <Link
                  :href="route('treasurertranaction.show', transaction.id)"
                  class="
                    no-underline
                    hover:underline
                    text-cyan-600
                    dark:text-cyan-400
                  "
                >
                  {{ transaction.treasurer.name}}
                </Link>
              </td>
              <td data-label=" قەرزارم بەدۆلار  ">
                {{ transaction.date }}
              </td>
              <td data-label=" قەرزارم بەدۆلار  ">
                {{ formatPrice(transaction.received_amount) }}
              </td>
              <td data-label="بەدینار قەرزارم ">
                {{ formatPrice(transaction.paid_amount) }}
              </td>
             

            
              <td data-label="قەرزارە بەدۆلار">
                {{transaction.currency.name }}
              </td>
              <td data-label="قەرزارە بەدۆلار">
                {{transaction.treasurer_transaction_type.name }}
              </td>
             
              <td
                v-if="(can.edit || can.delete) && transaction.treasurer_transaction_type.id==3"
                class="before:hidden lg:w-1 whitespace-nowrap"
              >
                <BaseButtons type="justify-start lg:justify-end" no-wrap>
                  <BaseButton
                    v-if="can.edit"
                    :route-name="route('treasurertranaction.edit', transaction.id)"
                    color="info"
                    :icon="mdiSquareEditOutline"
                    small
                  />
                  <BaseButton
                    v-if="can.delete"
                    color="danger"
                    :icon="mdiTrashCan"
                    small
                    @click="destroy(transaction)"
                  />
                </BaseButtons>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="py-4">
          <Pagination :data="treasurerTransaction" />
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
