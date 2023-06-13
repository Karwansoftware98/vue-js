<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3";
import {
    mdiAccountKey,
    mdiPlus,
    mdiSquareEditOutline,
    mdiTrashCan,
    mdiAlertBoxOutline,
    mdiCurrencyUsd,
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
import CardBoxModal from "@/Components/CardBoxModal.vue";
import FormField from "@/Components/FormField.vue";
import FormControl from "@/Components/FormControl.vue";
import { computed } from "@vue/runtime-core";

import { ref, reactive } from "vue";

const props = defineProps({
    employee: {
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
    currency: {
        type: Object,
        default: () => ({}),
    },
    employee_trans_type: {
        type: Object,
        default: () => ({}),
    },
});
// console.log(props.employee);
const form = useForm({
    search: props.filters.search,
    first_date: props.filters.first_date,
    second_date: props.filters.second_date,
});
function formatPrice(value) {
    let val = (value / 1).toFixed(2).replace(".", ".");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const formDelete = useForm({});

function destroy(id) {
    if (confirm("Are you sure you want to delete?")) {
        formDelete.delete(route("employee.destroy", id));
    }
}

let form1 = useForm({
    items: props.employee,
    //   employee_id:props.employee.id,
    //   date:props.employee.date,
    //   salary:props.employee.current_salary?.amount,
    //   deduct:props.employee.deduct?.amount,
    //   reward:props.employee.reward?.amount,
    //   penalty:props.employee.penalty?.amount,
    //   department:props.employee.company_department?.name,
    //   company_destination:props.employee.company_destination?.name,
    //   company_position:props.employee.company_position?.name,
    //   employee_advance:props.employee.employee_advance?.name
});
console.log(form1);

const editingIndex = ref(-1);

const startEditing = (index) => {
    editingIndex.value = index;
};

const stopEditing = (index) => {
    editingIndex.value = -1;
};



const getData = () => {


    var y = form1.items.slice([ 'company_department', 'company_position' ]);

    console.log(y);
    // form1
    //     .transform((data) => ({
    //         data: data["items"],
    //     }))
    //     .post("/admin/employeesalary");


};
</script>

<template>
    <LayoutAuthenticated>
        <Head title="Employees" />
        <SectionMain>
            <SectionTitleLineWithButton
                :icon="mdiAccountKey"
                title="Employees"
                main
            >
                <BaseButton
                    v-if="can.delete"
                    :route-name="route('employee.create')"
                    :icon="mdiPlus"
                    label="Add"
                    color="info"
                    rounded-full
                    small
                />
            </SectionTitleLineWithButton>
            <button @click="getData">Get Data</button>

            <NotificationBar
                v-if="$page.props.flash.message"
                color="success"
                :icon="mdiAlertBoxOutline"
            >
                {{ $page.props.flash.message }}
            </NotificationBar>

            <CardBox class="mb-6" has-table>
                <form @submit.prevent="form.get(route('employee.index'))">
                    <div class="py-2 flex">
                        <div class="flex pl-4">
                            <input
                                type="search"
                                v-model="form.search"
                                class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="Search"
                            />
                            <input
                                type="date"
                                v-model="form.first_date"
                                class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="Search"
                            />
                            <input
                                type="date"
                                v-model="form.second_date"
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
                <table>
                    <thead>
                        <tr>
                            <th>
                                <Sort label="ناو" attribute="ناو" />
                            </th>
                            <th>
                                <Sort label="شوین" attribute="شوێنی کارکردن" />
                            </th>
                            <th>
                                <Sort label="بەش" attribute="بەش" />
                            </th>
                            <th>
                                <Sort label="پلە" attribute="پلە" />
                            </th>

                            <th>
                                <Sort label="بڕی مووچە" attribute="بڕی مووچە" />
                            </th>
                            <th>
                                <Sort label="سلفە" attribute="بڕی مووچە" />
                            </th>
                            <th>
                                <Sort label="لێبڕین" attribute="لێبڕین" />
                            </th>
                            <th>
                                <Sort label="غەرامە" attribute=" " />
                            </th>
                            <th>
                                <Sort label="پاداشت" attribute=" " />
                            </th>
                            <th>
                                <Sort label="رۆژی کارکردن" attribute=" " />
                            </th>
                            <th>
                                <Sort label="کۆی گشتی " attribute=" " />
                            </th>

                            <th v-if="can.edit || can.delete">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                            v-for="(employee, index) in form1.items.data"
                            :key="index"
                        >
                            <td data-label="ناو ">
                                <Link
                                    :href="route('employee.show', employee.id)"
                                    class="no-underline hover:underline text-cyan-600 dark:text-cyan-400"
                                >
                                    {{ employee.name }}
                                </Link>
                            </td>

                            <td data-label="شوێنی کارکردن">
                                {{ employee.company_destination.name }}
                            </td>

                            <td data-label="بەش">
                                {{ employee.company_department.name }}
                            </td>
                            <td data-label="پلە">
                                {{ employee.company_position.name }}
                            </td>
                            <td data-label="بڕی مووچە">
                                {{
                                    formatPrice(
                                        employee.current_salary[0].amount
                                    )
                                }}
                            </td>

                            <td data-label="سلفە">
                                {{
                                    formatPrice(
                                        employee.employee_advance[0]?.amount
                                    )
                                }}
                            </td>
                            <td data-label="لێبڕین">
                                {{ formatPrice(employee.deduct[0]?.amount) }}
                            </td>
                            <td data-label="غەرامە">
                                {{ formatPrice(employee.penalty[0]?.amount) }}
                            </td>
                            <td data-label="پاداشت">
                                {{ formatPrice(employee.reward[0]?.amount) }}
                            </td>
                            <td data-label="رۆژانەی کارکردن">
                                <template v-if="editingIndex !== index">
                                    <span @click="startEditing(index)">{{
                                        employee.workdays
                                    }}</span>
                                </template>
                                <template v-else>
                                    <input
                                        type="number"
                                        min="1"
                                        max="30"
                                        v-model="employee.workdays"
                                        @blur="stopEditing"
                                    />
                                </template>
                            </td>
                            <td data-label="کۆی گشتی مووچە">
                                {{
                                    formatPrice(
                                        employee.current_salary[0].amount
                                    )
                                }}
                            </td>

                            <td
                                v-if="can.edit || can.delete"
                                class="before:hidden lg:w-4 whitespace-nowrap"
                            >
                                <div class="flex flex-row space-x-2">
                                    <BaseButton
                                        v-if="can.edit"
                                        :route-name="
                                            route('employee.edit', employee.id)
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
                                        @click="destroy(employee.id)"
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="py-4">
                    <Pagination :data="employee" />
                </div>
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>
