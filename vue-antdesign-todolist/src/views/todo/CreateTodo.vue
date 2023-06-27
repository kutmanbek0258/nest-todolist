<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

    <a-row type="flex" :gutter="24" justify="space-around" align="middle">

      <!-- Sign In Form Column -->
      <a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 0}" class="col-form">
        <h1 class="mb-15">{{ $t('create_todo.title') }}</h1>
        <h5 class="font-regular text-muted">{{ $t('create_todo.text_message') }}</h5>

        <!-- Sign In Form -->
        <a-form
            id="components-form-demo-normal-login"
            class="login-form"
            @submit.prevent="handleSubmit"
            :hideRequiredMark="true"
        >
          <a-form-item class="mb-5" :label="$t('create_todo.name')" :colon="false">
            <a-input
                v-decorator="[
						'name',
						{ rules: [{ required: true, message: 'Please input todo name' }] },
						]"
                type="text"
                :placeholder="$t('create_todo.name')"
                v-model="name"/>
          </a-form-item>
          <a-form-item class="mb-5" :label="$t('create_todo.description')" :colon="false">
            <a-input
                v-decorator="[
						'description',
						{ rules: [{ required: true, message: 'Please input product cell number' }] },
						]"
                type="text"
                :placeholder="$t('create_todo.description')"
                v-model="description"/>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" block html-type="submit" class="login-form-button">
              {{ $t('create_todo.create_button') }}
            </a-button>
          </a-form-item>
        </a-form>
        <!-- / Sign In Form -->

        <p class="font-semibold text-muted">{{ $t('create_todo.back_to_todos') }} <router-link to="/postings" class="font-bold text-dark">
          {{ $t('create_todo.back') }}</router-link></p>
      </a-col>

    </a-row>

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

  const productsTableColumns = [
    {
      title: 'NAME',
      dataIndex: 'name',
      scopedSlots: { customRender: 'name' },
    },
    {
      title: 'BARCODE',
      dataIndex: 'barcode',
      scopedSlots: { customRender: 'barcode' },
    },
    {
      title: '',
      scopedSlots: { customRender: 'slctBtn' },
      width: 50,
    },
  ];

	export default ({

    computed: {
      ...mapState('auth', ['user']),
      ...mapState('todo', ['todo']),
    },

		data() {
      return {
        // Binded model property for "Sign In Form" switch button for "Remember Me" .
        name: '',
        description: '',
        visible: false,
      }
		},

    methods: {
      ...mapActions('todo', ['createTodo']),
      handleSubmit() {
        const owner = this.user.id;
        const {
          name,
          description,
        } = this;
        if (name && description && owner) {
          this.createTodo({ name, description, owner });
        }else {
          console.log("error");
        }
      },

    },
	})

</script>

<style lang="scss">
</style>