<template>
    <div class="bg-slate-800 text-white">
        <!-- <button
            @click="printTable"
            class="ml-10 mt-3 bg-slate-700 text-white p-1 rounded-lg"
        >
            Print Scale
        </button> -->
        <div class="flex justify-center py-8 space-x-4 ">

        <BaseButton
        @click="printTable"
        :icon="mdiPrinter"
        label="Choose Printer"
        color="white"
        rounded-full
        small
    />
   
        <BaseButton
        :route-name="route('scale.index')"
        :icon="mdiArrowLeftBoldOutline"
        label="Back"
        color="white"
        rounded-full
        small
    />
    </div>
        <div ref="myTable" class="ppl">
            <div class="comp">
                <p class="po">Gold</p>
                <p class="inv" >Scale Invoice - {{ props.data[0].contract_type.name }}</p>
             </div>
            <div class="parentcont">
                <div class="container">
                    <div class="row">
                        <div class="cell">
                            <span class="tl"
                                >{{ props.data[0].truck_list.l_invoice_id }}
                            </span>
                            : ژمارە
                        </div>
                        <div class="cell cell2">
                            <span class="tl"
                                >{{ props.data[0].company.name }}
                            </span>
                            : کڕیار
                        </div>
                    </div>

                    <div class="row">
                        <div class="cell">
                            <span class="tl"
                                >{{ props.data[0].product.name }}
                            </span>
                            : کاڵا
                        </div>
                        <div class="cell cell2">
                            <span class="tl"
                                >{{ props.data[0].driver.truck_number }}
                            </span>
                            : ژمارەی ئۆتۆمبێل
                        </div>
                    </div>
                    <div class="row">
                        <div class="cell">
                            <span class="tl">{{ props.data[0].scale1 }} </span>
                            : کێشی یەکەم
                        </div>
                        <div class="cell cell2">
                            <span class="tl"
                                >{{ props.data[0].driver.name }}
                            </span>
                            : ناوی شۆفێر
                        </div>
                    </div>
                    <div class="row">
                        <div class="cell">
                            <span class="tl">{{ props.data[0].scale2 }} </span>
                            : کێشی دووەم
                        </div>
                        <div class="cell cell2">
                            <span class="tl"
                                >{{ props.data[0].driver.phone }}
                            </span>
                            : مۆبایل
                        </div>
                    </div>
                    <div class="row">
                        <div class="cell">
                            <span class="tl">{{ weight_first }} </span>
                            : کێشی پوخت
                        </div>
                        <div class="cell cell2">
                            <span class="tl">{{ props.data[0].date1 }} </span> :
                            کاتی هاتن
                        </div>
                    </div>
                    <div class="row">
                        <div class="cell">
                            <span class="tl">{{ weight_second }} </span>
                            : کێشی بارکردن
                        </div>
                        <div class="cell cell2">
                            <span class="tl">{{ props.data[0].date2 }} </span> :
                            کاتی ڕۆیشتن
                        </div>
                    </div>
                    <div class="row">
                        <div class="cell">
                            <span
                                class="tl"
                                :class="
                                    differnce >= 0
                                        ? 'text-green-400'
                                        : 'text-red-400'
                                "
                            >
                                {{ differnce == 0 ? "" : differnce }}
                            </span>
                            <span class="tr"> : جیاوازی </span>
                        </div>
                        <div class="cell cell2">
                            <span class="tl"
                                >{{ props.data[0].first_destination.name }}
                            </span>
                            : شوێنی بارکردن
                        </div>
                    </div>
                    <div class="row">
                        <div class="cell">
                            <span class="tl">{{ props.data[0]?.liter }} </span>
                            : لیتری بارکردن
                        </div>
                        <div class="cell cell2">
                            <span class="tl"
                                >{{ props.data[0].second_destination.name }}
                            </span>
                            : شوێنی بەتاڵکردن
                        </div>
                    </div>
                    <div class="row">
                        <div class="cell">
                            <span class="tl">{{ props.data[0]?.liter }} </span>
                            : لیتری بەتاڵکردن
                        </div>
                        <div class="cell cell2">
                            <span class="tl">{{ props.data[0].note }} </span> :
                            تێبینی
                        </div>
                    </div>
                    <div class="row">
                        <div class="cell"></div>
                        <div class="cell cell2">
                            <span class="tl"
                                >{{ $page.props.auth.user.name }}
                            </span>
                            : ناوی کارمەند
                        </div>
                    </div>
                    <div class="row">
                        <div class="cell"></div>
                        <div class="cell cell2">
                            <span class="tl"
                                >{{ props.data[0].truck_list.date }}
                            </span>
                           : بەروار
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    mdiArrowLeftBoldOutline,
    mdiPrinter
} from "@mdi/js";

