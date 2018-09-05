</div><!-- aqui termina o VUE -->

<?php
include "config.php";
if($ENV === 'development'){ ?>
	<script type="text/javascript" src="src-js/vue.min.js"></script>
	<script type="text/javascript" src="src-js/bundle.js?id=<?php echo mt_rand(1, 99999) ?>"></script>
	<script type="text/javascript" src="src-js/plugins.js?id=<?php echo mt_rand(1, 99999) ?>"></script>
	<script type="text/javascript" src="src-js/app.js?id=<?php echo mt_rand(1, 99999) ?>"></script>
	<script type="text/javascript" src="http://localhost:35729/livereload.js?snipver=1"></script>
<?php }else{ ?>
	<script type="text/javascript" src="js/app.min.js?id=<?php echo mt_rand(1, 99999) ?>"></script>
<?php } ?>

</body>
</html>