<template>

	<!-- Authors Table Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">SUPPLIERS</h5>
				</a-col>
        <a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
          <a-radio-group v-model="authorsHeaderBtns" size="small">
            <a-button type="primary" v-on:click="openLink('/references/create-supplier')">
              New Supplier
            </a-button>
          </a-radio-group>
        </a-col>
			</a-row>
		</template>
		<a-table
        :columns="supplierTableColumns"
        :data-source="suppliers"
        :pagination="false"
        bordered>

      <template slot="selectBtn" slot-scope="row">
        <a-button v-on:click="handleSelectSupplierItem(row.id, row.fullname)" :data-id="row.id"  class="btn-edit">
          Select
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

  const supplierTableColumns = [
    {
      title: 'NAME',
      dataIndex: 'fullname',
      scopedSlots: { customRender: 'fullname' },
    },
    {
      title: 'COMPANY',
      dataIndex: 'companyname',
      scopedSlots: { customRender: 'companyname' },
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
        supplierTableColumns
      }
		},

    computed: {
		  ...mapState('supplier', ['suppliers', 'current', 'pageSize', 'totalCount'])
    },

    created(){
		  this.getAllSuppliers({current: this.current, pageSize: this.pageSize})
    },

    methods: {
      ...mapActions('supplier', ['getAllSuppliers', 'handleSelectSupplier']),

      openLink(link){
        router.push(link);
      },

      handleSelectSupplierItem(id, name) {
        this.handleSelectSupplier({id, name});
      },

      onChange(current) {
        this.getAllSuppliers({current, pageSize: this.pageSize});
      },

      onShowSizeChange(current, pageSize) {
        this.getAllSuppliers({current, pageSize});
      },

    },
	})

</script>