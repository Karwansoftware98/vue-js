<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3";
import { mdiAccountKey, mdiArrowLeftBoldOutline } from "@mdi/js";
import LayoutAuthenticated from "@/Layouts/LayoutAuthenticated.vue";
import SectionMain from "@/Components/SectionMain.vue";
import SectionTitleLineWithButton from "@/Components/SectionTitleLineWithButton.vue";
import CardBox from "@/Components/CardBox.vue";
import BaseButton from "@/Components/BaseButton.vue";
import BaseButtons from "@/Components/BaseButtons.vue";

const props = defineProps({
    advance: {
        type: Object,
        default: () => ({}),
    },
    employee: {
        type: Object,
        default: () => ({}),
    },
});
function formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
console.log(props.employee);
</script>


<template>
    <LayoutAuthenticated>
        <Head title="View advance detial" />
        <SectionMain>
            <SectionTitleLineWithButton
                :icon="mdiAccountKey"
                title="Advance Detail"
                main
            >
                <BaseButton
                    :route-name="route('companies.index')"
                    :icon="mdiArrowLeftBoldOutline"
                    label="Back"
                    color="white"
                    rounded-full
                    small
                />
            </SectionTitleLineWithButton>
       
            <CardBox class="mb-6">
                <table dir="rtl">
                    <tbody>
                        <tr>
                            <td
                                class="p-4 pl-8 text-slate-500 dark:text-slate-400 hidden lg:block"
                            >
                                ناو
                            </td>
                            <td data-label="ناوی کارمەند">
                                {{ employee[0].name }}
                            </td>
                        </tr>
                        <tr>
                            <td
                                class="p-4 pl-8 text-slate-500 dark:text-slate-400 hidden lg:block"
                            >
                                بەرواری پارەدان
                            </td>
                            <td data-label="بەرواری پارەدان">
                                {{ advance[0].date }}
                            </td>
                        </tr>
                        <tr>
                            <td
                                class="p-4 pl-8 text-slate-500 dark:text-slate-400 hidden lg:block"
                            >
                                بڕی سلفە
                            </td>
                            <td data-label="بڕی سلفە">
                                {{ formatPrice(advance[0].amount) }}
                            </td>
                        </tr>
                        <tr>
                            <td
                                class="p-4 pl-8 text-slate-500 dark:text-slate-400 hidden lg:block"
                            >
                            کۆئ وەرگیراو 
                            </td>
                            <td data-label="کۆئ وەرگیراو">
                                {{ formatPrice(advance[0].balance) }}
                            </td>
                        </tr>
                        <tr>
                            <td
                                class="p-4 pl-8 text-slate-500 dark:text-slate-400 hidden lg:block"
                            >
                                جۆری دراو
                            </td>
                            <td data-label="جۆری دراو" v-if="advance[0].currency_id==1">
                                دۆلار
                            </td>
                            <td data-label="جۆری دراو" v-else-if="advance[0].currency_id==2">
                                دینار
                            </td>
                        </tr>
                  
                
                    </tbody>
                </table>

<div class="flex justify-center m-12 bg-rose-600	">  پارەی وەرگیراو</div>
                <table dir="rtl">
                    <tbody>
              
                
                        <tr v-for="transaction in advance[0]['employee_detail']">
                    
                            <td  data-label="بڕ ">
                                {{ formatPrice(transaction.amount) }}
                           
                          
                            </td>

                    
                            <td  data-label=" بەروار">
                                {{ transaction.date }}
                           
                          
                            </td>
                        </tr>
               
                    </tbody>
                </table>

            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>
