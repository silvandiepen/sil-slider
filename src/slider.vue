<template>
	<div class="slider" @click="nextSlide(true)">
		<!-- The slides -->
		<div v-if="slideList" class="slider__slides">
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
						:class="image.classes"
						class="slider__image"
					/>
				</div>
			</div>
		</div>

		<!-- Counter  -->
		<div class="slider__counter" v-if="slider.counter">
			<span>{{ slider.current }} / {{ slideList.length }}</span>
		</div>

		<!-- Navigation Arrows -->
		<div class="slider__arrows" v-if="slider.arrows">
			<button
				class="slider__arrow slider__arrow--prev"
				@click="prevSlide(true)"
			>
				<span class="slider__arrow-text">Previous</span>
			</button>
			<button
				class="slider__arrow slider__arrow--next"
				@click="nextSlide(true)"
			>
				<span class="slider__arrow-text">Next</span>
			</button>
		</div>

		<!-- Navigation bars -->
		<div class="slider__nav" v-if="slider.navigation">
			<ul class="slider__nav-list">
				<li
					class="slider__nav-item"
					v-for="(slide, idx) in slideList"
					:key="idx"
					:class="navClass(idx)"
				>
					<button class="slider__nav-button">{{ idx }}</button>
				</li>
			</ul>
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
	data() {
		return {
			slider: {
				active: true,
				autoplay: true,
				autoplaySpeed: 10000,
				navigation: false,
				arrows: false,
				counter: false,
				startAt: 0,
				current: this.$props.startAt || 0,
				autoplay: this.$props.autoplay || true
			}
		};
	},
	computed: {
		slideList() {
			if (this.$props.slides) return this.$props.slides;
			else return [];
		}
	},
	created() {
		this.slider = { ...this.slider, ...this.$props.settings };
	},
	mounted() {
		animationFrame(() => {
			if (this.slider.autoplay) this.nextSlide();
		}, this.slider.autoplaySpeed);
	},
	methods: {
		nextSlide(clicked = false) {
			if (this.slider.current + 1 > this.slideList.length - 1)
				this.slider.current = 0;
			else this.slider.current++;

			if (clicked) {
				this.slider.autoplay = false;
				setTimeout(() => {
					this.slider.autoplay = true;
				}, this.slider.autoplaySpeed);
			}
		},
		prevSlide(clicked = false) {
			if (this.slider.current - 1 < 0)
				this.slider.current = this.slideList.length;
			else this.slider.current = this.slider.current - 1;

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
		},
		navClass(idx) {
			if (this.slider.current == idx) return ['active'];
			else if (this.slider.current == idx - 1) return ['next'];
			else if (this.slider.current == idx + 1) return ['previous'];
		}
	}
};
</script>