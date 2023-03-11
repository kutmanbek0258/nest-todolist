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
					:data="postings.allPostings"
					:columns="postingTableColumns"
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

	import CardAuthorTable from '../../components/Cards/CardPostingTable' ;

	const postingTableColumns = [
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
      ...mapState('posting', ['postings', 'current', 'pageSize']),
    },

		components: {
			CardAuthorTable,
		},
		data() {
			return {
				postingTableColumns,
			}
		},

    created(){
      this.getAllPostings({current: this.current, pageSize: this.pageSize});
    },

    methods: {
      ...mapActions('posting', ['getAllPostings']),
    },
	})

</script>

<style lang="scss">
</style>