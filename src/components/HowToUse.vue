<template>
  <div id="app">
		<div class="article">
			<h3>How to use simulator</h3>
			<p>
				If you have a color palette, start by entering HEX or RGB value of text:
			</p>
			<img src="../assets/font_color.png" alt="Font color picker image">
			<p>
				Using plus and minus buttons you can add or remove color columns, depending on your needs. You can test up to 4 colors at the same time.<br><br>
				Then enter the color values that you wish to test into each column:
			</p>
			<img src="../assets/picker.jpg" alt="Block color picker image">
			<p>
				Now you should see how people with different kinds of color blindness will perceive the text on your colors.<br>
				Additionally, there are contrast indicators in each color block, showing if font and background color meets Web Content Accessibility Guidelines (WCAG) 2.0 standards.<br>
				It should be noted that it is enough to meet minimum color contrast for color to be usable.<br><br>
				If you color has transparency, then contrast indicator also takes consideration of background color, which you can change between light and dark.
			</p>
			<br>
			<h3>Color blindness types</h3>
			<p>
				You might have noticed some color blindness types have sliders on them and some of them sound similar. That’s because deficiencies ending in –omaly indicate partial color deficiency, and –opia indicates complete color deficiency.<br>
				Deuteranomaly set on 25 (25%), means individual can only perceive 25% of color green.<br><br>
				Deuteranomaly set on 0 (0%) would be the same as Deuteranopia – complete green color deficiency.<br>
				Protanopia/Protanomaly – complete/partial color deficiency.<br>
				Tritanopia/Tritanomaly – complete/partial blue color deficiency.<br>
			</p>
		</div>
	</div>
</template>
<script>
export default {
  data: () => ({

  })
}
</script>
<style lang="scss" scoped>
#app {
	display: flex;
	justify-content: center;
}

.article {
	width: 70%;
	min-width: 800px;

	img {
		width: 15%;
	}

	p {
		line-height: 28px;
	}
}
</style>
