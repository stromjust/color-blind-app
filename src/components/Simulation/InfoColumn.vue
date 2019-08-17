<template>
  <div id="infoPanel">

      <div class="upperPanel">
		  <div class="upperPanelLeft">
			  <div class="textColorContainer">
				  <span>text color</span>
				  <text-color-picker :value="textColor" @input="changeTextColor" ></text-color-picker>
			  </div>
		  </div>
		  <div class="upperPanelRight">
			  <div class="contrastInfoContainer">
				  <div class="contrastInfoRow">
					  <span>good contrast : </span> <img src='src/assets/tick.svg' alt="Contrast indicator" class="contrastInfo" draggable="false">
				  </div>
				  <div class="contrastInfoRow">
					  <span>min. contrast : </span> <img src='src/assets/tick_yellow.svg' alt="Contrast indicator" class="contrastInfo" draggable="false">
				  </div>
				  <div class="contrastInfoRow">
					  <span>poor contrast : </span> <img src='src/assets/cross.svg' alt="Contrast indicator" class="contrastInfo" draggable="false">
				  </div>
			  </div>
			  <theme-switch></theme-switch>
			  <color-text></color-text>
		  </div>
      </div>

	  <div class="lowerPanel">
		  <div class="percentage">
			  <div><span>92%</span></div>
			  <div><span>2.7%</span></div>
			  <div><span>0.66%</span></div>
			  <div><span>0.59%</span></div>
			  <div><span>0.56%</span></div>
			  <div><span>0.01%</span></div>
			  <div><span>0.01%</span></div>
		  </div>
		  <div class="name">
			  <div><span>normal vision</span></div>
			  <div>
				  <span>deuteranomaly</span>
				  <input type="range" min="1" max="100"
				  			:value="deuteranomalyRatio"
							@input="deuteranomalyRatioChanged($event)" class="slider">
				  <span>{{ deuteranomalyRatio }}</span>
			  </div>
			  <div>
				  <span>protanomaly</span>
				  <input type="range" min="1" max="100"
				  			:value="protanomalyRatio"
							@input="protanomalyRatioChanged($event)" class="slider">
				  <span>{{ protanomalyRatio }}</span>
			  </div>
			  <div><span>protanopia</span></div>
			  <div><span>deuteranopia</span></div>
			  <div><span>tritanopia</span></div>
			  <div>
				  <span>tritanomaly</span>
				  <input type="range" min="1" max="100"
				  			:value="tritanomalyRatio"
							@input="tritanomalyRatioChanged($event)" class="slider">
				  <span>{{ tritanomalyRatio }}</span>
			  </div>
		  </div>
	  </div>
  </div>
</template>

<script>
	import { eventBus } from '../../main'
	import ThemeSwitch from './ThemeSwitch.vue'
	import ColorText from './ColorText.vue'
	import { Material } from 'vue-color'

	export default {
        data: () => ({
			textColor: {r: 23, g: 23, b: 23, a: 1},
			deuteranomalyRatio: 50,
			protanomalyRatio: 50,
			tritanomalyRatio: 50,
		}),
		methods: {
			deuteranomalyRatioChanged(event) {
				if(event.target.value != this.deuteranomalyRatio) {
					this.deuteranomalyRatio = event.target.value;
					eventBus.$emit('deuteranomalyRatioChanged', this.deuteranomalyRatio);
				}
			},
			protanomalyRatioChanged(event) {
				if(event.target.value != this.protanomalyRatio) {
					this.protanomalyRatio = event.target.value;
					eventBus.$emit('protanomalyRatioChanged', this.protanomalyRatio);
				}
			},
			tritanomalyRatioChanged(event) {
				if(event.target.value != this.tritanomalyRatio) {
					this.tritanomalyRatio = event.target.value;
					eventBus.$emit('tritanomalyRatioChanged', this.tritanomalyRatio);
				}
			},
			changeTextColor(textColor){
				this.textColor = textColor.rgba;
				eventBus.$emit('textColorChanged', textColor.rgba);
			}
		},
		components: {
		  'theme-switch': ThemeSwitch,
		  'color-text': ColorText,
		  'text-color-picker': Material
		}
    }
</script>

<style scoped>

    #infoPanel {
        width: 270px;
    }

	.contrastInfo {
		margin-left: 3px;
		width: 20px;
		user-select: none;
	}

	.contrastInfoContainer {
		text-align: right;
		margin: 5px 0;
	}

	.contrastInfoRow {
		display: flex;
		align-items: center;
		margin-bottom: 3px;
		justify-content: flex-end;
	}

	.textColorContainer {
		margin-bottom: auto;
	}

	.upperPanel {
		display: flex;
		align-items: flex-start;
		justify-content: space-around;
		height: 227px;
	}

	.lowerPanel {
		display: flex;

	}

	.percentage {
		width: 30%;
		text-align: center;
	}

	.name {
		width: 70%;
		text-align: right;
		padding-right: 10px;
	}

	.name div, .percentage div {
		height: 60px;
		margin-top: 20px;
		overflow: auto;
		font-size: 20px;
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
	}

	/* Slider: remove default */
	.slider {
		-webkit-appearance: none;
		width: 80%;
		background: transparent;
		outline: 0;
	}
	.slider::-ms-track {
		width: 80%;
		cursor: pointer;
		background: transparent;
		border-color: transparent;
		color: transparent;
	}

	/* Slider: thumb */
	.slider::-webkit-slider-thumb {
		background: #696985;
		-webkit-appearance: none;
		height: 14px;
		width: 14px;
		border-radius: 100%;
		cursor: pointer;
		margin-top: -4px;
	}
	.slider::-moz-range-thumb {
		-webkit-appearance: none;
		height: 14px;
		width: 14px;
		border-radius: 100%;
		cursor: pointer;
	}
	.slider::-ms-thumb {
		-webkit-appearance: none;
		height: 14px;
		width: 14px;
		border-radius: 100%;
		cursor: pointer;
	}

	/* Slider: track */
	.slider::-webkit-slider-runnable-track {
		width: 100%;
		height: 6px;
		cursor: pointer;
		background: #BBBBBB;
		border-radius: 5px;
	}
	.slider::-moz-range-track {
		width: 100%;
		height: 6px;
		cursor: pointer;
		background: #3071a9;
		border-radius: 5px;
	}
	.slider::-ms-track {
		width: 100%;
		height: 6px;
		cursor: pointer;
		background: #3071a9;
		border-radius: 5px;
	}
	.slider::-ms-fill-lower {
		background: #2A6495;
		border-radius: 4px;
	}
	.slider::-ms-fill-upper {
		background: #3071A9;
		border-radius: 4px;
	}
</style>
