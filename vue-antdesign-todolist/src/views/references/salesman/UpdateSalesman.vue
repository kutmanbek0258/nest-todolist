<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

    <a-row type="flex" :gutter="24" justify="space-around" align="middle">

      <!-- Sign In Form Column -->
      <a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 0}" class="col-form">
        <h1 class="mb-15">Update salesman</h1>
        <h5 class="font-regular text-muted">update salesman</h5>

        <!-- Sign In Form -->
        <a-form
            id="components-form-demo-normal-login"
            class="login-form"
            @submit.prevent="handleSubmit"
            :hideRequiredMark="true"
        >

          <a-form-item class="mb-10" label="person" :colon="false">
            <a-button type="primary" @click="showModalPerson">SELECT PERSON</a-button>
            <div class="author-info">
              old:
              {{ this.salesman.fullname }}
            </div>
            <div class="author-info">
              new:
              {{ this.selectedPerson.name }}
            </div>
          </a-form-item>

          <a-form-item class="mb-10" label="company" :colon="false">
            <a-button type="primary" @click="showModalCompany">SELECT COMPANY</a-button>
            <div class="author-info">
              old:
              {{ this.salesman.companyname }}
            </div>
            <div class="author-info">
              new:
              {{ this.selectedCompany.name }}
            </div>
          </a-form-item>

          <a-button type="primary" block html-type="submit" class="login-form-button">
            UPDATE SUPPLIER
          </a-button>

        </a-form>
        <!-- / Sign In Form -->

        <p class="font-semibold text-muted">Back to groups <router-link to="/references/product-group" class="font-bold text-dark">
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
      ...mapState('salesman', ['salesman']),
      ...mapState('person', ['person', 'selectedPerson',  'dialogVisiblePerson']),
      ...mapState('company', ['company', 'selectedCompany', 'dialogVisibleCompany'])
    },

    components: {
      CardPersonTableDialog,
      CardCompanyTableDialog,
    },

		data() {
      return {
        id: '',

      }
		},

    created() {
      this.id = this.$route.params.id;
      this.getSalesmanById({id: this.id});
    },

    destroyed() {
      this.handleCloseSelectionPerson();
      this.handleCloseSelectionCompany();
    },

    methods: {
      ...mapActions('salesman', ['getSalesmanById', 'updateSalesman']),
      ...mapActions('person', ['setDialogVisibilityPerson', 'handleCloseSelectionPerson']),
      ...mapActions('company', ['setDialogVisibilityCompany', 'handleCloseSelectionCompany']),

      handleSubmit() {
        const personID = this.selectedPerson.id;
        const companyID = this.selectedCompany.id;
        if (personID && companyID) {
          this.updateSalesman({id: this.id, personID, companyID});
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