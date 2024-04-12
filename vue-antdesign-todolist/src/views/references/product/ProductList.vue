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
				<CardProductTable
					:data="products"
					:columns="productTableColumns"
				>
        </CardProductTable>
<!--				 / Authors Table Card -->

			</a-col>
			<!-- / Authors Table Column -->

		</a-row>
		<!-- / Authors Table -->

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	import CardProductTable from '../../../components/Cards/CardProductTable' ;

	const productTableColumns = [
		{
			title: 'NAME',
			dataIndex: 'name',
			scopedSlots: { customRender: 'name' },
		},
		{
			title: 'description',
			dataIndex: 'description',
			scopedSlots: { customRender: 'description' },
		},
    {
      title: 'quantity',
      dataIndex: 'quantity',
      scopedSlots: { customRender: 'quantity' },
    },
    {
      title: 'price',
      dataIndex: 'price',
      scopedSlots: { customRender: 'price' },
    },
    {
      title: 'cost',
      dataIndex: 'cost',
      scopedSlots: { customRender: 'cost' },
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
      ...mapState('product', ['products', 'current', 'pageSize']),
    },

		components: {
      CardProductTable,
		},
		data() {
			return {
        productTableColumns,
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