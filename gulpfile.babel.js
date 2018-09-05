const gulp = require('gulp');
let using = require('gulp-using');
const pkg = require('./package.json');
const jshint = require('gulp-jshint');
const watch = require('gulp-watch');
const stylus = require('gulp-stylus');
const livereload = require('gulp-livereload');
const zip = require('gulp-zip');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require("gulp-rename");
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const ftp = require('vinyl-ftp');
const del = require('del');
let reload = browserSync.reload;

// browser-sync


function clean(cb) {
	del(['build'], cb);
}

// caminhos
let paths = {
	php: '*.php',
	html: '*.html',
	stylus: './src-css/*.styl',
	js: {
		all: ['./src-js/vue.min.js', './src-js/bundle.js', './src-js/plugins.js', './src-js/app.js'],
		imports: './src-js/imports.js',
		src: './src-js',
		dist: './js',
		handlers: './src-js/handlers.js'
	},
	images: {
		all: ['./img/*.jpg', './img/*.gif', './img/*.png', './img/*.svg', './img/*.jpeg'],
		dist: './img'
	},
	css: {
		bundle: ['./css/bundle.css', './css/build.css'],
		dist: './css'
	},
	globs: ['css/**', 'js/**', 'fonts/**', '*.php', '*.html', 'img/**', 'style.css']
};


let t_browsersync = () => {
	return browserSync({
		proxy: "localhost/sisand/",
		ghostMode: {
			clicks: true,
			location: true,
			forms: true,
			scroll: true
		} 
	});
};
let t_php = () => {
	return gulp.src(paths.php)
	.pipe(livereload())
	.pipe(reload({stream: true}));
};

let t_html = () => {
	return gulp.src(paths.html)
	.pipe(livereload())
	.pipe(reload({stream: true}));
};

let t_stylus = () => {
	return gulp.src(paths.stylus)
		.pipe(plumber())
		.pipe(stylus())
		.pipe(concat('build.css'))
		.pipe(gulp.dest('./css'))
		.pipe(livereload())
		.pipe(reload({stream:true}));
};

let t_browserify = () => {
	return browserify(paths.js.imports)
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(paths.js.src))
		.pipe(livereload())
		.pipe(reload({stream:true}));
};

let t_lint = () => {
	return gulp.src(paths.js.handlers)
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(plumber())
		.pipe(concat('app.js'))
		.pipe(gulp.dest(paths.js.src))
		.pipe(livereload())
		.pipe(reload({stream:true}));
};

// funções pré-produção
let t_images = () => {
	return gulp.src(paths.images.all)
		.pipe(imagemin())
		.pipe(gulp.dest(paths.images.dist));
};

let t_concatcss = () => {
	return gulp.src(paths.css.bundle)
		.pipe(concat('style.css'))
		.pipe(cleanCSS())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.css.dist));
};

let t_minify = () => {
	return gulp.src(paths.js.all)
		.pipe(concat('build.js'))
		.pipe(gulp.dest(paths.js.src))
		.pipe(plumber())
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest(paths.js.dist));
};

// deploy
let t_deploy = () => {
	let conn = ftp.create({
		host: paths.conn.host,
		user: paths.conn.user,
		password: paths.conn.password,
		parallel: paths.conn.parallel
	});
	return gulp.src(paths.globs, {base: '.'})
		.pipe(conn.newer(paths.conn.newer))
		.pipe(conn.dest(paths.conn.dest))
};

// watch
let t_watch = () => {
	gulp.watch(paths.php, t_php);
	gulp.watch(paths.stylus, t_stylus);
	gulp.watch(paths.js.imports, t_browserify);
	gulp.watch(paths.js.handlers, t_lint);
	livereload.listen(35729);
};

// paralelos
let all = gulp.parallel(t_watch, t_php, t_stylus, t_html, t_browserify, t_lint);

let production = gulp.parallel(t_minify, t_concatcss, t_images);

let simpletask = gulp.parallel(t_minify, t_concatcss);

let simplecsstask = gulp.parallel(t_concatcss);

let browser = gulp.parallel(t_watch, t_php, t_stylus, t_html, t_browserify, t_lint, t_browsersync);

let publish = gulp.parallel(t_minify, t_concatcss, t_images, t_deploy);


// processamento das tarefas
gulp.task('default', gulp.series(all));

gulp.task('full', gulp.series(browser));

gulp.task('prod', gulp.series(production));

gulp.task('simple', gulp.series(simpletask));

gulp.task('simplecss', gulp.series(simplecsstask));

gulp.task('publish', gulp.series(publish));