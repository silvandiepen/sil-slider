import animationFrame from '@sil/animationframe';

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
	data: function data() {
		return {
			slider: {
				active: true,
				autoplay: true,
				autoplaySpeed: 3000,
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
		slideList: function slideList() {
			if (this.$props.slides) { return this.$props.slides; }
			else { return []; }
		}
	},
	created: function created() {
		this.slider = Object.assign({}, this.slider, this.$props.settings);
	},
	mounted: function mounted() {
		var this$1 = this;

		animationFrame(function () {
			if (this$1.slider.autoplay) { this$1.nextSlide(); }
		}, this.slider.autoplaySpeed);
	},
	methods: {
		nextSlide: function nextSlide(clicked) {
			var this$1 = this;
			if ( clicked === void 0 ) clicked = false;

			if (this.slider.current + 1 > this.slideList.length - 1)
				{ this.slider.current = 0; }
			else { this.slider.current++; }

			if (clicked) {
				this.slider.autoplay = false;
				setTimeout(function () {
					this$1.slider.autoplay = true;
				}, this.slider.autoplaySpeed);
			}
		},
		prevSlide: function prevSlide(clicked) {
			var this$1 = this;
			if ( clicked === void 0 ) clicked = false;

			if (this.slider.current - 1 < 0)
				{ this.slider.current = this.slideList.length; }
			else { this.slider.current = this.slider.current - 1; }

			if (clicked) {
				this.slider.autoplay = false;
				setTimeout(function () {
					this$1.slider.autoplay = true;
				}, this.slider.autoplaySpeed);
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
		},
		navClass: function navClass(idx) {
			if (this.slider.current == idx) { return ['active']; }
			else if (this.slider.current == idx - 1) { return ['next']; }
			else if (this.slider.current == idx + 1) { return ['previous']; }
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
        : _vm._e(),
      _vm._v(" "),
      _vm.slider.counter
        ? _c("div", { staticClass: "slider__counter" }, [
            _c("span", [
              _vm._v(
                _vm._s(_vm.slider.current) +
                  " / " +
                  _vm._s(_vm.slideList.length)
              )
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.slider.arrows
        ? _c("div", { staticClass: "slider__arrows" }, [
            _c(
              "button",
              {
                staticClass: "slider__arrow slider__arrow--prev",
                on: {
                  click: function($event) {
                    return _vm.prevSlide(true)
                  }
                }
              },
              [
                _c("span", { staticClass: "slider__arrow-text" }, [
                  _vm._v("Previous")
                ])
              ]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "slider__arrow slider__arrow--next",
                on: {
                  click: function($event) {
                    return _vm.nextSlide(true)
                  }
                }
              },
              [
                _c("span", { staticClass: "slider__arrow-text" }, [
                  _vm._v("Next")
                ])
              ]
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.slider.navigation
        ? _c("div", { staticClass: "slider__nav" }, [
            _c(
              "ul",
              { staticClass: "slider__nav-list" },
              _vm._l(_vm.slideList, function(slide, idx) {
                return _c(
                  "li",
                  {
                    key: idx,
                    staticClass: "slider__nav-item",
                    class: _vm.navClass(idx)
                  },
                  [
                    _c("button", { staticClass: "slider__nav-button" }, [
                      _vm._v(_vm._s(idx))
                    ])
                  ]
                )
              }),
              0
            )
          ])
        : _vm._e()
    ]
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var slider = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
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
