<script setup>
import { Head, Link } from "@inertiajs/vue3";
import { computed, ref, onMounted } from "vue";
import { useMainStore } from "@/Stores/main";
import {
    mdiAccountMultiple,
    mdiCartOutline,
    mdiChartTimelineVariant,
    mdiFinance,
    mdiMonitorCellphone,
    mdiReload,
    mdiGithub,
    mdiChartPie,
} from "@mdi/js";
import * as chartConfig from "@/Components/Charts/chart.config.js";
import LineChart from "@/Components/Charts/LineChart.vue";
import SectionMain from "@/Components/SectionMain.vue";
import CardBoxWidget from "@/Components/CardBoxWidget.vue";
import CardBox from "@/Components/CardBox.vue";
import TableSampleClients from "@/Components/TableSampleClients.vue";
import NotificationBar from "@/Components/NotificationBar.vue";
import BaseButton from "@/Components/BaseButton.vue";
import CardBoxTransaction from "@/Components/CardBoxTransaction.vue";
import CardBoxClient from "@/Components/CardBoxClient.vue";
import LayoutAuthenticated from "@/Layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/Components/SectionTitleLineWithButton.vue";
import SectionBannerStarOnGitHub from "@/Components/SectionBannerStarOnGitHub.vue";
import { mdiCog } from "@mdi/js";

import Pagination from "@/Components/Admin/Pagination.vue"
import Sort from "@/Components/Admin/Sort.vue"

const chartData = ref(null);
const fillChartData = () => {
    chartData.value = chartConfig.sampleChartData();
};
onMounted(() => {
    fillChartData();
});
const mainStore = useMainStore();

/* Fetch sample data */
mainStore.fetch("clients");
mainStore.fetch("history");

const clientBarItems = computed(() => mainStore.clients.slice(0, 4));
const transactionBarItems = computed(() => mainStore.history);

const props = defineProps({
    rateExchange: Number,
    scale_today: Number,
    scale_yesterday: Number,
    companies:  {
    type: Array,
    default: [],
  },
    purchase_weight: Object,
    sales_weight: Object,
    purchase_amount: Object,
    sales_amount: Object,
    treasurers: Object,
    can: {
    type: Object,
    default: () => ({}),
  },
});

console.log(props.companies[0]);

function formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
</script>

