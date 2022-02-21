var datePickerStr = "";
var _this; //传入的全局this
var pickerWeekArr = ["日", "一", "二", "三", "四", "五", "六"];
var currentDateObj = datePickerFormat(new Date());
var datePickerContainer //日历盒子
var curDayStr =
	currentDateObj.year +
	"-" +
	(currentDateObj.month < 10
		? "0" + currentDateObj.month
		: currentDateObj.month) +
	"-" +
	(currentDateObj.day < 10 ? "0" + currentDateObj.day : currentDateObj.day);

/**
 * 在onclick="datePicker(this)" 调用时候执行的方法，初始化日历组件，初始化默认值
 * @param params 需要传入this 作为参数  所以 格式应该写为：<input type="text" onclick="datePicker(this)">
 */
function datePicker(params) {
	_this = params;
	var offsetPositionArr = $(_this).offset();
	var offsetHeight = $(_this).outerHeight();
	generateDatePicker(offsetPositionArr, offsetHeight);
	//调用初始化日历的方法
	init();

	datePickerContainer = $(".date-picker-container");
	//设置生生成的日历组件的位置
	datePickerContainer.css({
		left: offsetPositionArr.left,
		top: offsetPositionArr.top + offsetHeight
	});
	//将日历显示出来
	datePickerContainer.show();
}

/**
 * 生成并且往页面中插入日历
 */
function generateDatePicker(offsetPositionArr, offsetHeight) {
	//如果有日历组件则不重复渲染
	if ($(".date-picker-container").hasClass("date-picker-container")) {
		return;
	}
	//拼接日历组件内容
	datePickerStr =
		'<div class="date-picker-container" style="left:' +
		offsetPositionArr.left +
		"px;top:" +
		(offsetPositionArr.top + offsetHeight) +
		'px">' +
		'    <div class="picker-year">' +
		'        <div class="picker-year-left-box"><span class="common-toggle-date-btn prev-year-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.25 33.72"><g id="图层_2" data-name="图层 2"><g id="图层_1-2" data-name="图层 1"><path d="M16.48,33.72a2,2,0,0,1-1.42-.58L.59,18.66a2,2,0,0,1,0-2.83L15.83.59a2,2,0,1,1,2.83,2.82L4.83,17.25,17.89,30.31a2,2,0,0,1,0,2.83A2,2,0,0,1,16.48,33.72Z"/><path d="M31.48,33.72a2,2,0,0,1-1.42-.58L15.59,18.66a2,2,0,0,1,0-2.83L30.83.59a2,2,0,0,1,2.83,2.82L19.83,17.25,32.89,30.31a2,2,0,0,1,0,2.83A2,2,0,0,1,31.48,33.72Z"/></g></g></svg></span>' +
		'        <span class="common-toggle-date-btn prev-month-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.25 33.72"><g id="图层_2" data-name="图层 2"><g id="图层_1-2" data-name="图层 1"><path d="M16.48,33.72a2,2,0,0,1-1.42-.58L.59,18.66a2,2,0,0,1,0-2.83L15.83.59a2,2,0,1,1,2.83,2.82L4.83,17.25,17.89,30.31a2,2,0,0,1,0,2.83A2,2,0,0,1,16.48,33.72Z"/></g></g></svg></span></div>' +
		'        <div class="year-box">' +
		'            <span class="year-txt"></span>年<span class="month-txt"></span>月' +
		"        </div>" +
		'        <div class="picker-year-right-box"><span class="common-toggle-date-btn next-month-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.25 33.72"><g id="图层_2" data-name="图层 2"><g id="图层_1-2" data-name="图层 1"><path d="M2.77,33.72a2,2,0,0,1-1.42-3.41L14.42,17.25.59,3.41A2,2,0,0,1,.59.59a2,2,0,0,1,2.82,0L18.66,15.83a2,2,0,0,1,0,2.83L4.18,33.14A2,2,0,0,1,2.77,33.72Z"/></g></g></svg></span>' +
		'        <span class="common-toggle-date-btn next-year-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.25 33.72"><g id="图层_2" data-name="图层 2"><g id="图层_1-2" data-name="图层 1"><path d="M17.77,33.72a2,2,0,0,1-1.42-3.41L29.42,17.25,15.59,3.41a2,2,0,0,1,0-2.82,2,2,0,0,1,2.82,0L33.66,15.83a2,2,0,0,1,0,2.83L19.18,33.14A2,2,0,0,1,17.77,33.72Z"/><path d="M2.77,33.72a2,2,0,0,1-1.42-3.41L14.42,17.25.59,3.41A2,2,0,0,1,.59.59a2,2,0,0,1,2.82,0L18.66,15.83a2,2,0,0,1,0,2.83L4.18,33.14A2,2,0,0,1,2.77,33.72Z"/></g></g></svg></span></div>' +
		"    </div>" +
		'    <div class="date-container">' +
		'        <div class="picker-week"></div>' +
		'        <div class="picker-days"></div>' +
		"    </div>" +
		"</div>";

	//将内容插入到页面中
	$("body").append(datePickerStr);

}


