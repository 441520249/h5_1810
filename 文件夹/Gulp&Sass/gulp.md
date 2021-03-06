# gulp

gulp是当下最流行的自动化工具 ，可以自动化完成我们开发过程中大量的重复工作。如：

> 编译：
> 	less->css
> 	sass->css
> 	coffeescript->js
> 	es6->es5(兼容)
> 合并: css, js
> 压缩 ：css, js, html
> 优化：图片优化

- 官网：<http://gulpjs.com/> 
- 中文网：<http://www.gulpjs.com.cn/> 

### gulp的安装及运行

##### 1.全局安装 gulp：

```
npm install --global gulp    //全局安装gulp目的是为了通过它执行gulp任务
```

##### 2.本地安装gulp：

作为项目的开发依赖（devDependencies）安装：

```
npm install gulp //不会自动生成在package.json
npm install --save gulp
npm install --save-dev gulp //本地安装gulp是为了调用gulp插件的功能
```

- –save-dev 保存配置信息至 package.json 的 devDependencies 节点
- 这步操作前先新建package.json文件（npm init）
- 这步完成后就可以安装各种gulp插件了

##### 3.安装gulp插件

大部分插件都可以在http://www.npmjs.com找到，任何插件的使用都要经历以下三步：

> 安装插件：npm
> npm install  gulp-htmlmin

PS：可一次性安装多个插件，插件间用空格隔开

###### 常用gulp插件

> html压缩：gulp-htmlmin
>
> css压缩：gulp-clean-css
>
> js压缩：gulp-uglify
>
> 合并文件：gulp-concat
>
> 文件重命名：gulp-rename
>
> 编译Sass: gulp-sass
>
> 编译 Less：gulp-less

###### 其他常用插件

> - 浏览器同步测试：browser-sync
> - 创建node服务器：http-server 
>
> npm install -g http-server

##### 4.创建gulpfile.js文件（gulp任务）

- ！！！项目根目录下 创建
- gulp项目的配置文件，内容如下：

```
var gulp = require('gulp');
gulp.task('任务名', function() {
  // 将你的默认的任务代码放在这
});
```

##### 5.运行 gulp：

在命令行执行以下命名，如果不写任务名称，则自动运行default任务（如果有）

```
gulp <任务名称>
```

