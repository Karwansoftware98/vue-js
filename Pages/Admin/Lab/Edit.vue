<script setup>
import { Head, Link, router, useForm } from "@inertiajs/vue3";
import { mdiAccountKey, mdiArrowLeftBoldOutline, mdiEye } from "@mdi/js";
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
import VueMultiselect from "vue-multiselect";
import { reactive, ref } from "@vue/reactivity";
import LoadContractModal from "@/Components/LoadContractModal.vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { computed, onMounted, watch } from "@vue/runtime-core";

const props = defineProps({
    data: {
        type: Object,
        default: () => [],
    },
    driver: {
        type: Object,
        default: () => {},
    },
    filters: Object,
});

const form = reactive({
    id: props.data.lab[0].id,
    truck_list_id: props.data.lab[0].truck_list_id,
    second_destination: props.data.lab[0].lab_destination.id,
    water: props.data.lab[0].water,
    sulfur: props.data.lab[0].sulfur,
    total_sediment: props.data.lab[0].total_sediment,
    flash_ponit_c: props.data.lab[0].flash_ponit_c,
    viscosity: props.data.lab[0].viscosity,
    spgr: props.data.lab[0].spgr,
    octane_number: props.data.lab[0].octane_number,
    penetration: props.data.lab[0].penetration,
    ductility: props.data.lab[0].ductility,
    wsoftening_point: props.data.lab[0].wsoftening_point,
    solubility: props.data.lab[0].solubility,
    loss_on_heating: props.data.lab[0].loss_on_heating,
    r_penetration: props.data.lab[0].r_penetration,
    r_ductility: props.data.lab[0].r_ductility,
    status: "",
});
console.log(props.data.status[0].id);
onMounted(() => {
    form.second_destination = props.data.stock.find(
        (stock) => stock.id === props.data.lab[0].lab_destination
    );
    form.status = props.data.status.find(
        (status) => status.id === props.data.status[0].id
    );
});

