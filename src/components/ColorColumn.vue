<template>
    <div class="column">
        <color-picker :value="color" @input="changeColor"></color-picker>
        <div :style="{'background-color': getBoxRGBA(normalColor)}" class="color-block">
			<img :src='contrastIndicator(normalColor)' alt="Contrast indicator" class="contrastTick" draggable="false">
			<span :style="{'color': getTextRGBA(textColor)}" >{{ contrastRatio(textColor, alphaBlending(normalColor)) }}</span>
		</div>
        <div :style="{'background-color': getBoxRGBA(deuteranomalyColor)}" class="color-block">
			<img :src='contrastIndicator(deuteranomalyColor)' alt="Contrast indicator" class="contrastTick" draggable="false">
			<span :style="{'color': getTextRGBA(textColor)}" >{{ contrastRatio(textColor, alphaBlending(deuteranomalyColor)) }}</span>
		</div>
        <div :style="{'background-color': getBoxRGBA(protanomalyColor)}" class="color-block">
			<img :src='contrastIndicator(protanomalyColor)' alt="Contrast indicator" class="contrastTick" draggable="false">
			<span :style="{'color': getTextRGBA(textColor)}" >{{ contrastRatio(textColor, alphaBlending(protanomalyColor)) }}</span>
		</div>
		<div :style="{'background-color': getBoxRGBA(protanopiaColor)}" class="color-block">
			<img :src='contrastIndicator(protanopiaColor)' alt="Contrast indicator" class="contrastTick" draggable="false">
			<span :style="{'color': getTextRGBA(textColor)}" >{{ contrastRatio(textColor, alphaBlending(protanopiaColor)) }}</span>
		</div>
		<div :style="{'background-color': getBoxRGBA(deuteranopiaColor)}" class="color-block">
			<img :src='contrastIndicator(deuteranopiaColor)' alt="Contrast indicator" class="contrastTick" draggable="false">
			<span :style="{'color': getTextRGBA(textColor)}" >{{ contrastRatio(textColor, alphaBlending(deuteranopiaColor)) }}</span>
		</div>
		<div :style="{'background-color': getBoxRGBA(tritanopiaColor)}" class="color-block">
			<img :src='contrastIndicator(tritanopiaColor)' alt="Contrast indicator" class="contrastTick" draggable="false">
			<span :style="{'color': getTextRGBA(textColor)}" >{{ contrastRatio(textColor, alphaBlending(tritanopiaColor)) }}</span>
		</div>
		<div :style="{'background-color': getBoxRGBA(tritanomalyColor)}" class="color-block">
			<img :src='contrastIndicator(tritanomalyColor)' alt="Contrast indicator" class="contrastTick" draggable="false">
			<span :style="{'color': getTextRGBA(textColor)}" >{{ contrastRatio(textColor, alphaBlending(tritanomalyColor)) }}</span>
		</div>
    </div>
</template>

