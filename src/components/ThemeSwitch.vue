<template>
	<div class="container" @click="switchTheme">
		<div class="switch">

		</div>
	</div>
</template>
<script>
	export default {
		data: () => ({
			switched: false
		}),
		methods: {
			switchTheme() {
				document.body.classList.toggle("darkTheme");
			}
		}
	}
</script>

<style scoped>

	.container {
		margin: 0;
		width: 40px;
		height: 20px;
		border-radius: 20px;
		background-color: rgba(180, 180, 180, 1);
		padding: 2px;
		cursor: pointer;
	}

	.switch {
		width: 20px;
		height: 20px;
		border-radius: 100%;
		background-color: #3F3C3C;
	}
</style>
