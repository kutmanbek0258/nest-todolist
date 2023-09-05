<template>

	<!-- Authors Table Card -->

  <div class="product-container">
    <div class="product-list-inside">
      <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">

        <a-table
            :columns="productTableColumns"
            :data-source="products"
            :pagination="false"
            bordered>

          <template slot="selectBtn" slot-scope="row">
            <a-button v-on:click="handleSelect(row.id)" :data-id="row.id"  class="btn-edit">
              Select
            </a-button>
          </template>

        </a-table>

      </a-card>
    </div>
    <div class="paginator">
      <a-pagination
          :current="current"
          :total="totalCount"
          @change="onChange"
      />
    </div>
  </div>


	<!-- / Authors Table Card -->

</template>

<script>

  import router from '../../router';
  import {mapActions, mapState} from "vuex";

  const productTableColumns = [
    {
      title: 'NAME',
      dataIndex: 'name',
      scopedSlots: { customRender: 'name' },
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
        productTableColumns,
      }
		},

    created(){
      this.getAllProducts({current: this.current, pageSize: 8});
    },

    computed: {
		  ...mapState('product', ['products', 'current', 'pageSize', 'totalCount'])
    },

    methods: {
      ...mapActions('product', ['getAllProducts', 'deleteProduct', 'setPageSize']),

      openLink(link){
        router.push(link);
      },

      handleSelect(id){
        console.log('selected ' + id);
      },

      onChange(current) {
        this.getAllProducts({current, pageSize: 8});
      },

    },
	})

</script>

<style lang="scss">
  .product-container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 1em;
  }

  .product-list-inside {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 7;
  }

  .paginator {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 7;
    grid-row-end: 8;
  }
</style>