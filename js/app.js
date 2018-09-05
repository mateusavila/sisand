'use strict';

// Vue.use(VueResource);
Vue.use(VueAwesomeSwiper);

// iniciando VUE
var app = new Vue({
	el: '#app',
	data: {
		showMenu: false,
		notNextTick: true,
		scroll: 0,
		swiperOption: {
			effect: 'fade',
			spaceBetween: 0,
			slidesPerView: 1,
			loop: true,
			autoplay: 6000,
			autoplayDisableOnInteraction: false
		}
	},
	computed: {},
	methods: {}
});