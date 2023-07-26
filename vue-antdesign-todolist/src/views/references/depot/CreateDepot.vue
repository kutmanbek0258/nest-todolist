<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

    <a-row type="flex" :gutter="24" justify="space-around" align="middle">

      <!-- Sign In Form Column -->
      <a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 0}" class="col-form">
        <h1 class="mb-15">Create depot</h1>
        <h5 class="font-regular text-muted">create depot</h5>

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

          <a-form-item class="mb-5" label="address" :colon="false">
            <a-input
                v-decorator="[
						'address',
						{ rules: [{ required: true, message: 'Please input address' }] },
						]"
                type="text"
                placeholder="address"
                v-model="address"/>
          </a-form-item>

          <a-form-item class="mb-10" label="company" :colon="false">
            <a-button type="primary" @click="showModalCompany">SELECT COMPANY</a-button>
            <div class="author-info">
              {{ this.selectedCompany.name }}
            </div>
          </a-form-item>

          <a-form-item class="mb-10" label="person" :colon="false">
            <a-button type="primary" @click="showModalPerson">SELECT MANAGER</a-button>
            <div class="author-info">
              {{ this.selectedPerson.name }}
            </div>
          </a-form-item>

          <a-button type="primary" block html-type="submit" class="login-form-button">
            CREATE DEPOT
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

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";
  import CardPersonTableDialog from "../../../components/Cards/CardPersonTableDialog";
  import CardCompanyTableDialog from "../../../components/Cards/CardCompanyTableDialog";

	export default ({

    computed: {
      ...mapState('depot', ['depot']),
      ...mapState('person', ['person', 'selectedPerson',  'dialogVisiblePerson']),
      ...mapState('company', ['company', 'selectedCompany', 'dialogVisibleCompany'])
    },

    components: {
      CardPersonTableDialog,
      CardCompanyTableDialog,
    },

		data() {
      return {
        name: '',
        description: '',
        address: '',
      }
		},

    destroyed() {
      this.handleCloseSelectionPerson();
    },

    methods: {
      ...mapActions('depot', ['createDepot']),
      ...mapActions('person', ['setDialogVisibilityPerson', 'handleCloseSelectionPerson']),
      ...mapActions('company', ['setDialogVisibilityCompany', 'handleCloseSelectionCompany']),

      handleSubmit() {
        const managerID = this.selectedPerson.id;
        const companyID = this.selectedCompany.id;
        const { name, description, address } = this;
        if (name && description && address && managerID && companyID) {
          this.createDepot({name, description, address, companyID, managerID});
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
      }

    },
	})

</script>

<style lang="scss">
</style>