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
					:data="persons"
					:columns="personTableColumns"
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

	import CardCompanyTable from '../../../components/Cards/CardPersonTable' ;

	const personTableColumns = [
		{
			title: 'FULL NAME',
			dataIndex: 'full_name',
			scopedSlots: { customRender: 'full_name' },
		},
		{
			title: 'email',
			dataIndex: 'email',
			scopedSlots: { customRender: 'email' },
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
      ...mapState('person', ['persons', 'current', 'pageSize']),
    },

		components: {
      CardCompanyTable,
		},
		data() {
			return {
        personTableColumns,
			}
		},

    created(){
      this.getAllPersons({current: this.current, pageSize: this.pageSize});
    },

    methods: {
      ...mapActions('person', ['getAllPersons']),
    },
	})

</script>

<style lang="scss">
</style>