let submit = () => {
    router.post(`/admin/lab/${props.data.lab[0].id}`, {
        _method: "put",
        form,
    });
};
let canBeChanged = computed(() => {
    if (
        props.data.load[0].status.id == 4 ||
        props.data.load[0].status.id == 5 ||
        props.data.load[0].status.id == 6
    ) {
        return false;
    }
    return true;
});
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<template>
    <LayoutAuthenticated label="Updating Lab">
        <Head title="Updating Lab" />

        <SectionMain>
            <SectionTitleLineWithButton
                :icon="mdiAccountKey"
                title="Updating Lab"
                main
                class="flex flex-row"
            >
                <BaseButton
                    :route-name="route('lab.index')"
                    :icon="mdiArrowLeftBoldOutline"
                    label="Back"
                    color="white"
                    rounded-full
                    small
                    class="shadow-lg shadow-gray-500/50"
                />
            </SectionTitleLineWithButton>

            <form @submit.prevent="submit" class="mt-14">
                <div
                    class="block lg:flex lg:flex-row lg:space-x-2 border rounded-md p-6 mb-4"
                >
                    <!-- Driver start -->
                    <div class="flex flex-col space-y-1 p-2 grow">
                        <div class="flex flex-col grow">
                            <label for="water">Water</label>
                            <input
                                v-model="form.water"
                                id="water"
                                placeholder="water"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                        </div>

                        <div class="flex flex-col grow">
                            <label for="sulfur">Sulfur</label>
                            <input
                                v-model="form.sulfur"
                                placeholder="sulfur"
                                id="sulfur"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                        </div>

                        <div class="flex flex-col grow">
                            <label for="total_sediment">Total Sediment</label>
                            <input
                                v-model="form.total_sediment"
                                id="total_sediment"
                                placeholder="total sediment"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                        </div>
                        <div class="flex flex-col grow">
                            <label for="flash_ponit_c">Flash Point C</label>
                            <input
                                v-model="form.flash_ponit_c"
                                id="flash_ponit_c"
                                placeholder="flash ponit c"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                        </div>
                    </div>

                    <div class="flex flex-col space-y-1 p-2 grow">
                        <div class="flex flex-col grow">
                            <label for="viscosity">Viscosity</label>
                            <input
                                v-model="form.viscosity"
                                placeholder="viscosity"
                                id="viscosity"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                        </div>

                        <div class="flex flex-col grow">
                            <label for="spgr">SPGR</label>
                            <input
                                v-model="form.spgr"
                                id="spgr"
                                placeholder="spgr"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                        </div>
                        <div class="flex flex-col grow">
                            <label for="octane_number">Octan Number</label>
                            <input
                                v-model="form.octane_number"
                                id="octane_number"
                                placeholder="octane number"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                        </div>

                        <div class="flex flex-col grow">
                            <label for="penetration">Penetration</label>
                            <input
                                v-model="form.penetration"
                                placeholder="penetration"
                                id="penetration"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                        </div>
                    </div>
                    <div class="flex flex-col space-y-1 p-2 grow">
                        <div class="flex flex-col grow">
                            <label for="ductility">Ductility</label>
                            <input
                                v-model="form.ductility"
                                id="ductility"
                                placeholder="ductility"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                        </div>
                        <div class="flex flex-col grow">
                            <label for="wsoftening_point"
                                >WSoftening Point</label
                            >
                            <input
                                v-model="form.wsoftening_point"
                                id="wsoftening_point"
                                placeholder="wsoftening point"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                        </div>

                        <div class="flex flex-col grow">
                            <label for="solubility">Solubility</label>
                            <input
                                v-model="form.solubility"
                                placeholder="solubility"
                                id="solubility"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                        </div>

                        <div class="flex flex-col grow">
                            <label for="loss_on_heating">Loss on Heating</label>
                            <input
                                v-model="form.loss_on_heating"
                                id="loss_on_heating"
                                placeholder="loss on heating"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                        </div>
                    </div>
                    <div class="flex flex-col space-y-1 p-2 grow">
                        <div class="flex flex-col grow">
                            <label for="r_penetration">R Penetration</label>
                            <input
                                v-model="form.r_penetration"
                                id="r_penetration"
                                placeholder="r penetration"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                        </div>

                        <div class="flex flex-col grow">
                            <label for="r_ductility">R Ductility</label>
                            <input
                                v-model="form.r_ductility"
                                placeholder="r ductility"
                                id="r_ductility"
                                class="w-full pl-3 py-2 border border-gray-300 text-gray-700 rounded shadow-md shadow-cyan-300/50"
                            />
                        </div>

                        <div
                            class="flex flex-col grow"
                            :class="[
                                canBeChanged
                                    ? ''
                                    : 'hover:cursor-not-allowed text-white',
                            ]"
                        >
                            <label for="second_destination"
                                >Second Destination</label
                            >
                            <VueMultiselect
                                :disabled="!canBeChanged"
                                v-model="form.second_destination"
                                :options="data.stock"
                                track-by="id"
                                id="second_destination"
                                label="name"
                                :options-limit="6"
                                class="shadow-md shadow-cyan-300/50"
                            >
                            </VueMultiselect>
                        </div>
                        <div
                            class="flex flex-col grow"
                            :class="[
                                canBeChanged
                                    ? ''
                                    : 'hover:cursor-not-allowed text-white',
                            ]"
                        >
                            <label for="second_destination">Status </label>
                            <VueMultiselect
                                :disabled="!canBeChanged"
                                v-model="form.status"
                                :options="data.status"
                                track-by="id"
                                id="second_destination"
                                label="name"
                                :options-limit="6"
                                class="shadow-md shadow-cyan-300/50"
                            >
                            </VueMultiselect>
                        </div>
                    </div>
                    <!-- Load End -->
                </div>

                <!-- load information -->
                <div
                    class="block lg:flex lg:flex-row lg:space-x-2 border rounded-md p-6"
                >
                    <!-- Driver start -->
                    <div class="flex flex-col p-6 space-y-2 grow">
                        <div class="flex flex-col grow">
                            <p for="truck_number">
                                Truck Number:
                                <span class="text-green-400">
                                    {{ props.data.load[0].driver.truck_number }}
                                </span>
                            </p>
                        </div>
                        <div class="flex flex-col grow">
                            <p for="truck_number">
                                Truck Number:
                                <span class="text-green-400">
                                    {{ props.data.load[0].driver.name }}
                                </span>
                            </p>
                        </div>
                        <div class="flex flex-col grow">
                            <p for="truck_number">
                                Truck Number:
                                <span class="text-green-400">
                                    {{ props.data.load[0].driver.phone }}
                                </span>
                            </p>
                        </div>
                    </div>
                    <!-- Driver End -->

                    <!-- Load start -->

                    <!-- <div
                        class="block mt-2 space-y-2 lg:space-y-0 lg:mt-0 lg:flex lg:flex-row w-full p-6 lg:w-64 lg:space-x-2 grow"
                    > -->
                    <div class="p-4 space-y-2 lg:w-72 grow">
                        <div class="flex flex-col grow">
                            <p class="text-sm">
                                Company Name :
                                <span class="text-green-400">
                                    {{ props.data.load[0].company.name }}
                                </span>
                            </p>
                        </div>

                        <div class="flex flex-col grow">
                            <p class="text-sm">
                                First Destination :
                                <span class="text-green-400">
                                    {{
                                        props.data.load[0].first_destination
                                            .name
                                    }}
                                </span>
                            </p>
                        </div>
                        <div class="flex flex-col grow">
                            <p class="text-sm">
                                Second Destination :
                                <span class="text-green-400">
                                    {{
                                        props.data.load[0].second_destination
                                            .name
                                    }}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div class="p-4 space-y-2 grow">
                        <div class="flex flex-col grow">
                            <p class="text-sm">
                                Date:
                                <span class="text-green-400">
                                    {{ props.data.load[0].date }}
                                </span>
                            </p>
                        </div>
                        <div class="flex flex-col grow">
                            <p class="text-sm">
                                First Weight :
                                <span class="text-green-400">
                                    {{ props.data.load[0].first_weight }}
                                </span>
                            </p>
                        </div>
                        <div class="flex flex-col grow">
                            <p class="text-sm">
                                Second Weight :
                                <span class="text-green-400">
                                    {{ props.data.load[0].second_weight }}
                                </span>
                            </p>
                        </div>
                        <div class="flex flex-col grow">
                            <p class="text-sm">
                                Status :
                                <span class="text-green-400">
                                    {{ props.data.load[0].status.name }}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Load End -->
                <!-- </div> -->

                <BaseButtons class="mt-10 justify-end">
                    <BaseButton
                        type="submit"
                        color="info"
                        label="Submit"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        class="shadow-lg shadow-blue-300/50"
                    />
                </BaseButtons>
            </form>
        </SectionMain>
    </LayoutAuthenticated>
</template>
