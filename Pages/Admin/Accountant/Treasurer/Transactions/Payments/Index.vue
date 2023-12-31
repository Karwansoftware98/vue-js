<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3";
import {
    mdiAccountKey,
    mdiPlus,
    mdiSquareEditOutline,
    mdiTrashCan,
    mdiAlertBoxOutline,
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

const props = defineProps({
    statement: {
        type: Object,
        default: () => ({}),
    },
    
    type: {
        type: Object,
        default: () => ({}),
    },
    
    title: {
        type: Object,
        default: () => ({}),
    },
    
    company: {
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
});


console.log(props.statement);

const form = useForm({
    search: props.filters.search,
});
function formatPrice(value) {
    let val = (value / 1).toFixed(2).replace(".", ".");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const formDelete = useForm({});

function destroy(id) {
    if (confirm("Are you sure you want to delete?")) {
        formDelete.delete(route("companies.destroy", id));
    }
}
</script>

<template>
    <LayoutAuthenticated>
        <Head :title="props.title" />
        <SectionMain>
            <SectionTitleLineWithButton
                :icon="mdiAccountKey"
                :title="props.title"
                main
            >
                <BaseButton
                    v-if="can.delete"
                    :route-name="route('statement.create',props.type)"
                    :icon="mdiPlus"
                    label="Add"
                    color="info"
                    rounded-full
                    small
                />
            </SectionTitleLineWithButton>
            <NotificationBar
                v-if="$page.props.flash.message"
                color="success"
                :icon="mdiAlertBoxOutline"
            >
                {{ $page.props.flash.message }}
            </NotificationBar>
            <CardBox class="mb-6" has-table>
                <form @submit.prevent="form.get(route('statement.index',props.type))">
                    <div class="py-2 flex">
                        <div class="flex pl-4">
                            <input
                                type="search"
                                v-model="form.search"
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
                                <Sort label=" company" attribute="company" />
                            </th>
                            <th>
                                <Sort label="Treasurer" attribute="Treasurer" />
                            </th>
                            <th>
                                <Sort
                                    label="Currency from"
                                    attribute="Currency_id_from"
                                />
                            </th>
                            <th>
                              <Sort
                                  label="amount1"
                                  attribute="Currency_id_from"
                              />
                          </th>
                            <th>
                                <Sort
                                    label="Currency to"
                                    attribute="Currency_id_to"
                                />
                            </th>
                            <th><Sort label="amount" attribute="amount" /></th>
                            <th><Sort label="date" attribute="date" /></th>

                            <th v-if="can.edit || can.delete">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                            v-for="statement in statement.data"
                            :key="statement.id"
                        >
                            <td data-label="id">
                                <Link
                                    :href="
                                        route(
                                            'statement.show',
                                            statement.id
                                        )
                                    "
                                    class="no-underline hover:underline text-cyan-600 dark:text-cyan-400"
                                >
                                    {{ statement.company.name }}
                                </Link>
                            </td>

                            <td data-label="treasurer">
                                {{ statement.treasurer?.name }}
                            </td>
                            <td data-label="currency from">
                                {{ statement.currencyfrom?.name }}
                            </td>
                           
                            <td v-if="Number(statement.deal_rate)>0 && Number(statement.currencyto.id)==1" data-label="USD Balance">
                                {{ formatPrice( Number(statement.paid_amount,8)*Number(statement.deal_rate,8)) }}
                            </td>
                            <td v-else-if="Number(statement.deal_rate)>0 && Number(statement.currencyto.id)==2" data-label="USD Balance">
                                {{ formatPrice( Number(statement.paid_amount)/Number(statement.deal_rate)) }}
                            </td>
                            <td v-else data-label="USD Balance">
                                {{0 }}
                            </td>
                            <td data-label="USD Balance">
                                {{ statement.currencyto?.name }}
                            </td>
                            <td data-label="IQD Balance">
                                {{ formatPrice( statement.paid_amount )}}
                            </td>
                            <td data-label="IQD Balance">
                                {{ statement.date }}
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
                                            route(
                                                'statement.edit',
                                                [statement.id,props.type]
                                            )
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
                                        @click="destroy(statement.id)"
                                    />
                                </BaseButtons>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="py-4">
                    <Pagination :data="statement" />
                </div>
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>
