<template>

	<!-- Authors Table Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">Companies</h5>
				</a-col>
        <a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
          <a-radio-group v-model="authorsHeaderBtns" size="small">
            <a-button type="primary" v-on:click="openLink('/references/create-company')">
              New company
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

			<template slot="name" slot-scope="name">
				<div class="table-avatar-info">
					<div class="avatar-info">
						<h6>{{ name }}</h6>
					</div>
				</div>
			</template>

      <template slot="editBtn" slot-scope="row">
        <a-button v-on:click="openLink('/references/update-company/' + row.id)" :data-id="row.id"  class="btn-edit">
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
		  ...mapState('company', ['current', 'pageSize', 'totalCount'])
    },

    methods: {
      ...mapActions('company', ['getAllCompanies', 'deleteCompany']),

      openLink(link){
        router.push(link);
      },

      handleDelete(id){
        this.deleteCompany({id});
      },

      onChange(current) {
        this.getAllCompanies({current, pageSize: this.pageSize});
      },

      onShowSizeChange(current, pageSize) {
        this.getAllCompanies({current, pageSize});
      },

    },
	})

</script>