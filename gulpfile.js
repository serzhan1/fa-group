const {src, dest, watch, parallel, series} = require('gulp')
const browserSync = require('browser-sync').create()

const scss          = require('gulp-sass')(require('sass'));
const autoprefixer  = require('gulp-autoprefixer')
const sourcemaps    = require('gulp-sourcemaps')
const concat        = require('gulp-concat')
const uglify        = require('gulp-uglify-es').default;
const imagemin      = require('gulp-imagemin');
const webp          = require('imagemin-webp');
const del           = require('del')
const minify        = require('gulp-minify-css')
const ttf2woff = require('gulp-ttf2woff')
const ttf2woff2 = require('gulp-ttf2woff2')
const fs = require('fs')

function browsersync(){
  browserSync.init({
    server:{
      baseDir: 'dist/'
    }
  })
}

function cleanDist(){
  return del('dist')
}

function scripts(){
  return src([
    'node_modules/jquery/dist/jquery.js',
    'src/js/main.js'
  ])
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('dist/js'))
  .pipe(browserSync.stream())
}

function extjs(){
  return src('src/js/ext/**/*.js')
  .pipe(uglify())
  .pipe(dest('dist/js/ext'))
  .pipe(browserSync.stream())
}
function extCSS(){
  return src('src/css/**/*.css')
    .pipe(minify())
    .pipe(dest('dist/css'))
}
function styles(){
  return src('src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 7 version'],
      grid: true
    }))
    .pipe(concat('style.min.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(dest('src/css'))
    .pipe(browserSync.stream())
}

function images(){
  return src('src/img/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(dest('src/buildImg'))
}

function imgWebp(){
  return src('src/buildImg/**/*')
    .pipe(imagemin([
      webp({quality: 80})
    ]))
    .pipe(dest('dist/img'))
}

function fonts(){
  src('src/fonts/*.ttf')
  .pipe(ttf2woff())
  .pipe(dest('dist/fonts'))
  return src('src/fonts/*.ttf')
  .pipe(ttf2woff2())
  .pipe(dest('dist/fonts'))
}

let srcFonts = './src/scss/fonts.scss'
let distFonts = './dist/fonts/'
function cb(){

}

function fontStyle(done) {
  let file_content = fs.readFileSync(srcFonts);
  if (file_content == '') {
    fs.writeFile(srcFonts, '', cb);
    return fs.readdir(distFonts, function (err, items) {
      if (items) {
        let c_fontname;
        for (var i = 0; i < items.length; i++) {
          let fontname = items[i].split('.');
          fontname = fontname[0];
          if (c_fontname != fontname) {
            fs.appendFile(srcFonts, '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
          }
          c_fontname = fontname;
        }
      }
    })
  }
  done();
}


function build(){
  return src([
    'src/**/*.html',
  ], {base: 'src'})
  .pipe(dest('dist'))
}

function watching(){
  watch(['src/scss/**/*.scss'], series(styles,extCSS));
  watch(['src/js/main.js'], scripts)
  watch(['src/js/ext/**/*.js'], extjs)
  watch(['src/**/*.html']).on('change', series(build,browserSync.reload))
}



exports.scripts = scripts;
exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.images = images;
exports.extjs = extjs;
exports.fonts = fonts;
exports.fontStyle = fontStyle;
exports.imgWebp = imgWebp;
exports.extCSS = extCSS;

exports.build = series(cleanDist, images, imgWebp, styles,fonts, fontStyle, scripts,extjs,extCSS, build)

exports.default = parallel(browsersync, watching);
