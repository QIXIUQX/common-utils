/** 时间日期操作相关方法 */
let dateUtils = {}
/*** url操作相关方法 */
let urlUtils = {}
/** 本地存储操作相关方法 */
let storageUtils = {}
/** 倒计时操作相关方法 */
let countDownUtils = {}
/** 公共方法 */
let commonUtils = {}
//dom 操作
let domUtils = {}


/** ==================== commonUtils ====================*/

/**
 * 不足10 补0
 * @param number
 * @returns {*|string}
 */
commonUtils.fillWith0 = function (number) {
	return number >= 10 ? number : "0" + number
}

/**
 * 打乱数组中元素位置
 * @param array 需要被打乱的数组
 * @returns {*[]}   返回一个新的数组
 */
commonUtils.messArray = function (array) {
	let _after = [];
	let index = 0
	for (let i = array.length - 1; i >= 0; i--) {
		index = commonUtils.randomNum(0, i);
		_after[_after.length] = array.splice(index, 1)[0];
	}
	return _after;
}

/**
 * 生成从minNum到maxNum的随机数
 * @param minNum 最小值
 * @param maxNum 最大值
 * @returns {number} 返回随机值
 */
commonUtils.randomNum = function (minNum, maxNum) {
	return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
}

/**
 * 防抖函数
 * @param {*} fn 回调函数
 * @param {*} delay 延迟时间
 * @param {*} trigger 首次是否触发，默认不触发
 * @returns 如果防抖函数有返回值则通过res 返回
 */
commonUtils.debounce = function (fn, delay, trigger = false) {
	let t = null;
	let res = null;
	let debounced = function () {
		let _self = this;
		let args = arguments;
		if (t) {
			clearTimeout(t);
		}
		if (trigger) {
			let exec = !t;

			t = setTimeout(() => {
				t = null;
			}, delay);

			if (exec) {
				res = fn.apply(_self, args);
			}
		} else {
			t = setTimeout(() => {
				res = fn.apply(_self, args);
			}, delay);
		}
		return res;
	};
	debounced.remove = function () {
		clearTimeout(t);
		t = null;
	};

	return debounced;
}

/**
 * 节流函数
 * @param {*} fn 函数
 * @param {*} delay  延迟时间
 */
commonUtils.throttle = function (fn, delay = 500) {
	let timer = null;
	let beginTime = new Date().getTime();
	return function () {
		let _self = this;
		let args = arguments;

		let currentTime = new Date().getTime();
		clearTimeout(timer);
		timer = null;
		if (currentTime - beginTime >= delay) {
			fn.apply(_self, args);
			beginTime = currentTime;
		} else {
			timer = setTimeout(() => {
				fn.apply(_self, args);
			}, delay);
		}
	};
}

/**
 * 是否是一个函数
 * @param value 需要被检测的值
 * @returns {boolean} true 是函数 false 不是函数
 */
commonUtils.isFunction = function (value) {
	return toString.call(value) === '[object Function]';
}

/**
 * 是否是字符串
 * @param value 需要被检测的值
 * @returns {boolean} true 是 false 不是
 */
commonUtils.isString = function (value) {
	return typeof value === 'string';
}

/**
 * 是否是数字
 * @param value 需要被检测的值
 * @returns {boolean} true 是 false 不是
 */
commonUtils.isNumber = function (value) {
	return typeof value === 'number';
}

/**
 * 是否是对象
 * @param value 需要被检测的值
 * @returns {boolean} true 是 false 不是
 */
commonUtils.isObject = function (value) {
	return value !== null && typeof value === 'object';
}

/**
 * 是否是 undefined
 * @param value 需要被检测的值
 * @returns {boolean} true 是 false 不是
 */
commonUtils.isUndefined = function (value) {
	return typeof value === 'undefined';
}

/**
 * 禁用后退功能 执行此方法后 将不不能使用浏览器的前进后退功能
 */
