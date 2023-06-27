<template>

	<!-- Main Sidebar -->
	<a-layout-sider
		collapsible
		class="sider-primary"
		breakpoint="lg"
		collapsed-width="0"
		width="250px"
		:collapsed="sidebarCollapsed"
		@collapse="$emit('toggleSidebar', ! sidebarCollapsed)"
		:trigger="null"
		:class="['ant-layout-sider-' + sidebarColor, 'ant-layout-sider-' + sidebarTheme]"
		theme="light"
		:style="{ backgroundColor: 'transparent',}">
			<div class="brand"><img src="images/logo-ct-black.png" alt=""> <span>Muse Dashboard</span></div>
			<hr>

			<!-- Sidebar Navigation Menu -->
			<a-menu theme="light" mode="vertical">
				<a-menu-item>
					<router-link to="/dashboard">
						<span class="icon">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z" fill="#111827"/>
								<path d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z" fill="#111827"/>
								<path d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z" fill="#111827"/>
							</svg>
						</span>
						<span class="label">{{$t('sidebar_dashboard.dashboard')}}</span>
					</router-link>
				</a-menu-item>
<!--        <a-menu-item>-->
<!--          <router-link to="/todo-list">-->
<!--						<span class="icon">-->
<!--							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--								<path d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z" fill="#111827"/>-->
<!--								<path d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z" fill="#111827"/>-->
<!--								<path d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z" fill="#111827"/>-->
<!--							</svg>-->
<!--						</span>-->
<!--            <span class="label">{{$t('sidebar_dashboard.todos')}}</span>-->
<!--          </router-link>-->
<!--        </a-menu-item>-->

        <a-menu-item>
          <router-link to="/sales">
						<span class="icon">
              <svg viewBox="-4.8 -4.8 33.60 33.60" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 2.75H2C1.59 2.75 1.25 2.41 1.25 2C1.25 1.59 1.59 1.25 2 1.25H22C22.41 1.25 22.75 1.59 22.75 2C22.75 2.41 22.41 2.75 22 2.75Z" fill="#292D32"></path> <path d="M16.6703 22.34C16.5403 22.6 16.2703 22.75 16.0003 22.75C15.8903 22.75 15.7703 22.72 15.6703 22.67L12.0003 20.84L8.33026 22.67C8.23026 22.72 8.11026 22.75 8.00026 22.75C7.73026 22.75 7.46026 22.6 7.33026 22.34C7.14026 21.96 7.29026 21.51 7.67026 21.33L11.2503 19.54V17H12.7503V19.54L16.3303 21.33C16.7103 21.51 16.8603 21.96 16.6703 22.34Z" fill="#292D32"></path> <path d="M3 2V14.1C3 16 4 17 5.9 17H18.1C20 17 21 16 21 14.1V2H3ZM16.98 8.58L13.83 11.21C13.54 11.45 13.17 11.55 12.82 11.49C12.46 11.43 12.15 11.21 11.96 10.89L10.91 9.14L7.98 11.58C7.84 11.7 7.67 11.75 7.5 11.75C7.29 11.75 7.07 11.66 6.92 11.48C6.65 11.16 6.7 10.69 7.02 10.42L10.17 7.79C10.46 7.55 10.83 7.45 11.18 7.51C11.54 7.57 11.85 7.79 12.04 8.11L13.09 9.86L16.02 7.42C16.34 7.15 16.81 7.2 17.08 7.52C17.34 7.84 17.3 8.31 16.98 8.58Z" fill="#292D32"></path> </g></svg>
						</span>
            <span class="label">{{$t('sidebar_dashboard.sales')}}</span>
          </router-link>
        </a-menu-item>

        <a-menu-item>
          <router-link to="/depot">
						<span class="icon">
              <svg fill="#000000" viewBox="-128 -128 896.00 896.00" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M504 352H136.4c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8H504c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0 96H136.1c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0-192H136.6c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8H504c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm106.5-139L338.4 3.7a48.15 48.15 0 0 0-36.9 0L29.5 117C11.7 124.5 0 141.9 0 161.3V504c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V256c0-17.6 14.6-32 32.6-32h382.8c18 0 32.6 14.4 32.6 32v248c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V161.3c0-19.4-11.7-36.8-29.5-44.3z"></path></g></svg>
            </span>
            <span class="label">{{$t('sidebar_dashboard.depot')}}</span>
          </router-link>
        </a-menu-item>

        <a-menu-item>
          <router-link to="/marketing">
						<span class="icon">
              <svg fill="#000000" viewBox="-3.2 -3.2 22.40 22.40" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M14.25 2.1a1.25 1.25 0 0 0-1.17-.1L6.91 4.43a1.22 1.22 0 0 1-.46.09H2.5a1.25 1.25 0 0 0-1.25 1.25v.1H0v3h1.25V9a1.25 1.25 0 0 0 1.25 1.22L4 13.4a1.26 1.26 0 0 0 1.13.72h.63A1.25 1.25 0 0 0 7 12.87v-2.53l6.08 2.43a1.27 1.27 0 0 0 .47.09 1.29 1.29 0 0 0 .7-.22 1.25 1.25 0 0 0 .55-1V3.13a1.25 1.25 0 0 0-.55-1.03zm-8.5 3.67V9H2.5V5.77zm0 7.1h-.63l-1.23-2.65h1.86zm1.62-3.72A2.29 2.29 0 0 0 7 9V5.7a2.26 2.26 0 0 0 .37-.11l6.18-2.46v8.48zm7.46-3.03v2.5a1.25 1.25 0 0 0 0-2.5z"></path></g></svg>
            </span>
            <span class="label">{{$t('sidebar_dashboard.marketing')}}</span>
          </router-link>
        </a-menu-item>

				<a-menu-item class="menu-item-header">
					Account Pages
				</a-menu-item>
				<a-menu-item>
					<router-link to="/profile">
						<span class="icon">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z" fill="#111827"/>
							</svg>
						</span>
						<span class="label">{{ $t('sidebar_dashboard.profile') }}</span>
					</router-link>
				</a-menu-item>
			</a-menu>

	</a-layout-sider>
	<!-- / Main Sidebar -->

</template>

<script>

	export default ({
		props: {
			// Sidebar collapsed status.
			sidebarCollapsed: {
				type: Boolean,
				default: false,
			},

			// Main sidebar color.
			sidebarColor: {
				type: String,
				default: "primary",
			},

			// Main sidebar theme : light, white, dark.
			sidebarTheme: {
				type: String,
				default: "light",
			},
		},
		data() {
			return {
				// sidebarCollapsedModel: this.sidebarCollapsed,
			}
		},
	})

</script>
