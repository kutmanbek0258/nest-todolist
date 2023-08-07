<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

    <a-row type="flex" :gutter="24" justify="space-around" align="middle">

      <!-- Sign In Form Column -->
      <a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 0}" class="col-form">
        <h1 class="mb-15">Create POS</h1>
        <h5 class="font-regular text-muted">create POS</h5>

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

          <a-form-item class="mb-10" label="company" :colon="false">
            <a-button type="primary" @click="showModalShop">SELECT SHOP</a-button>
            <div class="author-info">
              {{ this.selectedShop.name }}
            </div>
          </a-form-item>

          <a-button type="primary" block html-type="submit" class="login-form-button">
            CREATE POS
          </a-button>

        </a-form>
        <!-- / Sign In Form -->

        <p class="font-semibold text-muted">Back to POS <router-link to="/references/pos" class="font-bold text-dark">
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

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";
  import CardShopTableDialog from "../../../components/Cards/CardShopTableDialog";

	export default ({

    computed: {
      ...mapState('pos', ['pos']),
      ...mapState('shop', ['shop', 'selectedShop',  'dialogVisibleShop']),
    },

    components: {
      CardShopTableDialog,
    },

		data() {
      return {
        name: '',
      }
		},

    destroyed() {
      this.handleCloseSelectionShop();
    },

    methods: {
      ...mapActions('pos', ['createPos']),
      ...mapActions('shop', ['setDialogVisibilityShop', 'handleSelectShop', 'handleCloseSelectionShop']),

      handleSubmit() {
        const shopID = this.selectedShop.id;
        const { name } = this;
        if (name && shopID) {
          this.createPos({name, shopID});
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

    },
	})

</script>

<style lang="scss">
</style>