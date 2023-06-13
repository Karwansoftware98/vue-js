<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3";
import {
    mdiAccountKey,
    mdiPlus,
    mdiSquareEditOutline,
    mdiTrashCan,
    mdiAlertBoxOutline,
} from "@mdi/js";
import LayoutAuthenticated from "@/Layouts/LayoutAuthenticated.vue";
import SectionMain from "@/Components/SectionMain.vue";
import SectionTitleLineWithButton from "@/Components/SectionTitleLineWithButton.vue";
import BaseButton from "@/Components/BaseButton.vue";
import CardBox from "@/Components/CardBox.vue";
import BaseButtons from "@/Components/BaseButtons.vue";
import NotificationBar from "@/Components/NotificationBar.vue";
import Pagination from "@/Components/Admin/Pagination.vue";
import Sort from "@/Components/Admin/Sort.vue";

const props = defineProps({
    out_production: {
        type: Object,
        default: () => ({}),
    },
    product_precentage: {
        type: Object,
        default: () => ({}),
    },
    in_production: {
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
});

const form = useForm({
    search: props.filters.search,
});
function formatPrice(value) {
    let val = (value / 1).toFixed(2).replace(".", ".");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const formDelete = useForm({});

function destroy(id) {
    if (confirm("Are you sure you want to delete?")) {
        formDelete.delete(route("stockelement.destroy", id));
    }
}

console.log(props.in_production);
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

            <div
                class="block lg:flex lg:flex-row lg:space-x-2 border rounded-md p-6 mt-2 mb-4 border-indigo-900"
            >
                <!-- Driver start -->
                <div
                    v-for="product in props.product_precentage"
                    class="flex flex-col p-6 space-y-2 grow"
                >
                    <div class="flex flex-col grow">
                        <p for="truck_number">
                            product name:
                            <span class="text-green-400">
                                {{ product["name"] }}
                            </span>
                        </p>
                    </div>
                    <div class="flex flex-col grow">
                        <p for="truck_number">
                            total sales:
                            <span class="text-green-400">
                                {{ formatPrice(product["total_weight"]) }}
                            </span>
                        </p>
                    </div>
                    <div class="flex flex-col grow">
                        <p for="truck_number">
                            production ratio:
                            <span class="text-green-400">
                                {{
                                    ( Number(product["total_weight"]) * 100) /Number(props.in_production)
                                   
                                }} %
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <CardBox class="mb-6" has-table>
                <form @submit.prevent="form.get(route('stockelement.index'))">
                    <div class="py-2 flex">
                        <div class="flex pl-4">
                            <input
                                type="search"
                                v-model="form.search"
                                class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                                <Sort label="پرۆتۆکۆل" attribute="name" />
                            </th>
                            <th>
                                <Sort label="بەروار" attribute="stock" />
                            </th>

                            <th>
                                <Sort label="شۆفێر" attribute="start_balance" />
                            </th>

                            <th>
                                <Sort
                                    label="ژ.شۆفێر"
                                    attribute="start_balance"
                                />
                            </th>

                            <th>
                                <Sort label="کڕیار" attribute="factory_price" />
                            </th>
                            <th>
                                <Sort label="لتر" attribute="sales_balance" />
                            </th>
                            <th>
                                <Sort
                                    label="کێشێ 1"
                                    attribute="sales_balance"
                                />
                            </th>
                            <th>
                                <Sort
                                    label="کێشێ 2"
                                    attribute="purchase_balance"
                                />
                            </th>

                            <th v-if="can.edit || can.delete">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                            v-for="production in out_production.data"
                            :key="production.id"
                        >
                            <td data-label="پرۆتۆکۆل">
                                <Link
                                    :href="
                                        route(
                                            'stockelement.show',
                                            production.id
                                        )
                                    "
                                    class="no-underline hover:underline text-cyan-600 dark:text-cyan-400"
                                >
                                    {{ production.l_invoice_id }}
                                </Link>
                            </td>

                            <td data-label="بەروار">
                                {{ production.date }}
                            </td>
                            <td data-label="شوفێر">
                                {{ production.driver_name }}
                            </td>

                            <td data-label="ژ.شۆفێر">
                                {{ production.truck_number }}
                            </td>

                            <td data-label="کڕیار">
                                {{ production.company_name }}
                            </td>
                            <td data-label="لتر">
                                {{ production.liter }}
                            </td>
                            <td data-label="کێشی1">
                                {{ production.first_weight }}
                            </td>
                            <td data-label="کێشی2">
                                {{ production.second_weight }}
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
                                                'stockelement.edit',
                                                production
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
                                        @click="destroy(production.id)"
                                    />
                                </BaseButtons>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="py-4">
                    <Pagination :data="out_production" />
                </div>
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>
