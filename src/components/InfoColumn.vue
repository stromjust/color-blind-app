<template>
  <div id="infoPanel">
      <div class="upperPanel">
		  <theme-switch></theme-switch>
		  <color-text></color-text>
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
				  <input type="range" min="1" max="100" value="50" class="slider">
			  </div>
		  </div>
	  </div>
  </div>
</template>

<script>
	import { eventBus } from '../main'
	import ThemeSwitch from './ThemeSwitch.vue'
	import ColorText from './ColorText.vue'

	export default {
        data: () => ({
			deuteranomalyRatio: 75,
			protanomalyRatio: 75,
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
			}
		},
		components: {
		  'theme-switch': ThemeSwitch,
		  'color-text': ColorText
		}
    }
</script>

<style scoped>

    #infoPanel {
        width: 250px;
    }

	.upperPanel {
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: flex-end;
		height: 242px;
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
		height: 100px;
		margin-top: 20px;
		overflow: auto;
		font-size: 20px;
		display: flex;
		flex-flow: column;
		align-items: center;
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
