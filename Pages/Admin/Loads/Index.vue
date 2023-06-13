<script setup>
import {
    Head,
    Link,
    router,
    useForm,
    usePage,
    useRemember,
} from "@inertiajs/vue3";
import {
    mdiAccountKey,
    mdiPlus,
    mdiSquareEditOutline,
    mdiTrashCan,
    mdiAlertBoxOutline,
    mdiClose,
    mdiMenu,
    mdiRefresh,
    mdiEye,
} from "@mdi/js";
import LayoutAuthenticated from "@/Layouts/LayoutAuthenticated.vue";
import SectionMain from "@/Components/SectionMain.vue";
import SectionTitleLineWithButton from "@/Components/SectionTitleLineWithButton.vue";
import CardBox from "@/Components/CardBox.vue";
import NotificationBar from "@/Components/NotificationBar.vue";
import Sort from "@/Components/Admin/Sort.vue";
import { computed, ref, watch } from "vue";
import { useMainStore } from "@/Stores/main.js";
import { useStyleStore } from "@/Stores/style.js";
import { useLayoutStore } from "@/Stores/layout.js";
import NavBarItem from "@/Components/NavBarItem.vue";
import NavBarItemLabel from "@/Components/NavBarItemLabel.vue";
import NavBarMenuLoad from "@/Components/NavBarMenuLoad.vue";
import BaseIcon from "@/Components/BaseIcon.vue";
import AsideFilter from "@/Components/AsideFilter.vue";
import VueMultiselect from "vue-multiselect";

import { reactive, unref } from "@vue/reactivity";
import BaseButton from "@/Components/BaseButton.vue";
import BaseButtons from "@/Components/BaseButtons.vue";
import LoadContractModal from "@/Components/LoadContractModal.vue";
import CustomModal from "@/Components/CustomModal.vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import CardBoxModal from "@/Components/CardBoxModal.vue";
import { useInfiniteScroll } from "@/Composables/useInfiniteScroll";

const mainStore = useMainStore();
const layoutStore = useLayoutStore();
const isMenuNavBarActive = ref(false);
const isModalContractActive = ref(false);
const isModalStatusActive = ref(false);
const isModalDateActive = ref(false);

