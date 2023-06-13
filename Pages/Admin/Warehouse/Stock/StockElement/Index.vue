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

const props = defineProps({
  stockelement: {
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
  search: props.filters.search,
})
function formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
const formDelete = useForm({})

function destroy(id) {
  if (confirm("Are you sure you want to delete?")) {
    formDelete.delete(route("stockelement.destroy", id))
  }
}

console.log(props.stockelement);
</script>

<template>
  <LayoutAuthenticated>
    <Head title="StockElement" />
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiAccountKey"
        title="Stock"
        main
      >
        <BaseButton
          v-if="can.delete"
          :route-name="route('stockelement.create')"
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
        <form @submit.prevent="form.get(route('stockelement.index'))">
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
        <table class="border-separate">
          <thead class="justify-around">
            <tr>
              <th>
                <Sort label="ناوی لق" attribute="name" />
              </th>
              <th>
                <Sort label="کۆگا" attribute="stock" />
              </th>

              <!-- <th>
                <Sort label=" بڕی پێشو" attribute="start_balance" />
              </th> -->

              <!-- <th>
                <Sort label="بڕی پێشووی کۆمپانیا" attribute="start_balance" />
              </th> -->

              <!-- <th>
                <Sort label=" کۆلفەی پێشوو " attribute="factory_price" />
              </th> -->
              <th>
                <Sort label=" بڕی ئیستا " attribute="sales_balance" />
              </th>
              <th>
                <Sort label=" کۆلفەی ئیستا " attribute="sales_balance" />
              </th>
              <th>
                <Sort label="جۆری کۆگا " attribute="purchase_balance" />
              </th>




              <th v-if="can.edit || can.delete">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="stockelement in stockelement.data" :key="stockelement.id">
              <td data-label="ناوی کۆگا">
                <Link
                  :href="route('stockelement.show', stockelement)"
                  class="
                    no-underline
                    hover:underline
                    text-cyan-600
                    dark:text-cyan-400
                  "
                >
                  {{ stockelement.name}}
                </Link>
              </td>


              <td data-label="Stock">
                {{ stockelement.stock.name}}
              </td>
              <!-- <td data-label="current_amount">
                {{ formatPrice(stockelement.before_amount) }}
              </td> -->

              <!-- <td data-label="current_amount">
                {{ formatPrice(stockelement.before_amount_company) }}
              </td>

              <td data-label="factory_price">
                {{ formatPrice(stockelement.factory_price) }}
              </td> -->
              <td data-label="current_amount">
                {{ formatPrice(stockelement.current_amount) }}
              </td>
              <td data-label="current_factory_price">
                {{ formatPrice(stockelement.current_factory_price) }}
              </td>
              <td data-label="in production" v-if="stockelement.is_in_production==0 && stockelement.is_out_production==0">
                کۆگای کڕین و فرۆشتن
              </td>
              <td class="text-green-600" data-label="in production" v-else-if="stockelement.is_in_production>0 || stockelement.is_out_production==0">
                 کڕین بۆ بەرهەم هینان
              </td>
              <td class="text-green-600" data-label="in production" v-else-if="stockelement.is_in_productio==0 || stockelement.is_out_production>0">
                 فرۆشتنی بەرهەم هینان
              </td>


              <td
                v-if="can.edit || can.delete"
                class="before:hidden lg:w-1 whitespace-nowrap"
              >
                <BaseButtons type="justify-start lg:justify-end" no-wrap>
                  <BaseButton
                    v-if="can.edit"
                    :route-name="route('stockelement.edit', stockelement)"
                    color="info"
                    :icon="mdiSquareEditOutline"
                    small
                  />
                  <BaseButton
                    v-if="can.delete"
                    color="danger"
                    :icon="mdiTrashCan"
                    small
                    @click="destroy(stockelement.id)"
                  />
                </BaseButtons>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="py-4">
          <Pagination :data="stockelement" />
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
