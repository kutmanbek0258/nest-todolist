<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>

    <a-row type="flex" :gutter="24" justify="space-around" align="middle">

      <!-- Sign In Form Column -->
      <a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 0}" class="col-form">
        <h1 class="mb-15">Upload product list</h1>

        <div v-if="uploadedProducts">
          <h5 class="mb-15">Uploaded products</h5>
          <a-table
              :dataSource="uploadedProducts"
              :columns="productTableColumns"
              :pagination="false"
          />
        </div>
        <div v-else>
          <input
              type="file"
              @change="uploadFile"
              ref="file"
              accept=".csv"
          >
          <button @click="submitFile">Upload!</button>
        </div>
        <!-- / Sign In Form -->
      </a-col>

    </a-row>

	</div>
</template>

<script>

  import {mapActions, mapState} from "vuex";

  const productTableColumns = [
    {
      title: 'NAME',
      dataIndex: 'name',
      scopedSlots: { customRender: 'name' },
    },
    {
      title: 'description',
      dataIndex: 'description',
      scopedSlots: { customRender: 'description' },
    },
  ];

	export default ({

    computed: {
      ...mapState('product', ['uploadedProducts']),
    },

    components: {

    },

    created(){

    },

		data() {
      return {
        file: [],
        productTableColumns,
      }
		},

    destroyed() {

    },

    methods: {
      ...mapActions('product', ['uploadProductsCsvFile']),

      uploadFile() {
        this.file = this.$refs.file.files[0];
      },

      submitFile() {
        this.uploadProductsCsvFile({file: this.file});
      }
    },
	})

</script>

<style lang="scss">
</style>