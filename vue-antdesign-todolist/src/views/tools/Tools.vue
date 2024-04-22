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
    prefix: "items:",
    icon: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 14L3 14" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M11 18H3" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M20 16.5L17.5 14M17.5 14L15 16.5M17.5 14V20" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 6L13.5 6M20 6L17.75 6" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M20 10L9.5 10M3 10H5.25" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>`,
    title: "Upload product list",
    content: {
      body: "Upload product list",
      link: "/tools/upload-product-list"
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