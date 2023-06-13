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

    treasurer: {
        type: Object,
        default: () => ({}),
    },
    currency: {
        type: Object,
        default: () => ({}),
    },
    advance: {
        type: Object,
        default: () => ({}),
    },
    employee: {
        type: Object,
        default: () => ({}),
    },
});

const form = useForm({
    _method: "put",
    id: props.advance.id,
    amount: props.advance.amount,
    monthly_due: props.advance.monthly_due,
    date: props.advance.date,
    currency_id: props.advance.currency_id,
    treasurer_id: props.advance.treasurer_id,
    employee_id: props.advance.employee_id,

});

</script>

<template>
    <LayoutAuthenticated>
        <Head title="Update Employee" />
        <SectionMain>
            <SectionTitleLineWithButton
                :icon="mdiAccountKey"
                title="Update Employee"
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
                        route('advance.update', props.advance.id)
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
                label="monthly due"
                :class="{ 'text-red-400': form.errors.monthly_due }"
            >
                <FormControl
                    v-model="form.monthly_due"
                    type="text"
                    :error="form.errors.monthly_due"
                >
                    <div
                        class="text-red-400 text-sm"
                        v-if="form.errors.monthly_due"
                    >
                        {{ form.errors.monthly_due }}
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
                        :selected="st.id == advance.employee_id"
                    >
                        {{ st.name }}
                    </option>
                </select>
            </FormField>
        
            <FormField
                label="Chose Treasurer"
                :class="{ 'text-red-400': form.errors.treasurer_id }"
            >
                <select
                    v-model="form.treasurer_id"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option>chose 1</option>

                    <option
                        v-for="st in treasurer"
                        :key="st.id"
                        v-bind:value="st.id"
                        :selected="st.id == advance.treasurer_id"
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
                :selected="st.id == advance.currency_id"
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
