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

          <a-form-item class="mb-10" label="person" :colon="false">
            <a-button type="primary" @click="showModalPerson">SELECT PERSON</a-button>
            <div class="author-info">
              {{ this.selectedPerson.name }}
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

    <a-modal v-model:visible="dialogVisiblePerson"
             title="Select product-group"
             @ok="handleOkPerson"
             @cancel="handleOkPerson"
             @close="handleOkPerson">
      <CardPersonTableDialog/>
    </a-modal>

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";
  import CardPersonTableDialog from "../../../components/Cards/CardPersonTableDialog";

	export default ({

    computed: {
      ...mapState('supplier', ['supplier']),
      ...mapState('person', ['person', 'selectedPerson', 'current', 'pageSize', 'dialogVisiblePerson']),
    },

    components: {
      CardPersonTableDialog,
    },

		data() {
      return {
        name: '',
        description: '',
        barcode: '',
      }
		},

    destroyed() {
      this.handleCloseSelectionPerson();
    },

    methods: {
      ...mapActions('supplier', ['createSupplier']),
      ...mapActions('person', ['setDialogVisibilityPerson', 'handleCloseSelectionPerson']),
      handleSubmit() {
        const personID = this.selectedPerson.id;
        // const companyID = this.s
        if (personID) {
          this.createSupplier({
            personID
          });
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

    },
	})

</script>

<style lang="scss">
</style>