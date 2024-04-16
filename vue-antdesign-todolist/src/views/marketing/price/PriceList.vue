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
				<CardPriceTable
					:data="prices"
					:columns="priceColumns"
				>
        </CardPriceTable>
<!--				 / Authors Table Card -->

			</a-col>
			<!-- / Authors Table Column -->

		</a-row>
		<!-- / Authors Table -->

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	import CardPriceTable from "../../../components/Cards/CardPriceTable";

	const priceColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      scopedSlots: { customRender: 'ID' },
      width: 70,
    },
		{
			title: 'SHOP',
			dataIndex: 'shopname',
			scopedSlots: { customRender: 'shop' },
		},
    // {
    //   title: 'CERATED DATE',
    //   dataIndex: 'created_at',
    //   scopedSlots: { customRender: 'created_ad' },
    // },
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

    components: {
      CardPriceTable,
    },

    computed: {
      ...mapState('price', ['prices', 'current', 'pageSize']),
    },

    methods: {
      ...mapActions('price', ['getAllPrices']),
    },

		data() {
			return {
        priceColumns,
			}
		},

    created(){
      this.getAllPrices({current: this.current, pageSize: this.pageSize});
    },
	})

</script>

<style lang="scss">
</style>