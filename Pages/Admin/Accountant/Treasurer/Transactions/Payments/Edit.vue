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
import { computed } from "@vue/runtime-core";

const props = defineProps({
    statement: {
        type: Object,
        default: () => ({}),
    },
    treasurer: {
        type: Object,
        default: () => ({}),
    },
    company: {
        type: Object,
        default: () => ({}),
    },
    currency: {
        type: Object,
        default: () => ({}),
    },
    currencyItem: {
        type: Object,
        default: () => ({}),
    },
});

console.log(props.statement);
const form = useForm({
    _method: "put",
    company_id: props.statement?.company_id,
    transaction_type_id:props.statement?.transaction_type_id,
    treasurer_id: props.statement?.treasurer_id,
    currency_id_from: props.statement?.currency_id_from,
    currency_id_to: props.statement.currency_id_to,
    currency_item_id: props.statement.currency_item_id,
    deal_rate: props.statement.deal_rate,
    date: props.statement.date,
    paid_amount: props.statement.paid_amount,
});

let isDeal = computed(() => {
    return form.currency_id_from != form.currency_id_to ? true : false;
});



</script>

<template>
    <LayoutAuthenticated>
        <Head title="Update treasurer" />
        <SectionMain>
            <SectionTitleLineWithButton
                :icon="mdiAccountKey"
                title="Update treasurer"
                main
            >
                <BaseButton
                    :route-name="route('statement.index',props.statement.transaction_type_id)"
                    :icon="mdiArrowLeftBoldOutline"
                    label="Back"
                    color="white"
                    rounded-full
                    small
                />
            </SectionTitleLineWithButton>
           
            <CardBox
            form
            @submit.prevent="form.post(route('accountstatement.update', props.statement.id))"
            >
                <FormField
                    label="Chose Warehouse"
                    :class="{
                        'text-red-400': form.errors.company_id,
                    }"
                >
                    <select
                        v-model="form.company_id"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option
                            v-for="st in company"
                            :key="st.id"
                            v-bind:value="st.id"
                            :selected="st.id == statement.company_id"
                        >
                            {{ st.name }}
                        </option>
                    </select>
                </FormField>
                <FormField
                    label="Chose Warehouse"
                    :class="{
                        'text-red-400': form.errors.treasurer_id,
                    }"
                >
                    <select
                        v-model="form.treasurer_id"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option
                            v-for="st in treasurer"
                            :key="st.id"
                            v-bind:value="st.id"
                            :selected="st.id == statement.treasurer_id"
                        >
                            {{ st.name }}
                        </option>
                    </select>
                </FormField>
                <FormField
                    label="Chose Warehouse"
                    :class="{
                        'text-red-400': form.errors.currency_id_from,
                    }"
                >
                    <select
                        v-model="form.currency_id_from"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option
                            v-for="st in currency"
                            :key="st.id"
                            v-bind:value="st.id"
                            :selected="st.id == statement.currency_id_from"
                        >
                            {{ st.name }}
                        </option>
                    </select>
                </FormField>
                <FormField
                    label="Chose Warehouse"
                    :class="{
                        'text-red-400': form.errors.currency_id_to,
                    }"
                >
                    <select
                        v-model="form.currency_id_to"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option
                            v-for="st in currency"
                            :key="st.id"
                            v-bind:value="st.id"
                            :selected="st.id == statement.currency_id_to"
                        >
                            {{ st.name }}
                        </option>
                    </select>
                </FormField>
                <FormField
                v-if="isDeal"
                    label="Enter value"
                    :class="{ 'text-red-400': form.errors.deal_rate }"
                >
                    <FormControl
                        v-model="form.deal_rate"
                        type="text"
                        placeholder="Name"
                        :error="form.errors.deal_rate"
                    >
                        <div
                            class="text-red-400 text-sm"
                            v-if="form.errors.deal_rate"
                        >
                            {{ form.errors.deal_rate }}
                        </div>
                    </FormControl>
                </FormField>
                <FormField
                    label="Enter value"
                    :class="{ 'text-red-400': form.errors.paid_amount }"
                >
                    <FormControl
                        v-model="form.paid_amount"
                        type="text"
                        placeholder="Name"
                        :error="form.errors.paid_amount"
                    >
                        <div
                            class="text-red-400 text-sm"
                            v-if="form.errors.paid_amount"
                        >
                            {{ form.errors.paid_amount }}
                        </div>
                    </FormControl>
                </FormField>

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
