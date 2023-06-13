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
import VueMultiselect from "vue-multiselect";
import { computed, onMounted } from "@vue/runtime-core"

const props = defineProps({
    stockElementHistory: {
      type: Object,
    default: () => ({}),
  },
  get_last: {
      type: Array,
    default: [],
  },
  data: {
    type: Array,
    default: [],
  },
  cumulative_pre_amount: {
    type: Object,
    default: () => {},
  },
  total_pre_contract: {
    type: Array,
    default: [],
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

// let page = computed(() => {
// return props.stockElementHistory.current_page? props.stockElementHistory.current_page : 'error'
// })

const form = useForm({
  search: props.filters.search,
 page:props.filters.page,
  //date2:props.filters.date2
});



console.log(props.total_pre_contract[0]);

function formatPrice(value) {
        let val = (value/1).toFixed(2).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    function fomatFactoryPrice(value) {
        let val = (value/1).toFixed(6).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{0})+(?!\d))/g, ",")
    }
const formDelete = useForm({})

function destroy(id) {
  if (confirm("Are you sure you want to delete?")) {
    formDelete.delete(route("stockrate.destroy", id))
  }
}

let pre_amount = computed(() => {
return props.cumulative_pre_amount?Number(props.cumulative_pre_amount[0]['amount']):Number(0)
})
let pre_company_amount = computed(() => {
return props.cumulative_pre_amount?Number(props.cumulative_pre_amount[0]['company_amount']):Number(0)
})
let pre_contract = computed(() => {
return props.total_pre_contract?Number(props.total_pre_contract[0]):Number(0)
})
</script>

<template>
  <LayoutAuthenticated>
    <Head title="Stock" />
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiAccountKey"
        title="Stock"
        main
      >
        <BaseButton
          v-if="can.delete"
          :route-name="route('stockrate.create')"
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
        <form @submit.prevent="form.get(route('stockrate.index'))">
          <div class="py-2 flex">
            <div class="flex pl-4">
                <!-- <VueMultiselect
                v-model="form.search"
                :options="props.data"
                track-by="id"
                id="first_destination"
                label="name"
                :options-limit="6"
                class="shadow-md shadow-cyan-300/50"
            >
            </VueMultiselect> -->

            <select v-model="form.search"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

              <option ></option>
        
              <option v-for="st in props.data" :key="st.id" v-bind:value="st.id" >{{ st.name}}</option>
            </select>
              <!-- <input
              type="date"
              v-model="form.date1"
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
            <input
            type="date"
            v-model="form.date2"
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
          /> -->
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
        <table class="border-separate">
          <thead class="justify-around">
            <tr>
              <th>
                <Sort label=" کۆگا" attribute="name" />
              </th>
              <th>
                <Sort label="پرۆتۆکۆل" attribute="stock" />
              </th>

              <th>
                <Sort label=" تەنی گۆلد" attribute="start_balance" />
              </th>

              <th>
                <Sort label="تەنی کۆمپانیا " attribute="factory_price" />
              </th>
             
              <th>
                <Sort label="نرخ" attribute="sales_balance" />
              </th>
              <th>
                <Sort label="کۆی گشتی تەنی گۆلد" attribute="purchase_balance" />
              </th>

              <th>
                <Sort label="کۆی گشتی تەنی کۆمپانیا" attribute="purchase_balance" />
              </th>
              <th>
                <Sort label="کۆی نرخ" attribute="purchase_balance" />
              </th>
              <th>
                <Sort label="کۆی گشتی نرخ" attribute="purchase_balance" />
              </th>
              <th>
                <Sort label="بەروار" attribute="purchase_balance" />
              </th>
              <th>
                <Sort label="کولفە" attribute="purchase_balance" />
              </th>


              <th v-if="can.edit || can.delete">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="history in stockElementHistory.data" :key="history.id">
              <td data-label="ناوی کۆگا" >
                <Link
                  :href="route('stockrate.show', history)"
                  class="
                    no-underline
                    hover:underline
                    text-cyan-600
                    dark:text-cyan-400
                  "
                >
                  {{  history.stock_element_name}}
                </Link>
              </td>


             
              <td data-label="پرۆتۆکۆل">
                {{ history.invoice_id}}
              </td>
           

              <td data-label="تەنی گۆلد">
                {{ formatPrice(history.amount) }}
              </td>
              <td data-label="تەنی کۆمپانیا">
                {{ formatPrice(history.company_amount) }}
              </td>
              <td data-label=" نرخ">
                {{ fomatFactoryPrice(history.price) }}
              </td>
              <td data-label=" کۆی گشتی تەنی گۆلد" >
                {{ formatPrice(Number( history.cumulative_amount)+Number(pre_amount)) }}
              </td>
            
              <td data-label=" کۆی گشتی تەنی کۆمپانیا">
                {{ formatPrice( Number( history.cumulative_company_amount)+Number(pre_company_amount)) }}
              </td>

              <td data-label=" کۆی نرخ">
                {{ formatPrice(history.total_price) }}
              </td>
              <td data-label=" کۆی گشتی نرخ">
                {{ formatPrice(history.cumulative_price) }}
              </td>
          
              <td data-label="  بەروار ">
                {{ history.created_at 
              }}
              </td>
              <td data-label="  کولفە " v-if="pre_contract">
                {{( Number(history.cumulative_price)+Number(pre_contract) )/(Number( history.cumulative_company_amount)+Number(pre_company_amount))   }}
              </td>
              <td data-label="  کولفە " v-if="!pre_contract">
                {{ fomatFactoryPrice(history.factory_price) }}
              </td>
              <td
                v-if="can.edit || can.delete"
                class="before:hidden lg:w-1 whitespace-nowrap"
              >
                <BaseButtons type="justify-start lg:justify-end" no-wrap>
                  <BaseButton
                    v-if="can.edit"
                    :route-name="route('stockrate.edit', history)"
                    color="info"
                    :icon="mdiSquareEditOutline"
                    small
                  />
                  <BaseButton
                    v-if="can.delete"
                    color="danger"
                    :icon="mdiTrashCan"
                    small
                    @click="destroy(history.id)"
                  />
                </BaseButtons>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="py-4">
          <Pagination :data="props.stockElementHistory" />
        </div>
        
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
