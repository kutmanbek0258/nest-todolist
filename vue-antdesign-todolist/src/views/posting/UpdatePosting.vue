<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

    <a-row type="flex" :gutter="24" justify="space-around" align="middle">

      <a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 0}" class="col-form">
        <h1 class="mb-15">Edit product posting</h1>
        <h5 class="font-regular text-muted">Edit product posting</h5>

        <a-form
            id="components-form-demo-normal-login"
            class="login-form"
            @submit.prevent="handleSubmit"
            :hideRequiredMark="true"
        >
          <a-form-item class="mb-10" label="Product" :colon="false">
            <a-input v-model="posting.product.name" :disabled="true"></a-input>
          </a-form-item>
          <a-form-item class="mb-5" label="Quantity" :colon="false">
            <a-input
                v-decorator="[
						'quantity',
						{ rules: [{ required: true, message: 'Please input product quantity' }] },
						]"
                type="number"
                placeholder="Quantity"
                v-model="posting.quantity"/>
          </a-form-item>
          <a-form-item class="mb-5" label="Cell number" :colon="false">
            <a-input
                v-decorator="[
						'cell_number',
						{ rules: [{ required: true, message: 'Please input product cell number' }] },
						]"
                type="text"
                placeholder="Cell number"
                v-model="posting.cell_number"/>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" block html-type="submit" class="login-form-button">
              UPDATE POSTING
            </a-button>
          </a-form-item>
        </a-form>

        <p class="font-semibold text-muted">Back to products <router-link to="/postings" class="font-bold text-dark">back</router-link></p>
      </a-col>

    </a-row>

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	export default ({

    computed: {
      ...mapState('posting', ['posting']),
    },

		data() {
      return {
        productName: 'SELECT PRODUCT',
        id: '',
        visible: false,
      }
		},

    created(){
      this.id = this.$route.params.id;
      this.getPostingById({'id': this.id});
    },

    methods: {
      ...mapActions('posting', ['updatePosting', 'getPostingById']),
      handleSubmit() {
        const product = this.posting.product._id;
        const {
            _id: id,
            quantity,
            cell_number,
        } = this.posting;
        if (id && product && quantity && cell_number) {
          this.updatePosting({ id, product, quantity, cell_number });
        }
      },

    },
	})

</script>

<style lang="scss">
</style>