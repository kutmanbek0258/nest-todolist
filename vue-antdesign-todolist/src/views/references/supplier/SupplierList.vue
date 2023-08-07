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
				<CardSupplierTable
					:data="suppliers"
					:columns="supplierTableColumns"
				>
        </CardSupplierTable>
<!--				 / Authors Table Card -->

			</a-col>
			<!-- / Authors Table Column -->

		</a-row>
		<!-- / Authors Table -->

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	import CardSupplierTable from '../../../components/Cards/CardSupplierTable' ;

	const supplierTableColumns = [
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
      ...mapState('supplier', ['suppliers', 'current', 'pageSize']),
    },

		components: {
      CardSupplierTable,
		},
		data() {
			return {
        supplierTableColumns,
			}
		},

    created(){
      this.getAllSuppliers({current: this.current, pageSize: this.pageSize});
    },

    methods: {
      ...mapActions('supplier', ['getAllSuppliers']),
    },
	})

</script>

<style lang="scss">
</style>