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

<!--        <div v-for="report in fullReport.finalReport">-->
<!--          <div>{{ report.product.name }}</div>-->
<!--          <div v-for="item in report.items">-->
<!--            <div>Cell number: {{ item.cell_number }}</div>-->
<!--            <div>Total amount: {{ item.totalAmount }}</div>-->
<!--          </div>-->
<!--        </div>-->

				<!-- Authors Table Card -->
				<CardAuthorTable
					:data="fullReport.finalReport"
					:columns="reportColumns"
				>
        </CardAuthorTable>
				<!-- / Authors Table Card -->

			</a-col>
			<!-- / Authors Table Column -->

		</a-row>
		<!-- / Authors Table -->

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	import CardReportTable from '../../components/Cards/CardReportTable' ;

	const reportColumns = [
		{
			title: 'PRODUCT',
			dataIndex: 'product',
			scopedSlots: { customRender: 'product' },
		},
		{
			title: 'TOTAL AMOUNT',
			dataIndex: 'totalAmount',
			scopedSlots: { customRender: 'totalAmount' },
		},
		{
			title: 'CELL ITEMS',
			dataIndex: 'items',
			scopedSlots: { customRender: 'items' },
		},
    {
      title: '',
      scopedSlots: { customRender: 'prdtcVwBtn' },
      width: 50,
    },
	];

	export default ({

    computed: {
      ...mapState('report', ['fullReport']),
    },

		components: {
			CardAuthorTable: CardReportTable,
		},
		data() {
			return {
				// Associating "Authors" table columns with its corresponding property.
				reportColumns: reportColumns,
			}
		},

    created(){
      this.getFullReport();
    },

    methods: {
      ...mapActions('report', ['getFullReport']),
    },
	})

</script>

<style lang="scss">
</style>