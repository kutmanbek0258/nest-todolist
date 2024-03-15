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
            :columns="receiptItemsTableColumns"
            :data-source="receiptItems"
            :pagination="false"
            bordered>
          <template slot="quantity" slot-scope="row">
            <div>
              <a-input
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
                  v-if="editedItem.id === row.id"
                  v-model:value="editedItem.price"
                  style="margin: -5px 0"
              />
              <template v-else>
                {{ row.price }}
              </template>
            </div>
          </template>
          <template slot="editBtn" slot-scope="row">
            <div class="editable-row-operations">
              <span v-if="editedItem.id === row.id">
                <a @click="save(row)">Save</a>
                <a-popconfirm title="Sure to cancel?" @confirm="cancel(row)">
                  <a>Cancel</a>
                </a-popconfirm>
              </span>
              <span v-else>
                <a @click="edit(row)">Edit</a>
              </span>
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
  import CardProductTableDialog from "@/components/Cards/CardProductTableDialog";

  const receiptItemsTableColumns = [
    {
      title: 'NAME',
      dataIndex: 'productname',
      scopedSlots: { customRender: 'product name' },
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
      receiptID: {
        default: () => null,
      }
    },

		data() {
			return {
				// Active button for the "Authors" table's card header radio button group.
				authorsHeaderBtns: 'all',
        receiptItemsTableColumns,
      }
		},

    components: {
      CardProductTableDialog
    },

    created(){
      this.getAllReceiptItem({receiptID: this.receiptID});
    },

    computed: {
		  ...mapState('receipt', ['receiptItems', 'editedItem']),
      ...mapState('product', ['product', 'selectedProduct', 'dialogVisibleProduct'])
    },

    methods: {
      ...mapActions('receipt', ['getAllReceiptItem', 'setEditedItem']),
      ...mapActions('product', ['setDialogVisibleProduct']),

      edit(item){
        this.setEditedItem({item});
      },

      save(){
        const item = {}
        this.setEditedItem({item})
      },

      cancel(){
        const item = {}
        this.setEditedItem({item})
      },

      showModalProduct(){
        const visibility = true;
        this.setDialogVisibleProduct({visibility});
      },

      handleOkProduct(){
        const visibility = false;
        this.setDialogVisibleProduct({visibility});
      }

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