"use strict";

/**
 * switch 被点击 切换switch 状态和自定义属性的值
 * @param _this 被点击的switch
 */
function switchClick(_this) {
	var value = $(_this).attr("data-value");
	if (value === "true") {
		$(_this).attr("data-value", "false");
		$(_this).children(".x-switch-core").removeClass("is-check");
	} else {
		$(_this).attr("data-value", "true");
		$(_this).children(".x-switch-core").addClass("is-check");
	}
}

$(function () {
	/**
	 * 渲染 Switch到页面中
	 */
	function renderSwitch() {
		var xSwitchArr = $(".x-switch");
		var switchStr = "<span class=\"x-switch-core\"><span class=\"x-switch-button\"></span></span>";
		for (var i = 0; i < xSwitchArr.length; i++) {
			$(xSwitchArr[i]).html(switchStr);
			setDefaultStyle(xSwitchArr[i]);
		}

		/**
		 * 如果默认就是选中状态的，需要给他添加相应的类并且val的值改为：true
		 * @param  { HTMLElement } el 需要设置样式或者取消样式的element元素
		 */
		function setDefaultStyle(el) {
			var value = $(el).attr("data-value");
			//如果默认就是true  则添加 is-check
			if (value === "true") {
				$(el).children(".x-switch-core").addClass("is-check");
			}
		}
	}

	/**
	 * 进入页面初始化调用
	 */
	function init() {
		renderSwitch();
	}

	init();
});



// /**
//  * switch 被点击 切换switch 状态和自定义属性的值
//  * @param _this 被点击的switch
//  */
// function switchClick(_this) {
// 	let value = $(_this).attr("data-value")
// 	if (value === "true") {
// 		$(_this).attr("data-value", "false")
// 		$(_this).children(".x-switch-core").removeClass("is-check")
// 	} else {
// 		$(_this).attr("data-value", "true")
// 		$(_this).children(".x-switch-core").addClass("is-check")
// 	}
// }
//
// $(function () {
// 	/**
// 	 * 渲染 Switch到页面中
// 	 */
// 	function renderSwitch() {
// 		let xSwitchArr = $(".x-switch")
// 		let switchStr = `<span class="x-switch-core"><span class="x-switch-button"></span></span>`
// 		for (let i = 0; i < xSwitchArr.length; i++) {
// 			$(xSwitchArr[i]).html(switchStr)
// 			setDefaultStyle(xSwitchArr[i])
// 		}
//
// 		/**
// 		 * 如果默认就是选中状态的，需要给他添加相应的类并且val的值改为：true
// 		 * @param  { Element } el 需要设置样式或者取消样式的element元素
// 		 */
// 		function setDefaultStyle(el) {
// 			let value = $(el).attr("data-value");
// 			//如果默认就是true  则添加 is-check
// 			if (value === "true") {
// 				$(el).children(".x-switch-core").addClass("is-check")
// 			}
// 		}
// 	}
//
// 	/**
// 	 * 进入页面初始化调用
// 	 */
// 	function init() {
// 		renderSwitch()
// 	}
//
// 	init()
// })

