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
				<CardShopTable
					:data="shops"
					:columns="shopTableColumns"
				>
        </CardShopTable>
<!--				 / Authors Table Card -->

			</a-col>
			<!-- / Authors Table Column -->

		</a-row>
		<!-- / Authors Table -->

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	import CardShopTable from "../../../components/Cards/CardShopTable";

	const shopTableColumns = [
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
      ...mapState('shop', ['shops', 'current', 'pageSize']),
    },

		components: {
      CardShopTable,
		},
		data() {
			return {
        shopTableColumns,
			}
		},

    created(){
      this.getAllShops({current: this.current, pageSize: this.pageSize});
    },

    methods: {
      ...mapActions('shop', ['getAllShops']),
    },
	})

</script>

<style lang="scss">
</style>