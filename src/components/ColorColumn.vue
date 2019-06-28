<template>
    <div class="column">
        <color-picker :value="color" @input="changeColor"></color-picker>
        <div :style="{'background-color': normalColor}" class="color-block">{{ text }}</div>
        <div :style="{'background-color': deuteranomalyColor}" class="color-block">{{ text }}</div>
        <div :style="{'background-color': protanomalyColor}" class="color-block">{{ text }}</div>
		<div :style="{'background-color': protanopiaColor}" class="color-block">{{ text }}</div>
		<div :style="{'background-color': deuteranopiaColor}" class="color-block">{{ text }}</div>
    </div>
</template>

<script>
    import { Chrome } from 'vue-color'
    import { ColorMath } from '../mixins/ColorMath.js'
	import { eventBus } from '../main'

    export default {
        data:() => ({
            color: { b: 0, r: 0, g: 0, a: 1 },
			protanomalyRatio: 75,
			deuteranomalyRatio: 75,
        }),
		props: [
			'text',
		],
        methods: {
            changeColor(color) {
                this.color = color.rgba;
            },
            ObjectToRGBA(obj) {
                return `rgba(${obj.r},
                     ${obj.g},
                     ${obj.b},
                     ${this.color.a})`
            }
        },
        computed: {
            normalColor() {
                return this.ObjectToRGBA(this.color);
            },
			deuteranomalyColor() {
				let colorColumnVector = this.toColumnVector(this.color);
                let filtered_RGB = this.getColor(this.deuteranomalyFilter(colorColumnVector, this.deuteranomalyRatio));
                return this.ObjectToRGBA(filtered_RGB);
			},
			protanomalyColor() {
				let colorColumnVector = this.toColumnVector(this.color);
                let filtered_RGB = this.getColor(this.protanomalyFilter(colorColumnVector, this.protanomalyRatio));
                return this.ObjectToRGBA(filtered_RGB);
			},
            protanopiaColor() {
                let colorColumnVector = this.toColumnVector(this.color);
                let filtered_RGB = this.getColor(this.protonopiaFilter(colorColumnVector));
                return this.ObjectToRGBA(filtered_RGB);
            },
            deuteranopiaColor() {
                let colorColumnVector = this.toColumnVector(this.color);
                let filtered_RGB = this.getColor(this.deuteranopiaFilter(colorColumnVector));
                return this.ObjectToRGBA(filtered_RGB);
            }
        },
        components: {
            'color-picker': Chrome
        },
		created() {
			eventBus.$on('deuteranomalyRatioChanged', (ratio) => {
				this.deuteranomalyRatio = ratio;
			});
			eventBus.$on('protanomalyRatioChanged', (ratio) => {
				this.protanomalyRatio = ratio;
			});

			let colors = ['r', 'g', 'b'];
			this.color[ colors.splice( Math.floor(Math.random() * 3), 1 )[0] ] = Math.floor(Math.random() * 56 + 200); // 200 - 255
			this.color[ colors.splice( Math.floor(Math.random() * 2), 1 )[0] ] = Math.floor(Math.random() * 36); // 0 - 35
			this.color[ colors[0] ] = Math.floor(Math.random() * 256); // 0 - 255
		},
        mixins: [ColorMath]
    }
</script>

<style>
    .column {
		margin-right: 10px;
        width: 225px;
    }

    .color-block {
		display: flex;
		justify-content: center;
		align-items: center;
        margin-top: 20px;
        width: 100%;
        height: 100px;
        background-color: red;
    }
</style>
