<?php include "config.php"; ?>
<!doctype html>
<html class="no-js">
<head>
	<meta charset="UTF-8">
	<title>Challenge Front-end</title>
	<meta name="viewport" content="width=device-width">
	<meta name="description" content="Realizando o teste para concorrer a uma vaga na Sisand.">
	<meta name="keywords" content="Front-end, teste, Vue-JS, CSS, Stylus, Jquery, AngularJS, PHP, MySQL, Wordpress">
	<link href="https://fonts.googleapis.com/css?family=Open+Sans:700|Roboto:400,700" rel="stylesheet">
	<link rel="shortcut icon" href="img/favicon.png" type="image/x-icon">
	<?php if($ENV == 'development'){ ?>
	<link rel="stylesheet" href="css/bundle.css?id=<?php echo mt_rand(1, 99999) ?>">
	<link rel="stylesheet" href="css/build.css?id=<?php echo mt_rand(1, 99999) ?>">
	<?php }else{ ?>
	<link rel="stylesheet" href="css/style.min.css?id=<?php echo mt_rand(1, 99999) ?>">
	<?php } ?>
</head>
<body>
<div id="app">

