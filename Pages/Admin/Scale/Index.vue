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
    mdiGithub,
    mdiThemeLightDark,
    mdiFireTruck,
    mdiHandBackLeft,
    mdiScale,
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
import { ref } from "vue";
import { useMainStore } from "@/Stores/main.js";
import { useStyleStore } from "@/Stores/style.js";
import { useLayoutStore } from "@/Stores/layout.js";
import NavBarItem from "@/Components/NavBarItem.vue";
import NavBarItemLabel from "@/Components/NavBarItemLabel.vue";
import NavBarMenu from "@/Components/NavBarMenu.vue";
import BaseDivider from "@/Components/BaseDivider.vue";
import UserAvatarCurrentUser from "@/Components/UserAvatarCurrentUser.vue";
import BaseIcon from "@/Components/BaseIcon.vue";
import NavBarSearch from "@/Components/NavBarSearch.vue";
import RightFilterAside from "@/Components/RightFilterAside.vue";
import AsideFilter from "@/Components/AsideFilter.vue";
import NavBarMenuLoad from "@/Components/NavBarMenuLoad.vue";
import CardBoxWidget from "@/Components/CardBoxWidget.vue";
import VueMultiselect from "vue-multiselect";
import FormField from "@/Components/FormField.vue";
import FormControl from "@/Components/FormControl.vue";
import FormCheckRadioGroup from "@/Components/FormCheckRadioGroup.vue";
import { reactive } from "@vue/reactivity";
import { throttle } from "lodash/throttle";
import { watch } from "vue";
import SaleContractDynamicForm from "@/Components/SaleContractDynamicForm.vue";