const menuNavBarToggle = () => {
    isMenuNavBarActive.value = !isMenuNavBarActive.value;
};
const rightFilter = () => {
    layoutStore.isRightFilter = true;
};
const closeRightFilter = () => {
    layoutStore.isRightFilter = false;
};
let purchase = (event) => {
    formAll.internal = null;
    formAll.external_purchase = null;
    formAll.sale = null;
    formAll.external_sale = null;
};
let sale = (event) => {
    formAll.purchase = null;
    formAll.external_purchase = null;
    formAll.internal = null;
    formAll.external_sale = null;
};
let ext_pur = (event) => {
    formAll.purchase = null;
    formAll.internal = null;
    formAll.sale = null;
    formAll.external_sale = null;
};
let ext_sale = (event) => {
    formAll.purchase = null;
    formAll.external_purchase = null;
    formAll.sale = null;
    formAll.internal = null;
};
let internal = (event) => {
    formAll.purchase = null;
    formAll.external_purchase = null;
    formAll.sale = null;
    formAll.external_sale = null;
};
var bottomLoad = ref(false);
let showBottom = () => {
    bottomLoad.value = !bottomLoad.value;
};
const styleStore = useStyleStore();
const props = defineProps({
    status_all: {
        type: Object,
        default: () => ({}),
    },
    first_weight: Number,
    second_weight: Number,
    loads: {
        type: Object,
        default: () => ({}),
    },
    data: {
        type: Object,
        default: () => [],
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
    statuses: {
        type: Object,
        default: () => ({}),
    },
    first_date: String,
    second_date: String,
    first_time: String,
    second_time: String,
    all_loads: Number,
});

const form = useForm("form.filters", {
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
    status_id: props.filters.status_id,
});
const formAll = useForm({
    checkAll: Boolean,
    check: Array,
    status_all: "",
    purchase: "",
    external_purchase: "",
    sale: "",
    external_sale: "",
    internal: "",
});
function formatPrice(value) {
    let val = (value / 1).toFixed(2).replace(".", ",");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
const formDelete = useForm({});
const number = ref(true);
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
let submit = () => {
    form.get("admin/loads", {});
};

let difference = (load) => {
    if (load.second_weight == 0 || load.first_weight == 0) {
        return "";
    }
    if (load.contract_type.id === 1) {
        return load.second_weight - load.first_weight;
    }
    return load.first_weight - load.second_weight;
};


const isModalDangerActive = ref(false);
let submitContract = () => {
    router.post(`/admin/loads/changemulticontract`, {
        _method: "put",
        formAll,
        onSuccess: (isModalContractActive.value = false),
    });
};

let submitStatus = () => {
    router.post(`/admin/loads/changemultistatus`, {
        _method: "put",
        formAll,
    });
};

function customLabel({
    c_invoice_id,
    company,
    note,
    product,
    date,
    weighted_truck_qty,
    truck_qty,
}) {
    return `${c_invoice_id} || ${company.name} || ${note} || ${product.name} || ${date} || ${weighted_truck_qty} =>  ${truck_qty} `;
}
const exportUsers = () => {
    let filterString = encodeURIComponent(JSON.stringify(unref(form)));
    window.open(`/admin/trucklist/export/${filterString}`, "_blank");
};

let formResset = () => {
    form.get("admin/loads", {});
};

const landmark = ref(null);

let { items, reset, canLoadMoreItems } = useInfiniteScroll("loads", landmark);

const deleteRouteFromHistory = (routeToDelete) => {
    const { pathname } = window.location;
    if (pathname.includes(routeToDelete)) {
        const newRoute = "/admin/loads";
        window.history.replaceState({}, "", newRoute);
    }
};
function destroy(load) {
    if (confirm("Are you sure you want to delete?")) {
        form.delete(route("loads.destroy", load), {
            preserveScroll: true,
            onSuccess: () => {
                const value = () => usePage().props["loads"];
                router.visit(value().first_page_url, {
                    method: "get",
                    only: [props.filters, items],
                });
            },
        });
    }
}

let refresh = () => {
    form.get(route("loads.index"), {
        preserveScroll: true,
        onSuccess: () => {
            const value = () => usePage().props["loads"];
            router.visit(value().first_page_url, {
                method: "get",
                only: [props.filters, items],
            });
        },
    });
};

const selectAll = ref(false);
    const selectedItems = reactive([]);
    var allLoadsAvailable = ref(items);
    watch(selectAll, (newVal) => {
      if (newVal) {
        selectedItems.splice(0, selectedItems.length, ...allLoadsAvailable.value);
        formAll.check = selectedItems;
      } else {
        selectedItems.splice(0, selectedItems.length);
        formAll.check = selectedItems;

      }
    });

    const toggleSelectAll = () => {
      selectAll.value = !selectAll.value;
    };

    const isSelected = (item) => {
      return selectedItems.includes(item);
    };

    const toggleSelection = (item) => {
      if (isSelected(item)) {
        const index = selectedItems.indexOf(item);
        selectedItems.splice(index, 1);
        formAll.check = selectedItems;

      } else {
        selectedItems.push(item);
        formAll.check = selectedItems;

      }
    };

    const checkedAll = computed(() => {
            if(selectedItems.length === allLoadsAvailable.value.length && allLoadsAvailable.value.length !==0){
                selectAll.value = true
            }
        return selectedItems.length === allLoadsAvailable.value.length
    });

</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<template>
    <LayoutAuthenticated>
        <Head title="Loads" />
        <SectionMain>
            <div class="flex justify-center">
                <BaseButtons type="justify-start lg:justify-end" no-wrap>
                    <BaseButton
                        @click="refresh()"
                        color="info"
                        :icon="mdiRefresh"
                        small
                    />
                </BaseButtons>
            </div>
            <SectionTitleLineWithButton
                :icon="mdiAccountKey"
                title="Loads"
                main
                class="space-x-3"
            >
                <CardBox class="flex-initial grow" has-table>
                    <form @submit.prevent="form.get(route('loads.index'))">
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
                    <BaseButton
                        v-if="can.create"
                        :route-name="route('loads.create')"
                        :icon="mdiPlus"
                        label="Add"
                        color="info"
                        rounded-full
                        small
                    />

                    <img
                        v-if="can.edit"
                        src="../../../../css/images/excel.png"
                        alt=""
                        class="w-10 h-10"
                        @click="exportUsers"
                    />
                    <NavBarItem
                        v-if="can.edit"
                        type="flex"
                        @click.prevent="rightFilter"
                        v-show="!layoutStore.isRightFilter"
                        class="w-10"
                    >
                        <BaseIcon :path="mdiMenu" size="24" />
                    </NavBarItem>
                </div>

                <Teleport to="body">
                    <AsideFilter v-if="can.edit">
                        <form @submit.prevent="form.get(route('loads.index'))">
                            <div
                                :class="styleStore.asideBrandStyle"
                                class="flex flex-col sticky -top-4 p-2 pb-5 space-y-4 bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100 rounded-md z-10"
                            >
                                <div
                                    class="flex flex-row justify-between mx-2 mt-2"
                                >
                                    <button
                                        class="inline-block"
                                        @click="closeRightFilter"
                                        type="button"
                                    >
                                        <BaseIcon :path="mdiClose" />
                                    </button>
                                    <div>
                                        <b>filters</b>
                                    </div>
                                </div>

                                <div
                                    class="flex flex-row justify-between ml-2 mr-2"
                                >
                                    <button
                                        class="bg-green-400 rounded-md px-2 py-1"
                                        type="submit"
                                    >
                                        show
                                    </button>
                                    <button
                                        class="bg-red-400 rounded-md py-1 px-1"
                                        @click="formResset"
                                    >
                                        clear filters
                                    </button>
                                </div>
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
                                    v-model="form.status_id"
                                    :options="props.statuses"
                                    placeholder="select status"
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
                                    :multiple="false"
                                    :close-on-select="false"
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
                                <input
                                    type="text"
                                    class="rounded-md text-left mt-3 text-black w-full"
                                    placeholder="Truck No."
                                    v-model="form.driver"
                                />

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
            <div class="flex justify-start items-center rtl:mr-3 space-x-2">
                <NavBarMenuLoad class="w-48">
                    <NavBarItemLabel :icon="mdiMenu" label="Show/Hide" />

                    <template #dropdown>
                        <div class="space-y-3 p-3 rounded-md">
                            <div class="flex justify-between">
                                <label for="number" class=" ">Number </label>
                                <input
                                    id="number"
                                    type="checkbox"
                                    class="toggle-checkbox w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                                    v-model="number"
                                    value="false"
                                />
                            </div>
                            <div class="flex justify-between">
                                <label for="date" class=" ">Date </label>
                                <input
                                    id="date"
                                    type="checkbox"
                                    class="toggle-checkbox w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                                    v-model="date"
                                    value="false"
                                />
                            </div>
                            <div class="flex justify-between">
                                <label for="type" class=" ">Type</label>
                                <input
                                    id="type"
                                    type="checkbox"
                                    class="toggle-checkbox w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                                    v-model="type"
                                    value="false"
                                />
                            </div>
                            <div class="flex justify-between">
                                <label for="driver" class=" ">Driver </label>
                                <input
                                    id="driver"
                                    type="checkbox"
                                    class="toggle-checkbox w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                                    v-model="driver"
                                    value="false"
                                />
                            </div>
                            <div class="flex justify-between">
                                <label for="company" class=" ">Company </label>
                                <input
                                    id="company"
                                    type="checkbox"
                                    class="toggle-checkbox w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                                    v-model="company"
                                    value="false"
                                />
                            </div>
                            <div class="flex justify-between">
                                <label for="status" class=" ">Truck No. </label>
                                <input
                                    id="status"
                                    type="checkbox"
                                    class="toggle-checkbox w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                                    v-model="truck_num"
                                    value="false"
                                />
                            </div>
                            <div class="flex justify-between">
                                <label for="status" class=" "
                                    >First Destination
                                </label>
                                <input
                                    id="status"
                                    type="checkbox"
                                    class="toggle-checkbox w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                                    v-model="first_dest"
                                    value="false"
                                />
                            </div>
                            <div class="flex justify-between">
                                <label for="status" class=" "
                                    >Second Destination
                                </label>
                                <input
                                    id="status"
                                    type="checkbox"
                                    class="toggle-checkbox w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                                    v-model="second_dest"
                                    value="false"
                                />
                            </div>
                            <div class="flex justify-between">
                                <label for="status" class=" "
                                    >Difference
                                </label>
                                <input
                                    id="status"
                                    type="checkbox"
                                    class="toggle-checkbox w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                                    v-model="diff"
                                    value="false"
                                />
                            </div>
                        </div>
                    </template>
                </NavBarMenuLoad>
                <input
                    type="checkbox"
                    v-model="selectAll"
                    :checked="checkedAll"
                    class="hover:cursor-pointer toggle-checkbox w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                />
                <p class="">
                    Total Loads :
                    <span class="text-green-400">
                        {{ items.length }} of {{ all_loads }}
                    </span>
                </p>
            </div>
            <CardBox class="mb-6" has-table>
                <table class="border-separate text-sm rounded-lg">
                    <thead
                        class="sticky top-12 z-10 bg-gray-200 dark:bg-slate-800 dark:text-slate-100"
                    >
                        <tr class=" ">
                            <th class="p-0">
                                <th>

                                </th>
                                <th v-if="number">

                                    <Sort label="No." attribute="l_invoice_id" />
                                </th>
                            </th>
                            <th v-if="date">
                                <Sort label="Date" attribute="date" />
                            </th>
                            <th v-if="type">
                                <Sort
                                    label="Type"
                                    attribute="contract_type_id"
                                />
                            </th>
                            <th>
                                <Sort label="Report" attribute="contract_id" />
                            </th>
                            <th v-if="company">
                                <Sort label="Company" attribute="company_id" />
                            </th>
                            <th>
                                <Sort label="Product" attribute="" />
                            </th>
                            <th v-if="driver">
                                <Sort
                                    label="Driver Name"
                                    attribute="driver_id"
                                />
                            </th>
                            <th v-if="truck_num">
                                <Sort label="Truck No" attribute="driver_id" />
                            </th>
                            <th>
                                <Sort label="Status" attribute="status_id" />
                            </th>
                            <th v-if="first_dest">
                                <Sort
                                    label="F.Destination"
                                    attribute="first_destination"
                                />
                            </th>
                            <th v-if="second_dest">
                                <Sort
                                    label="S.Destination"
                                    attribute="second_destination"
                                />
                            </th>
                            <th v-if="first_weight">
                                <Sort
                                    label="F.Weight"
                                    attribute="first_weight"
                                />
                            </th>
                            <th v-if="second_weight">
                                <Sort
                                    label="S.Weight"
                                    attribute="second_weight"
                                />
                            </th>

                            <th v-if="diff">diff</th>
                            <th v-if="can.edit || can.delete">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        <tr
                            v-for="load in items"
                            :key="load.id"
                            @dblclick="log(load.id)"
                        >

                            <td data-label="ژمارە"  class="p-0">
                                <td>

                                    <input
                                        type="checkbox"
                                        :value="load.id"
                                        :checked="isSelected(load)"
                                        @change="toggleSelection(load)"
                                        class="hover:cursor-pointer toggle-checkbox w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                                    />
                                </td>
                                <td v-if="number">

                                    {{ load.l_invoice_id }}
                                </td>
                            </td>
                            <td data-label="بەروار" v-if="date">
                                {{ load.date }}
                            </td>
                            <td data-label="جۆر" v-if="type">
                                {{ load.contract_type.name }}
                            </td>
                            <td data-label="ڕاپۆرت">
                                {{ load.contract.c_invoice_id }}
                            </td>
                            <td data-label="ناوی کۆمپانیا" v-if="company">
                                {{ load.company.name }}
                            </td>
                            <td data-label="کاڵا">
                                {{ load.product ? load.product.name : "" }}
                            </td>
                            <td data-label="ناوی شۆفێر" v-if="driver">
                                {{ load.driver ? load.driver.name : "" }}
                            </td>
                            <td data-label="ژمارەی ئۆتۆمبێل" v-if="truck_num">
                                {{ load.driver ? load.driver.truck_number : 0 }}
                            </td>
                            <td data-label="چۆنیەتی">
                                {{ load.status.name }}
                            </td>
                            <td data-label="شوێنی سەرەتا" v-if="first_dest">
                                {{ load.first_destination.name }}
                            </td>
                            <td data-label="شوێنی کۆتایی" v-if="second_dest">
                                {{ load.second_destination.name }}
                            </td>
                            <td data-label="کێشی سەرەتا" v-if="first_weight">
                                {{ load.first_weight }}
                            </td>
                            <td data-label="کێشی کۆتایی" v-if="second_weight">
                                {{ load.second_weight }}
                            </td>
                            <td
                                data-label="جیاوازی"
                                v-if="diff"
                                :class="
                                    difference(load) >= 0
                                        ? 'text-green-400'
                                        : 'text-red-400'
                                "
                            >
                                {{ difference(load) }}
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
                                            route('loads.edit', load.id)
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
                                        @click="destroy(load.id)"
                                    />
                                </BaseButtons>
                                <Teleport to="body">
                                    <CardBoxModal
                                        v-model="isModalDangerActive"
                                        large-title="Please confirm"
                                    >
                                        <p>
                                            Are you sure you want to delete this
                                            load
                                        </p>

                                        <BaseButton
                                            label="Delete"
                                            color="danger"
                                            @click="destroy(load.id)"
                                        />
                                    </CardBoxModal>
                                </Teleport>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div
                    v-if="!canLoadMoreItems"
                    class="flex justify-center items-center absolute h-10 right-8 mt-3 w-64 text-black border p-3 rounded-lg bg-slate-400"
                >
                    <span>No More Loads Found!</span>
                </div>

                <div ref="landmark"></div>
            </CardBox>

            <nav
                :class="[{ 'hidden ': !bottomLoad }]"
                class="bottom-0 left-0 right-0 fixed bg-gray-200 h-14 z-30 transition-position w-auto dark:bg-gray-800"
            >
                <div class="flex flex-row justify-between p-4">
                    <div class="flex flex-row space-x-1">
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
                    </div>
                    <div class="flex flex-row justify-end space-x-2">
                        <p>
                            First Weight:
                            <span class="text-green-500">
                                {{ props.first_weight }}
                            </span>
                        </p>
                        <p>
                            Second weight:
                            <span class="text-green-500">
                                {{ props.second_weight }}
                            </span>
                        </p>
                        <p>
                            Difference:
                            <span class="text-green-500">
                                {{ props.first_weight - props.second_weight }}
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

            <Teleport to="body">
                <CustomModal
                    v-model="isModalStatusActive"
                    large-title="Please confirm"
                    button="success"
                >
                    <div class="w-full px-2 py-16 sm:px-0 text-white">
                        <VueMultiselect
                            id="s"
                            v-model="formAll.status_all"
                            :options="props.data.status_all"
                            track-by="id"
                            label="name"
                            :options-limit="6"
                            name="name"
                            class="shadow-md shadow-cyan-300/50"
                            placeholder="select status"
                        >
                        </VueMultiselect>
                        <BaseButtons>
                            <BaseButton
                                label="Contracts"
                                id="contract"
                                :icon="mdiEye"
                                small
                                @click="submitStatus"
                            />
                        </BaseButtons>
                    </div>
                </CustomModal>
            </Teleport>
            <Teleport to="body">
                <LoadContractModal
                    v-model="isModalContractActive"
                    large-title="Please confirm"
                    button="success"
                    has-cancel
                >
                    <div class="w-full px-2 py-16 sm:px-0">
                        <TabGroup>
                            <TabList
                                class="flex justify-between rounded-xl bg-blue-900/20 p-1"
                            >
                                <Tab v-slot="{ selected }" @click="purchase">
                                    <button
                                        id="ppp"
                                        :class="[
                                            'w-full rounded-lg py-2.5 px-2.5 text-sm font-medium leading-5 text-blue-700',
                                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                            selected
                                                ? 'bg-white shadow'
                                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                                        ]"
                                    >
                                        Purchase
                                    </button>
                                </Tab>
                                <Tab v-slot="{ selected }" @click="sale">
                                    <button
                                        id="sss"
                                        :class="[
                                            'w-full rounded-lg py-2.5 px-2.5 text-sm font-medium leading-5 text-blue-700',
                                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                            selected
                                                ? 'bg-white shadow'
                                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                                        ]"
                                    >
                                        Sale
                                    </button>
                                </Tab>
                                <Tab v-slot="{ selected }" @click="ext_pur">
                                    <button
                                        id="pp"
                                        :class="[
                                            'w-full rounded-lg py-2.5 px-2.5 text-sm font-medium leading-5 text-blue-700',
                                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                            selected
                                                ? 'bg-white shadow'
                                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                                        ]"
                                    >
                                        External Purchase
                                    </button>
                                </Tab>
                                <Tab v-slot="{ selected }" @click="ext_sale">
                                    <button
                                        id="ss"
                                        :class="[
                                            'w-full rounded-lg py-2.5 px-2.5 text-sm font-medium leading-5 text-blue-700',
                                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                            selected
                                                ? 'bg-white shadow'
                                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                                        ]"
                                    >
                                        External Sale
                                    </button>
                                </Tab>
                                <Tab v-slot="{ selected }" @click="internal">
                                    <button
                                        id="i"
                                        :class="[
                                            'w-full rounded-lg py-2.5 px-2.5 text-sm font-medium leading-5 text-blue-700',
                                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                            selected
                                                ? 'bg-white shadow'
                                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                                        ]"
                                    >
                                        Internal Sale
                                    </button>
                                </Tab>
                            </TabList>

                            <TabPanels class="mt-2">
                                <TabPanel
                                    :class="[
                                        'rounded-xl bg-white p-3',
                                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                    ]"
                                >
                                    <VueMultiselect
                                        v-model="formAll.purchase"
                                        :options="props.data.contracts"
                                        placeholder="Fav No Man’s Sky path"
                                        track-by="id"
                                        :option-height="104"
                                        :show-labels="false"
                                        class="text-black"
                                        :custom-label="customLabel"
                                    >
                                        >
                                    </VueMultiselect>
                                </TabPanel>
                                <TabPanel
                                    :class="[
                                        'rounded-xl bg-white p-3',
                                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                    ]"
                                >
                                    <VueMultiselect
                                        v-model="formAll.sale"
                                        :options="props.data.sale"
                                        placeholder="Fav No Man’s Sky path"
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
                                        >
                                            <span class="option__desc"
                                                ><span class="option__title">{{
                                                    props.company.name
                                                }}</span>
                                            </span>
                                            <span class="option__desc"
                                                ><span class="option__title">{{
                                                    props.company.note
                                                }}</span>
                                            </span>
                                        </template>
                                        <template
                                            slot="company"
                                            slot-scope="props"
                                        >
                                            <div
                                                class="option__desc flex justify-between"
                                            >
                                                <span class="option__title">{{
                                                    props.company.company_name
                                                }}</span
                                                ><span class="option__small">{{
                                                    props.company.invoice_id
                                                }}</span
                                                ><span class="option__small">{{
                                                    props.company.product_name
                                                }}</span>
                                            </div>
                                        </template>
                                    </VueMultiselect>
                                </TabPanel>
                                <TabPanel
                                    :class="[
                                        'rounded-xl bg-white p-3',
                                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                    ]"
                                >
                                    <VueMultiselect
                                        v-model="formAll.external_purchase"
                                        :options="props.data.ext_pur"
                                        placeholder="Fav No Man’s Sky path"
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
                                        >
                                            <span class="option__desc"
                                                ><span class="option__title">{{
                                                    props.company.name
                                                }}</span>
                                            </span>
                                            <span class="option__desc"
                                                ><span class="option__title">{{
                                                    props.company.note
                                                }}</span>
                                            </span>
                                        </template>
                                        <template
                                            slot="company"
                                            slot-scope="props"
                                        >
                                            <div
                                                class="option__desc flex justify-between"
                                            >
                                                <span class="option__title">{{
                                                    props.company.company_name
                                                }}</span
                                                ><span class="option__small">{{
                                                    props.company.invoice_id
                                                }}</span
                                                ><span class="option__small">{{
                                                    props.company.product_name
                                                }}</span>
                                            </div>
                                        </template>
                                    </VueMultiselect>
                                </TabPanel>
                                <TabPanel
                                    :class="[
                                        'rounded-xl bg-white p-3',
                                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                    ]"
                                >
                                    <VueMultiselect
                                        v-model="formAll.external_sale"
                                        :options="props.data.ext_sal"
                                        placeholder="Fav No Man’s Sky path"
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
                                        >
                                            <span class="option__desc"
                                                ><span class="option__title">{{
                                                    props.company.name
                                                }}</span>
                                            </span>
                                            <span class="option__desc"
                                                ><span class="option__title">{{
                                                    props.company.note
                                                }}</span>
                                            </span>
                                        </template>
                                        <template
                                            slot="company"
                                            slot-scope="props"
                                        >
                                            <div
                                                class="option__desc flex justify-between"
                                            >
                                                <span class="option__title">{{
                                                    props.company.company_name
                                                }}</span
                                                ><span class="option__small">{{
                                                    props.company.invoice_id
                                                }}</span
                                                ><span class="option__small">{{
                                                    props.company.product_name
                                                }}</span>
                                            </div>
                                        </template>
                                    </VueMultiselect>
                                </TabPanel>
                                <TabPanel
                                    :class="[
                                        'rounded-xl bg-white p-3',
                                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                    ]"
                                >
                                    <VueMultiselect
                                        v-model="formAll.internal"
                                        :options="props.data.products"
                                        id="internal"
                                        track-by="id"
                                        label="name"
                                        :options-limit="6"
                                        class="shadow-md shadow-cyan-300/50"
                                        placeholder="select product"
                                    >
                                    </VueMultiselect>
                                </TabPanel>
                            </TabPanels>
                        </TabGroup>
                    </div>
                    <BaseButtons>
                        <BaseButton
                            label="Contracts"
                            id="contract"
                            :icon="mdiEye"
                            small
                            @click="submitContract"
                        />
                    </BaseButtons>
                </LoadContractModal>
            </Teleport>
        </SectionMain>
    </LayoutAuthenticated>
</template>
