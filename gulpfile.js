var gulp=require("gulp");
var browserSync=require("browser-sync").create();
var reload=browserSync.reload;
var sass=require("gulp-sass");

  gulp.task("server",["sass"],function(){
  	browserSync.init({
  		server:"./",
  		startPath:"html/index.html"
  	})
  	gulp.watch("html/index.html").on("change",reload);
  	gulp.watch("scss/*.scss",["sass"])
  })

  gulp.task("sass",function(){
  	gulp.src("scss/main.scss")
  		.pipe(sass())
  		.on("error",function(err){
  			console.log(err.message)
  		})
  		.pipe(gulp.dest("css"))
  		.pipe(reload({stream:true}))
  })
