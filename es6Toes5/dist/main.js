"use strict";

var monthPickerWrapEl = "";
var monthPicker__this = "";
var currentMonthPickerTimeObj = datePickerFormat(new Date());
var __year = "";

function monthPicker(param) {
	monthPicker__this = param;
	var offsetPositionArr = $(monthPicker__this).offset();
	var offsetHeight = $(monthPicker__this).outerHeight();
	generateMonthPicker(offsetPositionArr, offsetHeight);
	console.log(offsetPositionArr, offsetHeight);
	monthPickerWrapEl = $(".x-month-picker-wrapper");
	__year = parseInt(monthPickerWrapEl.find(".x-month-year-txt").text());
	//设置生生成的月份组件的位置
	monthPickerWrapEl.css({
		left: offsetPositionArr.left,
		top: offsetPositionArr.top + offsetHeight
	});
	//将日历显示出来
	monthPickerWrapEl.show();
	handleClickCheck();

	prevYearEvent();
	nextYearEvent();
	handleDayClick();
}

/**
 * 生成并且往页面中插入月份
 */
function generateMonthPicker(offsetPositionArr, offsetHeight) {
	//如果有日历组件则不重复渲染
	if ($(".x-month-picker-wrapper").hasClass("x-month-picker-wrapper")) {
		return;
	}
	//拼接日历组件内容
	monthPickerWrapEl = '<div class="x-month-picker-wrapper">' + '	<div class="x-month-picker-header">' + '		<div class="x-month-prev-year common-toggle-date-btn">' + '			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.25 33.72"><g id="图层_2" data-name="图层 2"><g id="图层_1-2" data-name="图层 1"><path d="M16.48,33.72a2,2,0,0,1-1.42-.58L.59,18.66a2,2,0,0,1,0-2.83L15.83.59a2,2,0,1,1,2.83,2.82L4.83,17.25,17.89,30.31a2,2,0,0,1,0,2.83A2,2,0,0,1,16.48,33.72Z"/><path d="M31.48,33.72a2,2,0,0,1-1.42-.58L15.59,18.66a2,2,0,0,1,0-2.83L30.83.59a2,2,0,0,1,2.83,2.82L19.83,17.25,32.89,30.31a2,2,0,0,1,0,2.83A2,2,0,0,1,31.48,33.72Z"/></g></g></svg>' + "		</div>" + '		<div class="x-month-year-wrap">' + '			<span class="x-month-year-txt"></span>' + "			<span>年</span>" + "		</div>" + '		<div class="x-month-next-year common-toggle-date-btn">' + '			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.25 33.72"><g id="图层_2" data-name="图层 2"><g id="图层_1-2" data-name="图层 1"><path d="M17.77,33.72a2,2,0,0,1-1.42-3.41L29.42,17.25,15.59,3.41a2,2,0,0,1,0-2.82,2,2,0,0,1,2.82,0L33.66,15.83a2,2,0,0,1,0,2.83L19.18,33.14A2,2,0,0,1,17.77,33.72Z"/><path d="M2.77,33.72a2,2,0,0,1-1.42-3.41L14.42,17.25.59,3.41A2,2,0,0,1,.59.59a2,2,0,0,1,2.82,0L18.66,15.83a2,2,0,0,1,0,2.83L4.18,33.14A2,2,0,0,1,2.77,33.72Z"/></g></g></svg>' + "		</div>" + "	</div>" + '	<div class="x-month-picker-body">' + generateMonthPickerItem() + "	</div>" + "</div>   ";

	function generateMonthPickerItem() {
		var monthPickerItemStr = "";
		var __monthStr = "";
		var monthIdxMap = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
		for (var i = 1; i <= 12; i++) {
			var __monthStr = i < 10 ? "0" + i : i;
			monthPickerItemStr += '<div class="x-month-picker-item" data-date="' + __monthStr + '"><span>' + monthIdxMap[i - 1] + "</span></div>";
		}
		return monthPickerItemStr;
	}

	//将内容插入到页面中
	$("body").append(monthPickerWrapEl);
	$(".x-month-year-txt").html(currentMonthPickerTimeObj.year);
}

/** 检查每次点击的地方是不是包含文本框或者是日历框 */
function handleClickCheck() {
	$(document).off().click(function (e) {
		if (monthPickerWrapEl.css("display") === "none") {
			return;
		}
		if (e.target === monthPicker__this || monthPickerWrapEl.get(0).contains(e.target)) {
			console.log();
		} else {
			monthPickerWrapEl.hide();
		}
	});
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
	return obj;
}

/** 上一年 */
function prevYearEvent() {
	$(".x-month-prev-year").off().on("click", function () {
		monthPickerWrapEl.find(".x-month-year-txt").text(__year -= 1);
	});
}

/** 下一年 */
function nextYearEvent() {
	$(".x-month-next-year").off().on("click", function () {
		monthPickerWrapEl.find(".x-month-year-txt").text(__year += 1);
	});
}

/**
 * 处理月份选择器中的月被点击
 * @param {*} curThis 当前正在操作的input
 */
function handleDayClick(curThis) {
	$(".x-month-picker-body").off().on("click", ".x-month-picker-item>span", function () {
		var __dataMonth = $(this).parents(".x-month-picker-item").attr("data-date");
		var __dataYear = monthPickerWrapEl.find(".x-month-year-txt").text();
		$(monthPicker__this).val(__dataYear + "-" + __dataMonth);
		monthPickerWrapEl.hide();
	});
}
