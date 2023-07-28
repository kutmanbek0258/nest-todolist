<template>

	<!-- Authors Table Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">POSes</h5>
				</a-col>
        <a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
          <a-radio-group v-model="authorsHeaderBtns" size="small">
            <a-button type="primary" v-on:click="openLink('/references/create-pos')">
              New POS
            </a-button>
          </a-radio-group>
        </a-col>
			</a-row>
		</template>
		<a-table
        :columns="posTableColumns"
        :data-source="poses"
        :pagination="false"
        bordered>

      <template slot="selectBtn" slot-scope="row">
        <a-button v-on:click="handleSelectItem(row.id, row.name)" :data-id="row.id"  class="btn-edit">
          SELECT
        </a-button>
      </template>

		</a-table>

    <a-pagination
        show-size-changer
        :current="current"
        :total="totalCount"
        @change="onChange"
        @showSizeChange="onShowSizeChange"
    />

	</a-card>
	<!-- / Authors Table Card -->

</template>

<script>

  import router from '../../router';
  import {mapActions, mapState} from "vuex";

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
      scopedSlots: { customRender: 'selectBtn' },
      width: 50,
    },
  ];

	export default ({
		data() {
			return {
				// Active button for the "Authors" table's card header radio button group.
				authorsHeaderBtns: 'all',
        posTableColumns,
      }
		},

    computed: {
		  ...mapState('pos', ['poses', 'current', 'pageSize', 'totalCount'])
    },

    created() {
		  this.getAllPoses({current: this.current, pageSize: this.pageSize});
    },

    methods: {
      ...mapActions('pos', ['getAllPoses', 'setSelectedPos']),

      openLink(link){
        router.push(link);
      },

      handleSelectItem(id, name){
        this.setSelectedPos({id, name});
      },

      onChange(current) {
        this.getAllPoses({current, pageSize: this.pageSize});
      },

      onShowSizeChange(current, pageSize) {
        this.getAllPoses({current, pageSize});
      },

    },
	})

</script>