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
    employee: {
        type: Object,
        default: () => ({}),
    },
});

console.log(props.employee);
</script>


<template>
    <LayoutAuthenticated>
        <Head title="View companies" />
        <SectionMain>
            <SectionTitleLineWithButton
                :icon="mdiAccountKey"
                title="View user"
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
            <div class="flex flex-row space-x-2 mb-2">
                <BaseButtons>
                    <BaseButton
                        type="submit"
                        color="warning"
                        label="سلفە"
                    />
                </BaseButtons>
                <BaseButtons>
                    <BaseButton
                        type="submit"
                        color="info"
                        label="پاداشت"
                    />
                </BaseButtons>
                <BaseButtons>
                    <BaseButton
                        type="submit"
                        color="danger"
                        label="غەرامە"
                    />
                </BaseButtons>
                <BaseButtons>
                    <BaseButton
                        type="submit"
                        color="contrast"
                        label="مووچە"
                        :route-name="route('employee.index')"

                    />
                </BaseButtons>
              
                
            </div>
            <CardBox class="mb-6">
                <table dir="rtl">
                    <tbody>
                        <tr>
                            <td
                                class="p-4 pl-8 text-slate-500 dark:text-slate-400 hidden lg:block"
                            >
                                ناو
                            </td>
                            <td data-label="Name">
                                {{ employee[0].name }}
                            </td>
                        </tr>
                        <tr>
                            <td
                                class="p-4 pl-8 text-slate-500 dark:text-slate-400 hidden lg:block"
                            >
                                شوین
                            </td>
                            <td data-label="شوێن">
                                {{ employee[0].company_destination['name'] }}
                            </td>
                        </tr>
                        <tr>
                            <td
                                class="p-4 pl-8 text-slate-500 dark:text-slate-400 hidden lg:block"
                            >
                                پەلە
                            </td>
                            <td data-label="پلە">
                                {{ employee[0].company_position['name'] }}
                            </td>
                        </tr>
                        <tr>
                            <td
                                class="p-4 pl-8 text-slate-500 dark:text-slate-400 hidden lg:block"
                            >
                                بەش
                            </td>
                            <td data-label="بەش">
                                {{ employee[0].company_department['name'] }}
                            </td>
                        </tr>
                        <tr>
                            <td
                                class="p-4 pl-8 text-slate-500 dark:text-slate-400 hidden lg:block"
                            >
                                بەرواری دامەزراندن
                            </td>
                            <td data-label="بەرواری دامەزراندن">
                                {{ employee[0].hired_date }}
                            </td>
                        </tr>
                        <tr>
                            <td
                                class="p-4 pl-8 text-slate-500 dark:text-slate-400 hidden lg:block"
                            >
                                بەرواری کۆتایی 
                            </td>
                            <td data-label=" بەرواری کۆتایی ">
                                {{ employee[0].retirement_date }}
                          
                            </td>
                        </tr>
                        <tr>
                            <td
                                class="p-4 pl-8 text-slate-500 dark:text-slate-400 hidden lg:block"
                            >
                                مووچەی ئێستا  
                            </td>
                            <td data-label="مووچەی ئێستا">
                                {{ employee[0].current_salary[0].amount }}
                          
                            </td>
                        </tr>
                        <tr>
                            <td
                                class="p-4 pl-8 text-slate-500 dark:text-slate-400 hidden lg:block"
                            >
                                سولفەی ئێستا  
                            </td>
                            <td data-label="سولفەی ئێستا">
                                {{ employee[0].employee_advance[0]?.amount }}
                          
                            </td>
                        </tr>
             
                        <tr>
                            <td
                                class="p-4 pl-8 text-slate-500 dark:text-slate-400 hidden lg:block"
                            >
                                Created
                            </td>
                            <td data-label="Created">
                                {{
                                    new Date(
                                      //  company.created_at
                                    ).toLocaleString()
                                }}
                            </td>
                        </tr>
                    </tbody>
                </table>

<div class="flex justify-center m-12 bg-rose-600	">مووچەی  پێشوو</div>
                <table dir="rtl">
                    <tbody>
                        <tr v-for="salary in employee[0]['salary']">
                        
                            <td  data-label="بڕ ">
                                {{ salary.amount }}
                           
                          
                            </td>
                            <td  data-label=" بەروار">
                                {{ salary.date }}
                           
                          
                            </td>
                        </tr>
               
                    </tbody>
                </table>
<div class="flex justify-center m-12 bg-rose-600"> سولفەی پێشوو </div>
                <table dir="rtl">
                    <tbody>
                        <tr v-for="employee_advance in employee[0]['employee_advance']">
                        
                            <td  data-label="بڕ ">
                                {{ employee_advance.amount }}
                            </td>
                            <td  data-label=" بەروار">
                                {{ employee_advance.date }}

                            </td>
                        </tr>
               
                    </tbody>
                </table>
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>
