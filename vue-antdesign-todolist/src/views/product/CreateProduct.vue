<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

    <a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle">

      <!-- Sign In Form Column -->
      <a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 0}" class="col-form">
        <h1 class="mb-15">{{ $t('create_product.title') }}</h1>
        <h5 class="font-regular text-muted">{{ $t('create_product.text_message') }}</h5>

        <!-- Sign In Form -->
        <a-form
            id="components-form-demo-normal-login"
            class="login-form"
            @submit.prevent="handleSubmit"
            :hideRequiredMark="true"
        >
          <a-form-item class="mb-10" :label="$t('create_product.product_name')" :colon="false">
            <a-input
                v-decorator="[
						'name',
						{ rules: [{ required: true, message: 'Please input product name!' }] },
						]"
                :placeholder="$t('create_product.product_name')"
                type="text"
                v-model="name"
            />
          </a-form-item>
          <a-form-item class="mb-5" :label="$t('create_product.product_description')" :colon="false">
            <a-textarea
                v-decorator="[
						'description',
						{ rules: [{ required: true, message: 'Please input product Description' }] },
						]"
                type="text"
                :placeholder="$t('create_product.product_description')"
                v-model="description"/>
          </a-form-item>
          <a-form-item>
            <a-form-item class="mb-5" :label="$t('create_product.product_system_code')" :colon="false">
              <a-input
                  v-decorator="[
						'system_code',
						{ rules: [{ required: true, message: 'Please input product system code' }] },
						]"
                  type="text"
                  :placeholder="$t('create_product.product_system_code')"
                  v-model="system_code"
              />
            </a-form-item>
            <a-form-item class="mb-5" :label="$t('create_product.product_manufacturer')" :colon="false">
              <a-input
                  v-decorator="[
						'manufacturer',
						{ rules: [{ required: true, message: 'Please input product manufacturer' }] },
						]"
                  type="text"
                  :placeholder="$t('create_product.product_manufacturer')"
                  v-model="manufacturer"
              />
            </a-form-item>
            <a-form-item class="mb-5" :label="$t('create_product.product_barcode')" :colon="false">
              <a-input
                  v-decorator="[
						'barcode',
						{ rules: [{ required: true, message: 'Please input product Description' }] },
						]"
                  type="text"
                  :placeholder="$t('create_product.product_barcode')"
                  v-model="barcode"/>
            </a-form-item>
            <a-button type="primary" block html-type="submit" class="login-form-button">
              {{ $t('create_product.create_product_button') }}
            </a-button>
          </a-form-item>
        </a-form>
        <!-- / Sign In Form -->

        <p class="font-semibold text-muted">{{$t('create_product.back_to_products')}} <router-link to="/products" class="font-bold text-dark">{{$t('create_product.back')}}</router-link></p>
      </a-col>

    </a-row>

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	export default ({

    computed: {
      ...mapState('product', ['product']),
      ...mapState('auth', ['user'])
    },

		data() {
      return {
        // Binded model property for "Sign In Form" switch button for "Remember Me" .
        name: '',
        description: '',
        barcode: '',
        system_code: '',
        manufacturer:'',
      }
		},

    methods: {
      ...mapActions('product', ['createProduct']),
      handleSubmit() {
        const user = this.user.id;
        let {
            name,
            description,
            barcode,
            system_code,
            manufacturer
        } = this;
        if (name) {
          if (!description){
            description = name;
          }
          if (!barcode){
            barcode = 'NO_CODE';
          }
          if (!system_code){
            system_code = 'NO-CODE'
          }
          if(!manufacturer){
            manufacturer = 'NO-CODE'
          }
          this.createProduct({ user, name, description, barcode, system_code, manufacturer});
        }
      },
    },
	})

</script>

<style lang="scss">
</style>