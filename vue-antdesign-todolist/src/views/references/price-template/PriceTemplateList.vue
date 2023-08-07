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
				<CardPriceTemplateTable
					:data="priceTemplates"
					:columns="priceTemplateTableColumns"
				>
        </CardPriceTemplateTable>
<!--				 / Authors Table Card -->

			</a-col>
			<!-- / Authors Table Column -->

		</a-row>
		<!-- / Authors Table -->

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	import CardPriceTemplateTable from '../../../components/Cards/CardPriceTemplateTable' ;

	const priceTemplateTableColumns = [
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
      ...mapState('priceTemplate', ['priceTemplates', 'current', 'pageSize']),
    },

		components: {
      CardPriceTemplateTable,
		},
		data() {
			return {
        priceTemplateTableColumns,
			}
		},

    created(){
      this.getAllPriceTemplates({current: this.current, pageSize: this.pageSize});
    },

    methods: {
      ...mapActions('priceTemplate', ['getAllPriceTemplates']),
    },
	})

</script>

<style lang="scss">
</style>