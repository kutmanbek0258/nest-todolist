<template>

	<!-- Authors Table Card -->

  <div class="product-container">
    <div class="product-list-inside">
      <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">

        <template #title>
          <a-row type="flex" align="middle">
            <a-col :span="24" :md="12">
              <h5 class="font-semibold m-0">items</h5>
            </a-col>
            <a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
              <a-radio-group v-model="authorsHeaderBtns" size="small">
                <a-button type="primary" v-on:click="showModalProduct">
                  Add item
                </a-button>
              </a-radio-group>
            </a-col>
          </a-row>
        </template>

        <a-table
            :columns="recountItemsTableColumns"
            :data-source="recountItems"
            :pagination="false"
            :scroll="{ y: 400 }"
            bordered
            @change="onChange">
          <template slot="quantity" slot-scope="row">
            <div>
              <a-input
                  type="number"
                  v-if="editedItem.id === row.id"
                  v-model:value="editedItem.quantity"
                  style="margin: -5px 0"
              />
              <template v-else>
                {{ row.quantity }}
              </template>
            </div>
          </template>
          <template slot="price" slot-scope="row">
            <div>
              <a-input
                  type="number"
                  v-if="editedItem.id === row.id"
                  v-model:value="editedItem.price"
                  style="margin: -5px 0"
              />
              <template v-else>
                {{ row.price }}
              </template>
            </div>
          </template>
          <template slot="fullPrice" slot-scope="row">
            <div>
              {{ row.price * row.quantity }}
            </div>
          </template>
          <template slot="editBtn" slot-scope="row">
            <div class="editable-row-operations">
              <span v-if="editedItem.id === row.id">
                <a @click="saveItem(row)">Save</a>
              </span>
              <span v-else>
                <a @click="editItem(row)">Edit</a>
              </span>
            </div>
          </template>

          <template slot="deleteBtn" slot-scope="row">
            <div class="editable-row-operations">
              <a-popconfirm title="Sure to Delete?" @confirm="() => (deleteItem(row))">
                <a>Delete</a>
              </a-popconfirm>
            </div>
          </template>
        </a-table>

      </a-card>
    </div>

    <a-modal v-model:visible="dialogVisibleProduct"
             title="Select depot"
             @ok="handleOkProduct"
             @cancel="handleOkProduct"
             @close="handleOkProduct">
      <CardProductTableDialog/>
    </a-modal>

  </div>
	<!-- / Authors Table Card -->

</template>

<script>

  import {mapActions, mapState} from "vuex";
  import CardProductTableDialog from "../../components/Cards/CardProductTableDialog";

  const recountItemsTableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      scopedSlots: { customRender: 'ID' },
      width: 100,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'NAME',
      dataIndex: 'productname',
      scopedSlots: { customRender: 'productName' },
      sorter: (a, b) => {
        if ( a.productname < b.productname ){
          return -1;
        }
        if ( a.productname > b.productname ){
          return 1;
        }
        return 0;
      },
    },
    {
      title: 'quantity',
      scopedSlots: { customRender: 'quantity' },
    },
    {
      title: 'price',
      scopedSlots: { customRender: 'price' },
    },
    {
      title: 'full price',
      scopedSlots: { customRender: 'fullPrice' },
    },
    {
      title: '',
      scopedSlots: { customRender: 'editBtn' },
      width: 150,
    },
    {
      title: '',
      scopedSlots: { customRender: 'deleteBtn' },
      width: 150,
    },
  ];

	export default ({

    props: {
      recountID: {
        default: () => null,
      }
    },

		data() {
			return {
				// Active button for the "Authors" table's card header radio button group.
				authorsHeaderBtns: 'all',
        recountItemsTableColumns,
      }
		},

    components: {
      CardProductTableDialog
    },

    created(){
      this.getAllRecountItems({recountID: this.recountID, });
    },

    computed: {
		  ...mapState('recount', ['recountItems', 'editedItem']),
      ...mapState('product', ['product', 'selectedProduct', 'dialogVisibleProduct'])
    },

    methods: {
      ...mapActions('recount', ['getAllRecountItems', 'addRecountItem', 'saveEditing', 'updateRecountItem', 'deleteRecountItem']),
      ...mapActions('product', ['setDialogVisibleProduct']),

      editItem(item){
        this.saveEditing({item});
      },

      saveItem(row){
        this.updateRecountItem({
          itemID: row.id,
          productID: row.productid,
          quantity: row.quantity,
          price: row.price})
        const item = {}
        this.saveEditing({item})
      },

      deleteItem(item){
        this.deleteRecountItem({itemID: item.id, recountID: this.recountID});
      },

      showModalProduct(){
        const visibility = true;
        this.setDialogVisibleProduct({visibility});
      },

      handleOkProduct(){
        const visibility = false;
        this.setDialogVisibleProduct({visibility});
      },

      onChange(pagination, filters, sorter){
        if(sorter.order){
          this.getAllRecountItems({recountID: this.recountID});
        }
      }

    },

    watch: {
      selectedProduct(newValue, oldValue) {
        if(oldValue !== newValue){
          this.addRecountItem({recountID: Number(this.recountID), productID: Number(this.selectedProduct.id), quantity: 1, price: 1})
        }
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