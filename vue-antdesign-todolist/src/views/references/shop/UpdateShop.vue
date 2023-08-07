<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

    <a-row type="flex" :gutter="24" justify="space-around" align="middle">

      <!-- Sign In Form Column -->
      <a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 0}" class="col-form">
        <h1 class="mb-15">Create shop</h1>
        <h5 class="font-regular text-muted">create shop</h5>

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
                v-model="shop.name"/>
          </a-form-item>

          <a-form-item class="mb-5" label="description" :colon="false">
            <a-input
                v-decorator="[
						'description',
						{ rules: [{ required: true, message: 'Please input description' }] },
						]"
                type="text"
                placeholder="description"
                v-model="shop.description"/>
          </a-form-item>

          <a-form-item class="mb-5" label="address" :colon="false">
            <a-input
                v-decorator="[
						'address',
						{ rules: [{ required: true, message: 'Please input address' }] },
						]"
                type="text"
                placeholder="address"
                v-model="shop.address"/>
          </a-form-item>

          <a-form-item class="mb-10" label="company" :colon="false">
            <a-button type="primary" @click="showModalCompany">SELECT COMPANY</a-button>
            <div class="author-info">
              old:
              {{ this.shop.companyname }}
            </div>
            <div class="author-info">
              new:
              {{ this.selectedCompany.name }}
            </div>
          </a-form-item>

          <a-form-item class="mb-10" label="manager" :colon="false">
            <a-button type="primary" @click="showModalPerson">SELECT MANAGER</a-button>
            <div class="author-info">
              old:
              {{ this.shop.managername }}
            </div>
            <div class="author-info">
              new:
              {{ this.selectedPerson.name }}
            </div>
          </a-form-item>

          <a-form-item class="mb-10" label="depot" :colon="false">
            <a-button type="primary" @click="showModalDepot">SELECT DEPOT</a-button>
            <div class="author-info">
              old:
              {{ this.shop.depotname }}
            </div>
            <div class="author-info">
              new:
              {{ this.selectedDepot.name }}
            </div>
          </a-form-item>

          <a-button type="primary" block html-type="submit" class="login-form-button">
            UPDATE SHOP
          </a-button>

        </a-form>
        <!-- / Sign In Form -->

        <p class="font-semibold text-muted">Back to depot <router-link to="/references/depot" class="font-bold text-dark">
          back</router-link></p>
      </a-col>

    </a-row>

    <a-modal v-model:visible="dialogVisiblePerson"
             title="Select product-group"
             @ok="handleOkPerson"
             @cancel="handleOkPerson"
             @close="handleOkPerson">
      <CardPersonTableDialog/>
    </a-modal>

    <a-modal v-model:visible="dialogVisibleCompany"
             title="Select company"
             @ok="handleOkCompany"
             @cancel="handleOkCompany"
             @close="handleOkCompany">
      <CardCompanyTableDialog/>
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
  import CardPersonTableDialog from "../../../components/Cards/CardPersonTableDialog";
  import CardCompanyTableDialog from "../../../components/Cards/CardCompanyTableDialog";
  import CardDepotTableDialog from "../../../components/Cards/CardDepotTableDialog";

	export default ({

    computed: {
      ...mapState('shop', ['shop']),
      ...mapState('person', ['person', 'selectedPerson',  'dialogVisiblePerson']),
      ...mapState('company', ['company', 'selectedCompany', 'dialogVisibleCompany']),
      ...mapState('depot', ['depot', 'selectedDepot', 'dialogVisibleDepot']),
    },

    components: {
      CardPersonTableDialog,
      CardCompanyTableDialog,
      CardDepotTableDialog,
    },

		data() {
      return {
        id: ''
      }
		},

    created() {
      this.id = this.$route.params.id;
      this.getShopById({id: this.id});
    },

    destroyed() {
      this.handleCloseSelectionPerson();
    },

    methods: {
      ...mapActions('shop', ['getShopById', 'updateShop']),
      ...mapActions('person', ['setDialogVisibilityPerson', 'handleCloseSelectionPerson']),
      ...mapActions('company', ['setDialogVisibilityCompany', 'handleCloseSelectionCompany']),
      ...mapActions('depot', ['setDialogVisibleDepot', 'handleCloseSelectionDepot']),

      handleSubmit() {
        const managerID = (this.selectedPerson.id) ? this.selectedPerson.id : this.shop.managerid;
        const companyID = (this.selectedCompany.id) ? this.selectedCompany.id : this.shop.companyid;
        const depotID = (this.selectedDepot.id) ? this.selectedDepot.id : this.shop.depotid;
        const { name, description, address } = this.shop;
        if (name && description && address && managerID && companyID && depotID) {
          console.log('error', name , description , address , managerID , companyID , depotID)
          this.updateShop({id: this.id, name, description, address, companyID, managerID, depotID});
        }
      },

      showModalPerson() {
        const visibility = true;
        this.setDialogVisibilityPerson({visibility});
      },

      handleOkPerson(){
        const visibility = false;
        this.setDialogVisibilityPerson({visibility});
      },

      showModalCompany(){
        const visibility = true;
        this.setDialogVisibilityCompany({visibility});
      },

      handleOkCompany(){
        const visibility = false;
        this.setDialogVisibilityCompany({visibility});
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