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
				<CardCompanyTable
					:data="companies"
					:columns="companyTableColumns"
				>
        </CardCompanyTable>
<!--				 / Authors Table Card -->

			</a-col>
			<!-- / Authors Table Column -->

		</a-row>
		<!-- / Authors Table -->

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	import CardCompanyTable from '../../../components/Cards/CardCompanyTable' ;

	const companyTableColumns = [
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
      ...mapState('company', ['companies', 'current', 'pageSize']),
    },

		components: {
      CardCompanyTable,
		},
		data() {
			return {
        companyTableColumns,
			}
		},

    created(){
      this.getAllCompanies({take: this.pageSize, skip: (this.current - 1) * this.pageSize});
    },

    methods: {
      ...mapActions('company', ['getAllCompanies']),
    },
	})

</script>

<style lang="scss">
</style>