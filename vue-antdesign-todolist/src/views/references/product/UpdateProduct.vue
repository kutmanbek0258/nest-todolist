<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

    <a-row type="flex" :gutter="24" justify="space-around" align="middle">

      <!-- Sign In Form Column -->
      <a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 0}" class="col-form">
        <h1 class="mb-15">Update product</h1>
        <h5 class="font-regular text-muted">update product</h5>

        <!-- Sign In Form -->
        <a-form
            id="components-form-demo-normal-login"
            class="login-form"
            @submit.prevent="handleSubmit"
            :hideRequiredMark="true"
        >
          <a-form-item class="mb-5" label="name" :colon="false">
            <a-input
                v-decorator="[
						'name',
						{ rules: [{ required: true, message: 'Please input name' }] },
						]"
                type="text"
                placeholder="name"
                v-model="product.name"/>
          </a-form-item>

          <a-form-item class="mb-5" label="description" :colon="false">
            <a-input
                v-decorator="[
						'description',
						{ rules: [{ required: true, message: 'Please input description' }] },
						]"
                type="text"
                placeholder="description"
                v-model="product.description"/>
          </a-form-item>

          <a-form-item class="mb-5" label="barcode" :colon="false">
            <a-input
                v-decorator="[
						'barcode',
						{ rules: [{ required: true, message: 'Please input barcode' }] },
						]"
                type="text"
                placeholder="barcode"
                v-model="product.barcode"/>
          </a-form-item>

          <a-form-item class="mb-10" label="product-group" :colon="false">
            <a-button type="primary" @click="showModalProductGroup">SELECT PRODUCT GROUP</a-button>
            <div class="author-info">
              {{ this.product.pgname }}
            </div>
          </a-form-item>

          <a-form-item class="mb-10" label="price-template" :colon="false">
            <a-button type="primary" @click="showModalPriceTemplate">SELECT PRICE TEMPLATE</a-button>
            <div class="author-info">
              {{ this.product.ptname }}
            </div>
          </a-form-item>

          <a-button type="primary" block html-type="submit" class="login-form-button">
            UPDATE PRODUCT
          </a-button>
        </a-form>
        <!-- / Sign In Form -->

        <p class="font-semibold text-muted">Back to products <router-link to="/references/product" class="font-bold text-dark">
          back</router-link></p>
      </a-col>

    </a-row>

    <a-modal v-model:visible="dialogVisibleProductGroup"
             title="Select product-group"
             @ok="handleOkProductGroup"
             @cancel="handleOkProductGroup"
             @close="handleOkProductGroup">
      <CardProductGroupTableDialog/>
    </a-modal>

    <a-modal v-model:visible="dialogVisiblePriceTemplate"
             title="Select price-template"
             @ok="handleOkPriceTemplate"
             @cancel="handleOkPriceTemplate"
             @close="handleOkPriceTemplate">
      <CardPriceTemplateTableDialog/>
    </a-modal>

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";
  import CardProductGroupTableDialog from '../../../components/Cards/CardProductGroupTableDialog';
  import CardPriceTemplateTableDialog from "../../../components/Cards/CardPriceTemplateTableDialog";

	export default ({

    computed: {
      ...mapState('product', ['product']),
      ...mapState('productGroup', ['productGroups', 'selectedProductGroup', 'current', 'pageSize', 'dialogVisibleProductGroup']),
      ...mapState('priceTemplate', ['priceTemplates', 'selectedPriceTemplate', 'current', 'pageSize', 'dialogVisiblePriceTemplate']),
    },

    components: {
      CardProductGroupTableDialog,
      CardPriceTemplateTableDialog,
    },

    created(){
      this.id = this.$route.params.id;
      this.getProductById({"id":this.id});
    },

		data() {
      return {
        id: '',
      }
		},

    destroyed() {
      this.handleCloseSelectionProductGroup();
      this.handleCloseSelectionPriceTemplate();
    },

    methods: {
      ...mapActions('product', ['getProductById', 'updateProduct']),
      ...mapActions('productGroup', ['setDialogVisibilityProductGroup', 'handleCloseSelectionProductGroup']),
      ...mapActions('priceTemplate', ['setDialogVisibilityPriceTemplate', 'handleCloseSelectionPriceTemplate']),
      handleSubmit() {
        const {
            name,
            description,
            barcode,
        } = this.product;
        const id = this.id;
        const groupID = (this.selectedProductGroup.id) ? this.selectedProductGroup.id : this.product.pgid;
        const price_templateID = (this.selectedPriceTemplate.id) ? this.selectedPriceTemplate.id : this.product.ptid;
        if (id && name && description && barcode && groupID && price_templateID) {
          this.updateProduct({
            id,
            name,
            description,
            barcode,
            groupID,
            price_templateID,
          });
        }
      },

      showModalProductGroup() {
        const visibility = true;
        this.setDialogVisibilityProductGroup({visibility});
      },

      handleOkProductGroup(){
        const visibility = false;
        this.setDialogVisibilityProductGroup({visibility});
      },

      showModalPriceTemplate(){
        const visibility = true;
        this.setDialogVisibilityPriceTemplate({visibility});
      },

      handleOkPriceTemplate(){
        const visibility = false;
        this.setDialogVisibilityPriceTemplate({visibility});
      }

    },
	})

</script>

<style lang="scss">
</style>