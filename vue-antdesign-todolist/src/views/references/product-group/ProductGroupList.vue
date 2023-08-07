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
				<CardProductGroupTable
					:data="productGroups"
					:columns="productGroupTableColumns"
				>
        </CardProductGroupTable>
<!--				 / Authors Table Card -->

			</a-col>
			<!-- / Authors Table Column -->

		</a-row>
		<!-- / Authors Table -->

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	import CardProductGroupTable from '../../../components/Cards/CardProductGroupTable' ;

	const productGroupTableColumns = [
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
      ...mapState('productGroup', ['productGroups', 'current', 'pageSize']),
    },

		components: {
      CardProductGroupTable,
		},
		data() {
			return {
        productGroupTableColumns,
			}
		},

    created(){
      this.getAllProductGroups({current: this.current, pageSize: this.pageSize});
    },

    methods: {
      ...mapActions('productGroup', ['getAllProductGroups']),
    },
	})

</script>

<style lang="scss">
</style>