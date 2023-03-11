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

				<!-- Authors Table Card -->
				<CardAuthorTable
					:data="receipts.allReceipts"
					:columns="table1Columns"
				>
        </CardAuthorTable>
				<!-- / Authors Table Card -->

			</a-col>
			<!-- / Authors Table Column -->

		</a-row>

    <a-pagination
        show-size-changer
        :current="current"
        :total="totalCount"
        @change="onChange"
        @showSizeChange="onShowSizeChange"
    />
		<!-- / Authors Table -->

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	import CardAuthorTable from '../../components/Cards/CardReceiptTable' ;

	const table1Columns = [
		{
			title: 'PRODUCT',
			dataIndex: 'product.name',
			scopedSlots: { customRender: 'product_name' },
		},
		{
			title: 'USER',
			dataIndex: 'user.fullName',
			scopedSlots: { customRender: 'user_name' },
		},
		{
			title: 'QUANTITY',
			dataIndex: 'quantity',
			scopedSlots: { customRender: 'quantity' },
		},
    {
      title: 'CELL NUMBER',
      dataIndex: 'cell_number',
      scopedSlots: { customRender: 'cell_number' },
    },
		{
			title: 'CREATED DATE',
			dataIndex: 'created_at',
			class: 'created_at',
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
      ...mapState('receipt', ['receipts', 'current', 'pageSize', 'totalCount'])
    },

		components: {
			CardAuthorTable,
		},
		data() {
			return {
				// Associating "Authors" table columns with its corresponding property.
				table1Columns: table1Columns,
			}
		},

    created(){
      this.getAllReceipts({current: this.current, pageSize: this.pageSize});
    },

    methods: {
      ...mapActions('receipt', ['getAllReceipts']),

      onChange(current) {
        this.getAllReceipts({current, pageSize: this.pageSize})
      },

      onShowSizeChange(current, pageSize) {
        this.getAllReceipts({current, pageSize})
      },

    },
	})

</script>

<style lang="scss">
</style>