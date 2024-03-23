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
				<CardRecountTable
					:data="recounts"
					:columns="recountColumns"
				>
        </CardRecountTable>
<!--				 / Authors Table Card -->

			</a-col>
			<!-- / Authors Table Column -->

		</a-row>
		<!-- / Authors Table -->

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	import CardRecountTable from "../../../components/Cards/CardRecountTable";

	const recountColumns = [
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
      ...mapState('recount', ['recounts', 'current', 'pageSize']),
    },

		components: {
      CardRecountTable,
		},
		data() {
			return {
        recountColumns,
			}
		},

    created(){
      this.getAllRecounts({current: this.current, pageSize: this.pageSize});
    },

    methods: {
      ...mapActions('recount', ['getAllRecounts']),
    },
	})

</script>

<style lang="scss">
</style>