import BaseButton from "@/Components/BaseButton.vue";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

console.log(props.data);
const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
});
let weight_first = computed(() => {
    if (
        props.data[0].contract.contract_type_id === 2 ||
        props.data[0].contract.contract_type_id === 5
    ) {
        return props.data[0].truck_list.first_weight;
    }
    if (props.data[0].contract.contract_type_id === 1) {
        return props.data[0].truck_list.second_weight;
    }
});
let weight_second = computed(() => {
    if (
        props.data[0].contract.contract_type_id === 2 ||
        props.data[0].contract.contract_type_id === 5
    ) {
        return props.data[0].truck_list.second_weight;
    }
    if (props.data[0].contract.contract_type_id === 1) {
        return props.data[0].truck_list.first_weight;
    }
});

let differnce = computed(() => {
    if (props.data[0].contract.contract_type_id === 2) {
        return (
            props.data[0].truck_list.first_weight -
            props.data[0].truck_list.second_weight
        );
    }
    if (props.data[0].contract.contract_type_id === 1) {
        return (
            props.data[0].truck_list.second_weight -
            props.data[0].truck_list.first_weight
        );
    }
});

const myTable = ref(null);

const printTable = () => {
    const table = myTable.value;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
    <html>
      <head>
        <title>Print Table</title>
        <style>
          @media print {
            @page {
              size: 16.002cm 15.0114cm;
            }
            p{
                font-size:0.7rem
            }
            .po{
            }
            h4{
                margin-top:5px;
            }
            .ppl{
                font-size:0.7rem;
                font-weight: 200;
                font-weight: 600;

            }
            .comp{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin:0;
                font-weight: 600;
            }
            .inv{
              margin:0;
              margin-bottom:5px;
              font-weight: 600;
            }
            .container {
                display: flex;
                flex-direction: column;
                border: 1px dashed gray;
                padding-left:  15px;
                padding-right:  15px;
                padding-top:8px;
                padding-bottom:5px;
                margin-bottom:6px;
                font-weight: 600;
            }
            .container .row {
             margin-left: 0.3rem;
             margin-right: 0.3rem;
}
        .row {
            display: flex;

        }

        .cell {
            display: flex;
            flex: 1;
            padding: 8px 8px;
        }
        .tl {
            flex: 1;
            margin-right: 2rem;
        }
        .tr {
            align-self: flex-end;
        }
            .cell2 {
                 margin-left: 2rem;
                }
        </style>
      </head>
      <body>


        ${table.outerHTML}
      </body>
    </html>
  `);
    printWindow.document.close();
    printWindow.onload = () => {

        printWindow.print();
       printWindow.close();
    };
};


</script>
<style>
.parentcont {
    width: 65rem;
    height: 40rem;
    padding: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
}
.comp {
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
}
.container {
    display: flex;
    flex-direction: column;
    border: 1px dashed black;
    padding: 40px;
}

.row {
    display: flex;
}
.container .row {
    margin-top: 1rem;
    margin-left: 2rem;
}
.cell {
    display: flex;
    flex: 1;
    padding: 5px 10px;
}
.tl {
    flex: 1;
    margin-right: 10px;
}

.cell2 {
    margin-left: 100px;
}
</style>
