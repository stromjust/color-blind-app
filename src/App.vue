<template>
<div id="color-blind-app">

	<div class="header">
		<div class="header__title">
			<h1>help <strong>design</strong> web for accessibility</h1>
			<h2>45 out of 1000 visitors will have <br><strong>harder time</strong> using your website</h2>
		</div>

		<div class="header__nav">
			<router-link class="header__nav--button"
									 tag="div"
									 :to="{ name: 'Simulation'}">
									 Simulation
		 	</router-link>
			<router-link class="header__nav--button"
									 tag="div"
									 :to="{ name: 'HowToUse'}">
									 How to use
			</router-link>
			<router-link class="header__nav--button"
									 tag="div"
									 :to="{ name: 'WhyUseIt'}">
									 Why use it
			</router-link>
			<router-link class="header__nav--button"
									 tag="div"
									 :to="{ name: 'HowItWorks'}">
									 How it works
		 	</router-link>
		</div>
	</div>

	<router-view></router-view>

	</div>
</div>
</template>

<script>
	import { eventBus } from './main'
</script>

<style lang="scss">

	body {
		padding-left: calc(100vw - 100%);
	}

	#color-blind-app {
		display: flex;
		flex-flow: column;
		width: 1235px;
		margin-bottom: 50px;
	}

	.header {
		display: flex;
	  overflow: auto;
		margin-bottom: 20px;

		&__title {
			margin-left: 10px;
		}

		&__nav {
			display: flex;
			align-items: center;
			margin-left: auto;
			margin-right: 75px;

			&--button {
				margin: 0 25px 0 25px;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				position: relative;
			}

			&--button::after {
				position: absolute;
				width: 100%;
				bottom: -5px;
				content: '';
				height: 3px;
				background-color: #696985;
				transition: all .2s ease-out;
				transform: scaleX(0);
				opacity: 0;
			}

			&--button:hover::after {
				transform: scaleX(1);
				opacity: 1;
			}
		}
	}

	.router-link-exact-active::after {
		transform: scaleX(1);
		opacity: .7;
	}
</style>
