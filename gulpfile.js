const {
    src,
    dest,
    watch,
    parallel
} = require("gulp");
const cache = require('gulp-cache');

// SASS
const sass = require('gulp-sass')(require('sass'))
const plumber = require('gulp-plumber');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps')

// Imagenes
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const avif = require('gulp-avif')

// JavaScript
const terser = require('gulp-terser-js');


function css(callback) {
    // Identificar el archivo de SASS

    // Compilarlo

    // Almacenarla en el disco duro

    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer, cssnano]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'));

    callback()
}

function convertidorWebp(callback) {

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{jpg,png}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))

    callback();
}

function convertidorAvif(callback) {

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{jpg,png}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))

    callback();
}

function minImagenes(callback) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{jpg,png}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))

    callback();
}

function javascript(callback) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));

    callback();
}

function dev(callback) {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javascript)
    callback()
}


exports.css = css;
exports.convertidorWebp = convertidorWebp;
exports.imagenes = minImagenes;
exports.convertidorAvif = convertidorAvif;
exports.javascript = javascript;
exports.dev = parallel(convertidorWebp, minImagenes, convertidorAvif, dev);