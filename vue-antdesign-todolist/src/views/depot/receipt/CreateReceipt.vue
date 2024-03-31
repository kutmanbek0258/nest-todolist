<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

    <a-row type="flex" :gutter="24" justify="space-around" align="middle">

      <!-- Sign In Form Column -->
      <a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 0}" class="col-form">
        <h1 class="mb-15">Create supplier</h1>
        <h5 class="font-regular text-muted">create supplier</h5>

        <!-- Sign In Form -->
        <a-form
            id="components-form-demo-normal-login"
            class="login-form"
            @submit.prevent="handleSubmit"
            :hideRequiredMark="true"
        >

          <a-form-item class="mb-10" label="supplier" :colon="false">
            <a-button type="primary" @click="showModalSupplier">SELECT SUPPLIER</a-button>
            <div class="author-info">
              {{ this.selectedSupplier.name }}
            </div>
          </a-form-item>

          <a-form-item class="mb-10" label="shop" :colon="false">
            <a-button type="primary" @click="showModalShop">SELECT SHOP</a-button>
            <div class="author-info">
              {{ this.selectedShop.name }}
            </div>
          </a-form-item>

          <a-form-item class="mb-10" label="depot" :colon="false">
            <a-button type="primary" @click="showModalDepot">SELECT DEPOT</a-button>
            <div class="author-info">
              {{ this.selectedDepot.name }}
            </div>
          </a-form-item>

          <a-button type="primary" block html-type="submit" class="login-form-button">
            CREATE SUPPLIER
          </a-button>

        </a-form>
        <!-- / Sign In Form -->

        <p class="font-semibold text-muted">Back to groups <router-link to="/references/product-group" class="font-bold text-dark">
          back</router-link></p>
      </a-col>

    </a-row>

    <a-modal v-model:visible="dialogVisibleSuppler"
             title="Select supplier"
             @ok="handleOkSuppler"
             @cancel="handleOkSupplier"
             @close="handleOkSupplier">
      <CardSupplierTableDialog/>
    </a-modal>

    <a-modal v-model:visible="dialogVisibleShop"
             title="Select shop"
             @ok="handleOkShop"
             @cancel="handleOkShop"
             @close="handleOkShop">
      <CardShopTableDialog/>
    </a-modal>

    <a-modal v-model:visible="dialogVisibleDepot"
             title="Select depot"
             @ok="handleOkDepot"
             @cancel="handleOkDepot"
             @close="handleOkDepot">
      <CardDepotTableDialog/>
    </a-modal>

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";
  import CardSupplierTableDialog from "../../../components/Cards/CardSupplierTableDialog";
  import CardShopTableDialog from "../../../components/Cards/CardShopTableDialog";
  import CardDepotTableDialog from "../../../components/Cards/CardDepotTableDialog";

	export default ({

    computed: {
      ...mapState('receipt', ['receipt']),
      ...mapState('supplier', ['supplier', 'selectedSupplier',  'dialogVisibleSuppler']),
      ...mapState('shop', ['shop', 'selectedShop', 'dialogVisibleShop']),
      ...mapState('depot', ['depot', 'selectedDepot', 'dialogVisibleDepot'])
    },

    components: {
      CardSupplierTableDialog,
      CardShopTableDialog,
      CardDepotTableDialog,
    },

		data() {
      return {
        name: '',
        description: '',
        barcode: '',
      }
		},

    methods: {
      ...mapActions('receipt', ['createReceipt']),
      ...mapActions('supplier', ['setDialogVisibilitySupplier', 'handleSelectSupplier']),
      ...mapActions('shop', ['setDialogVisibilityShop', 'handleSelectShop']),
      ...mapActions('depot', ['setDialogVisibleDepot', 'handleSelectDepot']),

      handleSubmit() {
        const supplierID = this.selectedSupplier.id;
        const shopID = this.selectedShop.id;
        const depotID = this.selectedDepot.id
        if (supplierID && shopID && depotID) {
          this.createReceipt({supplierID, shopID, depotID});
        }
      },

      showModalSupplier() {
        const visibility = true;
        this.setDialogVisibilitySupplier({visibility});
      },

      handleOkSupplier(){
        const visibility = false;
        this.setDialogVisibilitySupplier({visibility});
      },

      showModalShop(){
        const visibility = true;
        this.setDialogVisibilityShop({visibility});
      },

      handleOkShop(){
        const visibility = false;
        this.setDialogVisibilityShop({visibility});
      },

      showModalDepot(){
        const visibility = true;
        this.setDialogVisibleDepot({visibility});
      },

      handleOkDepot(){
        const visibility = false;
        this.setDialogVisibleDepot({visibility});
      }

    },
	})

</script>

<style lang="scss">
</style>