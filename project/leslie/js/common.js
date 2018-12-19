// 封装a-b的随机整数
//a,b传数字
function getRandomNum(a, b) {
	var res = parseInt(Math.random() * (b - a + 1) + a);
	return res;
}
// 获取随机色
function getRandomColor() {
	return 'rgb(' + getRandomNum(0, 255) + ',' + getRandomNum(0, 255) + ',' + getRandomNum(0, 255) + ')';
}

// 获取元素节点
var Element = {
	/*
	 ** 功能： 过滤数组，只拿到包含元素节点的数组
	 ** 形参nodes ：包含文本、元素节点的一个数组
	 */
	getElementNodes: function(nodes) {
		var elementsNode = [];
		// 过滤只得到元素节点
		for(var i = 0; i < nodes.length; i++) {
			if(nodes[i].nodeType == 1) {
				elementsNode.push(nodes[i]);
			}
		}
		return elementsNode;
	},
	/*
	 ** 功能： 传入父元素节点，获取到父元素的所有元素子节点
	 ** 形参parent ：父元素节点
	 */
	getElementsChild: function(parent) {
		var erzis = parent.childNodes; //获取到所有的节点
		return Element.getElementNodes(erzis); //直接调用
	},
	getNextElement: function(ele) {
		var next = ele.nextSibling;
		if(next.nodeType != 1) {
			next = next.nextSibling;
		}
		return next;
	},
}

//  获取元素样式
function getStyle(ele, key) {
	if(window.getComputedStyle) {
		return window.getComputedStyle(ele)[key];
	} else if(ele.currentStyle) {
		return ele.currentStyle[key];
	} else {
		return ele.style[key];
	}
}

// 绑定事件的兼容写法：
function bind(ele, type, fn, isCapture) {
	if(ele.addEventListener) {
		ele.addEventListener(type, fn, isCapture);
	} else if(ele.attachEvent) {
		ele.attachEvent("on" + type, fn);
	} else {
		ele["on" + type] = fn;
	}
}

// 封装cookie的设置、获取、删除
var Cookie = {
	// 设置cookie
	//  * name cookie名
	//  * val cookie值
	//  * date 时间对象
	//  * path 路径
	setCookie: function(name, val, date, path) {
		var str = name + "=" + val;
		if(date) {
			str += "; expires=" + date.toUTCString();
		}
		if(path) {
			str += "; path=" + path;
		}
		document.cookie = str;
	},
	// 获取cookie
	getCookie: function(name) {
		var cookie = document.cookie; //"left=300; age=17"   
		if(cookie == "") {
			return "";
		} else {
			var cookieArr = cookie.split("; ");
			for(var i = 0; i < cookieArr.length; i++) {
				var arr = cookieArr[i].split("=");
				if(arr[0] == name) {
					return arr[1];
				}
			}
			return "";
		}
	},
	// 删除某条cookie
	delCookie: function(name, path) {
		var d = new Date();
		d.setDate(d.getDate() - 1);
		Cookie.setCookie(name, "", d, path);
	}
}

function animation(ele, obj, time, fn) {
	var count = 0;
	for(var key in obj) {
		count++;
		var attr = key;
		var target = obj[key];
		show(attr, target);
	}

	function show(attr, target) {
		target = attr == "opacity" ? target * 100 : target;
		clearInterval(ele[attr + "Timer"]);
		ele[attr + "Timer"] = setInterval(function() {
			var current = window.getComputedStyle(ele)[attr]; //200px   /[a-z]+/
			var unit = current.match(/[a-z]+$/); //提取单位
			unit = unit ? unit[0] : "";
			current = parseFloat(current); //只获取数值
			current = attr == "opacity" ? current * 100 : parseInt(current);
			var speed = (target - current) / 10;
			if(speed > 0) {
				speed = Math.ceil(speed);
			} else if(speed < 0) {
				speed = Math.floor(speed);
			}
			current += speed;
			ele.style[attr] = attr == "opacity" ? current / 100 : current + unit;
			if(current == target) {
				clearInterval(ele[attr + "Timer"]);
				count--;
				if(count == 0 && fn && typeof(fn) == "function") {
					fn();
				}
			}
		}, time)
	}
}

//备注: 事件开启定时器之前，一定要记得先清除已存在的定时器。
function linearAnimate(speed, ele, attr, target, time) {
	clearInterval(ele.timer);
	var speed = speed;
	ele.timer = setInterval(function() {
		var current = window.getComputedStyle(ele)[attr];
		console.log(current);
		var unit = current.match(/[a-z]+$/); //提取单位
		unit = unit ? unit[0] : "";
		current = parseFloat(current); //只获取数值
		current += speed;
		console.log(current);

		ele.style[attr] = current + unit;
		if(current >= target) {
			current = target;
			clearInterval(ele.timer);
		}
	}, time)
}

