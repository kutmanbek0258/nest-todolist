<template>

	<!-- Authors Table Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">Shops</h5>
				</a-col>
        <a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
          <a-radio-group v-model="authorsHeaderBtns" size="small">
            <a-button type="primary" v-on:click="openLink('/references/create-shop')">
              New shop
            </a-button>
          </a-radio-group>
        </a-col>
			</a-row>
		</template>
		<a-table
        :columns="shopTableColumns"
        :data-source="shops"
        :pagination="false"
        bordered>

      <template slot="selectBtn" slot-scope="row">
        <a-button v-on:click="handleSelectShopItem(row.id, row.name)" :data-id="row.id"  class="btn-edit">
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

  const shopTableColumns = [
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
        shopTableColumns,
      }
		},

    created() {
		  this.getAllShops({current: this.current, pageSize: this.pageSize})
    },

    computed: {
		  ...mapState('shop', ['shops', 'current', 'pageSize', 'totalCount'])
    },

    methods: {
      ...mapActions('shop', ['getAllShops', 'handleSelectShop']),

      openLink(link){
        router.push(link);
      },

      handleSelectShopItem(id, name){
        this.handleSelectShop({id, name});
      },

      onChange(current) {
        this.getAllShops({current, pageSize: this.pageSize});
      },

      onShowSizeChange(current, pageSize) {
        this.getAllShops({current, pageSize});
      },

    },
	})

</script>