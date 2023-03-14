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
          <a-form-item class="mb-5" label="Name" :colon="false">
            <a-input
                v-decorator="[
						'name',
						{ rules: [{ required: true, message: 'Please input product quantity' }] },
						]"
                type="text"
                placeholder="Name"
                v-model="todo.name"/>
          </a-form-item>
          <a-form-item class="mb-5" label="Description" :colon="false">
            <a-input
                v-decorator="[
						'description',
						{ rules: [{ required: true, message: 'Please input product cell number' }] },
						]"
                type="text"
                placeholder="Description"
                v-model="todo.description"/>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" block html-type="submit" class="login-form-button">
              UPDATE TODO
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
      ...mapState('todo', ['todo']),
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
      this.getTodoById({'id': this.id});
    },

    methods: {
      ...mapActions('todo', ['updateTodo', 'getTodoById']),
      handleSubmit() {
        const {
          id,
          name,
          description,
          done
        } = this.todo;
        if (id && name && description && done != null) {
          this.updateTodo({ id, name, description, done });
        }
      },

    },
	})

</script>

<style lang="scss">
</style>