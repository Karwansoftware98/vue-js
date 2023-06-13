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
    treasurer: {
        type: Object,
        default: () => ({}),
    },

    company: {
        type: Object,
        default: () => ({}),
    },
    type: {
        type: Object,
        default: () => ({}),
    },
    trans_id: Number,
    currency: {
        type: Object,
        default: () => ({}),
    },
    currencyItem: {
        type: Object,
        default: () => ({}),
    },
});
console.log(props.trans_id);

const form = useForm({
    company_id: props.company.id,
    treasurer_id: props.treasurer.id,
    currency_id_from: "",
    currency_id_to: "",
    currency_item_id: props.currencyItem?.id,
    date: "",
    deal_rate: "",
    paid_amount: "",
    type:props.type,
    trans_id:props.trans_id
});

let isDeal = computed(() => {
    return form.currency_id_from != form.currency_id_to ? true : false;
});
</script>

<template>
    <LayoutAuthenticated>
        <Head title="Add payment" />
        <SectionMain>
            <SectionTitleLineWithButton
                :icon="mdiAccountKey"
                title="payments "
                main
            >
                <BaseButton
                    :route-name="route('statement.index',1)"
                    :icon="mdiArrowLeftBoldOutline"
                    label="Back"
                    color="white"
                    rounded-full
                    small
                />
            </SectionTitleLineWithButton>
            <CardBox form @submit.prevent="form.post(route('accountstatement.store'))">
                <FormField
                    label="Chose supplier"
                    :class="{ 'text-red-400': form.errors.company_id }"
                >
                    <select
                        v-model="form.company_id"
                        id="countries"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option
                            v-for="st in props.company"
                            :key="st.id"
                            v-bind:value="st.id"
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
                        id="countries"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option
                            v-for="st in props.treasurer"
                            :key="st.id"
                            v-bind:value="st.id"
                        >
                            {{ st.name }}
                        </option>
                    </select>
                </FormField>
                <FormField
                    label="Chose from"
                    :class="{ 'text-red-400': form.errors.currency_id_from }"
                >
                    <select
                        v-model="form.currency_id_from"
                        id="countries"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option
                            v-for="st in props.currency"
                            :key="st.id"
                            v-bind:value="st.id"
                        >
                            {{ st.name }}
                        </option>
                    </select>
                </FormField>
                <FormField
                    label="Chose to"
                    :class="{ 'text-red-400': form.errors.currency_id_to }"
                >
                    <select
                        v-model="form.currency_id_to"
                        id="a"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option
                            v-for="stt in props.currency"
                            :key="stt.id"
                            v-bind:value="stt.id"
                        >
                            {{ stt.name }}
                        </option>
                    </select>
                </FormField>

                <FormField
                    v-if="isDeal"
                    label="Deal Rate"
                    :class="{ 'text-red-400': form.errors.deal_rate }"
                >
                    <FormControl
                        v-model="form.deal_rate"
                        type="number"
                        placeholder="Enter exchange amount"
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
                    label="paid amount"
                    :class="{ 'text-red-400': form.errors.paid_amount }"
                >
                    <FormControl
                        v-model="form.paid_amount"
                        type="text"
                        placeholder="Enter paid amount"
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
                <FormField
                    label="Name"
                    :class="{ 'text-red-400': form.errors.date }"
                >
                    <FormControl
                        v-model="form.date"
                        type="date"
                        placeholder="Enter Name"
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