<template>
    <LayoutAuthenticated>
        <Head title="Dashboard" />
        <SectionMain>
            <!-- <div class="flex mb-4 justify-center">
                <CardBox class="mb-2" hoverable>
                    <p class="text-lg text-center">
                        Scale &nbsp&nbsp&nbsp&nbsp Today:
                        {{ props.scale_today }}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        Yesterday: {{ props.scale_yesterday }}
                    </p>
                </CardBox>
            </div> -->
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
                <CardBox class="text-sm border-spacing">
                    <div class="text-center mb-2">SCALE</div>
                    <div class="mb-2">
                        Today  : {{ props.scale_today }} 
                    </div>
                    <div class="mb-2">
                        Yesterday : {{ props.scale_yesterday }} 
                    </div>
                   

                    <!-- <NumberDynamic
                        :value="123"
                        :prefix="prefix"
                        :suffix="suffix"
                    /> -->
                </CardBox>
                <CardBox class="text-sm border-spacing">
                    <div class="text-center mb-2">Purchases Weight (KG)</div>
                    <div class="mb-2">
                        Today : Gold : {{formatPrice( props.purchase_weight[0]['today_weight'] )}} | C.: {{formatPrice(props.purchase_weight[0]['today_company_weight']) }}
                    </div>
                    <div class="mb-2">
                        Yesterday : Gold : {{formatPrice(props.purchase_weight[0]['yesterday_weight']) }} | C.: {{formatPrice(props.purchase_weight[0]['yesterday_company_weight']) }}
                    </div>
                   

                    <!-- <NumberDynamic
                        :value="123"
                        :prefix="prefix"
                        :suffix="suffix"
                    /> -->
                </CardBox>
                <CardBox class="text-sm border-spacing">
                    <div class="text-center mb-2">Sales Weight (KG)</div>
                    <div class="mb-2">
                        Today : Gold : {{formatPrice(props.sales_weight[0]['today_weight']) }} | C.: {{ formatPrice(props.sales_weight[0]['today_company_weight']) }}
                    </div>
                    <div class="mb-2">
                        Yesterday : Gold : {{formatPrice(props.sales_weight[0]['yesterday_weight']) }} | C.: {{ formatPrice(props.sales_weight[0]['yesterday_company_weight']) }}
                    </div>
                   

                    <!-- <NumberDynamic
                        :value="123"
                        :prefix="prefix"
                        :suffix="suffix"
                    /> -->
                </CardBox>
                <CardBox class="text-sm border-spacing">
                    <div class="text-center mb-2">Purchase Amount</div>
                    <div class="mb-2">
                        Today : $ : {{formatPrice( props.purchase_amount[0]['usd_today_purchase_amount']) }} | IQD : {{ formatPrice(props.purchase_amount[0]['iqd_today_purchase_amount']) }}
                    </div>
                    <div class="mb-2">
                        Yesterday : $ : {{ formatPrice(props.purchase_amount[0]['usd_yesterday_purchase_amount']) }} | IQD : {{ formatPrice(props.purchase_amount[0]['iqd_yesterday_purchase_amount']) }}
                    </div>
                    <div class="mb-2">
                        Month : $ : {{ formatPrice(props.purchase_amount[0]['usd_month_purchase_amount']) }} | IQD : {{ formatPrice(props.purchase_amount[0]['iqd_month_purchase_amount']) }}
                    </div>
                </CardBox>
                <CardBox class="text-sm border-spacing">
                    <div class="text-center mb-2">Sales Amount</div>
                    <div class="mb-2">
                        Today : $ : {{ formatPrice(props.sales_amount[0]['usd_today_sales_amount']) }} | IQD : {{ formatPrice(props.sales_amount[0]['iqd_today_sales_amount']) }}
                    </div>
                    <div class="mb-2">
                        Yesterday : $ : {{ formatPrice(props.sales_amount[0]['usd_yesterday_sales_amount']) }} | IQD : {{ formatPrice(props.sales_amount[0]['iqd_yesterday_sales_amount']) }}
                    </div>
                    <div class="mb-2">
                        Month : $ : {{ formatPrice(props.sales_amount[0]['usd_month_sales_amount']) }} | IQD : {{ formatPrice(props.sales_amount[0]['iqd_month_sales_amount']) }}
                    </div>
                </CardBox>
            </div>

          

            <CardBox
                :icon="mdiMonitorCellphone"
                title="Companies KG Amount"
                has-table
            >
            <table >
                <thead>
                  <tr>
                   
                    <th>
                        
                      <Sort label="name" attribute="name" />
                    </th>
                    <th>
                      <Sort label="today in" attribute="today in" />
                    </th>
                    <th>
                      <Sort label="today out" attribute="today out" />
                    </th>
                    <th>
                      <Sort label="yesterday in" attribute="yesterday in" />
                    </th>
                    <th>
                      <Sort label="yesterday out" attribute="yesterday out" />
                    </th>
              
                   
                  </tr>
                </thead>
      
                <tbody>
                  <tr v-for="company in props.companies.data" :key="company.id">
                    <td data-label="name">
                      <Link
                        :href="route('companies.show', company.id)"
                        class="
                          no-underline
                          hover:underline
                          text-cyan-600
                          dark:text-cyan-400
                        "
                      >
                        {{ company.name}}
                      </Link>
                    </td>
            
                    <td data-label="today in">
                      G:{{ formatPrice(company.today_purchases_amount) }} | C: {{ formatPrice(company.today_purchases_company_amount) }}
                    </td>
                   
                    <td data-label="today out">
                        G: {{formatPrice( company.today_sales_amount) }} | C: {{ formatPrice(company.today_sales_company_amount) }}
                      </td>
            
                    <td data-label="yesterday in">
                      G: {{ formatPrice(company.yesterday_purchases_amount) }}  | C: {{ formatPrice(company.yesterday_purchases_company_amount) }}
                    </td>
                   
                    <td data-label="yesterday out">
                       G: {{formatPrice(company.yesterday_sales_amount) }} C: {{ formatPrice(company.yesterday_sales_company_amount) }}
                      </td>
                  </tr>
                </tbody>
              </table>
              <div class="py-4">
                <Pagination :data="props.companies" />
              </div>
            </CardBox>
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mt-4 mb-6">
                <CardBoxWidget
                    trend="12%"
                    trend-type="up"
                    color="text-emerald-500"
                    :icon="mdiAccountMultiple"
                    :number="props.purchase_weight"
                    label="purchases"
                />
                <CardBoxWidget
                    trend="12%"
                    trend-type="down"
                    color="text-blue-500"
                    :icon="mdiCartOutline"
                    :number="7770"
                    prefix="$"
                    label="Sales"
                />
                <CardBoxWidget
                    trend="Overflow"
                    trend-type="alert"
                    color="text-red-500"
                    :icon="mdiChartTimelineVariant"
                    :number="256"
                    suffix="%"
                    label="Performance"
                />
            </div>
            <CardBox
                :icon="mdiMonitorCellphone"
                title="Treasurers"
                has-table
            >
            <table >
                <thead>
                  <tr>
                   
                    <th>
                        
                      <Sort label="name" attribute="name" />
                    </th>
                    <th>
                      <Sort label="USD balance" attribute="USD balance" />
                    </th>
                    <th>
                      <Sort label="IQD balance" attribute="IQD balance" />
                    </th>
                 
              
                   
                  </tr>
                </thead>
      
                <tbody>
                  <tr v-for="treasurer in props.treasurers.data" :key="treasurer.id">
                    <td data-label="name">
                      <Link
                        :href="route('treasurer.show', treasurer.id)"
                        class="
                          no-underline
                          hover:underline
                          text-cyan-600
                          dark:text-cyan-400
                        "
                      >
                        {{ treasurer.name}}
                      </Link>
                    </td>
            
                    <td data-label="USD balance">
                      {{ formatPrice(treasurer.usd_balance) }}
                    </td>
                   
                    <td data-label="IQD balance">
                      {{formatPrice( treasurer.iqd_balance) }} 
                      </td>
            
                   
                   
                   
                  </tr>
                </tbody>
              </table>
              <div class="py-4">
                <Pagination :data="props.treasurers" />
              </div>
            </CardBox>
            <!-- <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mt-5">
                <div class="flex flex-col justify-between">
                    <CardBoxTransaction
                        v-for="(transaction, index) in transactionBarItems"
                        :key="index"
                        :amount="transaction.amount"
                        :date="transaction.date"
                        :business="transaction.business"
                        :type="transaction.type"
                        :name="transaction.name"
                        :account="transaction.account"
                    />
                </div>
                <div class="flex flex-col justify-between">
                    <CardBoxClient
                        v-for="client in clientBarItems"
                        :key="client.id"
                        :name="client.name"
                        :login="client.login"
                        :date="client.created"
                        :progress="client.progress"
                    />
                </div>
            </div>

            <SectionBannerStarOnGitHub /> -->

            <SectionTitleLineWithButton
                :icon="mdiChartPie"
                title="Trends overview"
            />

            <CardBox
                title="Performance"
                :icon="mdiFinance"
                :header-icon="mdiReload"
                class="mb-6"
                @header-icon-click="fillChartData"
            >
                <div v-if="chartData">
                    <line-chart :data="chartData" class="h-96" />
                </div>
            </CardBox>

            <SectionTitleLineWithButton
                :icon="mdiAccountMultiple"
                title="Clients"
            />

            <NotificationBar color="info" :icon="mdiMonitorCellphone">
                <b>Responsive table.</b> Collapses on mobile
            </NotificationBar>

            <CardBox
                :icon="mdiMonitorCellphone"
                title="Responsive table"
                has-table
            >
                <TableSampleClients />
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>
