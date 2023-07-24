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

<!--				 Authors Table Card -->
				<CardSalesmanTable
					:data="salesmen"
					:columns="salesmanTableColumns"
				>
        </CardSalesmanTable>
<!--				 / Authors Table Card -->

			</a-col>
			<!-- / Authors Table Column -->

		</a-row>
		<!-- / Authors Table -->

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

  import CardSalesmanTable from "../../../components/Cards/CardSalesmanTable";

	const salesmanTableColumns = [
		{
			title: 'NAME',
			dataIndex: 'fullname',
			scopedSlots: { customRender: 'fullname' },
		},
		{
			title: 'COMPANY',
			dataIndex: 'companyname',
			scopedSlots: { customRender: 'companyname' },
		},
    {
      title: '',
      scopedSlots: { customRender: 'editBtn' },
      width: 50,
    },
    {
      title: '',
      scopedSlots: { customRender: 'dltBtn' },
      width: 50,
    },
	];

	export default ({

    computed: {
      ...mapState('salesman', ['salesmen', 'current', 'pageSize']),
    },

		components: {
      CardSalesmanTable,
		},
		data() {
			return {
        salesmanTableColumns,
			}
		},

    created(){
      this.getAllSalesmen({current: this.current, pageSize: this.pageSize});
    },

    methods: {
      ...mapActions('salesman', ['getAllSalesmen']),
    },
	})

</script>

<style lang="scss">
</style>