/**
 * 进入页面时候初始化所有默认值
 */
function init() {
	renderWeek(pickerWeekArr); //渲染每周的天数
	renderDays(currentDateObj.year, currentDateObj.month); //渲染天数

	// 切换年月按钮事件绑定
	prevYearEvent();
	nextYearEvent();
	prevMonthEvent();
	nextMonthEvent();
	handleDayClick(_this);
	handleClickCheck()
}

/** 检查每次点击的地方是不是包含文本框或者是日历框 */
function handleClickCheck() {
	$(document).click(function (e) {
		if (datePickerContainer.css("display") === 'none') {
			return
		}
		if (e.target === _this || datePickerContainer.get(0).contains(e.target)) {
			console.log()
		} else {
			datePickerContainer.hide();
		}
	})
}

/** 上一年 */
function prevYearEvent() {
	$(".prev-year-btn")
		.off()
		.click(function () {
			currentDateObj.year = currentDateObj.year - 1;
			renderDays(currentDateObj.year, currentDateObj.month); //渲染天数
		});
}

/** 下一年 */
function nextYearEvent() {
	$(".next-year-btn")
		.off()
		.click(function () {
			currentDateObj.year = currentDateObj.year + 1;
			renderDays(currentDateObj.year, currentDateObj.month); //渲染天数
		});
}

/** 上一月 */
function prevMonthEvent() {
	$(".prev-month-btn")
		.off()
		.click(function () {
			if (currentDateObj.month - 1 === 0) {
				currentDateObj.year = currentDateObj.year - 1;
				currentDateObj.month = 12;
				renderDays(currentDateObj.year, currentDateObj.month); //渲染天数
				return;
			}
			currentDateObj.month = currentDateObj.month - 1;
			renderDays(currentDateObj.year, currentDateObj.month); //渲染天数
		});
}

/** 下一月 */
function nextMonthEvent() {
	$(".next-month-btn")
		.off()
		.click(function () {
			if (currentDateObj.month + 1 > 12) {
				currentDateObj.year = currentDateObj.year + 1;
				currentDateObj.month = 1;
				renderDays(currentDateObj.year, currentDateObj.month); //渲染天数
				return;
			}
			currentDateObj.month = currentDateObj.month + 1;
			renderDays(currentDateObj.year, currentDateObj.month); //渲染天数
		});
}

/**
 * 处理日期选择器中的天被点击
 * @param {*} curThis 当前正在操作的input
 */
function handleDayClick(curThis) {
	$(".picker-days")
		.off()
		.on("click", ".picker-days-item", function () {
			$(curThis).val($(this).attr("data-date"));
			$(".date-picker-container").hide();
		});
}

