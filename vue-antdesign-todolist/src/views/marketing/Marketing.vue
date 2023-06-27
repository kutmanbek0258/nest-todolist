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
    icon: `<svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-12.8 -12.8 89.60 89.60" enable-background="new 0 0 64 64" xml:space="preserve" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path fill="#ffffff" d="M62.828,29.172l-28-28C34.078,0.422,33.062,0,32,0H4C1.789,0,0,1.789,0,4v28 c0,1.062,0.422,2.078,1.172,2.828l28,28C29.953,63.609,30.977,64,32,64s2.047-0.391,2.828-1.172l28-28 C64.391,33.266,64.391,30.734,62.828,29.172z M20,28.004c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S24.418,28.004,20,28.004z"></path>
                </g>
            </svg>`,
    title: "Prices",
    content: {
      body: "Create products prices",
      link: "/price-list"
    },
  },
  {
    value: 49000,
    prefix: "docs:",
    icon: `<svg viewBox="-204.8 -204.8 1433.60 1433.60" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path fill="#ffffff" d="m64 448 832-320-128 704-446.08-243.328L832 192 242.816 545.472 64 448zm256 512V657.024L512 768 320 960z"></path>
                </g>
            </svg>`,
    title: "Promotions",
    content: {
      body: "Create promotions",
      link: "/promotions"
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