<template>

	<!-- Authors Table Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">Depots</h5>
				</a-col>
        <a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
          <a-radio-group v-model="authorsHeaderBtns" size="small">
            <a-button type="primary" v-on:click="openLink('/references/create-depot')">
              New depot
            </a-button>
          </a-radio-group>
        </a-col>
			</a-row>
		</template>
		<a-table
        :columns="depotTableColumns"
        :data-source="depots"
        :pagination="false"
        bordered>

      <template slot="selectBtn" slot-scope="row">
        <a-button v-on:click="handleSelectDepotItem(row.id, row.name)" :data-id="row.id"  class="btn-edit">
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

  const depotTableColumns = [
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
        depotTableColumns,
      }
		},

    computed: {
		  ...mapState('depot', ['depots', 'current', 'pageSize', 'totalCount', 'dialogVisibleDepot'])
    },

    created() {
		  this.getAllDepots({current: this.current, pageSize: this.pageSize});
    },

    methods: {
      ...mapActions('depot', ['getAllDepots', 'handleSelectDepot']),

      openLink(link){
        router.push(link);
      },

      handleSelectDepotItem(id, name){
        this.handleSelectDepot({id, name});
      },

      onChange(current) {
        this.getAllDepots({current, pageSize: this.pageSize});
      },

      onShowSizeChange(current, pageSize) {
        this.getAllDepots({current, pageSize});
      },

    },
	})

</script>