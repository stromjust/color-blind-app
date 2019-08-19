<template>
  <div id="app">
		<div class="article">
			<section class="article__section">
				<h3>Who it's for</h3>
				<p>
					Color blindness simulator is a tool designed to aid web developers and user-interface designers test a color palette by visualising how color blind people would perceive it.
				</p>
			</section>
			<section class="article__section">
				<h3>Why test color</h3>
				<p>
					A lot of people have some kind of color deficiency, in fact, 8% of male and 1% of female population are color blind.<br>
					That’s more than the population of U.S (330M).
					Depending on your target audience, percentage of color blind people might be even higher. <br>
					So making sure that color combinations are not hindering large group of people is important for user experience.
				</p>
			</section>
			<section class="article__section">
				<h3>How color hinders</h3>
				<p>
					Poor color choice can make for a frustrating experience for color blind individuals.<br>
					If you have a red button with black text:
				</p>
				<img src="../assets/visible.jpg" alt="Visible font image">
				<p>
					Most people will be able to read what’s written on it. <br>
					However, a person with <strong>Deuteranopia</strong> will see the button like this:
				</p>
				<img src="../assets/not_visible.jpg" alt="Not visible font image">
				<p>
					That is much harder to read. And in less favorable environment, such as low brightness or direct sunlight, it might be close to impossible.<br><br>
					Additionally, if you have two different elements positioned closely:
				</p>
				<img src="../assets/visible_elements.jpg" alt="Visible boundaries image">
				<p>
					Most people would be able to distinguish where one element ends and another begins.<br>
					However, a person with <strong>Protanopia</strong> would see these elements like this:
				</p>
				<img src="../assets/not_visible_elements.jpg" alt="Not visible boundaries image">
				<p>
					It would be much harder to notice element boundaries.
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
