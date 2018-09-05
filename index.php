<?php include "header.php";?>
<main>
	<section class="session-login">
		
		<div class="login-area">
			<div class="login-loading" v-bind:class="{'active': login.loading}">
				<img src="img/loading.svg" alt="">
			</div>
			<div class="login-result"  v-bind:class="{'active': login.result}">
				<div class="login-result-center">
					<h2>Seja bem vindo, <strong>Administrador</strong></h2>
					<button class="btn new-account" v-on:click="login.result = false">Clique aqui para voltar</button>
				</div>
				
			</div>
			<div class="login-header">
				<img src="img/logo.svg" alt="Business view - Reports">
			</div>
			<div class="login-form">
				<form action="#" method="post" v-on:submit.prevent="submitLogin()" novalidate>
					<fieldset>
						<label for="login">Login</label>
						<input type="email" name="login" v-model="login.login" id="login" placeholder="nome@email.com.br" required v-bind:class="{'error': login.errors.login || login.errors.notaemail}" v-on:keyup="validateSize(login.login, 'login')" v-on:blur="validateEmailBlur">
						<span class="show-error" v-bind:class="{'active': login.submiterror}">Seu login está inválido.</span>
					</fieldset>
					<fieldset>
						<label for="password">Senha</label>
						<input type="password" v-model="login.password" name="password" id="password" placeholder="digite sua senha" required v-bind:class="{'error': login.errors.password}" v-on:keyup="validateSize(login.password, 'password')">
						<span class="show-error" v-bind:class="{'active': login.submiterror}">Sua senha está inválida.</span>
					</fieldset>
					<fieldset class="login-submit-area">
						<button type="submit" class="btn login-submit">Entrar</button>
					</fieldset>
				</form>
			</div>
			<div class="login-new-user">
				<a href="#" class="btn new-account">Criar uma nova conta</a>
			</div>
		</div>
	</section>
</main>
<?php include "footer.php"; ?>