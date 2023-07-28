<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

    <a-row type="flex" :gutter="24" justify="space-around" align="middle">

      <!-- Sign In Form Column -->
      <a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 0}" class="col-form">
        <h1 class="mb-15">Create cash-register</h1>
        <h5 class="font-regular text-muted">create cash-register</h5>

        <!-- Sign In Form -->
        <a-form
            id="components-form-demo-normal-login"
            class="login-form"
            @submit.prevent="handleSubmit"
            :hideRequiredMark="true"
        >

          <a-form-item class="mb-10" label="shop" :colon="false">
            <a-button type="primary" @click="showModalShop">SELECT SHOP</a-button>
            <div class="author-info">
              {{ this.selectedShop.name }}
            </div>
          </a-form-item>

          <a-form-item class="mb-10" label="POS" :colon="false">
            <a-button type="primary" @click="showModalPos">SELECT POS</a-button>
            <div class="author-info">
              {{ this.selectedPos.name }}
            </div>
          </a-form-item>

          <a-form-item class="mb-5" label="OFD" :colon="false">
            <a-input
                v-decorator="[
						'OFD',
						{ rules: [{ required: true, message: 'Please input OFD' }] },
						]"
                type="text"
                placeholder="name"
                v-model="ofd"/>
          </a-form-item>

          <a-form-item class="mb-5" label="printer" :colon="false">
            <a-input
                v-decorator="[
						'printer',
						{ rules: [{ required: true, message: 'Please input printer' }] },
						]"
                type="text"
                placeholder="printer"
                v-model="printer"/>
          </a-form-item>

          <a-button type="primary" block html-type="submit" class="login-form-button">
            CREATE CASH-REGISTER
          </a-button>

        </a-form>
        <!-- / Sign In Form -->

        <p class="font-semibold text-muted">Back to cash-registers <router-link to="/references/cash-register" class="font-bold text-dark">
          back</router-link></p>
      </a-col>

    </a-row>

    <a-modal v-model:visible="dialogVisibleShop"
             title="Select shop"
             @ok="handleOkShop"
             @cancel="handleOkShop"
             @close="handleOkShop">
      <CardShopTableDialog/>
    </a-modal>

    <a-modal v-model:visible="dialogVisiblePos"
             title="Select shop"
             @ok="handleOkPos"
             @cancel="handleOkPos"
             @close="handleOkPos">
      <CardPosTableDialog/>
    </a-modal>

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";
  import CardShopTableDialog from "../../../components/Cards/CardShopTableDialog";
  import CardPosTableDialog from "../../../components/Cards/CardPosTableDialog";

	export default ({

    computed: {
      ...mapState('cashRegister', ['cashRegister']),
      ...mapState('pos', ['pos', 'selectedPos', 'dialogVisiblePos']),
      ...mapState('shop', ['shop', 'selectedShop',  'dialogVisibleShop']),
    },

    components: {
      CardShopTableDialog,
      CardPosTableDialog
    },

		data() {
      return {
        ofd: '',
        printer: '',
      }
		},

    destroyed() {
      this.handleCloseSelectionShop();
    },

    methods: {
      ...mapActions('cashRegister', ['createCashRegister']),
      ...mapActions('pos', ['setDialogVisiblePos', 'setSelectedPos']),
      ...mapActions('shop', ['setDialogVisibilityShop', 'handleSelectShop', 'handleCloseSelectionShop']),

      handleSubmit() {
        const shopID = this.selectedShop.id;
        const posID = this.selectedPos.id;
        const { ofd, printer } = this;
        if (shopID && posID && ofd && printer) {
          this.createCashRegister({shopID, posID, ofd, printer});
        }
      },

      showModalShop() {
        const visibility = true;
        this.setDialogVisibilityShop({visibility});
      },

      handleOkShop(){
        const visibility = false;
        this.setDialogVisibilityShop({visibility});
      },

      showModalPos(){
        const visibility = true;
        this.setDialogVisiblePos({visibility});
      },

      handleOkPos(){
        const visibility = false;
        this.setDialogVisiblePos({visibility});
      }

    },
	})

</script>

<style lang="scss">
</style>