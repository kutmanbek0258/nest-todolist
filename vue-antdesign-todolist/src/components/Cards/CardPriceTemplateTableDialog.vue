<template>

	<!-- Authors Table Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">Price templates</h5>
				</a-col>
        <a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
          <a-radio-group v-model="authorsHeaderBtns" size="small">
            <a-button type="primary" v-on:click="openLink('/references/create-price-template')">
              New price template
            </a-button>
          </a-radio-group>
        </a-col>
			</a-row>
		</template>
		<a-table
        :columns="priceTemplateTableColumns"
        :data-source="priceTemplates"
        :pagination="false"
        bordered>

      <template slot="selectBtn" slot-scope="row">
        <a-button v-on:click="handleSelect(row.id, row.name)" :data-id="row.id"  class="btn-edit">
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
      scopedSlots: { customRender: 'selectBtn' },
      width: 50,
    },
  ];

	export default ({

		data() {
			return {
				// Active button for the "Authors" table's card header radio button group.
				authorsHeaderBtns: 'all',
        searchLoading: false,
        keyword: '',
        priceTemplateTableColumns,
      }
		},

    computed: {
		  ...mapState('priceTemplate', ['priceTemplates', 'current', 'pageSize', 'totalCount'])
    },

    created() {
		  this.getAllPriceTemplates({current: this.current, pageSize: this.pageSize})
    },

    methods: {
      ...mapActions('priceTemplate', ['getAllPriceTemplates', 'deletePriceTemplate', 'handleSelectPriceTemplate', 'setDialogVisibilityPriceTemplate']),

      openLink(link){
        router.push(link);
      },

      handleSelect(id, name){
        this.handleSelectPriceTemplate({id, name});
        this.setDialogVisibilityPriceTemplate({visibility: false});
      },

      onChange(current) {
        this.getAllPriceTemplates({current, pageSize: this.pageSize});
      },

      onShowSizeChange(current, pageSize) {
        this.getAllPriceTemplates({current, pageSize});
      },

    },
	})

</script>