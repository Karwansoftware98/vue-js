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
    stockelement: {
        type: Object,
        default: () => ({}),
    },

    wareHouse: {
        type: Object,
        default: () => ({}),
    },
});

const form = useForm({
    _method: "put",
    id: props.stockelement.id,
    stock_id: props.stockelement.stock_id,
    name: props.stockelement.name,
    before_amount: props.stockelement.before_amount,
    before_amount_company: props.stockelement.before_amount_company,
    factory_price: props.stockelement.factory_price,
    is_in_production: props.stockelement.is_in_production?true:false,
    is_out_production: props.stockelement.is_out_production?true:false,
});

</script>

<template>
    <LayoutAuthenticated>
        <Head title="Update Stock Element" />
        <SectionMain>
            <SectionTitleLineWithButton
                :icon="mdiAccountKey"
                title="Update stock Element"
                main
            >
                <BaseButton
                    :route-name="route('stockelement.index')"
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
                        route('stockelement.update', props.stockelement.id)
                    )
                "
            >
                <FormField
                    label="Chose Warehouse"
                    :class="{ 'text-red-400': form.errors.stock_id }"
                >
                    <select
                        v-model="form.stock_id"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option>chose 1</option>

                        <option
                            v-for="st in wareHouse"
                            :key="st.id"
                            v-bind:value="st.id"
                            :selected="st.id == stockelement.stock_id"
                        >
                            {{ st.name }}
                        </option>
                    </select>
                </FormField>

                <FormField
                    label="Production Input"
                    :class="{ 'text-red-400': form.errors.is_in_production }"
                >
                    <FormControl
                        v-model="form.is_in_production"
                        type="checkbox"
                        :error="form.errors.is_in_production"
                    >
                        <div
                            class="text-red-400 text-sm"
                            v-if="form.errors.is_in_production"
                        >
                            {{ form.errors.is_in_production }}
                        </div>
                    </FormControl>
                </FormField>
                <FormField
                    label="Production output"
                    :class="{ 'text-red-400': form.errors.is_out_production }"
                >


                    <FormControl
                        v-model="form.is_out_production"
                        type="checkbox"
                        :error="form.errors.is_out_production"
                    >
                        <div
                            class="text-red-400 text-sm"
                            v-if="form.errors.is_out_production"
                        >
                            {{ form.errors.is_out_production }}
                        </div>
                    </FormControl>
                </FormField>
                <FormField
                    label="Enter Name"
                    :class="{ 'text-red-400': form.errors.name }"
                >
                    <FormControl
                        v-model="form.name"
                        type="text"
                        :error="form.errors.name"
                    >
                        <div
                            class="text-red-400 text-sm"
                            v-if="form.errors.name"
                        >
                            {{ form.errors.name }}
                        </div>
                    </FormControl>
                </FormField>

                <FormField
                    label="Enter before amount"
                    :class="{ 'text-red-400': form.errors.before_amount }"
                >
                    <FormControl
                        v-model="form.before_amount"
                        type="text"
                        :error="form.errors.before_amount"
                    >
                        <div
                            class="text-red-400 text-sm"
                            v-if="form.errors.before_amount"
                        >
                            {{ form.errors.before_amount }}
                        </div>
                    </FormControl>
                </FormField>

                <FormField
                    label="Enter before amount company"
                    :class="{
                        'text-red-400': form.errors.before_amount_company,
                    }"
                >
                    <FormControl
                        v-model="form.before_amount_company"
                        type="text"
                        :error="form.errors.before_amount_company"
                    >
                        <div
                            class="text-red-400 text-sm"
                            v-if="form.errors.before_amount_company"
                        >
                            {{ form.errors.before_amount_company }}
                        </div>
                    </FormControl>
                </FormField>

                <FormField
                    label="Enter factory price"
                    :class="{ 'text-red-400': form.errors.factory_price }"
                >
                    <FormControl
                        v-model="form.factory_price"
                        type="text"
                        :error="form.errors.factory_price"
                    >
                        <div
                            class="text-red-400 text-sm"
                            v-if="form.errors.factory_price"
                        >
                            {{ form.errors.factory_price }}
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
