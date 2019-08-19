<template>
  <div id="app">
		<div class="article">
			<section class="article__section">
				<h3>Color blindness types</h3>
				<p>
					You might have noticed some color blindness types have sliders on them and some of them look similar. That’s because deficiencies ending in <em>–omaly</em> indicate partial color deficiency, and <em>–opia</em> indicates complete color deficiency.<br>
					<ul>
						<li>Deuteranopia/Deuteranomaly - complete/partial green color deficiency.lorem</li>
						<li>Protanopia/Protanomaly – complete/partial red color deficiency.</li>
						<li>Tritanopia/Tritanomaly – complete/partial blue color deficiency.</li>
					</ul>
					Deuteranomaly set on 25% means individual can only perceive 25% of color green and Deuteranomaly set on 0% would be the same as Deuteranopia – complete green color deficiency.
				</p>
			</section>
			<section class="article__section">
				<h3>How to use simulator</h3>
				<p>
					This tool lets you see how individuals with color deficiencies would perceive certain color combinations and text.
					You can test two or more colors at the same time to see how those colors would look next to each other, which shows how clear are the boundaries between UI elements.
					Also, you can see how text would look on each of those colors.<br><br>
					Additionally, there are <strong>contrast indicators</strong> in each color block, showing you if font and background color meets Web Content Accessibility Guidelines (WCAG) 2.0 standards.<br><br>
					If you have a color palette, start by entering HEX or RGB value of text:
				</p>
				<img src="../assets/font_color.png" alt="Font color picker image">
				<p>
					Using plus and minus buttons you can add or remove color columns, depending on your needs. You can test up to 4 colors at the same time.<br><br>
					Then enter the color values that you wish to test into each column:
				</p>
				<img src="../assets/picker.jpg" alt="Block color picker image">
				<p>
					Now you should see how people with different kinds of color blindness would perceive the text on your colors.<br>
					It should be noted that it is enough to meet minimum color contrast for color to be usable.<br><br>
					If you color has transparency, then contrast indicator also takes consideration of background color, which you can change between light and dark.
				</p>
			</section>
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

	&__section {
		margin-bottom: 80px;
	}

	img {
		width: 15%;
	}

	p {
		line-height: 28px;
	}
}
</style>
