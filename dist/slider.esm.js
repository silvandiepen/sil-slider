var this$1 = undefined;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
	name: 'Slider',
	props: {
		slides: {
			type: Array,
			default: function () { return []; }
		},
		settings: {
			type: Object,
			default: function () {}
		}
	},
	data: function () { return ({
		slider: {
			active: true,
			autoplay: true,
			autoplaySpeed: 3000,
			startAt: 0,
			current: this$1.$props.startAt || 0,
			autoplay: this$1.$props.autoplay || true
		}
	}); },
	computed: {
		slideList: function slideList() {
			if (this.$props.slides) { return this.$props.slides; }
			else { return []; }
		}
	},
	created: function created() {
		if (Object.keys(this.$props.settings).length > 0)
			{ this.slider = Object.assign.apply(Object, [ this.slider ].concat( this.$props.settings )); }
	},
	mounted: function mounted() {
		var this$1 = this;

		var slider = this.slider;
		animationFrame(function () {
			if (slider.autoplay) { this$1.nextSlide(); }
		}, slider.autoplaySpeed);
	},
	methods: {
		nextSlide: function nextSlide(clicked) {
			if ( clicked === void 0 ) clicked = false;

			var slider = this.slider;
			if (slider.current + 1 > this.slideList.length - 1) { slider.current = 0; }
			else { slider.current++; }

			if (clicked) {
				slider.autoplay = false;
				setTimeout(function () {
					slider.autoplay = true;
				}, slider.autoplaySpeed);
			}
		},
		setStatus: function setStatus(idx) {
			if (this.slider.current == idx) { return 'active'; }
			else if (this.slider.current == idx - 1) { return 'next'; }
			else if (this.slider.current == idx + 1) { return 'previous'; }
			else if (this.slider.current == 0 && idx == this.slideList.length - 1)
				{ return 'previous'; }
			else if (this.slider.current == this.slideList.length - 1 && idx == 0)
				{ return 'next'; }
		}
	}
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD;
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) { style.element.setAttribute('media', css.media); }

      if (HEAD === undefined) {
        HEAD = document.head || document.getElementsByTagName('head')[0];
      }

      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) { style.element.removeChild(nodes[index]); }
      if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
    }
  }
}

