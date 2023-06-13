<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3";
import { mdiAccountKey, mdiArrowLeftBoldOutline } from "@mdi/js";
import LayoutAuthenticated from "@/Layouts/LayoutAuthenticated.vue";
import SectionMain from "@/Components/SectionMain.vue";
import SectionTitleLineWithButton from "@/Components/SectionTitleLineWithButton.vue";
import CardBox from "@/Components/CardBox.vue";
import FormField from "@/Components/FormField.vue";
import FormControl from "@/Components/FormControl.vue";
import FormCheckRadioGroup from "@/Components/FormCheckRadioGroup.vue";
import BaseDivider from "@/Components/BaseDivider.vue";
import BaseButton from "@/Components/BaseButton.vue";
import BaseButtons from "@/Components/BaseButtons.vue";

const props = defineProps({

    employeedetail: {
        type: Object,
        default: () => ({}),
    },
    employee: {
        type: Object,
        default: () => ({}),
    },
    advance: {
        type: Object,
        default: () => ({}),
    },
    employee_transaction: {
        type: Object,
        default: () => ({}),
    },
    currency: {
        type: Object,
        default: () => ({}),
    },

});
// console.log(props.employeeDetail);
const form = useForm({
    _method: "put",
    id: props.employeedetail.id,
    amount: props.employeedetail.amount,
    employee_advance_id : props.employeedetail.employee_advance_id ,
    employee_transaction_type_id : props.employeedetail.employee_transaction_type_id ,
    currency_id: props.employeedetail.currency_id,
    employee_id: props.employeedetail.employee_id,
    date: props.employeedetail.date,

});

</script>

<template>
    <LayoutAuthenticated>
        <Head title="Update Employee Detail" />
        <SectionMain>
            <SectionTitleLineWithButton
                :icon="mdiAccountKey"
                title="Update Employee Detial"
                main
            >
                <BaseButton
                    :route-name="route('employee.index')"
                    :icon="mdiArrowLeftBoldOutline"
                    label="Back"
                    color="white"
                    rounded-full
                    small
                />
            </SectionTitleLineWithButton>
            <CardBox
                form
                @submit.prevent="
                    form.post(
                        route('employeedetail.update', props.employeedetail.id)
                    )
                "
            >
       
               
                <FormField
                    label="Enter amount"
                    :class="{ 'text-red-400': form.errors.amount }"
                >
                    <FormControl
                        v-model="form.amount"
                        type="number"
                        :error="form.errors.amount"
                    >
                        <div
                            class="text-red-400 text-sm"
                            v-if="form.errors.amount"
                        >
                            {{ form.errors.amount }}
                        </div>
                    </FormControl>
                </FormField>
               
                <FormField
                    label="date"
                    :class="{ 'text-red-400': form.errors.date }"
                >
                    <FormControl
                        v-model="form.date"
                        type="date"
                        :error="form.errors.date"
                    >
                        <div
                            class="text-red-400 text-sm"
                            v-if="form.errors.date"
                        >
                            {{ form.errors.date }}
                        </div>
                    </FormControl>
                </FormField>


         
                <FormField
                label="Chose Employee"
                :class="{ 'text-red-400': form.errors.employee_id }"
            >
                <select
                    v-model="form.employee_id"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option>chose 1</option>

                    <option
                        v-for="st in employee"
                        :key="st.id"
                        v-bind:value="st.id"
                        :selected="st.id == employeedetail.employee_id"
                    >
                        {{ st.name }}
                    </option>
                </select>
            </FormField>
        
        
            <FormField
            label="Choose Type"
            :class="{ 'text-red-400': form.errors.employee_transaction_type_id }"
        >
            <select
                v-model="form.employee_transaction_type_id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             
            >
                <option>chose 1</option>

                <option
                    v-for="st in employee_transaction"
                    :key="st.id"
                    v-bind:value="st.id"
                    :selected="st.id == employeedetail.employee_transaction_type_id"
                >
                    {{ st.name }}
                </option>
            </select>
        </FormField>

     

        <FormField
        label="Chose Currency"
        :class="{ 'text-red-400': form.errors.currency_id }"
    >
        <select
            v-model="form.currency_id"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
            <option>chose 1</option>

            <option
                v-for="st in currency"
                :key="st.id"
                v-bind:value="st.id"
                :selected="st.id == employeedetail.currency_id"
            >
                {{ st.name }}
            </option>
        </select>
    </FormField>
                <BaseDivider />

                <template #footer>
                    <BaseButtons>
                        <BaseButton
                            type="submit"
                            color="info"
                            label="Submit"
                            :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing"
                        />
                    </BaseButtons>
                </template>
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>
