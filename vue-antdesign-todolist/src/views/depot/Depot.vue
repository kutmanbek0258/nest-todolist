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
    icon: `<svg fill="#ffffff" viewBox="-6.4 -6.4 44.80 44.80" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>in</title> <path d="M0 26.016q0 2.496 1.76 4.224t4.256 1.76h20q2.464 0 4.224-1.76t1.76-4.224v-20q0-2.496-1.76-4.256t-4.224-1.76h-20q-2.496 0-4.256 1.76t-1.76 4.256v4h4v-4q0-0.832 0.576-1.408t1.44-0.608h20q0.8 0 1.408 0.608t0.576 1.408v20q0 0.832-0.576 1.408t-1.408 0.576h-20q-0.832 0-1.44-0.576t-0.576-1.408v-4h-4v4zM0 18.016h8v4l8-6.016-8-5.984v4h-8v4z"></path> </g></svg>`,
    title: "Reception",
    content: {
      body: "Reception of goods",
      link: "/depot/receipts"
    },
  },
  {
    value: 49000,
    prefix: "docs:",
    icon: `<svg fill="#ffffff" viewBox="-6.4 -6.4 44.80 44.80" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>out</title> <path d="M0 26.016q0 2.496 1.76 4.224t4.256 1.76h20q2.464 0 4.224-1.76t1.76-4.224v-20q0-2.496-1.76-4.256t-4.224-1.76h-20q-2.496 0-4.256 1.76t-1.76 4.256v4.992l4-2.496v-2.496q0-0.832 0.576-1.408t1.44-0.608h20q0.8 0 1.408 0.608t0.576 1.408v20q0 0.832-0.576 1.408t-1.408 0.576h-20q-0.832 0-1.44-0.576t-0.576-1.408v-2.496l-4-2.496v4.992zM0 16l8 6.016v-4h8v-4h-8v-4z"></path> </g></svg>`,
    title: "Write-off",
    content: {
      body: "Write-off of goods",
      link: "/write-off"
    },
  },
  {
    value: 4900,
    prefix: "docs:",
    icon: `<svg fill="#ffffff" height="200px" width="200px" version="1.2" baseProfile="tiny" id="ABACUS_by_Adioma" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-51.2 -51.2 358.40 358.40" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5,5v246h246V5H5z M237.3,18.7v59.1h-16.6c-1.2-12.8-8-22.6-16.2-22.6c-8.2,0-15,9.8-16.2,22.6h-81.6 c-1.2-12.8-8-22.6-16.2-22.6s-15,9.8-16.2,22.6h-6.4c-1.2-12.8-8-22.6-16.2-22.6s-15,9.8-16.2,22.6H18.7V18.7H237.3z M220.7,171.1 c-1.2-12.8-8-22.6-16.2-22.6c-8.2,0-15,9.8-16.2,22.6H182c-1.2-12.8-8-22.6-16.2-22.6c-8.2,0-15,9.8-16.2,22.6h-6.4 c-1.2-12.8-8-22.6-16.2-22.6s-15,9.8-16.2,22.6H18.7V85.3h17.1c1.1,13,7.9,23.1,16.2,23.1s15.1-10.1,16.2-23.1h6.3 c1.1,13,7.9,23.1,16.2,23.1s15.1-10.1,16.2-23.1h81.5c1.1,13,7.9,23.1,16.2,23.1c8.3,0,15.1-10.1,16.2-23.1h16.6v85.9H220.7z M18.7,237.3v-58.7h92.2c1.1,13,7.9,23.1,16.2,23.1s15.1-10.1,16.2-23.1h6.3c1.1,13,7.9,23.1,16.2,23.1c8.3,0,15.1-10.1,16.2-23.1 h6.3c1.1,13,7.9,23.1,16.2,23.1c8.3,0,15.1-10.1,16.2-23.1h16.6v58.7H18.7z"></path> </g></svg>`,
    title: "Recount",
    content: {
      body: "Recalculation of goods",
      link: "/recount"
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