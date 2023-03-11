<!-- 
	This is the main page of the application, the layout component is used here,
	and the router-view is passed to it.
	Layout component is dynamically declared based on the layout for each route,
	specified in routes list router/index.js .
 -->

<template>
	<div id="app">
		<component :is="layout">
			<router-view />
		</component>
	</div>
</template>

<script>

import { mapState, mapActions } from 'vuex';
import { notification } from 'ant-design-vue';

	export default ({
		computed: {
			// Sets components name based on current route's specified layout, defaults to
			// <layout-default></layout-default> component.
      ...mapState({
        alert: state => state.alert
      }),
			layout() {
				return "layout-" + ( this.$route.meta.layout || "default" ).toLowerCase() ;
			}
		},
    components: {
		  notification
    },
    created(){
		  this.$store.subscribe((mutation, state) => {
        if(mutation.type === 'alert/success'){
          this.openNotification('success', this.alert.message)
        } else if(mutation.type === 'alert/error'){
          this.openNotification('error', this.alert.message)
        } else if(mutation.type === 'alert/info'){
          this.openNotification('info', this.alert.message)
        } else if(mutation.type === 'alert/warning'){
          this.openNotification('warning', this.alert.message)
        }
      })
    },
    methods: {
      ...mapActions({
        clearAlert: 'alert/clear'
      }),

      openNotification(type, message){
        notification[type]({
          message: message,
        });
      }
    },
    watch: {
      $route (){
        // clear alert on location change
        this.clearAlert();
      }
    }
	})
	
</script>

<style lang="scss">
</style>