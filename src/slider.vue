<template>
	<div class="slider" @click="nextSlide(true)">
		<div class="slider__count">
			<span>{{ slider.current }} / {{ slideList.length }}</span>
		</div>
		<div v-if="slideList">
			<div
				v-for="(image, idx) in slideList"
				:key="idx"
				class="slider__slide"
				:class="setStatus(idx)"
			>
				<div class="slider__container">
					<img
						:src="image.src"
						:alt="image.description"
						class="slider__image"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import animationFrame from '@sil/animationframe';

export default {
	name: 'Slider',
	props: {
		slides: {
			type: Array,
			default: () => []
		},
		settings: {
			type: Object,
			default: () => {}
		}
	},
	data: () => ({
		slider: {
			active: true,
			autoplay: true,
			autoplaySpeed: 3000,
			startAt: 0,
			current: this.$props.startAt || 0,
			autoplay: this.$props.autoplay || true
		}
	}),
	computed: {
		slideList() {
			if (this.$props.slides) return this.$props.slides;
			else return [];
		}
	},
	created() {
		if (Object.keys(this.$props.settings).length > 0)
			this.slider = Object.assign(this.slider, ...this.$props.settings);
	},
	mounted() {
		animationFrame(() => {
			if (this.slider.autoplay) this.nextSlide();
		}, this.slider.autoplaySpeed);
	},
	methods: {
		nextSlide(clicked = false) {
			if (this.slider.current + 1 > this.slideList.length - 1) this.slider.current = 0;
			else this.slider.current++;

			if (clicked) {
				this.slider.autoplay = false;
				setTimeout(() => {
					this.slider.autoplay = true;
				}, this.slider.autoplaySpeed);
			}
		},
		setStatus(idx) {
			if (this.slider.current == idx) return 'active';
			else if (this.slider.current == idx - 1) return 'next';
			else if (this.slider.current == idx + 1) return 'previous';
			else if (this.slider.current == 0 && idx == this.slideList.length - 1)
				return 'previous';
			else if (this.slider.current == this.slideList.length - 1 && idx == 0)
				return 'next';
		}
	}
};
</script>

<style lang="scss">
.slider {
	width: 100vw;
	height: 100vh;
	max-height: 100vw;
	position: relative;

	&__slide {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		max-height: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
		--scale: calc(1 - (4.16667 * 4) / 100);
		transform: scale(var(--scale));
		transition: transform 0.3s ease-in, opacity 0.3s ease-in-out;

		&,
		&.next {
			opacity: 0;
		}
		&.previous {
			opacity: 0;
		}
		&.active {
			opacity: 1;
			--scale: calc(1 - (4.16667 * 2) / 100);
			.slider__image-element {
				transform: scale(1);
			}
		}
	}
	&__container {
		overflow: hidden;
		position: relative;
		display: inline-block;
	}
	&__image {
		max-width: 100vw;
		max-height: 100vh;
		transition: transform 5s ease-out;
	}
	&__count {
		position: absolute;
		z-index: 2;
		top: 0;
		right: 0;
		font-weight: bold;
		background-color: var(--slider-count-bg, black);
		color: var(--slider-count-text, white);
		font-size: 12px;
		padding: 0.5rem;
	}
}
</style>
