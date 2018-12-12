import gulp from 'gulp'
import sass from 'gulp-sass'
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import cleanCSS from 'gulp-clean-css'
import imagemin from 'gulp-imagemin'

const paths = {
  styles: {
    src: 'src/styles/styles.scss',
    dest: 'assets/css/',
    partials: { src: 'src/styles/**/*.scss' }
  },
  scripts: {
    src: 'src/scripts/*.js',
    dest: 'assets/js/',
    uikit: {
      src: 'node_modules/uikit/dist/js/uikit.js'
    }
  },
  images: {
    src: 'src/images/*',
    dest: 'assets/images'
  }
}

export function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'style'
    }))
    .pipe(gulp.dest(paths.styles.dest))
}

export function scripts() {
  return gulp.src([paths.scripts.src, paths.scripts.uikit.src], { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
}

export function images() {
  return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest))
}

export function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch([paths.styles.src, paths.styles.partials.src], styles)
}

const build = gulp.series(gulp.parallel(styles, scripts, images))
gulp.task('build', build)


export default build;
