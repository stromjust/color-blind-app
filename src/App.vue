<template>
    <div id="colorApp">
        <info-column></info-column>

		<div class="buttonContainer">
			<img @click="addColorColumn" src="./assets/plus.svg"
					alt="Add color column" class="colorButton" draggable="false">
			<img @click="removeColorColumn" src="./assets/minus.svg"
					alt="Remove color column" class="colorButton" draggable="false">
		</div>

        <color-column :text='text' v-for="column in colorColumnCount"></color-column>
    </div>
</template>

<script>
    import ColorColumn from './components/ColorColumn.vue'
    import InfoColumn from './components/InfoColumn.vue'
	import { eventBus } from './main'

    export default {
        data: () => ({
			colorColumnCount: 1,
			colorColumnCountMax: 4,
			text: 'color'
		}),
        components: {
          'color-column': ColorColumn,
          'info-column': InfoColumn
		},
		methods: {
			addColorColumn() {
				if(this.colorColumnCount < this.colorColumnCountMax) {
					this.colorColumnCount += 1;
				}
			},
			removeColorColumn() {
				if(this.colorColumnCount > 1) {
					this.colorColumnCount -= 1;
				}
			}
		},
		created() {
			eventBus.$on('textChanged', (text) => {
				this.text = text;
			});
		}
    }
</script>

<style>
    #colorApp {
        display: flex;
    }

	.buttonContainer {
		width: 45px;
	}

	.colorButton {
		margin: 0 5px;
		filter: grayscale(.7);
		user-select: none;
	}
	.colorButton:hover {
		filter: grayscale(0);
	}
	.colorButton:active {
		filter: contrast(1.5);
	}
</style>
