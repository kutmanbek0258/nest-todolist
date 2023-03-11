<template>

	<!-- Authors Table Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">{{$t('posting_list.title')}}</h5>
				</a-col>
        <a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
          <a-radio-group v-model="authorsHeaderBtns" size="small">
            <a-button type="primary" v-on:click="openLink('/create-posting')">
              {{ $t('posting_list.create_new_posting') }}
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

			<template slot="product_name" slot-scope="product_name">
				<div class="table-avatar-info">
					<div class="avatar-info">
						<h6>{{ product_name }}</h6>
					</div>
				</div>
			</template>

			<template slot="user_name" slot-scope="user_name">
				<div class="author-info">
					<h6 class="m-0">{{ user_name }}</h6>
				</div>
			</template>

      <template slot="quantity" slot-scope="quantity">
        <div class="author-info">
          <h6 class="m-0">{{ quantity }}</h6>
        </div>
      </template>

      <template slot="editBtn" slot-scope="row">
        <a-button v-on:click="openLink('/edit-posting/' + row._id)" :data-id="row._id"  class="btn-edit">
          {{ $t('posting_list.edit_button') }}
        </a-button>
      </template>

      <template slot="dltBtn" slot-scope="row">
        <a-button v-on:click="handleDeletePosting(row._id)" :data-id="row._id"  class="btn-edit">
          {{ $t('posting_list.delete_button') }}
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
		  ...mapState('posting', ['current', 'pageSize', 'totalCount'])
    },

    methods: {
      ...mapActions('posting', ['getAllPostings', 'removePosting']),

      openLink(link){
        router.push(link);
      },

      handleDeletePosting(id){
        this.removePosting({id});
      },

      onChange(current) {
        this.getAllPostings({current, pageSize: this.pageSize})
      },

      onShowSizeChange(current, pageSize) {
        this.getAllPostings({current, pageSize})
      },

    },
	})

</script>