<script>
    import { Chrome } from 'vue-color'
    import { ColorMath } from '../mixins/ColorMath.js'
	import { eventBus } from '../main'

    export default {
        data:() => ({
            color: { r: 0, g: 0, b: 0, a: 1 },
			textColor: {r: 23, g: 23, b: 23, a: 1},
			backgroundColor: { r: 255, g: 255, b: 255},
			protanomalyRatio: 50,
			deuteranomalyRatio: 50,
			tritanomalyRatio: 50,
        }),
		props: [
			'text',
		],
        methods: {
            changeColor(color) {
                this.color = color.rgba;
            },
            getBoxRGBA(obj) {
                return `rgba(${obj.r},
                     ${obj.g},
                     ${obj.b},
                     ${this.color.a})`
            },
			getTextRGBA(obj) {
				return `rgba(${obj.r},
                     ${obj.g},
                     ${obj.b},
                     1)`
			},
			RGBToObject(RGBA) {
				let channels = RGBA.match(/[.?\d]+/g);
				let color = {r: channels[0], g: channels[1], b: channels[2] };
				return color;
			},
			alphaBlending(src) {
				let dst = this.backgroundColor;
				let outRGB = { r: 0, g: 0, b: 0};
				outRGB.r = Math.round(src.r * src.a + dst.r * (1 - src.a));
				outRGB.g = Math.round(src.g * src.a + dst.g * (1 - src.a));
				outRGB.b = Math.round(src.b * src.a + dst.b * (1 - src.a));
				return outRGB;
			},
			contrastIndicator(colorBlock) {
				if(this.contrastRatio(this.textColor, this.alphaBlending(colorBlock)) >= 7.0) {
					return 'src/assets/tick.svg';
				}
				else if(this.contrastRatio(this.textColor, this.alphaBlending(colorBlock)) >= 4.5) {
					return 'src/assets/tick_yellow.svg';
				}
				else {
					return 'src/assets/cross.svg';
				}
			}
        },
        computed: {
            normalColor() {
                return this.color;
            },
			deuteranomalyColor() {
				let colorColumnVector = this.toColumnVector(this.color);
                let filtered_RGB = this.getColor(this.deuteranomalyFilter(colorColumnVector, this.deuteranomalyRatio));
				filtered_RGB.a = this.color.a;
                return filtered_RGB;
			},
			protanomalyColor() {
				let colorColumnVector = this.toColumnVector(this.color);
                let filtered_RGB = this.getColor(this.protanomalyFilter(colorColumnVector, this.protanomalyRatio));
				filtered_RGB.a = this.color.a;
                return filtered_RGB;
			},
			tritanomalyColor() {
				let colorColumnVector = this.toColumnVector(this.color);
				let filtered_RGB = this.getColor(this.tritanomalyFilter(colorColumnVector, this.tritanomalyRatio));
				filtered_RGB.a = this.color.a;
				return filtered_RGB;
			},
            protanopiaColor() {
                let colorColumnVector = this.toColumnVector(this.color);
                let filtered_RGB = this.getColor(this.protonopiaFilter(colorColumnVector));
				filtered_RGB.a = this.color.a;
                return filtered_RGB;
            },
            deuteranopiaColor() {
                let colorColumnVector = this.toColumnVector(this.color);
                let filtered_RGB = this.getColor(this.deuteranopiaFilter(colorColumnVector));
				filtered_RGB.a = this.color.a;
                return filtered_RGB;
            },
			tritanopiaColor() {
				let colorColumnVector = this.toColumnVector(this.color);
				let filtered_RGB = this.getColor(this.tritanopiaFilter(colorColumnVector));
				filtered_RGB.a = this.color.a;
				return filtered_RGB;
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
			eventBus.$on('tritanomalyRatioChanged', (ratio) => {
				this.tritanomalyRatio = ratio;
			});
			eventBus.$on('backgroundChanged', (color) => {
				this.backgroundColor = this.RGBToObject(color);
			});
			eventBus.$on('textColorChanged', (textColor) => {
				this.textColor = textColor;
			})

			this.backgroundColor = this.RGBToObject(getComputedStyle(document.querySelector('body')).backgroundColor);

			let colors = ['r', 'g', 'b'];
			this.color[ colors.splice( Math.floor(Math.random() * 3), 1 )[0] ] = Math.floor(Math.random() * 56 + 200); // 200 - 255
			this.color[ colors.splice( Math.floor(Math.random() * 2), 1 )[0] ] = Math.floor(Math.random() * 36); // 0 - 35
			this.color[ colors[0] ] = Math.floor(Math.random() * 256); // 0 - 255
		},
        mixins: [ColorMath]
    }
</script>

<style>
	.contrastTick {
		width: 20px;
		left: 5px;
		top: 5px;
		user-select: none;
		position: absolute;
	}

    .column {
		margin-right: 10px;
        width: 200px;
    }

    .color-block {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
        margin-top: 20px;
        width: 100%;
        height: 60px;
        background-color: red;
    }
</style>