var browser = createInjector;

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "slider",
      on: {
        click: function($event) {
          return _vm.nextSlide(true)
        }
      }
    },
    [
      _c("div", { staticClass: "slider__count" }, [
        _c("span", [
          _vm._v(
            _vm._s(_vm.slider.current) + " / " + _vm._s(_vm.slideList.length)
          )
        ])
      ]),
      _vm._v(" "),
      _vm.slideList
        ? _c(
            "div",
            _vm._l(_vm.slideList, function(image, idx) {
              return _c(
                "div",
                {
                  key: idx,
                  staticClass: "slider__slide",
                  class: _vm.setStatus(idx)
                },
                [
                  _c("div", { staticClass: "slider__container" }, [
                    _c("img", {
                      staticClass: "slider__image",
                      attrs: { src: image.src, alt: image.description }
                    })
                  ])
                ]
              )
            }),
            0
          )
        : _vm._e()
    ]
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-d60d1012_0", { source: ".slider {\n  width: 100vw;\n  height: 100vh;\n  max-height: 100vw;\n  position: relative;\n}\n.slider__slide {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  max-height: 100vw;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  --scale: calc(1 - (4.16667 * 4) / 100);\n  transform: scale(var(--scale));\n  transition: transform 0.3s ease-in, opacity 0.3s ease-in-out;\n}\n.slider__slide, .slider__slide.next {\n  opacity: 0;\n}\n.slider__slide.previous {\n  opacity: 0;\n}\n.slider__slide.active {\n  opacity: 1;\n  --scale: calc(1 - (4.16667 * 2) / 100);\n}\n.slider__slide.active .slider__image-element {\n  transform: scale(1);\n}\n.slider__container {\n  overflow: hidden;\n  position: relative;\n  display: inline-block;\n}\n.slider__image {\n  max-width: 100vw;\n  max-height: 100vh;\n  transition: transform 5s ease-out;\n}\n.slider__count {\n  position: absolute;\n  z-index: 2;\n  top: 0;\n  right: 0;\n  font-weight: bold;\n  background-color: var(--slider-count-bg, black);\n  color: var(--slider-count-text, white);\n  font-size: 12px;\n  padding: 0.5rem;\n}\n\n/*# sourceMappingURL=slider.vue.map */", map: {"version":3,"sources":["/Users/silvandiepen/repos/_packages/sil-slider/src/slider.vue","slider.vue"],"names":[],"mappings":"AA0FA;EACA,YAAA;EACA,aAAA;EACA,iBAAA;EACA,kBAAA;ACzFA;AD2FA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,YAAA;EACA,aAAA;EACA,iBAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,sCAAA;EACA,8BAAA;EACA,4DAAA;ACzFA;AD2FA;EAEA,UAAA;AC1FA;AD4FA;EACA,UAAA;AC1FA;AD4FA;EACA,UAAA;EACA,sCAAA;AC1FA;AD2FA;EACA,mBAAA;ACzFA;AD6FA;EACA,gBAAA;EACA,kBAAA;EACA,qBAAA;AC3FA;AD6FA;EACA,gBAAA;EACA,iBAAA;EACA,iCAAA;AC3FA;AD6FA;EACA,kBAAA;EACA,UAAA;EACA,MAAA;EACA,QAAA;EACA,iBAAA;EACA,+CAAA;EACA,sCAAA;EACA,eAAA;EACA,eAAA;AC3FA;;AAEA,qCAAqC","file":"slider.vue","sourcesContent":["<template>\n\t<div class=\"slider\" @click=\"nextSlide(true)\">\n\t\t<div class=\"slider__count\">\n\t\t\t<span>{{ slider.current }} / {{ slideList.length }}</span>\n\t\t</div>\n\t\t<div v-if=\"slideList\">\n\t\t\t<div\n\t\t\t\tv-for=\"(image, idx) in slideList\"\n\t\t\t\t:key=\"idx\"\n\t\t\t\tclass=\"slider__slide\"\n\t\t\t\t:class=\"setStatus(idx)\"\n\t\t\t>\n\t\t\t\t<div class=\"slider__container\">\n\t\t\t\t\t<img\n\t\t\t\t\t\t:src=\"image.src\"\n\t\t\t\t\t\t:alt=\"image.description\"\n\t\t\t\t\t\tclass=\"slider__image\"\n\t\t\t\t\t/>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</template>\n\n<script>\nexport default {\n\tname: 'Slider',\n\tprops: {\n\t\tslides: {\n\t\t\ttype: Array,\n\t\t\tdefault: () => []\n\t\t},\n\t\tsettings: {\n\t\t\ttype: Object,\n\t\t\tdefault: () => {}\n\t\t}\n\t},\n\tdata: () => ({\n\t\tslider: {\n\t\t\tactive: true,\n\t\t\tautoplay: true,\n\t\t\tautoplaySpeed: 3000,\n\t\t\tstartAt: 0,\n\t\t\tcurrent: this.$props.startAt || 0,\n\t\t\tautoplay: this.$props.autoplay || true\n\t\t}\n\t}),\n\tcomputed: {\n\t\tslideList() {\n\t\t\tif (this.$props.slides) return this.$props.slides;\n\t\t\telse return [];\n\t\t}\n\t},\n\tcreated() {\n\t\tif (Object.keys(this.$props.settings).length > 0)\n\t\t\tthis.slider = Object.assign(this.slider, ...this.$props.settings);\n\t},\n\tmounted() {\n\t\tconst slider = this.slider\n\t\tanimationFrame(() => {\n\t\t\tif (slider.autoplay) this.nextSlide();\n\t\t}, slider.autoplaySpeed);\n\t},\n\tmethods: {\n\t\tnextSlide(clicked = false) {\n\t\t\tconst slider = this.slider;\n\t\t\tif (slider.current + 1 > this.slideList.length - 1) slider.current = 0;\n\t\t\telse slider.current++;\n\n\t\t\tif (clicked) {\n\t\t\t\tslider.autoplay = false;\n\t\t\t\tsetTimeout(() => {\n\t\t\t\t\tslider.autoplay = true;\n\t\t\t\t}, slider.autoplaySpeed);\n\t\t\t}\n\t\t},\n\t\tsetStatus(idx) {\n\t\t\tif (this.slider.current == idx) return 'active';\n\t\t\telse if (this.slider.current == idx - 1) return 'next';\n\t\t\telse if (this.slider.current == idx + 1) return 'previous';\n\t\t\telse if (this.slider.current == 0 && idx == this.slideList.length - 1)\n\t\t\t\treturn 'previous';\n\t\t\telse if (this.slider.current == this.slideList.length - 1 && idx == 0)\n\t\t\t\treturn 'next';\n\t\t}\n\t}\n};\n</script>\n\n<style lang=\"scss\">\n.slider {\n\twidth: 100vw;\n\theight: 100vh;\n\tmax-height: 100vw;\n\tposition: relative;\n\n\t&__slide {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\twidth: 100vw;\n\t\theight: 100vh;\n\t\tmax-height: 100vw;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\t--scale: calc(1 - (4.16667 * 4) / 100);\n\t\ttransform: scale(var(--scale));\n\t\ttransition: transform 0.3s ease-in, opacity 0.3s ease-in-out;\n\n\t\t&,\n\t\t&.next {\n\t\t\topacity: 0;\n\t\t}\n\t\t&.previous {\n\t\t\topacity: 0;\n\t\t}\n\t\t&.active {\n\t\t\topacity: 1;\n\t\t\t--scale: calc(1 - (4.16667 * 2) / 100);\n\t\t\t.slider__image-element {\n\t\t\t\ttransform: scale(1);\n\t\t\t}\n\t\t}\n\t}\n\t&__container {\n\t\toverflow: hidden;\n\t\tposition: relative;\n\t\tdisplay: inline-block;\n\t}\n\t&__image {\n\t\tmax-width: 100vw;\n\t\tmax-height: 100vh;\n\t\ttransition: transform 5s ease-out;\n\t}\n\t&__count {\n\t\tposition: absolute;\n\t\tz-index: 2;\n\t\ttop: 0;\n\t\tright: 0;\n\t\tfont-weight: bold;\n\t\tbackground-color: var(--slider-count-bg, black);\n\t\tcolor: var(--slider-count-text, white);\n\t\tfont-size: 12px;\n\t\tpadding: 0.5rem;\n\t}\n}\n</style>\n",".slider {\n  width: 100vw;\n  height: 100vh;\n  max-height: 100vw;\n  position: relative;\n}\n.slider__slide {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  max-height: 100vw;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  --scale: calc(1 - (4.16667 * 4) / 100);\n  transform: scale(var(--scale));\n  transition: transform 0.3s ease-in, opacity 0.3s ease-in-out;\n}\n.slider__slide, .slider__slide.next {\n  opacity: 0;\n}\n.slider__slide.previous {\n  opacity: 0;\n}\n.slider__slide.active {\n  opacity: 1;\n  --scale: calc(1 - (4.16667 * 2) / 100);\n}\n.slider__slide.active .slider__image-element {\n  transform: scale(1);\n}\n.slider__container {\n  overflow: hidden;\n  position: relative;\n  display: inline-block;\n}\n.slider__image {\n  max-width: 100vw;\n  max-height: 100vh;\n  transition: transform 5s ease-out;\n}\n.slider__count {\n  position: absolute;\n  z-index: 2;\n  top: 0;\n  right: 0;\n  font-weight: bold;\n  background-color: var(--slider-count-bg, black);\n  color: var(--slider-count-text, white);\n  font-size: 12px;\n  padding: 0.5rem;\n}\n\n/*# sourceMappingURL=slider.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var slider = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

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
