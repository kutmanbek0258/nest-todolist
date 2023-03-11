<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

    <a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle">

      <!-- Sign In Form Column -->
      <a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 0}" class="col-form">
        <h1 class="mb-15">{{ $t('create_equipment.title') }}</h1>
        <h5 class="font-regular text-muted">{{ $t('create_equipment.text_message') }}</h5>

        <!-- Sign In Form -->
        <a-form
            id="components-form-demo-normal-login"
            class="login-form"
            @submit.prevent="handleSubmit"
            :hideRequiredMark="true"
        >
          <a-form-item class="mb-10" :label="$t('create_equipment.name')" :colon="false">
            <a-input
                v-decorator="[
						'name',
						{ rules: [{ required: true, message: 'Please input equipment name!' }] },
						]"
                :placeholder="$t('create_equipment.name')"
                type="text"
                v-model="name"
            />
          </a-form-item>
          <a-form-item class="mb-5" :label="$t('create_equipment.description')" :colon="false">
            <a-textarea
                v-decorator="[
						'description',
						{ rules: [{ required: true, message: 'Please input equipment Description' }] },
						]"
                type="text"
                :placeholder="$t('create_equipment.description')"
                v-model="description"/>
          </a-form-item>
          <a-form-item>
            <a-form-item class="mb-5" :label="$t('create_equipment.type')" :colon="false">
              <a-input
                  v-decorator="[
						'system_code',
						{ rules: [{ required: true, message: 'Please input equipment type' }] },
						]"
                  type="text"
                  :placeholder="$t('create_equipment.type')"
                  v-model="type"
              />
            </a-form-item>
            <a-button type="primary" block html-type="submit" class="login-form-button">
              {{ $t('create_equipment.create_button') }}
            </a-button>
          </a-form-item>
        </a-form>
        <!-- / Sign In Form -->

        <p class="font-semibold text-muted">{{$t('create_equipment.back_to_equipments')}} <router-link to="/products" class="font-bold text-dark">{{$t('create_equipment.back')}}</router-link></p>
      </a-col>

    </a-row>

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

	export default ({

    computed: {
      ...mapState('equipment', ['equipment']),
      ...mapState('auth', ['user'])
    },

		data() {
      return {
        // Binded model property for "Sign In Form" switch button for "Remember Me" .
        name: '',
        description: '',
        type: '',
      }
		},

    methods: {
      ...mapActions('equipment', ['createEquipment']),
      handleSubmit() {
        const user = this.user.id;
        let {
            name,
            description,
            type,
        } = this;
        if (name && description && type) {
          this.createEquipment({name, description, type});
        }
      },
    },
	})

</script>

<style lang="scss">
</style>