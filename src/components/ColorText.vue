<template>
	<div class="container">
		<span class="text">text :</span>
		<input class="input" type="text" :value="text" @input="textChange" maxlength="24">
	</div>
</template>

<script>
	import { eventBus } from '../main'

	export default {
		data: () => ({
			text: 'color',
		}),
		methods: {
			textChange(event) {
				this.text = event.target.value;
				eventBus.$emit('textChanged', this.text);
			}
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
	}

	.text {
		margin-right: 3px;
		padding-bottom: 3px;
	}

	.input {
		padding: 1px;
		border: 1px solid darkgrey;
		background-color: rgba(135, 135, 135, 0.2);
		width: 87px;
		color: inherit;
	}
</style>
