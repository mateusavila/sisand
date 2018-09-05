'use strict';

// iniciando VUE
var app = new Vue({
	el: '#app',
	data: {
		login: {
			login: '',
			password: '',
			loading: false,
			result: false,
			submiterror: false,
			errors: {
				login: false,
				password: false,
				notaemail: false,
				qtd: 0
			},
			pristine: {
				login: true,
				password: true
			}
		}
	},
	computed: {},
	methods: {
		validateSize: function validateSize(model, field) {
			// console.log(field.length);
			var that = this;
			that.login.pristine[field] = false;

			if (field === login) {
				if (that.validateEmail(that.login.login)) {
					that.login.errors.notaemail = false;
				} else {
					that.login.errors.notaemail = true;
				}
			}
			if (that.login.pristine[field] === false && field.length > 0) {
				that.login.errors[field] = false;
			} else {
				that.login.errors[field] = true;
			}
		},
		validateEmail: function validateEmail(email) {
			var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return regex.test(email);
		},
		validateEmailBlur: function validateEmailBlur() {
			var that = this;
			if (that.validateEmail(that.login.login)) {
				that.login.errors.notaemail = false;
			} else {
				that.login.errors.notaemail = true;
				console.log('erro na validação do e-mail');
			}
		},
		submitLogin: function submitLogin() {
			var that = this;
			that.login.submiterror = false;
			var errors = 0;
			if (that.validateEmail(that.login.login)) {
				that.login.errors.notaemail = false;
			} else {
				errors++;
				that.login.errors.notaemail = true;
			}

			// verificar se o campo password está vazio
			if (that.login.login.length < 1) {
				that.login.errors.login = true;
				errors++;
			} else {
				that.login.errors.login = false;
			}

			// verificar se o campo password está vazio
			if (that.login.password.length < 1) {
				that.login.errors.password = true;
				errors++;
			} else {
				that.login.errors.password = false;
			}

			that.login.errors.qtd = errors;

			if (that.login.errors.qtd == 0) {
				// aqui vou inventar um processo de mentirinha de login. Considere que aqui eu teria que utilizar o axios para processar a requisiçao para uma API. Como é um teste, vou fazer com que acesse corretamente com admin@admin.com e a senha 123456

				if (that.login.login === 'admin@admin.com' && that.login.password === '123456') {
					that.login.loading = true;
					setTimeout(function () {
						that.login.loading = false;
						that.login.result = true;
					}, 3000);
				} else {
					that.login.submiterror = true;
				}
			}
		}
	}
});