const mainStore = useMainStore();
const styleStore = useStyleStore();

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
const props = defineProps({
    contract_type: {
        type: Object,
        default: () => ({}),
    },
    scale: {
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
    errors: {
        type: Object,
        default: () => ({}),
    },
    first_date: String,
    second_date: String,

});

console.log(props.loads);
function formatPrice(value) {
    let val = (value / 1).toFixed(2).replace(".", ",");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
const form = useForm({
    search: props.filters.search,
    driver: props.filters.driver,
    first_date: props.first_date,
    second_date: props.second_date,
    company_id: props.filters.company_id,
    Contract_types: props.filters.Contract_types,
    first_number: props.filters.first_number,
    second_number: props.filters.second_number,
    product: props.filters.product,
    first_destination: props.filters.first_destination,
    second_destination: props.filters.second_destination,
    all: props.filters.all,
});

let refresh = () => {
    form.get(route("scale.index"), {
        preserveScroll: true,
        onSuccess: () => {
            const value = () => usePage().props["scale"];
            router.visit(value().first_page_url, {
                method: "get",
                only: [props.filters, items],
            });
        },
    });
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<template>

    <LayoutAuthenticated>
        <Head title="Scale" />
        <SectionMain>
            <p v-if="errors.items">{{ errors.items }}</p>
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
                title="Scale"
                main
                class="space-x-3"
            >
                <CardBox class="flex-initial grow" has-table>
                    <form @submit.prevent="form.get(route('scale.index'))">
                        <div class="py-2">
                            <div class="flex justify-end">
                                <input
                                    type="search"
                                    v-model="form.search"
                                    class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:text-black lg:mr-2 lg:ml-2 xl:mr-2 xl:ml-2 ml-2 grow"
                                    placeholder="Search"
                                />
                            </div>
                        </div>
                    </form>
                </CardBox>
                <BaseButton
                    :route-name="route('loads.create')"
                    :icon="mdiPlus"
                    label="Add"
                    color="info"
                    rounded-full
                    small
                    :class="[layoutStore.isRightFilter ? 'mr-52' : '']"
                />

                <NavBarItem
                    type="flex"
                    @click.prevent="rightFilter"
                    v-show="!layoutStore.isRightFilter"
                    class="w-10"
                >
                    <BaseIcon :path="mdiMenu" size="24" />
                </NavBarItem>
                <Teleport to="body">
                    <AsideFilter>
                        <form @submit.prevent="form.get(route('scale.index'))">
                            <div
                                :class="styleStore.asideBrandStyle"
                                class="flex flex-col h-24 space-y-4 bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100 rounded-md z-10"
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
                                        <b>فلتەرەکان</b>
                                    </div>
                                </div>

                                <div
                                    class="flex flex-row justify-between ml-2 mr-2"
                                >
                                    <button
                                        class="bg-green-400 rounded-md px-2 py-1"
                                        type="submit"
                                    >
                                        نیشاندان
                                    </button>
                                    <button
                                        class="bg-red-400 rounded-md py-1 px-1"
                                    >
                                        سڕینەوە
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
                                <div
                                    class="flex flex-row items-center mt-2 space-x-2"
                                >
                                    <label for="all">All</label>
                                    <input
                                        id="all"
                                        type="checkbox"
                                        class="toggle-checkbox block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer shadow-md shadow-cyan-300/50"
                                        v-model="form.all"
                                    />
                                </div>
                                <input
                                    type="datetime-local"
                                    class="rounded-md text-left mt-3 text-black w-full"
                                    placeholder="بەرواری سەرەتا"
                                    v-model="form.first_date"
                                />
                                <input
                                    type="datetime-local"
                                    class="rounded-md text-left mt-3 text-black w-full"
                                    placeholder="بەرواری سەرەتا"
                                    v-model="form.second_date"
                                />
                                <!-- company -->
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
                                <!-- contract type  -->
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
                                <!-- second destination  -->
                                <VueMultiselect
                                    v-model="form.first_destination"
                                    :options="props.destinations"
                                    placeholder="first destination"
                                    label="name"
                                    track-by="id"
                                    class="text-black"
                                    :option-limit="10"
                                >
                                    >
                                </VueMultiselect>
                                <!-- second destintin -->
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
                                <!-- driver -->
                                <input
                                type="text"
                                class="rounded-md text-left mt-3 text-black w-full"
                                placeholder="Truck No."
                                v-model="form.driver"
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

            <CardBox class="mb-6" has-table>
                <table class="border-separate text-sm">
                    <thead class="justify-around">
                        <tr>
                            <th>
                                <Sort label="ژمارە" attribute="name" />
                            </th>
                            <th>
                                <Sort label=" بەروار" attribute="note" />
                            </th>
                            <th>
                                <Sort label=" ناوی شوۆفیر" attribute="note" />
                            </th>
                            <th>
                                <Sort label="ژ.شوفێر" attribute="note" />
                            </th>

                            <th>
                                <Sort label="پرۆتۆکۆل" attribute="note" />
                            </th>
                            <th>
                                <Sort label="جۆر " attribute="name" />
                            </th>
                            <th>
                                <Sort label="کیش 1 " attribute="name" />
                            </th>
                            <th>
                                <Sort label=" کات 1" attribute="note" />
                            </th>
                            <th>
                                <Sort label="کێش 2" attribute="name" />
                            </th>
                            <th>
                                <Sort label="کات 2" attribute="note" />
                            </th>

                            <th v-if="can.edit || can.delete">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="scale in scale.data" :key="scale.id">
                            <td data-label="ژمارە">
                                {{ scale.id }}
                            </td>
                            <td data-label="جیاوازی">
                                {{ scale.truck_list.date }}
                            </td>
                            <td data-label="جیاوازی">
                                {{ scale.driver.name }}
                            </td>
                            <td data-label="جیاوازی">
                                {{ scale.driver.truck_number }}
                            </td>
                            <td data-label="جیاوازی">
                                {{ scale.truck_list.l_invoice_id }}
                            </td>
                            <td data-label="جیاوازی">
                                {{ scale.contract_type.name }}
                            </td>
                            <td data-label="جیاوازی">
                                {{ scale.scale1 }}
                            </td>
                            <td data-label="جیاوازی">
                                {{ scale.date1 }}
                            </td>
                            <td data-label="جیاوازی">
                                {{ scale.scale2 }}
                            </td>
                            <td data-label="جیاوازی">
                                {{ scale.date2 }}
                            </td>

                            <td
                                v-if="can.edit"
                                class="before:hidden lg:w-1 whitespace-nowrap"
                            >
                                <BaseButtons
                                    type="justify-start lg:justify-end"
                                    no-wrap
                                >
                                    <BaseButton
                                        v-if="can.edit"
                                        :route-name="
                                            route('scale.edit', scale.id)
                                        "
                                        color="info"
                                        :icon="mdiScale"
                                        small
                                    />
                                </BaseButtons>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="py-4">
                    <Pagination :data="scale" />
                </div>
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>
