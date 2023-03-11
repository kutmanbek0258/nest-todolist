<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

    <a-row type="flex" :gutter="24" justify="space-around" align="middle">

      <!-- Sign In Form Column -->
      <a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 0}" class="col-form">
        <h1 class="mb-15">{{ $t('create_posting.title') }}</h1>
        <h5 class="font-regular text-muted">{{ $t('create_posting.text_message') }}</h5>

        <!-- Sign In Form -->
        <a-form
            id="components-form-demo-normal-login"
            class="login-form"
            @submit.prevent="handleSubmit"
            :hideRequiredMark="true"
        >
          <a-form-item class="mb-10" :label="$t('create_posting.product')" :colon="false">
            <a-button type="primary" @click="showModal">{{ $t('create_posting.select_product_button') }}</a-button>
            <div class="author-info">
              {{this.selectedProductName}}
            </div>
          </a-form-item>
          <a-form-item class="mb-5" :label="$t('create_posting.quantity')" :colon="false">
            <a-input
                v-decorator="[
						'quantity',
						{ rules: [{ required: true, message: 'Please input product quantity' }] },
						]"
                type="number"
                :placeholder="$t('create_posting.quantity')"
                v-model="quantity"/>
          </a-form-item>
          <a-form-item class="mb-5" :label="$t('create_posting.cell_number')" :colon="false">
            <a-input
                v-decorator="[
						'cell_number',
						{ rules: [{ required: true, message: 'Please input product cell number' }] },
						]"
                type="text"
                :placeholder="$t('create_posting.cell_number')"
                v-model="cell_number"/>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" block html-type="submit" class="login-form-button">
              {{ $t('create_posting.posting_button') }}
            </a-button>
          </a-form-item>
        </a-form>
        <!-- / Sign In Form -->

        <p class="font-semibold text-muted">{{ $t('create_posting.back_to_postings') }} <router-link to="/postings" class="font-bold text-dark">
          {{ $t('create_posting.back') }}</router-link></p>
      </a-col>

    </a-row>

    <a-modal v-model:visible="dialogVisible" title="Select product" @ok="handleOk" @cancel="handleOk" @close="handleOk">
      <CardProductTable
          :data="products.allProducts"
          :columns="productsTableColumns"
      >
      </CardProductTable>
    </a-modal>

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";
  import CardProductTable from '../../components/Cards/CardProductTableDialog' ;

  const productsTableColumns = [
    {
      title: 'NAME',
      dataIndex: 'name',
      scopedSlots: { customRender: 'name' },
    },
    {
      title: 'BARCODE',
      dataIndex: 'barcode',
      scopedSlots: { customRender: 'barcode' },
    },
    {
      title: '',
      scopedSlots: { customRender: 'slctBtn' },
      width: 50,
    },
  ];

	export default ({

    computed: {
      ...mapState('auth', ['user']),
      ...mapState('posting', ['posting']),
      ...mapState('product', ['products', 'selectedProductId', 'selectedProductName', 'current', 'pageSize', 'dialogVisible'])
    },

		data() {
      return {
        // Binded model property for "Sign In Form" switch button for "Remember Me" .
        productName: 'SELECT PRODUCT',
        quantity: '',
        cell_number: '',
        visible: false,
        productsTableColumns,
      }
		},

    created(){
      this.getAllProducts({current: this.current, pageSize: this.pageSize});
    },

    destroyed() {
      this.handleCloseSelection();
    },

    components: {
      CardProductTable,
    },

    methods: {
      ...mapActions('posting', ['createPosting']),
      ...mapActions('product', ['getAllProducts', 'handleCloseSelection', 'setDialogVisibility']),
      handleSubmit() {
        const user = this.user.id;
        const {
            selectedProductId: product,
            quantity,
            cell_number,
        } = this;
        if (product && quantity && cell_number) {
          this.createPosting({ user, product, quantity, cell_number });
        }
      },

      showModal() {
        const visibility = true;
        this.setDialogVisibility({visibility});
      },

      handleOk(){
        const visibility = false;
        this.setDialogVisibility({visibility});
      },

    },
	})

</script>

<style lang="scss">
</style>