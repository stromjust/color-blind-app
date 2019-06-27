<template>
    <div class="column">
        <color-picker :value="color" @input="changeColor"></color-picker>
        <div :style="{'background-color': normalColor}" class="color-block"></div>
        <div :style="{'background-color': deuteranomalyColor}" class="color-block"></div>
        <div :style="{'background-color': protanomalyColor}" class="color-block"></div>
		<div :style="{'background-color': protanopiaColor}" class="color-block"></div>
		<div :style="{'background-color': deuteranopiaColor}" class="color-block"></div>
    </div>
</template>

<script>
    import { Chrome } from 'vue-color'
    import { ColorMath } from '../mixins/ColorMath.js'
	import { eventBus } from '../main'

    export default {
        data:() => ({
            color: {
				r: Math.floor(Math.random() * 156 + 100),
				g: Math.floor(Math.random() * 156 + 100),
				b: Math.floor(Math.random() * 156 + 100),
				a: 1
			},
			protanomalyRatio: 75,
			deuteranomalyRatio: 75
        }),
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
        margin-top: 20px;
        width: 100%;
        height: 100px;
        background-color: red;
    }
</style>
