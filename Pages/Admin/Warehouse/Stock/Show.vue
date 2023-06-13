<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3"
import {
  mdiAccountKey,
  mdiArrowLeftBoldOutline,
} from "@mdi/js"
import LayoutAuthenticated from "@/Layouts/LayoutAuthenticated.vue"
import SectionMain from "@/Components/SectionMain.vue"
import SectionTitleLineWithButton from "@/Components/SectionTitleLineWithButton.vue"
import CardBox from "@/Components/CardBox.vue"
import BaseButton from "@/Components/BaseButton.vue"

const props = defineProps({
  stock: {
    type: Object,
    default: () => ({}),
  },

})

console.log(props.stock);
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
          :route-name="route('stock.index')"
          :icon="mdiArrowLeftBoldOutline"
          label="Back"
          color="white"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <CardBox class="mb-6">
        <table>
          <tbody>
            <tr>
              <td
                class="
                  p-4
                  pl-8
                  text-slate-500
                  dark:text-slate-400
                  hidden
                  lg:block
                "
              >
                Name
              </td>
              <td data-label="Name">
                {{ stock.name}}
              </td>
            </tr>
            <tr>
              <td
                class="
                  p-4
                  pl-8
                  text-slate-500
                  dark:text-slate-400
                  hidden
                  lg:block
                "
              >
                Items
              </td>
              <td v-for="se in stock.stock_element" :key="se.id" data-label="element">
                {{(se.name)}}
              </td>
            </tr>
            <tr>
              <td
                class="
                  p-4
                  pl-8
                  text-slate-500
                  dark:text-slate-400
                  hidden
                  lg:block
                "
              >
                Created
              </td>
              <td data-label="Created">
                {{ new Date(stock.created_at).toLocaleString() }}
              </td>
            </tr>
          </tbody>
        </table>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
