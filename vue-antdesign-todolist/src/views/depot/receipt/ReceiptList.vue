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
				<CardReceiptTable
					:data="receipts"
					:columns="receiptColumns"
				>
        </CardReceiptTable>
<!--				 / Authors Table Card -->

			</a-col>
			<!-- / Authors Table Column -->

		</a-row>
		<!-- / Authors Table -->

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	import CardReceiptTable from "../../../components/Cards/CardReceiptTable";

	const receiptColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      scopedSlots: { customRender: 'ID' },
      width: 70,
    },
		{
			title: 'DEPOT',
			dataIndex: 'depotname',
			scopedSlots: { customRender: 'depot' },
		},
		{
			title: 'SHOP',
			dataIndex: 'shopname',
			scopedSlots: { customRender: 'shop' },
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
      ...mapState('receipt', ['receipts', 'current', 'pageSize']),
    },

		components: {
      CardReceiptTable,
		},
		data() {
			return {
        receiptColumns,
			}
		},

    created(){
      this.getAllReceipts({current: this.current, pageSize: this.pageSize});
    },

    methods: {
      ...mapActions('receipt', ['getAllReceipts']),
    },
	})

</script>

<style lang="scss">
</style>