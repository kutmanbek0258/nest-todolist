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
				<CardWriteOffTable
					:data="writeOffs"
					:columns="writeOffColumns"
				>
        </CardWriteOffTable>
<!--				 / Authors Table Card -->

			</a-col>
			<!-- / Authors Table Column -->

		</a-row>
		<!-- / Authors Table -->

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	import CardWriteOffTable from "../../../components/Cards/CardWriteOffTable";

	const writeOffColumns = [
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
      title: 'CERATED DATE',
      dataIndex: 'created_at',
      scopedSlots: { customRender: 'created_ad' },
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
      ...mapState('writeOff', ['writeOffs', 'current', 'pageSize']),
    },

		components: {
      CardWriteOffTable,
		},
		data() {
			return {
        writeOffColumns,
			}
		},

    created(){
      this.getAllWriteOffs({current: this.current, pageSize: this.pageSize});
    },

    methods: {
      ...mapActions('writeOff', ['getAllWriteOffs']),
    },
	})

</script>

<style lang="scss">
</style>