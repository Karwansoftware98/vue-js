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

    currency: {
        type: Object,
        default: () => ({}),
    },

  
});
console.log(props.trans_id);

const form = useForm({
    treasurer_id: props.treasurer.id,
    treasurer_id_2: props.treasurer.id,
    currency_id: props.currency.id,
    date: "",
    deal_rate: "",
    amount: "",
    note: "",
    type:''
});
function formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
let value = computed(() => {
    return form.currency_id==1? form.amount*form.deal_rate:form.amount/form.deal_rate;
});
let is_type = computed(() => {
    return form.type==4? true:false;
});

</script>

<template>
    <LayoutAuthenticated>
        <Head title="Add Transactions" />
        <SectionMain>
            <SectionTitleLineWithButton
                :icon="mdiAccountKey"
                title="Exchange Currency"
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
            <CardBox form @submit.prevent="form.post(route('treasurertranaction.store'))">
          
                <FormField
                    label="Chose type"
                    :class="{ 'text-red-400': form.errors.type }"
                >
                    <select
                        v-model="form.type"
                        id="countries"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                    <option selected value="3"> EXCHANGE</option>
                    <option  value="4"> TRANSFER</option>
                    </select>
                </FormField>
          
                <FormField
                    label="Chose Treasurer From"
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
                    label="Chose Treasurer To"
                    :class="{ 'text-red-400': form.errors.treasurer_id_2 }"
                    v-if="is_type||form.treasurer_id!=form.treasurer_id_2"
                >
                    <select
                        v-model="form.treasurer_id_2"
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
                    :class="{ 'text-red-400': form.errors.currency_id }"
                >
                    <select
                        v-model="form.currency_id"
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
                    label="Deal Rate"
                    :class="{ 'text-red-400': form.errors.deal_rate }"
                >
                    <FormControl
                        v-model="form.deal_rate"
                        type="number"
                        placeholder="Enter exchange rate"
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
                    label="Amount"
                    :class="{ 'text-red-400': form.errors.amount }"
                >
                    <FormControl
                        v-model="form.amount"
                        type="text"
                        placeholder="Enter amount"
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
                    label="Date"
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
                <FormField
                    label="Note"
                    :class="{ 'text-red-400': form.errors.note }"
                >
                    <FormControl
                        v-model="form.note"
                        type="text"
                        placeholder="Enter note"
                        :error="form.errors.date"
                    >
                        <div
                            class="text-red-400 text-sm"
                            v-if="form.errors.note"
                        >
                            {{ form.errors.note }}
                        </div>
                    </FormControl>
                </FormField>

                <BaseDivider />
                <p>Rate : {{formatPrice(value)}}</p>

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