commonUtils.handleDisableBackOrForward = function () {
	if (window.history && window.history.pushState) {
		$(window).on('popstate', function () {
			window.history.pushState('forward', null, '#');
			window.history.forward(1);
		});
	}
	window.history.pushState('forward', null, '#');
	window.history.forward(1);
}

/**
 * 数组中存放对象的去重
 * @param array 需要去重的数组
 * @param propertiesName 根据什么属性做去重
 * @returns {*} 返回一个新数组
 */
commonUtils.uniqueByObject = function (array, propertiesName) {
	let len = array.length
	for (let i = 0; i < len; i++) {
		for (let j = i + 1; j < len; j++) {
			if (array[i][propertiesName] === array[j][propertiesName]) {
				array.splice(j, 1);
				len--;
			}
		}
	}
	return array;
}

/**
 * 普通数组去重
 * @param array 需要操作的数组
 * @returns {*[]}
 */
commonUtils.unique = function (array) {
	let _arr1 = [];
	for (let i = 0, len = array.length; i < len; i++) {
		if (_arr1.indexOf(array[i]) === -1) {
			_arr1[_arr1.length] = array[i];
		}
	}
	return _arr1;
}

/**
 * 实现网页的复制功能 注意 必须存在网页才可正常使用
 * @param shareContent 需要复制的内容
 * @param callback 复制后的回调函数
 */
commonUtils.copyShane = function (shareContent, callback) {
	let _input = document.createElement("input"); // 直接构建input
	_input.value = shareContent; // 设置内容
	document.body.appendChild(_input); // 添加临时实例
	_input.select(); // 选择实例内容
	document.execCommand("Copy"); // 执行复制
	document.body.removeChild(_input); // 删除临时实例

	if (callback instanceof Function) {
		callback();
	}
}

/**
 * 是否是一个空的对象 注意  值兼容ie 9 以上浏览器调用
 * @param obj 需要查询是否为空的对象
 * @returns {boolean}   是空或者不是空
 */
commonUtils.isEmptyObject = function (obj) {
	return Object.keys(obj).length === 0
}

/**
 * 获取不重复的随机数数组 长度必须小于等于最大值减去最小值
 * @param length 需要获取的长度
 * @param minNum 最小值
 * @param maxNum 最大值
 * @returns {*[]} 生成的不重复随机数数组
 */
commonUtils.randomNumNoRepeat = function (length, minNum, maxNum) {
	if (maxNum - minNum < length) throw new Error("随机数长度必须小于最大数减最小数")
	let _tempArray = []
	for (let i = 0; i < length; i++) {
		let randomNum = commonUtils.randomNum(minNum, maxNum)
		if (_tempArray.indexOf(randomNum) !== -1) {
			i--
		} else {
			_tempArray[_tempArray.length] = randomNum
		}
	}
	return _tempArray
}

/**
 * 将首字母都转换成大写
 * @param str 需要被转换的字符串
 * @returns {*} 转换后的字符串
 */
commonUtils.capitalizeEveryWord = function (str) {
	return str.replace(/\b[a-z]/g, char => char.toUpperCase());
}

/**
 * 检查变量或值是否为空
 * @param val 需要被检查的值
 * @returns {boolean} 是否为空
 */
commonUtils.checkNull = function (val) {
	return val === undefined || val === null;
}

/** ==================== getUrlParam ====================*/

/**
 * 获取url中的参数对应的值
 * @param name 参数名称
 * @returns {string|null} 获取到的值， 如果是空返回null
 */
urlUtils.getUrlParam = function (name) {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	let r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r != null) return unescape(r[2]);
	return null; //返回参数值
}

/**
 * 获取当前的url
 * @returns {*}
 */
urlUtils.currentUrl = function () {
	return window.location.href;
}


/** ==================== dateUtils ====================*/

/**
 * 将指定的时间格式化为时间对象，并以对象的形式放回出来，注意：星期日为0
 * @param time time需要转换为对象的时间，支持时间日期字符串或时间戳
 * @param fill0 是否需要补0  false 不补0 true 补0
 * @returns {{}} 返回值类型一个包含日期时间星期的对象
 */
