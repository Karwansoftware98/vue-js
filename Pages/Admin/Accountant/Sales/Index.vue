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
import { computed, ref } from "vue";

const props = defineProps({
    Contracts: {
        type: Object,
        default: () => ({}),
    },
    contract_type: {
        type: String,
    },
    type: {
        type: Number,
    },
    Company: {
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
    total_dollar:Number,
    total_dinar:Number,
    total_contracts:Number,
});
const form = useForm({
    search: props.filters.search,
});
function formatPrice(value) {
    let val = (value / 1).toFixed(2).replace(",", ".");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const formDelete = useForm({});

function destroy(id) {
    if (confirm("Are you sure you want to delete?")) {
        formDelete.delete(route("salescontract.destroy", id));
    }
}
var bottomLoad = ref(false);
let showBottom = () => {
    bottomLoad.value = !bottomLoad.value;
};
let status =(status) => {
    if(status == true){
        return "Approved"
    }
    if(status == false){
        return "Draft"
    }
};

let remainHeader = computed(() => {
    if (props.type == 1 || props.type == 4) {
        return 'بڕی هاتوو'
    }
    if (props.type == 2 || props.type == 3 || props.type == 5) {
        return 'بڕی ڕۆیشتوو'
    }
});
let loadHeader = computed(() => {
    if (props.type == 1 || props.type == 4) {
        return 'باری هاتوو'
    }
    if (props.type == 2 || props.type == 3 || props.type == 5) {
        return 'باری ڕۆیشتوو'
    }
});

</script>

<template>
    <LayoutAuthenticated>
        <Head :title="props.contract_type" />
        <SectionMain>
            <SectionTitleLineWithButton
                :icon="mdiAccountKey"
                :title="props.contract_type"
                main
                class="flex flex-row"
            >
                <BaseButton
                    v-if="can.create"
                    :route-name="route('contract.create', props.type)"
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
            <NotificationBar
                v-if="$page.props.flash.danger"
                color="danger"
                :icon="mdiAlertBoxOutline"
            >
                {{ $page.props.flash.danger }}
            </NotificationBar>
            <CardBox class="mb-6" has-table>
                <form
                    @submit.prevent="
                        form.get(route('contract.index', props.type))
                    "
                >
                    <div class="p-2">
                        <div class="flex justify-between space-x-2">
                            <input
                                type="search"
                                v-model="form.search"
                                class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 grow text-gray-600"
                                placeholder="Search"
                            />
                            <BaseButton
                                label="Search"
                                type="submit"
                                color="info"
                                class="inline-flex items-center px-2 py-2"
                            />
                        </div>
                    </div>
                </form>
            </CardBox>
            <p class="mb-2">
                Total Contracts :
                <span class="text-green-400">
                    {{ total_contracts }}
                </span>
            </p>
            <CardBox class="mb-6" has-table>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <Sort label="ناوی کۆمپانیا" attribute="company_id" />
                            </th>
                            <th>
                                <Sort label="کالا" attribute="product_id" />
                            </th>
                            <th>
                                <Sort
                                    label="بڕی گرێبەست"
                                    attribute="weight_amount"
                                />
                            </th>
                            <th>
                                <Sort :label="remainHeader" attribute="total_weighted_amount" />
                            </th>
                            <th>
                                بڕی ماوە
                            </th>
                            <th>
                                <Sort label="ژ.بار " attribute="truck_qty" />
                            </th>
                            <th>
                                <Sort :label="loadHeader" attribute="weighted_truck_qty"/>
                            </th>
                            <th>
                                <Sort label="جۆری یەکە" attribute="to_unit_id" />
                            </th>
                            <th>
                                <Sort label="چۆنیەتی" attribute="status" />
                            </th>
                            <th>
                                <Sort label=" نرخ" attribute="price" />
                            </th>

                            <th>
                                <Sort label="جۆری دراو" attribute="currency_id" />
                            </th>
                            <th>
                                <Sort label=" کۆی گشتی" attribute="total" />
                            </th>
                            <th v-if="can.edit || can.delete">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                            v-for="contract in Contracts.data"
                            :key="contract.id"
                        >
                            <td data-label="ناوی کۆمپانیا">
                                <Link
                                    :href="
                                        route(
                                            'salescontract.show',
                                            contract.id
                                        )
                                    "
                                    class="no-underline hover:underline text-cyan-600 dark:text-cyan-400"
                                >
                                    {{ contract.company.name }}
                                </Link>
                            </td>

                            <td data-label="بڕ ">
                                {{ contract.product.name }}
                            </td>
                            <td data-label="بڕ ">
                                {{ formatPrice(contract.weight_amount) }}
                            </td>
                            <td data-label="بڕی هاتوو">
                                {{
                                    formatPrice(contract.total_weighted_amount)
                                }}
                            </td>
                            <td data-label="بڕی ماوە">
                                {{
                                    formatPrice(contract.weight_amount-contract.total_weighted_amount)
                                }}
                            </td>
                            <td data-label="ژماری بار ">
                                {{ contract.truck_qty }}
                            </td>
                            <td data-label="باری هاتوو">
                                {{ contract.weighted_truck_qty }}
                            </td>
                            <td data-label="ژماری بار ">
                                {{ contract.unit.name }}
                            </td>
                            <td data-label="ژماری بار ">
                                {{ status(contract.status)  }}
                            </td>

                            <td data-label="نرخ">
                                {{ contract.price }}
                            </td>

                            <td data-label="جۆری دراو">
                                {{ contract.currency.name }}
                            </td>
                            <td data-label="کۆی گشتی">
                                {{ formatPrice(contract.total) }}
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
                                            route('contract.edit', [
                                                contract.id,
                                                props.type,
                                            ])
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
                    <Pagination :data="Contracts" />
                </div>
            </CardBox>
            <nav
            :class="[{ 'hidden ': !bottomLoad }]"
            class="bottom-0 left-0 right-0 fixed bg-gray-200 h-14 z-30 transition-position w-auto dark:bg-gray-800"
        >
            <div class="flex flex-row justify-end p-4">
                <!-- <div class="flex flex-row space-x-1">
                    <BaseIcon
                        class="fix top-0 left-0 text-red-500 hover:cursor-pointer"
                        :path="mdiClose"
                        @click="showBottom"
                    />

                    <BaseButtons>
                        <BaseButton
                            label="Contracts"
                            id="contract"
                            :icon="mdiEye"
                            small
                            @click="
                                isModalContractActive = true;
                                purchase();
                            "
                        />
                    </BaseButtons>
                    <BaseButtons>
                        <BaseButton
                            @click="isModalStatusActive = true"
                            label="change status"
                            color="info"
                            small
                        />
                    </BaseButtons>
                    <BaseButtons>
                        <BaseButton
                            label="Delete"
                            id="contract"
                            :icon="mdiEye"
                            color="danger"
                            small
                            @click="
                                isModalContractActive = true;
                                purchase();
                            "
                        />
                    </BaseButtons>
                </div> -->
                <div class="flex flex-row  justify-end space-x-2 right-0">
                    <p>
                        Total Dollar:
                        <span class="text-green-500">
                            {{ formatPrice(props.total_dollar) }}
                        </span>
                    </p>
                    <p>
                        Total Dinar:
                        <span class="text-green-500">
                            {{ formatPrice( props.total_dinar) }}
                        </span>
                    </p>

                </div>
            </div>
        </nav>
        <div class="left-1 bottom-1 fixed z-50">
            <BaseButtons>
                <BaseButton
                    v-show="!bottomLoad"
                    @click="showBottom"
                    label="show bottom"
                    color="success"
                    :icon="mdiMenu"
                    small
                />
            </BaseButtons>
        </div>
        </SectionMain>
    </LayoutAuthenticated>
</template>
