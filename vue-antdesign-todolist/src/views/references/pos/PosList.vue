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
				<CardPosTable
					:data="poses"
					:columns="posTableColumns"
				>
        </CardPosTable>
<!--				 / Authors Table Card -->

			</a-col>
			<!-- / Authors Table Column -->

		</a-row>
		<!-- / Authors Table -->

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	import CardPosTable from "../../../components/Cards/CardPosTable";

	const posTableColumns = [
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
      ...mapState('pos', ['poses', 'current', 'pageSize']),
    },

		components: {
      CardPosTable,
		},
		data() {
			return {
        posTableColumns,
			}
		},

    created(){
      this.getAllPoses({current: this.current, pageSize: this.pageSize});
    },

    methods: {
      ...mapActions('pos', ['getAllPoses']),
    },
	})

</script>

<style lang="scss">
</style>