dateUtils.formatTimeStrOrTimeStampToObject = function (time, fill0 = false) {
	let _timeStamp = new Date(time)
	let _timeStampObj = {}
	_timeStampObj.WEEKMAPPING = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
	_timeStampObj.year = _timeStamp.getFullYear()
	_timeStampObj.month = _timeStamp.getMonth() + 1
	_timeStampObj.week = _timeStamp.getDay()
	_timeStampObj.day = _timeStamp.getDate()
	_timeStampObj.hour = _timeStamp.getHours()
	_timeStampObj.minutes = _timeStamp.getMinutes()
	_timeStampObj.seconds = _timeStamp.getSeconds()
	if (fill0) {
		_timeStampObj.month = commonUtils.fillWith0(_timeStampObj.month)
		_timeStampObj.day = commonUtils.fillWith0(_timeStampObj.day)
		_timeStampObj.hour = commonUtils.fillWith0(_timeStampObj.hour)
		_timeStampObj.minutes = commonUtils.fillWith0(_timeStampObj.minutes)
		_timeStampObj.seconds = commonUtils.fillWith0(_timeStampObj.seconds)
	}

	return _timeStampObj
}

/**
 * 倒计时功能 可通过配置resultType 来决定返回值类型 （string返回"00:10"|object返回{minutes:00,seconds:10}） 是否补0 由fill0 决定
 * @param second 每次倒计时的秒数 必须填写
 * @param resultType 返回值类型  string 或者object两种类型 默认字符串
 * @param fill0 在小于10的时候是否补0 默认不补
 * @returns {string|{}}
 */
countDownUtils.handleCountDown = function (second, resultType, fill0) {
	let _timerObj = {};
	if (second >= 0) {
		_timerObj.minutes = Math.floor(second / 60);
		_timerObj.seconds = Math.floor(second % 60);
	}
	if (fill0) {
		_timerObj.minutes = commonUtils.fillWith0(_timerObj.minutes)
		_timerObj.seconds = commonUtils.fillWith0(_timerObj.seconds)
	}
	if (resultType === "object") {
		return _timerObj;
	}
	return _timerObj.minutes + ":" + _timerObj.seconds;
}

/**
 * 选择的时间是否在指定的范围内,可以指定开始时间 结束时间,最小需要多少时间,最大需要多少时间 返回各式,
 * {
 *     message：“返回的信息”，
 *     type：返回类型（0：开始时间大于结束时间，1：返回时间大于开始时间，并且小于结束时间，2：返回时间要在时间段内，3：符合所有条件）
 *     day ：返回的天数 （在type属于3 的时候这里才有大于等于0的值）
 * }
 * @param beginTime
 * @param endTime
 * @param minNum
 * @param maxNum
 * @returns {{message: string, type: number, day: number}}
 */
dateUtils.selectDateRange = function (beginTime, endTime, minNum = 0, maxNum = 0) {
	let dateSpan, calcData;
	let begin = new Date(beginTime).getTime();
	let end = new Date(endTime).getTime();
	if (end - begin < 0) {
		return {
			message: "开始时间大于结束时间",
			type: 0,
			day: -1
		};
	}
	// 判断选择的时间是否大于十四天
	dateSpan = end - begin;
	dateSpan = Math.abs(dateSpan);
	calcData = Math.floor(dateSpan / (24 * 3600 * 1000));

	if (calcData < minNum) {
		return {
			message: "选择时间需" + minNum + "-" + maxNum + "天",
			type: 1,
			day: -1
		};
	}

	if (calcData > maxNum) {
		return {
			message: "选择的时间大于" + maxNum + "天",
			type: 2,
			day: -1
		};
	}
	return {
		message: "相差" + calcData + "天",
		type: 3,
		day: calcData
	}
}

/**
 * 根据传入的时间戳，计算往前或者往后几天的日期是多少  支持正负数 正数表示往后几天 负数表示往前几天
 * @param timeStamp 时间戳或者时间字符串
 * @param postponeTime 往前或者往后几天
 * @param fill0 在小于10 的时候是否补零
 * @returns {{}} 返回一个时间对象
 */
