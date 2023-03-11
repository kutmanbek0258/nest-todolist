<template>

	<!-- Authors Table Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">{{ $t('product_list.title') }}</h5>
				</a-col>
        <a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
          <a-radio-group v-model="authorsHeaderBtns" size="small">
            <a-button type="primary" v-on:click="openLink('/create-product')">
              {{ $t('product_list.create_new_product') }}
            </a-button>
          </a-radio-group>
        </a-col>
        <a-col :span="24" :md="5">
          <a-input-search class="header-search" :class="searchLoading ? 'loading' : ''" :placeholder="$t('product_list.search_placeholder')" @search="handleFindProduct" v-model="keyword" :loading='searchLoading'>
            <svg slot="prefix" width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<!--              <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 9.29583 13.5892 10.4957 12.8907 11.4765L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L11.4765 12.8907C10.4957 13.5892 9.29583 14 8 14C4.68629 14 2 11.3137 2 8Z" fill="#111827"/>-->
            </svg>
          </a-input-search>
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

			<template slot="description" slot-scope="description">
				<div class="author-info">
					<h6 class="m-0">{{ description }}</h6>
				</div>
			</template>

      <template slot="barcode" slot-scope="barcode">
        <div class="author-info">
          <h6 class="m-0">{{ barcode }}</h6>
        </div>
      </template>

      <template slot="editBtn" slot-scope="row">
        <a-button v-on:click="openLink('/edit-product/' + row._id)" :data-id="row._id"  class="btn-edit">
          {{ $t('product_list.edit_button') }}
        </a-button>
      </template>

      <template slot="dltBtn" slot-scope="row">
        <a-button v-on:click="showModal(row._id, row.name)" :data-id="row._id"  class="btn-edit">
          {{ $t('product_list.delete_button') }}
        </a-button>
      </template>

      <template slot="rprtBtn" slot-scope="row">
        <a-button v-on:click="openLink('/product-report/' + row._id)" :data-id="row._id"  class="btn-edit">
          {{ $t('product_list.report_button') }}
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

    <a-modal v-model:visible="visible" :title="$t('product_list.delete_dialog_title')" @ok="handleOk">
      <h5>{{deleteProductName}}</h5>
    </a-modal>
	</a-card>

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

    created() {
      this.$barcodeScanner.init(this.onBarcodeScanned)
    },

    destroyed() {
      this.$barcodeScanner.destroy()
    },

    data() {
			return {
				// Active button for the "Authors" table's card header radio button group.
				authorsHeaderBtns: 'all',
        searchLoading: false,
        keyword: '',
        visible: false,
        deleteProductId: '',
        deleteProductName: ''
      }
		},

    computed: {
		  ...mapState('product', ['current', 'pageSize', 'totalCount',])
    },

    methods: {
      ...mapActions('product', ['getAllProducts', 'removeProduct', 'getProductsByKeyword', 'setCurrent', 'setPageSize']),

      onBarcodeScanned(barcode){
        // console.log(barcode);
        this.keyword = barcode;
        console.log(this.keyword)
        this.handleFindProduct();
      },

      openLink(link){
        router.push(link);
      },

      handleDeleteProduct(id){
        this.removeProduct({id});
      },

      handleFindProduct(){
        const current = 1;
        const pageSize = 10;
        this.setCurrent({current});
        this.setPageSize({pageSize});
        if(this.keyword){
          this.getProductsByKeyword({keyword: this.keyword, current: this.current, pageSize: this.pageSize});
        }else {
          this.getAllProducts({current: this.current, pageSize: this.pageSize})
        }
      },

      onChange(current) {
        if(this.keyword !== ''){
          this.getProductsByKeyword({keyword: this.keyword, current, pageSize: this.pageSize});
        }else {
          this.getAllProducts({current, pageSize: this.pageSize})
        }
      },

      onShowSizeChange(current, pageSize) {
        if(this.keyword !== ''){
          this.getProductsByKeyword({keyword: this.keyword, current, pageSize});
        }else {
          this.getAllProducts({current, pageSize})
        }
      },

      showModal(deleteProductId, deleteProductName) {
        this.visible = true;
        this.deleteProductId = deleteProductId;
        this.deleteProductName = deleteProductName;
      },

      handleOk(){
        this.handleDeleteProduct(this.deleteProductId);
        this.visible = false;
      },
    },
	})

</script>