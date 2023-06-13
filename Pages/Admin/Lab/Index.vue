<script setup>
import { Head, Link, router, useForm } from "@inertiajs/vue3";
import {
    mdiAccountKey,
    mdiPlus,
    mdiSquareEditOutline,
    mdiTrashCan,
    mdiAlertBoxOutline,
    mdiForwardburger,
    mdiBackburger,
    mdiClose,
    mdiDotsVertical,
    mdiMenu,
    mdiClockOutline,
    mdiCloud,
    mdiCrop,
    mdiAccount,
    mdiCogOutline,
    mdiEmail,
    mdiLogout,
    mdiThemeLightDark,
    mdiRefresh,
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
import { usePage } from "@inertiajs/vue3";
import { computed, onMounted, ref } from "vue";
import { useMainStore } from "@/Stores/main.js";
import { useStyleStore } from "@/Stores/style.js";
import { useLayoutStore } from "@/Stores/layout.js";
import NavBarItem from "@/Components/NavBarItem.vue";
import NavBarItemLabel from "@/Components/NavBarItemLabel.vue";
import NavBarMenuLoad from "@/Components/NavBarMenuLoad.vue";
import BaseDivider from "@/Components/BaseDivider.vue";
import UserAvatarCurrentUser from "@/Components/UserAvatarCurrentUser.vue";
import BaseIcon from "@/Components/BaseIcon.vue";
import NavBarSearch from "@/Components/NavBarSearch.vue";
import AsideFilter from "@/Components/AsideFilter.vue";
import CardBoxWidget from "@/Components/CardBoxWidget.vue";
import VueMultiselect from "vue-multiselect";
import FormField from "@/Components/FormField.vue";
import FormControl from "@/Components/FormControl.vue";
import FormCheckRadioGroup from "@/Components/FormCheckRadioGroup.vue";
import { reactive } from "@vue/reactivity";
import { throttle } from "lodash/throttle";
import { watch } from "vue";
import SaleContractDynamicForm from "@/Components/SaleContractDynamicForm.vue";
import { useInfiniteScroll } from "@/Composables/useInfiniteScroll";
const mainStore = useMainStore();
const layoutStore = useLayoutStore();
const isMenuNavBarActive = ref(false);
const menuNavBarToggle = () => {
    isMenuNavBarActive.value = !isMenuNavBarActive.value;
};
const rightFilter = () => {
    layoutStore.isRightFilter = true;
};
const closeRightFilter = () => {
    layoutStore.isRightFilter = false;
};
const styleStore = useStyleStore();
const props = defineProps({
    labs: {
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
    companies: {
        type: Object,
        default: () => ({}),
    },
    Contract_types: {
        type: Object,
        default: () => ({}),
    },
    drivers: {
        type: Object,
        default: () => ({}),
    },
    products: {
        type: Object,
        default: () => ({}),
    },
    destinations: {
        type: Object,
        default: () => ({}),
    },
    first_date: String,
    second_date: String,
    first_time: String,
    second_time: String,
});

const form = useForm({
    search: props.filters.search,
    driver: props.filters.driver,
    first_date: props.first_date,
    second_date: props.second_date,
    first_time: props.first_time,
    second_time: props.second_time,
    company_id: props.filters.company_id,
    Contract_types: props.filters.Contract_types,
    first_number: props.filters.first_number,
    second_number: props.filters.second_number,
    product: props.filters.product,
    first_destination: props.filters.first_destination,
    second_destination: props.filters.second_destination,
});

function formatPrice(value) {
    let val = (value / 1).toFixed(2).replace(".", ",");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
const formDelete = useForm({});
const number = ref(false);
const date = ref(true);
const type = ref(true);
const driver = ref(true);
const company = ref(true);
const first_weight = ref(true);
const second_weight = ref(true);
const first_dest = ref(true);
const second_dest = ref(true);
const truck_num = ref(true);
const diff = ref(true);
const isCorrect = ref(true);
let refresh = () => {
    router.reload();
};

let submit = () => {
    form.get("admin/labs", {});
};
function customLabel({ name, truck_number }) {
    return `${name}   ${truck_number}`;
}

let difference = (lab) => {
    if (
        lab.truck_list.second_weight == null ||
        lab.truck_list.second_weight - lab.truck_list.first_weight == null
    ) {
        return "";
    }
    return lab.truck_list.second_weight - lab.truck_list.first_weight;
};
let correctDestination = (lab) => {
    // console.log(lab.second_destination.name);
    if (lab.lab_destination["name"] == lab.second_destination.name) {
        return true;
    }
    return false;
};

const hasMatchingDestination = (lab) => {
    return lab.truck_list.stock_transfers.some(item => {
      console.log(item.destination_id);

   return item.destination_id === lab.lab_destination["id"]

});
};
const landmark = ref(null);

const { items, reset, canLoadMoreItems } = useInfiniteScroll("labs", landmark);
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<template>
    <LayoutAuthenticated>
        <Head title="Lab" />
        <SectionMain>
            <div class="flex justify-center">
                <BaseButtons type="justify-start lg:justify-end" no-wrap>
                    <BaseButton
                        :route-name="route('lab.index')"
                        color="info"
                        :icon="mdiRefresh"
                        small
                    />
                </BaseButtons>
            </div>
            <SectionTitleLineWithButton
                :icon="mdiAccountKey"
                title="Lab"
                main
                class="space-x-3"
            >
                <CardBox class="flex-initial grow" has-table>
                    <form @submit.prevent="form.get(route('labs.index'))">
                        <div class="py-2">
                            <div class="flex justify-start">
                                <input
                                    type="search"
                                    v-model="form.search"
                                    class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:text-black lg:mr-2 lg:ml-2 mr-2 ml-2 grow"
                                    placeholder="Search"
                                />
                            </div>
                        </div>
                    </form>
                </CardBox>
                <div class="flex justify-between md:space-x-2">
                    <img
                        src="../../../../css/images/excel.png"
                        alt=""
                        class="w-10 h-10"
                    />
                    <NavBarItem
                        type="flex"
                        @click.prevent="rightFilter"
                        v-show="!layoutStore.isRightFilter"
                        class="w-10"
                    >
                        <BaseIcon :path="mdiMenu" size="24" />
                    </NavBarItem>
                </div>

                <Teleport to="body">
                    <AsideFilter>
                        <div
                            :class="styleStore.asideBrandStyle"
                            class="flex flex-col p-2 space-y-4 bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100 rounded-md z-10"
                        >
                            <div
                                class="flex flex-row justify-between mx-2 mt-2"
                            >
                                <button
                                    class="inline-block"
                                    @click="closeRightFilter"
                                >
                                    <BaseIcon :path="mdiClose" />
                                </button>
                                <div>
                                    <b>filters</b>
                                </div>
                            </div>
                        </div>
                        <form @submit.prevent="form.get(route('lab.index'))">
                            <div
                                class="flex flex-row justify-between ml-2 mr-2"
                            >
                                <button
                                    class="bg-green-400 rounded-md px-2 py-1"
                                    type="submit"
                                >
                                    show
                                </button>
                                <button class="bg-red-400 rounded-md py-1 px-1">
                                    clear filters
                                </button>
                            </div>
                            <div
                                :class="
                                    styleStore.darkMode
                                        ? 'aside-scrollbars-[slate]'
                                        : styleStore.asideScrollbarsStyle
                                "
                                class="flex-1 overflow-y-auto overflow-x-auto space-y-3 mb-6 h-screen"
                            >
                                <input
                                    type="date"
                                    class="rounded-md text-left mt-3 text-black w-full"
                                    placeholder="بەرواری سەرەتا"
                                    v-model="form.first_date"
                                />
                                <input
                                    type="date"
                                    class="rounded-md text-left mt-3 text-black w-full"
                                    placeholder="بەرواری سەرەتا"
                                    v-model="form.second_date"
                                />
                                <VueMultiselect
                                    v-model="form.company_id"
                                    :options="props.companies"
                                    placeholder="select company"
                                    label="name"
                                    track-by="id"
                                    :option-height="104"
                                    class="text-black"
                                >
                                </VueMultiselect>
                                <VueMultiselect
                                    v-model="form.Contract_types"
                                    :options="props.Contract_types"
                                    placeholder="select type"
                                    label="name"
                                    track-by="id"
                                    :option-height="104"
                                    class="text-black"
                                >
                                    >
                                </VueMultiselect>
                                <VueMultiselect
                                    v-model="form.product"
                                    :options="props.products"
                                    placeholder="select product"
                                    label="name"
                                    track-by="id"
                                    :option-height="104"
                                    class="text-black"
                                >
                                    >
                                </VueMultiselect>
                                <VueMultiselect
                                    v-model="form.first_destination"
                                    :options="props.destinations"
                                    placeholder="first destination"
                                    label="name"
                                    track-by="id"
                                    class="text-black"
                                    :option-limit="10"
                                    :multiple="true"
                                >
                                    >
                                </VueMultiselect>
                                <VueMultiselect
                                    v-model="form.second_destination"
                                    :options="props.destinations"
                                    placeholder="second destination"
                                    label="name"
                                    track-by="id"
                                    class="text-black"
                                    :option-limit="10"
                                >
                                    >
                                </VueMultiselect>
                                <VueMultiselect
                                    v-model="form.driver"
                                    :options="props.drivers"
                                    placeholder="select driver"
                                    label="name"
                                    track-by="id"
                                    :option-height="104"
                                    :custom-label="customLabel"
                                    :show-labels="false"
                                    class="text-black"
                                >
                                    >
                                    <template
                                        slot="singleLabel"
                                        slot-scope="props"
                                        ><img
                                            class="option__image"
                                            :src="props.company.img"
                                            alt="No Man’s Sky"
                                        /><span class="option__desc"
                                            ><span class="option__title">{{
                                                props.company.title
                                            }}</span></span
                                        ></template
                                    >
                                    <template slot="company" slot-scope="props">
                                        <div class="option__desc">
                                            <span class="option__title">{{
                                                props.company.name
                                            }}</span
                                            ><span class="option__small">{{
                                                props.company.id
                                            }}</span>
                                        </div>
                                    </template>
                                </VueMultiselect>
                                <input
                                    type="number"
                                    class="rounded-md text-left mt-3 text-black w-full"
                                    placeholder="from"
                                    v-model="form.first_number"
                                />
                                <input
                                    type="number"
                                    class="rounded-md text-left mt-3 text-black w-full"
                                    placeholder="to"
                                    v-model="form.second_number"
                                />
                                <input
                                    type="time"
                                    class="rounded-md text-left mt-3 text-black w-full"
                                    placeholder="from time"
                                    v-model="form.first_time"
                                />
                                <input
                                    type="time"
                                    class="rounded-md text-left mt-3 text-black w-full"
                                    placeholder="to time"
                                    v-model="form.second_time"
                                />
                            </div>
                        </form>
                    </AsideFilter>
                </Teleport>
            </SectionTitleLineWithButton>
            <NotificationBar
                v-if="$page.props.flash.message"
                color="success"
                :icon="mdiAlertBoxOutline"
            >
                {{ $page.props.flash.message }}
            </NotificationBar>
            <div class="flex justify-start items-center rtl:mr-3">
                <NavBarMenuLoad class="w-48">
                    <NavBarItemLabel :icon="mdiMenu" label="Show/Hide" />

                    <template #dropdown>
                        <NavBarItem>
                            <div class="flex flex-row justify-between">
                                <label for="status">Number</label>
                                <input
                                    id="status"
                                    type="checkbox"
                                    class="toggle-checkbox w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                                    v-model="number"
                                    value="false"
                                />
                            </div>
                        </NavBarItem>
                        <NavBarItem>
                            <div class="flex flex-row items-center space-x-2">
                                <label for="status">date</label>
                                <input
                                    id="status"
                                    type="checkbox"
                                    class="toggle-checkbox block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                                    v-model="date"
                                    value="false"
                                />
                            </div>
                        </NavBarItem>
                        <NavBarItem>
                            <div class="flex flex-row items-center space-x-2">
                                <label for="status">type</label>
                                <input
                                    id="status"
                                    type="checkbox"
                                    class="toggle-checkbox block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                                    v-model="type"
                                    value="false"
                                />
                            </div>
                        </NavBarItem>
                        <NavBarItem>
                            <div class="flex flex-row items-center space-x-2">
                                <label for="status">driver</label>
                                <input
                                    id="status"
                                    type="checkbox"
                                    class="toggle-checkbox block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                                    v-model="driver"
                                    value="false"
                                />
                            </div>
                        </NavBarItem>
                        <NavBarItem>
                            <div class="flex flex-row items-center space-x-2">
                                <label for="status">company</label>
                                <input
                                    id="status"
                                    type="checkbox"
                                    class="toggle-checkbox block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                                    v-model="company"
                                    value="false"
                                />
                            </div>
                        </NavBarItem>
                        <NavBarItem>
                            <div class="flex flex-row items-center space-x-2">
                                <label for="status">truck number</label>
                                <input
                                    id="status"
                                    type="checkbox"
                                    class="toggle-checkbox block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                                    v-model="truck_num"
                                    value="false"
                                />
                            </div>
                        </NavBarItem>
                        <NavBarItem>
                            <div class="flex flex-row items-center space-x-2">
                                <label for="status">first destination</label>
                                <input
                                    id="status"
                                    type="checkbox"
                                    class="toggle-checkbox block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                                    v-model="first_dest"
                                    value="false"
                                />
                            </div>
                        </NavBarItem>
                        <NavBarItem>
                            <div class="flex flex-row items-center space-x-2">
                                <label for="status">second destination</label>
                                <input
                                    id="status"
                                    type="checkbox"
                                    class="toggle-checkbox block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                                    v-model="second_dest"
                                    value="false"
                                />
                            </div> </NavBarItem
                        ><NavBarItem>
                            <div class="flex flex-row items-center space-x-2">
                                <label for="status">dffrence</label>
                                <input
                                    id="status"
                                    type="checkbox"
                                    class="toggle-checkbox block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                                    v-model="diff"
                                    value="false"
                                />
                            </div>
                        </NavBarItem>
                    </template>
                </NavBarMenuLoad>
                <p class="">
                    Total Labs :
                    <span class="text-green-400">
                        {{ items.length }}
                    </span>
                </p>
            </div>
            <CardBox class="mb-6" has-table>
                <table class="border-separate text-sm">
                    <thead
                        class="sticky top-12 justify-around z-10 dark:bg-slate-900 bg-slate-400"
                    >
                        <tr>
                            <th v-if="number">
                                <Sort label="ژمارە" attribute="id" />
                            </th>
                            <th v-if="date">
                                <Sort label="بەروار" attribute="date" />
                            </th>
                            <th v-if="type">
                                <Sort label="جۆر" attribute="" />
                            </th>
                            <th>
                                <Sort label="ڕاپۆرت" attribute="name" />
                            </th>
                            <th v-if="company">
                                <Sort label="کۆمپانیا" attribute="company_id" />
                            </th>
                            <th>
                                <Sort label="کاڵا" attribute="name" />
                            </th>
                            <th v-if="driver">
                                <Sort label="ناوی شۆفێر" attribute="note" />
                            </th>
                            <th v-if="truck_num">
                                <Sort label="ژ.ئۆتۆمبێل" attribute="name" />
                            </th>
                            <th>
                                <Sort label="چۆنیەتی" attribute="note" />
                            </th>

                            <th v-if="second_dest">
                                <Sort label="بەتالکردن" attribute="note" />
                            </th>
                            <th v-if="first_weight">
                                <Sort label="کێشی سەرتا " attribute="name" />
                            </th>
                            <th v-if="second_weight">
                                <Sort label="کێشی کۆتایی" attribute="note" />
                            </th>

                            <th v-if="diff">
                                <Sort label="جیاوازی" attribute="difference" />
                            </th>
                            <th v-if="can.edit || can.delete">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="lab in items" :key="lab.id">
                             {{ lab.stock_transfer }}
                            <td data-label="ژمارە" v-if="number">
                                {{ lab.l_invoice_id }}y
                            </td>
                            <td data-label="بەروار" v-if="date">
                                {{ lab.date }}
                            </td>
                            <td data-label="جۆر" v-if="type">
                                {{ lab.contract_type.name }}
                            </td>
                            <td data-label="ڕاپۆرت">
                                {{ lab.contract.c_invoice_id }}
                            </td>
                            <td data-label="ناوی کۆمپانیا" v-if="company">
                                {{ lab.company.name }}
                            </td>
                            <td data-label="کاڵا">
                                {{ lab.product ? lab.product.name : "" }}
                            </td>
                            <td data-label="ناوی شۆفێر" v-if="driver">
                                {{ lab.driver ? lab.driver.name : "" }}
                            </td>
                            <td data-label="ژمارەی ئۆتۆمبێل" v-if="truck_num">
                                {{ lab.driver ? lab.driver.truck_number : 0 }}
                            </td>
                            <td data-label="چۆنیەتی">
                                {{ lab.status.name }}
                            </td>

                            <td
                                data-label="شوێنی کۆتایی"
                                v-if="second_dest"
                                :class="[
                                    hasMatchingDestination(lab) ? '' : 'bg-red-500',
                                ]"
                            >
                                {{ lab.lab_destination["name"] }}
                            </td>
                            <td data-label="کێشی سەرەتا" v-if="first_weight">
                                {{ lab.truck_list.first_weight }}
                            </td>
                            <td data-label="کێشی کۆتایی" v-if="second_weight">
                                {{ lab.truck_list.second_weight }}
                            </td>
                            <td
                                data-label="جیاوازی"
                                v-if="diff"
                                :class="
                                    difference(lab) > 0
                                        ? 'text-green-400'
                                        : 'text-red-400'
                                "
                            >
                                {{ difference(lab) }}
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
                                        :route-name="route('lab.edit', lab.id)"
                                        color="info"
                                        :icon="mdiSquareEditOutline"
                                        small
                                    />
                                </BaseButtons>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div
                    v-if="!canLoadMoreItems"
                    class="flex justify-center items-center absolute h-10 right-1 mt-1 w-64 text-black border p-3 rounded-lg bg-slate-400"
                >
                    <span>No More Loads Found!</span>
                </div>

                <div ref="landmark"></div>
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>
