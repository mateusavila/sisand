<?php 
// altere os valores das linhas 3 e 4. teste
$whitelist = array('127.0.0.1','::1'); 
if(in_array($_SERVER['REMOTE_ADDR'], $whitelist)){ 
	$ENV = 'development';
}else{
	$ENV = 'production';
}