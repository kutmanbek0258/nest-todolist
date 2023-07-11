<template>

	<!-- Authors Table Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">Persons</h5>
				</a-col>
        <a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
          <a-radio-group v-model="authorsHeaderBtns" size="small">
            <a-button type="primary" v-on:click="openLink('/references/create-person')">
              {{ $t('create_person.title') }}
            </a-button>
          </a-radio-group>
        </a-col>
			</a-row>
		</template>
		<a-table
        :columns="personTableColumns"
        :data-source="persons"
        :pagination="false"
        bordered>

      <template slot="selectBtn" slot-scope="row">
        <a-button v-on:click="handleSelectPersonItem(row.id, row.full_name)" :data-id="row.id"  class="btn-edit">
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
      scopedSlots: { customRender: 'selectBtn' },
      width: 50,
    },
  ];

	export default ({
		data() {
			return {
        authorsHeaderBtns: 'all',
        personTableColumns,
      }
		},

    created() {
		  this.getAllPersons({current: this.current, pageSize: this.pageSize});
    },

    computed: {
		  ...mapState('person', ['persons', 'current', 'pageSize', 'totalCount'])
    },

    methods: {
      ...mapActions('person', ['getAllPersons', 'handleSelectPerson', 'setDialogVisibilityPerson']),

      openLink(link){
        router.push(link);
      },

      handleSelectPersonItem(id, name){
        this.handleSelectPerson({id, name});
        const visibility = false;
        this.setDialogVisibilityPerson({visibility});
      },

      onChange(current) {
        this.getAllPersons({current, pageSize: this.pageSize});
      },

      onShowSizeChange(current, pageSize) {
        this.getAllPersons({current, pageSize});
      },

    },
	})

</script>