/**
 * 渲染42天到页面中
 * @param {*} year 当前的年
 * @param {*} month 当前的月
 */
function renderDays(year, month) {
	var firstDay = new Date(year + "/" + month + "/1"); //获取每个月的第一天
	var weeks = firstDay.getDay(); //获取星期几
	var firstDate = firstDay - weeks * 24 * 60 * 60 * 1000; //获取每日历中第一行第一个位置的日期
	var tempArr = []; //数组用于存放所有的天数
	var dayStr = ""; //用于拼接每一天的字符串
	var tempDayStr = "";
	for (var i = 0; i < 42; i++) {
		tempArr[i] = new Date(firstDate + i * 24 * 60 * 60 * 1000);
		tempDayStr =
			tempArr[i].getFullYear() +
			"-" +
			(tempArr[i].getMonth() + 1 < 10
				? "0" + (tempArr[i].getMonth() + 1)
				: tempArr[i].getMonth() + 1) +
			"-" +
			(tempArr[i].getDate() < 10
				? "0" + tempArr[i].getDate()
				: tempArr[i].getDate());

		// 如果当前月份大于 此项的月份 表示是下一个时间,添加类nextMonth
		if (month < tempArr[i].getMonth() + 1) {
			dayStr +=
				'<div class="picker-days-item next-month" data-date="' +
				tempDayStr +
				'"><span class="item-content">' +
				tempArr[i].getDate() +
				"</span></div>";
		} else if (month > tempArr[i].getMonth() + 1) {  // 小于则添加prev-month
			dayStr +=
				'<div class="picker-days-item prev-month" data-date="' +
				tempDayStr +
				'"><span class="item-content">' +
				tempArr[i].getDate() +
				"</span></div>";
		} else if (curDayStr === tempDayStr) { // 如果是当天则添加current—date
			dayStr +=
				'<div class="picker-days-item current-date" data-date="' +
				tempDayStr +
				'"><span class="item-content">' +
				tempArr[i].getDate() +
				"</span></div>";
		} else { // 都不是则直接渲染
			dayStr +=
				'<div class="picker-days-item" data-date="' +
				tempDayStr +
				'"><span class="item-content">' +
				tempArr[i].getDate() +
				"</span></div>";
		}
	}
	$(".picker-days").html(dayStr);
	$(".year-txt").text(firstDay.getFullYear());
	$(".month-txt").text(firstDay.getMonth() + 1);
}

/**
 * 渲染周 从周日开始 一直到周六
 * @param {*} weekArr 周数组
 */
function renderWeek(weekArr) {
	var weekStr = "";
	$.each(weekArr, function (index, item) {
		weekStr += ' <div class="picker-week-item">' + item + "</div>";
	});
	//插入页面
	$(".picker-week").html(weekStr);
}

/**
 * 获取一个时间对象,对象中包含年月日时分秒
 * @param { * } dateTime 时间戳或者一个时间字符串如:1633335091379 or 2021-10-04T08:11:46.830Z
 * @returns { Object }一个包含年月日时分秒的时间对象
 */
function datePickerFormat(dateTime) {
	var date = new Date(dateTime);
	var obj = {};
	obj.year = date.getFullYear();
	obj.month = date.getMonth() + 1;
	obj.week = date.getDay();
	obj.day = date.getDate();
	obj.hour = date.getHours();
	obj.minutes = date.getMinutes();
	obj.second = date.getSeconds();

	obj.month = obj.month >= 10 ? obj.month : "0" + obj.month;
	obj.day = obj.day >= 10 ? obj.day : "0" + obj.day;
	obj.hour = obj.hour >= 10 ? obj.hour : "0" + obj.hour;
	obj.minutes = obj.minutes >= 10 ? obj.minutes : "0" + obj.minutes;
	obj.second = obj.second >= 10 ? obj.second : "0" + obj.second;
	return obj;
}