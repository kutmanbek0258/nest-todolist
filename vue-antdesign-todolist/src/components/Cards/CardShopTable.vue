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
        :columns="columns"
        :data-source="data"
        :pagination="false"
        bordered>

      <template slot="editBtn" slot-scope="row">
        <a-button v-on:click="openLink('/references/update-shop/' + row.id)" :data-id="row.id"  class="btn-edit">
          Edit
        </a-button>
      </template>

      <template slot="dltBtn" slot-scope="row">
        <a-button v-on:click="handleDelete(row.id)" :data-id="row.id"  class="btn-edit">
          Delete
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

	export default ({
		props: {
			data: {
				type: Array,
				default: () => [],
			},
			columns: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
				// Active button for the "Authors" table's card header radio button group.
				authorsHeaderBtns: 'all',
        searchLoading: false,
        keyword: '',
      }
		},

    computed: {
		  ...mapState('shop', ['current', 'pageSize', 'totalCount'])
    },

    methods: {
      ...mapActions('shop', ['getAllShops', 'deleteShop']),

      openLink(link){
        router.push(link);
      },

      handleDelete(id){
        this.deleteShop({id});
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