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
				<CardCashRegisterTable
					:data="cashRegisters"
					:columns="cashRegisterTableColumns"
				>
        </CardCashRegisterTable>
<!--				 / Authors Table Card -->

			</a-col>
			<!-- / Authors Table Column -->

		</a-row>
		<!-- / Authors Table -->

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	import CardCashRegisterTable from "../../../components/Cards/CardCashRegisterTable";

	const cashRegisterTableColumns = [
		{
			title: 'OFD',
			dataIndex: 'ofd',
			scopedSlots: { customRender: 'ofd' },
		},
		{
			title: 'PRINTER',
			dataIndex: 'printer',
			scopedSlots: { customRender: 'printer' },
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
      ...mapState('cashRegister', ['cashRegisters', 'current', 'pageSize']),
    },

		components: {
      CardCashRegisterTable,
		},
		data() {
			return {
        cashRegisterTableColumns,
			}
		},

    created(){
      this.getAllCashRegisters({current: this.current, pageSize: this.pageSize});
    },

    methods: {
      ...mapActions('cashRegister', ['getAllCashRegisters']),
    },
	})

</script>

<style lang="scss">
</style>