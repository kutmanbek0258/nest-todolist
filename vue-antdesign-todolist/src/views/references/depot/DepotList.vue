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
				<CardDepotTable
					:data="depots"
					:columns="depotTableColumns"
				>
        </CardDepotTable>
<!--				 / Authors Table Card -->

			</a-col>
			<!-- / Authors Table Column -->

		</a-row>
		<!-- / Authors Table -->

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	import CardDepotTable from "../../../components/Cards/CardDepotTable";

	const depotTableColumns = [
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
      ...mapState('depot', ['depots', 'current', 'pageSize']),
    },

		components: {
      CardDepotTable,
		},
		data() {
			return {
        depotTableColumns,
			}
		},

    created(){
      this.getAllDepots({current: this.current, pageSize: this.pageSize});
    },

    methods: {
      ...mapActions('depot', ['getAllDepots']),
    },
	})

</script>

<style lang="scss">
</style>