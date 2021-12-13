const 
    {task, src, dest, watch, parallel} = require("gulp"),
    sass = require('gulp-sass')(require('sass')),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require("gulp-uglify")


//JavaScript minify 
const minijs = cb => {
    src("public/lib/*.js")
    .pipe(sourcemaps.init())
    .pipe(uglify().on('error', console.log))
    .pipe(sourcemaps.write("./"))
    .pipe(dest(`${__dirname}/public/js`))
    cb()
}

const buildSass = cb => {
    src("public/sass/style.sass")
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write("./"))
    .pipe(dest("public/css"))
    cb()
}

task("mini", ()=> watch("public/lib/*.js", minijs))
task("sass", ()=> {
    watch("public/sass/*.sass", buildSass)
    watch("public/sass/*/*.sass", buildSass)
})

exports.default = parallel("sass", "mini")
