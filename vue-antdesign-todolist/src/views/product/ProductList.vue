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
					:data="products.allProducts"
					:columns="table1Columns"
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

	import CardAuthorTable from '../../components/Cards/CardProductTable' ;

	const table1Columns = [
		{
			title: 'NAME',
			dataIndex: 'name',
			scopedSlots: { customRender: 'name' },
		},
		{
			title: 'DESCRIPTION',
			dataIndex: 'description',
			scopedSlots: { customRender: 'description' },
		},
		{
			title: 'BARCODE',
			dataIndex: 'barcode',
			scopedSlots: { customRender: 'barcode' },
		},
    {
      title: 'SYSTEM CODE',
      dataIndex: 'system_code',
      scopedSlots: { customRender: 'system_code' },
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
    {
      title: '',
      scopedSlots: { customRender: 'rprtBtn' },
      width: 50,
    },
	];

	export default ({

    computed: {
      ...mapState('product', ['products', 'current', 'pageSize']),
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
      this.getAllProducts({current: this.current, pageSize: this.pageSize});
    },

    methods: {
      ...mapActions('product', ['getAllProducts']),
    },
	})

</script>

<style lang="scss">
</style>