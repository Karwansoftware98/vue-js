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
} from "@mdi/js";
import LayoutAuthenticated from "@/Layouts/LayoutAuthenticated.vue";
import SectionMain from "@/Components/SectionMain.vue";
import SectionTitleLineWithButton from "@/Components/SectionTitleLineWithButton.vue";
import CardBox from "@/Components/CardBox.vue";
import NotificationBar from "@/Components/NotificationBar.vue";
import Pagination from "@/Components/Admin/Pagination.vue";
import Statementpagination from "@/Components/Admin/Statementpagination.vue";
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
import BottomBar from "@/Components/BottomBar.vue";
import BaseButton from "@/Components/BaseButton.vue";
import BaseButtons from "@/Components/BaseButtons.vue";
import LoadContractModal from "@/Components/LoadContractModal.vue";
import CustomModal from "@/Components/CustomModal.vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

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

var bottomLoad = ref(false);
let showBottom = () => {
    bottomLoad.value = !bottomLoad.value;
};
const styleStore = useStyleStore();
const props = defineProps({
    statement: {
        type: Object,
        default: () => [],
    },
    data: {
        type: Object,
        default: () => [],
    },
    total_pre_balance: {
        type: Object,
        default: () => [],
    },
    total_pre_contract: {
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

    company_id: Number,
    first_date: String,
    second_date: String,
});

const form = useForm({
    search: props.filters.search,
    first_date:props.filters.first_date,
    second_date:props.filters.second_date,
    company_id: props.filters.data?.company_id,
    type: props.filters.data?.type,
    currency: props.filters.data?.currency,

});


function formatPrice(value) {
    let val = (value / 1).toFixed(2).replace(".", ",");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
const formDelete = useForm({});

let submit = () => {
    form.get("/admin/companies/accountstatement");
};



function destroy(id) {
    if (confirm("Are you sure you want to delete?")) {
        formDelete.delete(route("loads.destroy", id));
    }
}

console.log(props.total_pre_balance[0]);

onMounted(() => {
    console.log("coooooooooom " + props.company_id);

    form.company_id = props.data.company.find(
        (company) => company.id === props.company_id
    );
});
//  let balance = 
//     (s, index) => (props.statement.contract?.price* props.statement.contract?.total_weighted_amount)-(props.statement.data[index-1]?.paid_amount)
 
 let pre_balance = computed(() => {
return props.total_pre_balance?Number(props.total_pre_contract)- Number(props.total_pre_balance[0]) :Number(0)
})

</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<template>
    <LayoutAuthenticated>
        <Head title="Account Statement" />
        <SectionMain>
            <SectionTitleLineWithButton
                :icon="mdiAccountKey"
                title="Account Statement"
                main
                class="space-x-3"
            >
                <CardBox class="flex-initial grow" has-table>
                    <form @submit.prevent="submit">
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
                        :route-name="route('loads.create')"
                        :icon="mdiPlus"
                        label="Add"
                        color="info"
                        rounded-full
                        small
                    />
                    <!-- <img
                        src="../../../../css/images/excel.png"
                        alt=""
                        class="w-10 h-10"
                    /> -->
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
                        <form @submit.prevent="submit">
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
                                    :options="props.data.company"
                                    placeholder="select company"
                                    label="name"
                                    track-by="id"
                                    :option-height="104"
                                    class="text-black"
                                >
                                </VueMultiselect>
                                <VueMultiselect
                                    v-model="form.currency"
                                    :options="props.data.currency"
                                    placeholder="select status"
                                    label="name"
                                    track-by="id"
                                    :option-height="104"
                                    class="text-black"
                                >
                                </VueMultiselect>
                                <VueMultiselect
                                    v-model="form.type"
                                    :options="props.data.type"
                                    placeholder="select type"
                                    label="name"
                                    track-by="id"
                                    :option-height="104"
                                    class="text-black"
                                >
                                    >
                                </VueMultiselect>
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

                    <template #dropdown class="flex flex-col">
                        <NavBarItem>
                            <div class="flex flex-row justify-between">
                                <label for="status">Number</label>
                            </div>
                        </NavBarItem>
                        <NavBarItem>
                            <div class="flex flex-row items-center space-x-2">
                                <label for="status">date</label>
                            </div>
                        </NavBarItem>
                        <NavBarItem>
                            <div class="flex flex-row items-center space-x-2">
                                <label for="status">type</label>
                            </div>
                        </NavBarItem>
                        <NavBarItem>
                            <div class="flex flex-row items-center space-x-2">
                                <label for="status">driver</label>
                            </div>
                        </NavBarItem>
                        <NavBarItem>
                            <div class="flex flex-row items-center space-x-2">
                                <label for="status">company</label>
                            </div>
                        </NavBarItem>
                        <NavBarItem>
                            <div class="flex flex-row items-center space-x-2">
                                <label for="status">truck number</label>
                            </div>
                        </NavBarItem>
                        <NavBarItem>
                            <div class="flex flex-row items-center space-x-2">
                                <label for="status">first destination</label>
                            </div>
                        </NavBarItem>
                        <NavBarItem>
                            <div class="flex flex-row items-center space-x-2">
                                <label for="status">second destination</label>
                            </div> </NavBarItem
                        ><NavBarItem>
                            <div class="flex flex-row items-center space-x-2">
                                <label for="status">dffrence</label>
                            </div>
                        </NavBarItem>
                    </template>
                </NavBarMenuLoad>
            </div>
            <CardBox class="mb-6" has-table>
                <table class="border-separate text-sm">
                    <thead
                        class="sticky top-12 justify-around z-10 dark:bg-slate-900 bg-slate-400"
                    >
                        <tr class=" ">
                            <th>
                                <Sort label="No." attribute="id" />
                            </th>
                            <th>
                                <Sort label="Date" attribute="date" />
                            </th>
                            <th>
                                <Sort label="treasurer" attribute="treasurer" />
                            </th>

                            <th>
                                <Sort label="payments" attribute="payments" />
                            </th>

                            <th>
                                <Sort label="contract" attribute="contract" />
                            </th>
                            <th>
                                <Sort label="balance" attribute="balance" />
                            </th>

                            <th v-if="can.edit || can.delete">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(s,index)  in props.statement.data"
                            :key="index"
                            @dblclick="log(load.id)"
                        >
                            <td data-label="no">
                                {{ s.trans_id }}
                            </td>
                            <td data-label="date">
                                {{ s.date }}
                            </td>
                            <td data-label="treasurer">
                                {{ s.name }}
                            </td>
                            <td data-label="payments">
                                {{ s.paid_amount }}
                            </td>
                            <td data-label="contracts ">
                                {{ s.contract }}
                            </td>
                            <td data-label="balance" v-if="pre_balance"> {{ Number(s.balance)+Number(pre_balance)}} </td>
                            <td data-label="balance" v-else-if="!pre_balance"> {{ Number(s.balance)}} </td>

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
                                        @click="destroy(load, props.filters)"
                                    />
                                </BaseButtons>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="py-4">
                          
                    <pagination :data="props.statement " @click="submitpage"/>
                </div>
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
                            <span class="text-green-500"> {{ "tg" }} </span>
                        </p>
                        <p>
                            Second weight:
                            <span class="text-green-500"> {{ "tg" }} </span>
                        </p>
                        <p>
                            Difference:
                            <span class="text-green-500">
                                {{ "tg" }}
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
        </SectionMain>
    </LayoutAuthenticated>
</template>