dateUtils.timeCalculation = function (timeStamp, postponeTime = 0, fill0 = true) {
	let date = new Date(timeStamp).getTime();
	let _afterDate = date + (1000 * 60 * 60 * 24 * postponeTime)
	return dateUtils.formatTimeStrOrTimeStampToObject(_afterDate, fill0)
}

/**
 * 获取当前时间
 * @returns {{}} 返回当前时间对象
 */
dateUtils.getCurrentDate = function () {
	return dateUtils.formatTimeStrOrTimeStampToObject(new Date(), true)
}

/** ==================== storageUtils ====================*/

/**
 *  保存内容到 localStorage 中
 * @param storageName 本地仓库名称
 * @param storageVal 需要存储的值
 * @returns {*} 成功返回存储名称 否则返回null
 */
storageUtils.saveStorage = function (storageName, storageVal) {
	if (storageName.trim() === "") {
		throw new Error("saveStorage error：storageName does not empty")
	}
	try {
		localStorage.setItem(storageName, JSON.stringify(storageVal))
		return storageName
	} catch (e) {
		throw new Error("saveStorage error: save fail" + e)
	}

}
/**
 *  根据传入的 storageName 获取 localStorage 中的值
 * @param storageName 名称
 * @returns {any} 经过转换 的值
 */
storageUtils.getStorage = function (storageName) {
	if (storageName.trim() === "") {
		throw new Error("getStorage error:storageName does not empty")
	}
	try {
		return JSON.parse(localStorage.getItem(storageName));
	} catch (e) {
		throw new Error("getStorage error:get fail" + e)
	}
}
/**
 * 移除 localStorage 中的指定数据
 * @param storageName 需要被移除的数据的名称
 * @returns {*} 移除成功返回 名称
 */
storageUtils.removeStorage = function (storageName) {
	if (storageName.trim() === "") {
		throw new Error("removeStorage error:storageName does not empty")
	}
	try {
		localStorage.removeItem(storageName)
		return storageName
	} catch (e) {
		throw new Error("removeStorage error:remove fail" + e)
	}
}

/**
 * 保存内容到 sessionStorage 中
 * @param storageName 本地仓库名称
 * @param storageVal 需要存储的值
 * @returns {null|*} 成功返回存储名称 否则返回null
 */
storageUtils.saveSession = function (storageName, storageVal) {
	if (storageName.trim() === "") {
		throw new Error("saveSession error：storageName does not empty")
	}
	try {
		sessionStorage.setItem(storageName, JSON.stringify(storageVal))
		return storageName
	} catch (e) {
		throw new Error("saveSession error：save fail:" + e)
	}

}
/**
 *  根据传入的 storageName 获取 sessionStorage 中的值
 * @param storageName 名称
 * @returns {any} 经过转换 的值
 */
storageUtils.getSession = function (storageName) {
	if (storageName.trim() === "") {
		throw new Error("getSession error:storageName does not empty")
	}
	try {
		return JSON.parse(sessionStorage.getItem(storageName));
	} catch (e) {
		throw new Error("getSession error:get fail" + e)
	}
}
/**
 * 移除 sessionStorage 中的指定数据
 * @param storageName 需要被移除的数据的名称
 * @returns {*} 移除成功返回 名称
 */
storageUtils.removeSession = function (storageName) {
	if (storageName.trim() === "") {
		throw new Error("removeSession error:storageName does not empty")
	}
	try {
		sessionStorage.removeItem(storageName)
		return storageName
	} catch (e) {
		throw new Error("removeSession error:remove fail" + e)
	}
}

/******** dom ******/
/**
 * 返回页面顶部
 */
domUtils.backTop = function () {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

/**
 * bottomVisible
 * @returns {boolean} 是否滚动到底部
 */
domUtils.bottomVisible = function () {
	return document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight);
}

/***** test  */
console.log(commonUtils.checkNull(""));

