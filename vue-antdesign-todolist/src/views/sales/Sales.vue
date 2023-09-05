<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

		<!-- Authors Table -->
		<a-row :gutter="24" type="flex">

			<!-- Authors Table Column -->
			<a-col :span="24" class="mb-24">

        <a-col :span="12" :xl="6" class="mb-24" v-for="(salary, index) in salaries" :key="index">

          <!-- Salary Card -->
          <WidgetSalary
              :value="salary.value"
              :prefix="salary.prefix"
              :icon="salary.icon"
              :title="salary.title"
              :content="salary.content"
          >
          </WidgetSalary>
          <!-- / Salary Card -->

        </a-col>

			</a-col>
			<!-- / Authors Table Column -->

		</a-row>
		<!-- / Authors Table -->

	</div>
</template>

<script>

import WidgetSalary from "../../components/Widgets/WidgetSalary"

const salaries = [
  {
    value: 1231,
    prefix: "docs:",
    icon: `<svg fill="#ffffff" viewBox="-4.8 -4.8 33.60 33.60" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path fill-rule="evenodd" d="M16,6 L20,6 C21.1045695,6 22,6.8954305 22,8 L22,16 C22,17.1045695 21.1045695,18 20,18 L16,18 L16,19.9411765 C16,21.0658573 15.1177541,22 14,22 L4,22 C2.88224586,22 2,21.0658573 2,19.9411765 L2,4.05882353 C2,2.93414267 2.88224586,2 4,2 L14,2 C15.1177541,2 16,2.93414267 16,4.05882353 L16,6 Z M20,11 L16,11 L16,16 L20,16 L20,11 Z M14,19.9411765 L14,4.05882353 C14,4.01396021 13.9868154,4 14,4 L4,4 C4.01318464,4 4,4.01396021 4,4.05882353 L4,19.9411765 C4,19.9860398 4.01318464,20 4,20 L14,20 C13.9868154,20 14,19.9860398 14,19.9411765 Z M5,19 L5,17 L7,17 L7,19 L5,19 Z M8,19 L8,17 L10,17 L10,19 L8,19 Z M11,19 L11,17 L13,17 L13,19 L11,19 Z M5,16 L5,14 L7,14 L7,16 L5,16 Z M8,16 L8,14 L10,14 L10,16 L8,16 Z M11,16 L11,14 L13,14 L13,16 L11,16 Z M13,5 L13,13 L5,13 L5,5 L13,5 Z M7,7 L7,11 L11,11 L11,7 L7,7 Z M20,9 L20,8 L16,8 L16,9 L20,9 Z"></path>
                </g>
            </svg>`,
    title: "POS",
    content: {
      body: "Point of sale",
      link: "/sales/pos"
    },
  },
  {
    value: 49000,
    prefix: "docs:",
    icon: `<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-102.4 -102.4 716.80 716.80" xml:space="preserve" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <style type="text/css">  .st0{fill:#ffffff;}  </style>
                    <g>
                        <path class="st0" d="M77.609,448h52.781c7.516,0,13.609-6.094,13.609-13.609V315.094c0-7.516-6.094-13.609-13.609-13.609H77.609 c-7.516,0-13.609,6.094-13.609,13.609v119.297C64,441.906,70.094,448,77.609,448z"></path>
                        <path class="st0" d="M197.609,448h52.781c7.516,0,13.609-6.094,13.609-13.609V235.094c0-7.516-6.094-13.609-13.609-13.609h-52.781 c-7.516,0-13.609,6.094-13.609,13.609v199.297C184,441.906,190.094,448,197.609,448z"></path>
                        <path class="st0" d="M317.609,448h52.781c7.516,0,13.609-6.094,13.609-13.609V139.094c0-7.516-6.094-13.609-13.609-13.609h-52.781 c-7.516,0-13.609,6.094-13.609,13.609v295.297C304,441.906,310.094,448,317.609,448z"></path>
                        <path class="st0" d="M437.609,448h52.781c7.516,0,13.609-6.094,13.609-13.609V43.094c0-7.516-6.094-13.609-13.609-13.609h-52.781 c-7.516,0-13.609,6.094-13.609,13.609v391.297C424,441.906,430.094,448,437.609,448z"></path>
                        <path class="st0" d="M498.391,482H45.609C38.094,482,32,475.906,32,468.391V13.609C32,6.094,25.906,0,18.391,0h-4.781 C6.094,0,0,6.094,0,13.609v484.781C0,505.906,6.094,512,13.609,512h484.781c7.516,0,13.609-6.094,13.609-13.609v-2.781 C512,488.094,505.906,482,498.391,482z"></path>
                    </g>
                </g>
            </svg>`,
    title: "Daily sales",
    content: {
      body: "Daily sales list",
      link: "/sales-list"
    },
  },
] ;

export default ({
  components: {
    WidgetSalary,
  },
  data() {
    return {
      // Salary cards data
      salaries,
    }
  },
})

</script>

<style lang="scss">
</style>