###### 演示：编译scss文件为css文件

	//1.安装gulp-sass插件
	//2.gulpfile.js:
	//(1)引包：require()：返回对象或者函数
	let gulp = require('gulp');//得到对象
	let sass = require('gulp-sass');//得到函数
	//(2)创建任务
	gulp.task('compileSass',function(){
		// （3）执行gulp工作流程
		 return gulp.src('./src/sass/*.scss') // 返回文件流（液体，文件在内存中的状态）
		.pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
		.pipe(gulp.dest('./src/css/'))
	});
		
	outputStyle参数（gulp-sass）：
	    nested(默认）
	    expanded：展开
	    compact：单行
	    compressed：压缩
	on('error', sass.logError)：忽略错误，继续编译
### gulp工作流程

1. 选通过gulp.src(globs) 方法获取到想要处理的文件，并返回文件流
2. 然后文件流通过 pipe 方法导入到 gulp 的插件中
3. 经过插件处理后的文件流，再通过pipe方法导入到 gulp.dest() 方法中
4. 最后通过gulp.dest() 方法把流中的内容写入到文件中

> PS：文件流=>文件在内存中的状态

   5.监听文件修改，并执行相应任务gulp.watch(glob,[‘任务名’])

###### 演示：监听scss文件修改，自动编译

```
gulp.task('jtSass',function(){
	gulp.watch('./src/sass/*.scss',gulp.series("compileSass"))
})
```

### globs语法

globs需要处理的源文件匹配符路径，语法如下

- 匹配单个文件：
  `gulp.src('src/js/index.js')`

- 匹配多个文件：
  `gulp.src(['src/js/index.js','src/js/detail.js']) //多个文件以数组形式传入`

- 匹配所有文件
  `gulp.src('src/js/*.js')`

- 匹配符：
  `!`：排除文件，

  ```
  gulp.src(["./src/sass/**/*.scss","!./src/sass/var.scss"])
  ```

  `*`：匹配所有文件，
  `**`：匹配0个或多个子文件夹，
  `{}`：匹配多个属性

备注：若想实现某个文件不受匹配控制，在文件名前面加_

# Sass->css

SASS是一个成熟、稳定、强大的 CSS 扩展语言解析器，提供变量、嵌套、混合、继承等特性，大大节省了设计者的时间，使得CSS的开发变得简单和可维护 .

###### 了解工具：css转scss

### 嵌套(Nesting)

css中重复写选择器是非常恼人的。如果要写一大串指向页面中同一块的样式时，需要一遍又一遍地写同一个ID。

```
#content article h1 { color: #333 }
#content article p { margin-bottom: 1.4em }
#content aside { background-color: #EEE }
```

sass写法：

```
#content {
  article {
    h1 { color: #333 }
    p { margin-bottom: 1.4em }
  }
  aside { background-color: #EEE }
}
```

- 在嵌套中用&表示父元素选择器

### 注释

```
body {
  color: #333; // 单行注释：不会出现在生成的css文件中
  padding: 0; /* 多行注释：内容会出现在生成的css文件中 */
}
```

### 变量

sass的变量必须是$开头，后面紧跟变量名，而变量值和变量名之间就需要使用冒号(:)分隔开（就像CSS属性设置一样）。

###### 演示：变量写法

```
// 主颜色
$mainColor:#5b8c58;
// 高亮颜色
$highlight:#fc0;
// 内边距
$padding:5px 10px;
//使用变量
a:hover{color:$mainColor;}
```

##### 全局变量与局部变量

定义在任何选择器之外的变量被认为是全局变量，定义在选择器内的变量称之为局部变量。

但启用了global后，即使写在局部也能覆盖全局变量（sass 3.4版本后可用）

```
$color:#fff !global;
```

##### 默认变量

sass的默认变量仅需要在值后面加上!default即可。

```
$fontSize:12 !default;
```

##### 变量特殊用法

一般我们定义的变量都为属性值，可直接使用，但是如果变量作为属性或在某些特殊情况下等则必须要以#{$variables}形式使用

```
$direction:top !default;
//应用于class和属性
.border-#{$direction}{
  border-#{$direction}:1px solid #ccc;
}
```

##### 多值变量

多值变量分为list类型和map类型，简单来说list类型有点像js中的数组，而map类型有点像js中的对象。

```
//list类型
$pd: 5px 10px 20px 30px;
//使用
.content{padding:$pd;}
.btop{border-top:nth($pd,1);} //索引从1开始计数

//map类型
$headings: (h1: 2em, h2: 1.5em, h3: 1.2em);
//使用
h1{map-get($headings,h1)}
```

### 运算 

sass具有运算的特性，可以对数值型的Value(如：数字、颜色、变量等)进行加减乘除四则运算。请注意运算符前后请留一个空格，不然会出错。 

### 条件判断及循环

##### @if判断

@if可一个条件单独使用，也可以和@else结合多条件使用

```
@if $type == ocean {
    color: blue;
} @else if $type == matador {
    color: red;
} @else {
    color: black;
}
```

##### @for循环

```
@for $var from <start> through <end>（包含end值）
@for $var from <start> to <end>（不包含end值）
```

###### 演示:for循环

```
@for $i from 1 through 6{
	h#{$i}{
		font-size:36px/($i/2);
	}
}
```

### 函数

Sass中的数字函数提要针对数字方面提供一系列的函数功能：

##### 常用函数：

> percentage($value)：将一个不带单位的数转换成百分比值；
> round($value)：将数值四舍五入，转换成一个最接近的整数；
> ceil($value)：将大于自己的小数转换成下一位整数；
> floor($value)：将一个数去除他的小数部分；
> abs($value)：返回一个数的绝对值；
> min($numbers…)：找出几个数值之间的最小值；
> max($numbers…)：找出几个数值之间的最大值。
> lighten($color,$num) $color颜色值，$num:0-100
> darken($color,$num) $num:0-100

```
演示：函数的使用
background-color:lighter($mainColor,percentage($i/10))
```

##### 自定义函数

格式：@function 函数名

```
$oneWidth: 10px;  
$twoWidth: 40px;  
@function widthFn($n) {  
  @return $n * $twoWidth + ($n - 1) * $oneWidth;  
}  
.leng {   
    width: widthFn($n : 5);  //！！传参格式注意
} 
```

### 继承

使用选择器的继承，要使用关键词@extend

- 继承一般样式
  @extend h1
- 占位选择器%

```
// % 无实际样式，不会被编译出来
%pop{
	width:600px;height:300px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
}
.box{
	width:800px;
	color:#ccc;
	background-color:#000;
}
.container{
	@extend .box;
	margin:10px;
}
.login{
	@extend %pop;
	background-color:$mainColor*2;
}
```

### 导入 @import

sass中导入其他sass文件，最后编译为一个css文件，优于纯css的@import

```
@import 'reset';
```

###### 演示：同时编译多个scss文件为css，演示_文件名不会编译效果。演示bootstrap源码

```
//var.scss:
$mainColor: #58bc58;
$container: 800px;
$padding:5px 10px 15px 20px;
//list.scss:
.box{
	width:$container;
	color:$mainColor;
	padding:$padding;
	background-color:#fff;
	border:1px soild $mainColor;
}
```

# gulp插件的使用

### js压缩及合并、重命名

	// js压缩
	let uglify = require('gulp-uglify');
	let pump = require('pump');
	let concat = require('gulp-concat');
	let rename = require('gulp-rename');
	gulp.task('compressJs',function(cb){
	    pump([
	        gulp.src('./src/js/*.js'),
	        // 合并
	        concat('index.js'),
	        gulp.dest('./dist/js/'),
	        // 压缩
	        uglify(),
	        // 重命名
	        rename({
	            suffix:'.min'
	        }),
	        gulp.dest('dist/js/')
	    ],cb );
	});    
### browser-sync

	var browserSync = require("browser-sync");
	// 静态服务器
	gulp.task('server',()=>{
		browserSync({
			// 服务器路径
			// server:'./src/',
			// 代理服务器，必须绑定到当前服务器路径一致
			proxy:'http://localhost:1806',
			// 端口
			port:666,
			// 监听文件修改，自动刷新
			files:['./src/**/*.html','./src/css/*.css','./src/api/*.php']
		});
		// 监听sass文件修改，并自动编译
		gulp.watch('./src/sass/*.scss',['compileSass'])	
	}）
	//监听的文件修改，页面html对应修改。通过brower-sync服务只能看到页面修改
静态服务器：开启服务，不能识别后端语言.

wampserver:apache服务器  php解析器  mysql服务器