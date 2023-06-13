<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3";
import { mdiAccountKey, mdiArrowLeftBoldOutline } from "@mdi/js";
import LayoutAuthenticated from "@/Layouts/LayoutAuthenticated.vue";
import SectionMain from "@/Components/SectionMain.vue";
import SectionTitleLineWithButton from "@/Components/SectionTitleLineWithButton.vue";
import CardBox from "@/Components/CardBox.vue";
import BaseButton from "@/Components/BaseButton.vue";
import BaseButtons from "@/Components/BaseButtons.vue";
import Pagination from "@/Components/Admin/Pagination.vue";
import Sort from "@/Components/Admin/Sort.vue";

const props = defineProps({
    statement: {
        type: Object,
        default: () => ({}),
    },
    contract: {
        type: Object,
        default: () => ({}),
    },
    total_contract: {
        type: Object,
        default: () => ({}),
    },
    transaction_payments: {
        type: Object,
        default: () => ({}),
    },
    can: {
        type: Object,
        default: () => ({}),
    },
});
function formatPrice(value) {
    let val = (value / 1).toFixed(2).replace(".", ".");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
console.log(props.total_contract);
</script>

<template>
    <LayoutAuthenticated>
        <Head title="View companies" />
        <SectionMain>
            <SectionTitleLineWithButton
                :icon="mdiAccountKey"
                :title="statement.data[0]?.company['name']"
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
            <div class="flex flex-row space-x-2 mb-2">
                <BaseButtons>
                    <BaseButton
                        type="submit"
                        color="warning"
                        label="Profit & Loss"
                    />
                </BaseButtons>
                <!-- <BaseButtons>
                    <BaseButton type="submit" color="info" label="Pay" />
                </BaseButtons>
                <BaseButtons>
                    <BaseButton type="submit" color="danger" label="Receive" />
                </BaseButtons> -->
                <BaseButtons>
                    <BaseButton
                        type="submit"
                        color="contrast"
                        label="Account statement"
                        :route-name="
                            route('companies.accountstatement', statement.id)
                        "
                    />
                </BaseButtons>
                <!-- <BaseButtons>
                    <BaseButton type="submit" color="amber" label="Contract" />
                </BaseButtons> -->
            </div>

            
                <div class="flex m-12 justify-center">
                    <div class="w-96 text-center bg-rose-600">
                        زانیاری کورت
                    </div>
                </div>
                <CardBox class="mb-6">
                    <table dir="ltr" class="text-sm	">
                        <tbody>
                            <tr>
                                <td
                                    class="p-4 pl-8 text-slate-500 dark:text-slate-400 hidden lg:block"
                                >
  
                                 وەرگیراوە
                          </td>
                                <td data-label="وەرگیراوە">

                                    $ {{formatPrice(transaction_payments.usd_received_sales_amount)}} || IQD: {{formatPrice(transaction_payments.iqd_received_sales_amount) }}
                                </td>
                            </tr>
                            <tr>
                                <td
                                    class="p-4 pl-8 text-slate-500 dark:text-slate-400 hidden lg:block"
                                >
                                دراوە
                                </td>
                                <td data-label="دراوە">

                                    $ {{formatPrice(transaction_payments.usd_paid_purchase_amount)}} || IQD: {{ formatPrice(transaction_payments.iqd_paid_purchase_amount) }}
                                </td>
                            </tr>
                      
                            <tr>
                                <td
                                    class="p-4 pl-8 text-slate-500 dark:text-slate-400 hidden lg:block"
                                >
                                    کڕێن
                                </td>
                                <td data-label="کڕێن">

                                    $ {{formatPrice(total_contract[0]?.usd_purchases_contract)}} || IQD: {{ formatPrice(total_contract[0]?.iqd_purchases_contract) }}

                                </td>
                            </tr>
                    
                            <tr>
                                <td
                                    class="p-4 pl-8 text-slate-500 dark:text-slate-400 hidden lg:block"
                                >
                                فرۆشتن

                            </td>
                                <td data-label="فرۆشتن">

                                    $ {{formatPrice(total_contract[0]?.usd_sales_contract?total_contract[0].usd_sales_contract:0)}} || IQD: {{ formatPrice(total_contract[0]?.iqd_sales_contract?total_contract[0].iqd_sales_contract:0) }}


                                </td>
                            </tr>
                            <tr>
                                <td
                                    class="p-4 pl-8 text-slate-500 dark:text-slate-400 hidden lg:block"
                                >
                                بالانس

                            </td>
                                <td data-label="فرۆشتن">

                                    $ {{formatPrice( ( Number(transaction_payments.usd_received_sales_amount)-Number(transaction_payments.usd_paid_purchase_amount))-(Number(total_contract[0]?.usd_sales_contract)-Number(total_contract[0]?.usd_purchases_contract)) )}} || IQD: {{ formatPrice( ( Number(transaction_payments.iqd_received_sales_amount)-Number(transaction_payments.iqd_paid_purchase_amount))-(Number(total_contract[0]?.iqd_sales_contract)-Number(total_contract[0]?.iqd_purchases_contract)) ) }}

                                   
                                </td>
                            </tr>
                  
                     
                    
                       
                       
                        </tbody>
                    </table>

               
                 
             
                </CardBox>
            
            <div class="flex m-12 justify-center">
                <div class="w-96 text-center bg-rose-600">
                    پارەدان و وەرگرتن
                </div>
            </div>

            <CardBox class="mb-6" has-table>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <Sort
                                    label="وەرگیراوە - دۆلار"
                                    attribute="وەرگیراوە - دۆلار"
                                />
                            </th>
                            <th>
                                <Sort
                                    label="دراوە - دۆلار"
                                    attribute="دراوە - دۆلار"
                                />
                            </th>
                            <th>
                                <Sort
                                    label=" وەرگیراوە - دینار"
                                    attribute="دراوە - دینار"
                                />
                            </th>
                            <th>
                                <Sort
                                    label=" دراوە - دینار"
                                    attribute="دراوە - دینار"
                                />
                            </th>
                            <th>
                                <Sort label="بەروار " attribute="بەروار" />
                            </th>

                            <th v-if="can.edit || can.delete">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                            v-for="statement in statement.data"
                            :key="statement.id"
                        >
                            <td data-label="وەرگیراوە دۆلار">
                                {{
                                    formatPrice(
                                        statement.usd_received_sales_amount
                                    )
                                }}
                            </td>

                            <td data-label="دراوە دۆلار">
                                {{
                                    formatPrice(
                                        statement.usd_paid_purchase_amount
                                    )
                                }}
                            </td>

                            <td data-label="وەرگیراوە دینار ">
                                {{
                                    formatPrice(
                                        statement.iqd_received_sales_amount
                                    )
                                }}
                            </td>
                            <td data-label="دراوە دینار ">
                                {{
                                    formatPrice(
                                        statement.iqd__paid_purchase_amount
                                    )
                                }}
                            </td>
                            <td data-label="بەروار">
                                {{ statement.date }}
                            </td>

                            <td
                                v-if="can.edit || can.delete"
                                class="before:hidden lg:w-1 whitespace-nowrap"
                            >
                                <BaseButtons
                                    type="justify-start lg:justify-end"
                                    no-wrap
                                >
                                    <BaseButton
                                        v-if="can.edit"
                                        :route-name="
                                            route(
                                                'companies.edit',
                                                statement.id
                                            )
                                        "
                                        color="info"
                                        :icon="mdiSquareEditOutline"
                                        small
                                    />
                                    <BaseButton
                                        v-if="can.delete"
                                        color="danger"
                                        :icon="mdiTrashCan"
                                        small
                                        @click="destroy(statement.id)"
                                    />
                                </BaseButtons>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="py-4">
                    <Pagination :data="statement" />
                </div>
            </CardBox>

            <div class="flex m-12 justify-center">
                <div class="w-96 text-center bg-rose-600">گرێبەستەکان</div>
            </div>

            <CardBox class="mb-6" has-table>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <Sort label="ژمارە" attribute="ژمارە" />
                            </th>
                            <th>
                                <Sort label="بەروار" attribute="بەروار" />
                            </th>
                            <th>
                                <Sort
                                    label="بڕی هاتوو"
                                    attribute="بڕێ هاتوو "
                                />
                            </th>
                            <th>
                                <Sort label="نرخ " attribute="نرخ" />
                            </th>
                            <th>
                                <Sort label="کۆی گشتی" attribute="کۆی گشتی" />
                            </th>
                            <th>
                                <Sort label="جۆر" attribute="جۆر" />
                            </th>
                            <th>
                                <Sort label="دراو" attribute="دراو" />
                            </th>

                            <th v-if="can.edit || can.delete">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                            v-for="contract in contract.data"
                            :key="contract.id"
                        >
                            <td data-label="ژمارە">
                                <Link
                                    :href="route('companies.show', contract.id)"
                                    class="no-underline hover:underline text-cyan-600 dark:text-cyan-400"
                                >
                                    {{ contract.c_invoice_id }}
                                </Link>
                            </td>
                            <td data-label="بەروار">
                                {{ contract.date }}
                            </td>

                            <td data-label="بڕی هاتوو">
                                {{
                                    formatPrice(contract.total_weighted_amount)
                                }}
                            </td>

                            <td data-label=" نرخ ">
                                {{ formatPrice(contract.price) }}
                            </td>
                            <td data-label=" کۆی گشتی ">
                                {{
                                    formatPrice(
                                        Number(contract.price) *
                                            Number(
                                                contract.total_weighted_amount
                                            )
                                    )
                                }}
                            </td>
                            <td
                                data-label="جۆر"
                                v-if="contract.contract_type_id == 1"
                            >
                                کڕێن
                            </td>
                            <td
                                data-label="جۆر"
                                v-else-if="contract.contract_type_id == 2"
                            >
                                فرۆشتن
                            </td>
                            <td
                                data-label="جۆر"
                                v-else-if="contract.contract_type_id == 3"
                            >
                                خارجی کڕێن
                            </td>
                            <td
                                data-label="جۆر"
                                v-else-if="contract.contract_type_id == 4"
                            >
                                خارجی فرۆشتن
                            </td>
                            <td
                                data-label="دراو"
                                v-if="contract.currency_id == 1"
                            >
                                دۆلار
                            </td>
                            <td
                                data-label="جۆر"
                                v-else-if="contract.currency_id == 2"
                            >
                                دینار
                            </td>
                            <td
                                v-if="can.edit || can.delete"
                                class="before:hidden lg:w-1 whitespace-nowrap"
                            >
                                <BaseButtons
                                    type="justify-start lg:justify-end"
                                    no-wrap
                                >
                                    <BaseButton
                                        v-if="can.edit"
                                        :route-name="
                                            route('companies.edit', contract.id)
                                        "
                                        color="info"
                                        :icon="mdiSquareEditOutline"
                                        small
                                    />
                                    <BaseButton
                                        v-if="can.delete"
                                        color="danger"
                                        :icon="mdiTrashCan"
                                        small
                                        @click="destroy(contract.id)"
                                    />
                                </BaseButtons>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="py-4">
                    <Pagination :data="contract" />
                </div>
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>
