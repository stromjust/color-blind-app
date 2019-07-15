<template>
	<div class="container">
		<span class="text">{{ mode }} mode :</span>
		<div class="switch" @click="switchTheme">
			<div class="thumb" :class='{switched: isDark}'></div>
		</div>
	</div>

</template>
<script>
	import { eventBus } from '../main'

	export default {
		data: () => ({
			isDark: false,
			mode: 'dark'
		}),
		methods: {
			switchTheme() {
				this.isDark = !this.isDark;
				if(this.isDark) {
					document.body.className = 'darkTheme';
					this.mode = 'light';
				}
				else {
					document.body.className = '';
					this.mode = 'dark';
				}
				let color = getComputedStyle(document.querySelector('body')).backgroundColor;
				eventBus.$emit('backgroundChanged', color);
			}
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		margin-bottom: 10px;
		align-items: center;
	}

	.text {
		margin-right: 5px;
		padding-bottom: 3px;
		font-weight: 400;
	}

	.switch {
		padding: 0 2px;
		width: 40px;
		height: 10px;
		border-radius: 20px;
		background-color: #bcbcbc;
		cursor: pointer;
	}

	.thumb {
		transform: translateY(-25%);
		box-sizing: border-box;
		width: 20px;
		height: 20px;
		border-radius: 100%;
		background-color: #696985;
		transition: all .2s ease-out;
	}

	.switched {
		margin-left: 100%;
		transform: translate(-100%, -25%);
	}

</style>
