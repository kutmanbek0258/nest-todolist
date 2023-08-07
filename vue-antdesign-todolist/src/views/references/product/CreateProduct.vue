<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

    <a-row type="flex" :gutter="24" justify="space-around" align="middle">

      <!-- Sign In Form Column -->
      <a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 0}" class="col-form">
        <h1 class="mb-15">Create product-group</h1>
        <h5 class="font-regular text-muted">create product-group</h5>

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
                v-model="name"/>
          </a-form-item>

          <a-form-item class="mb-5" label="description" :colon="false">
            <a-input
                v-decorator="[
						'description',
						{ rules: [{ required: true, message: 'Please input description' }] },
						]"
                type="text"
                placeholder="description"
                v-model="description"/>
          </a-form-item>

          <a-form-item class="mb-5" label="barcode" :colon="false">
            <a-input
                v-decorator="[
						'barcode',
						{ rules: [{ required: true, message: 'Please input barcode' }] },
						]"
                type="text"
                placeholder="barcode"
                v-model="barcode"/>
          </a-form-item>

          <a-form-item class="mb-10" label="product-group" :colon="false">
            <a-button type="primary" @click="showModalProductGroup">SELECT PRODUCT GROUP</a-button>
            <div class="author-info">
              {{ this.selectedProductGroup.name }}
            </div>
          </a-form-item>

          <a-form-item class="mb-10" label="price-template" :colon="false">
            <a-button type="primary" @click="showModalPriceTemplate">SELECT PRICE TEMPLATE</a-button>
            <div class="author-info">
              {{ this.selectedPriceTemplate.name }}
            </div>
          </a-form-item>

          <a-button type="primary" block html-type="submit" class="login-form-button">
            CREATE PRODUCT
          </a-button>

        </a-form>
        <!-- / Sign In Form -->

        <p class="font-semibold text-muted">Back to groups <router-link to="/references/product-group" class="font-bold text-dark">
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

		data() {
      return {
        name: '',
        description: '',
        barcode: '',
      }
		},

    destroyed() {
      this.handleCloseSelectionProductGroup();
      this.handleCloseSelectionPriceTemplate();
    },

    methods: {
      ...mapActions('product', ['createProduct']),
      ...mapActions('productGroup', ['setDialogVisibilityProductGroup', 'handleCloseSelectionProductGroup']),
      ...mapActions('priceTemplate', ['setDialogVisibilityPriceTemplate', 'handleCloseSelectionPriceTemplate']),
      handleSubmit() {
        const {
            name,
            description,
            barcode,
        } = this;
        if (name && description && barcode) {
          this.createProduct({
            name,
            description,
            barcode,
            groupID: this.selectedProductGroup.id,
            price_templateID: this.selectedPriceTemplate.id,
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