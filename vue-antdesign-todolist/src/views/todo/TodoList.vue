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

				<!-- Authors Table Card -->
				<CardAuthorTable
					:data="todos"
					:columns="todoTableColumns"
				>
        </CardAuthorTable>
				<!-- / Authors Table Card -->

			</a-col>
			<!-- / Authors Table Column -->

		</a-row>
		<!-- / Authors Table -->

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	import CardTodoTable from '../../components/Cards/CardTodoTable' ;

	const todoTableColumns = [
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
      title: 'DONE',
      dataIndex: 'done',
      scopedSlots: { customRender: 'done' },
    },

		{
			title: 'CREATED DATE',
			dataIndex: 'createdAt',
			class: 'createdAt',
		},
    {
      title: 'UPDATED DATE',
      dataIndex: 'updatedAt',
      class: 'updatedAt',
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
      ...mapState('todo', ['todos', 'current', 'pageSize']),
    },

		components: {
			CardAuthorTable: CardTodoTable,
		},
		data() {
			return {
        todoTableColumns: todoTableColumns,
			}
		},

    created(){
      this.getAllTodos(); //({current: this.current, pageSize: this.pageSize});
    },

    methods: {
      ...mapActions('todo', ['getAllTodos']),
    },
	})

</script>

<style lang="scss">
</style>