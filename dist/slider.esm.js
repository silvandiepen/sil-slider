import animationFrame from '@sil/animationframe';

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=".slider { width: 100vw; height: 100vh; max-height: 100vw; position: relative; } .slider__slide { position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; max-height: 100vw; display: flex; align-items: center; justify-content: center; --scale: calc(1 - (4.16667 * 4) / 100); transform: scale(var(--scale)); transition: transform 0.3s ease-in, opacity 0.3s ease-in-out; } .slider__slide, .slider__slide.next { opacity: 0; } .slider__slide.previous { opacity: 0; } .slider__slide.active { opacity: 1; --scale: calc(1 - (4.16667 * 2) / 100); } .slider__slide.active .slider__image-element { transform: scale(1); } .slider__container { overflow: hidden; position: relative; display: inline-block; } .slider__image { max-width: 100vw; max-height: 100vh; transition: transform 5s ease-out; } .slider__count { position: absolute; z-index: 2; top: 0; right: 0; font-weight: bold; background-color: var(--slider-count-bg, black); color: var(--slider-count-text, white); font-size: 12px; padding: 0.5rem; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();
var slider = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"slider",on:{"click":function($event){_vm.nextSlide(true);}}},[_c('div',{staticClass:"slider__count"},[_c('span',[_vm._v(_vm._s(_vm.slider.current)+" / "+_vm._s(_vm.imageList.length))])]),_vm._v(" "),_vm._l((_vm.imageList),function(image,idx){return _c('div',{key:idx,staticClass:"slider__slide",class:_vm.setStatus(idx)},[_c('div',{staticClass:"slider__container"},[_c('img',{staticClass:"slider__image",attrs:{"src":image.src,"alt":image.description}})])])})],2)},staticRenderFns: [],
	name: 'Slider',
	props: {
		startAt: {
			type: Number,
			default: 0
		},
		autoplay: {
			type: Boolean,
			default: true
		},
		autoplaySpeed: {
			type: Number,
			default: 3000
		},
		active: {
			type: Boolean,
			default: true
		},
		slides: {
			type: Array,
			default: function () { return []; }
		}
	},
	data: function () { return ({
		slider: {
			//		current: this.$props.startAt || 0,
			//	autoplay: this.$props.autoplay || true
			current: 0,
			autoplay: true
		}
	}); },
	computed: {
		slideList: function slideList() {
			return this.$props.slides;
		}
	},
	mounted: function mounted() {
		var this$1 = this;

		animationFrame(function () {
			if (this$1.slider.autoplay)  { this$1.nextSlide(); }
		}, this.$props.autoplaySpeed);
	},
	methods: {
		nextSlide: function nextSlide(clicked) {
			var this$1 = this;
			if ( clicked === void 0 ) clicked = false;

			if (this.slider.current + 1 > this.slideList.length - 1) { this.slider.current = 0; }
			else { this.slider.current++; }
			
			if (clicked) {
				this.slider.autoplay = false;
				setTimeout(function () {
					this$1.slider.autoplay = true;
				}, this.$props.autoplaySpeed);
			}
		},
		setStatus: function setStatus(idx) {
			if (this.slider.current == idx) { return 'active'; }
			else if (this.slider.current == idx - 1) { return 'next'; }
			else if (this.slider.current == idx + 1) { return 'previous'; }
			else if (this.slider.current == 0 && idx == this.imageList.length - 1) { return 'previous'; }
			else if (this.slider.current == this.imageList.length - 1 && idx == 0) { return 'next'; }
		}
	}
};

// Import vue component

// install function executed by Vue.use()
function install(Vue) {
	if (install.installed) { return; }
	install.installed = true;

	Vue.component('slider', slider);
}

// Create module definition for Vue.use()
var plugin = {
	install: install
};

// To auto-install when vue is found
var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default slider;
export { install };
