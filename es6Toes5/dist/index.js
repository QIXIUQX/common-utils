"use strict";

$(function () {
	var noDataStr = "<div class='no-data'>暂无内容</div>"; // 没有内容时候 插入的字符串

	$(".test").click(function () {
		$(".notice-list-box").show();
	});

	/**  switch */
	var xSwitchArr = $(".x-switch");

	/** 分页信息 */
	var paginationEl = $(".m-pagination");
	var pageNumStr = ""; // 生成分页具体页数内容
	var dottedStr = "..."; // 生成分页中的点
	var paginationStr = ""; // 生成分页的整个item

	/**  通知功能 */
	var categoryList = $(".left-box>.category-item");
	var noticeList = $(".common-u-list");

	// 进入页面时候初始化内容
	function init() {
		renderSwitch(); // 初始化 switch
		initPagination(); // 初始化分页器
		initNotice(); // 初始化通知列表
		initCommonDialogMethods(); // 初始化dialog的各种功能
		getNoticeListData(); // 获取通知列表数据
	}

	init();

	/****   网络请求 方法 开始 */

	/**
  * 发送请求获取数据
  */
	function getNoticeListData() {
		$.ajax({
			url: "../../json/all.json",
			data: {},
			type: "POST",
			async: false,
			dataType: "json",
			success: function success(data) {
				generateNoticeListItem(data.list);
			}
		});
	}

	/**
  * 生成每一个通知
  * @param noticeListData 通知数组
  */
	function generateNoticeListItem(noticeListData) {
		var listItemStr = ""; //每一个通知
		var readStatus = void 0; // 已读状态
		if (noticeListData.length === 0) {
			noticeList.html(noDataStr);
			return;
		}
		$.each(noticeListData, function (i, item) {
			readStatus = item.isReadStatus ? "none" : "block";
			listItemStr += "\n\t\t\t<div class=\"u-item\">\n\t\t\t\t<i class=\"have-read-dot\" style=\"display: " + readStatus + ";\"></i> \n\t\t\t\t<div class=\"item-title\">" + item.title + i + "</div>\n\t\t\t\t<div class=\"item-datetime\">" + item.datetime + "</div>\n\t\t\t\t<div class=\"item-controller\">\n\t\t\t\t\t<span class=\"controller-item notice-check-btn\">\u67E5\u770B</span>\n\t\t\t\t\t<div class=\"controller-item controller-item-more\">\n\t\t\t\t\t\t<span>\u66F4\u591A</span>\n\t\t\t\t\t\t<div class=\"more-control\">\n\t\t\t\t\t\t\t<div class=\"more-ctrl-item set-as-read\">\u8BBE\u4E3A\u5DF2\u8BFB</div>\n\t\t\t\t\t\t\t<div class=\"more-ctrl-item delete-notice\">\u5220\u9664</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\t\t\n\t\t";
		});
		noticeList.html(listItemStr);
	}

	/****   网络请求 方法 结束 */

	/****   公共的dialog 方法 开始 */

	function initCommonDialogMethods() {
		handleDialogCloseBtnClick();
	}

	function handleDialogCloseBtnClick() {
		$(".x-close-btn").on("click", function () {
			$(this).parents(".common-primary-mask").hide();
		});
	}

	/****   公共的dialog 方法  结束*/

	/**  通知功能  开始*/
	function initNotice() {
		handleCategoryItemClick();
		handleUnReadMessageOnlyClick();
		handleSetAllReadMessageClick();
		handleNoticeCheckBtnClick();
		handleSetAsReadBtnClick();
		handleNoticeDeleteBtnClick();
	}

	/**
  * 设为已读按钮被点击
  */
	function handleSetAsReadBtnClick() {
		noticeList.on("click", ".set-as-read", function () {
			console.log($(this).parents(".u-item").children(".have-read-dot").hide());
			console.log("设置为已读");
		});
	}

	/**
  * 删除通知按钮被点击
  */
	function handleNoticeDeleteBtnClick() {
		noticeList.on("click", ".delete-notice", function () {
			console.log($(this).parents(".u-item"));
			console.log("删除");
		});
	}

	/**
  * 查看按钮被点击
  */
	function handleNoticeCheckBtnClick() {
		noticeList.on("click", ".notice-check-btn", function () {
			console.log("查看按钮被点击");
			$(".notice-detail-box").show();
		});
	}

	/**
  * 全部已读
  */
	function handleSetAllReadMessageClick() {
		$(".set-all-read").on("click", function () {
			//todo
			console.log("全部已读");
		});
	}

	/**
  * 仅未读消息被点击
  */
	function handleUnReadMessageOnlyClick() {
		$(".unread-message-only").on("click", function () {
			xSwitchArr.click();
		});
	}

	/**
  * 分类被点击
  */
	function handleCategoryItemClick() {
		categoryList.on("click", function () {
			$(this).addClass("active-category").siblings().removeClass("active-category");
			console.log("分类被点击");
			console.log($(this).text() === "全部信息");
			console.log($(this).text() === "教育局消息");
		});
	}

	/**  通知功能  结束*/

	/** 分页器 开始 ***/

	/**
  * 初始化分页器
  */
	function initPagination() {
		setDefaultPagination();
		handlePrevCLick();
		handleNextCLick();
		paginationItemClick();
		regTestIpt();
		jumpPage();
	}

	/**
  * 获取分页数据
  */
	function getPaginationData() {
		console.log('paginationEl.attr("data-pageIndex")', paginationEl.attr("data-pageIndex") - 1);
		console.log('paginationEl.attr("data-pageIndex")', paginationEl.attr("data-pageSize"));

		//todo 分页网络请求

		// $.ajax({
		// 	url: "",
		// 	data: {
		//      checkAllMessage:
		// 		pageIndex: paginationEl.attr("data-pageIndex"),
		// 		pageSize: paginationEl.attr("data-pageSize"),
		// 	},
		// 	type: "POST",
		// 	async: false,
		// 	dataType: "json",
		// 	success: function (data) {
		// 	},
		// });
	}

	/**
  * 设置初始化的分页器
  */
	function setDefaultPagination() {
		for (var i = 0; i < paginationEl.length; i++) {
			generatePagination($(paginationEl[i]));
		}
	}

	/**
  * 生成页数  每次都会调用该方法 将最后的结果拼接到  pageNumStr 中  pageNumStr 在插入页面后会被复制为“”
  * @param pageIndex 当前页数
  * @param pageTotal 总页数
  * @param index 每次拼接字符串的类型是什么   每次调用时候的index 值
  */
	function generatePageItem(pageIndex, pageTotal, index) {
		if (pageIndex === index) {
			pageNumStr += "<div class=\"m-pagination-item page-num current-page\">" + index + "</div>";
		} else if (1 === index) {
			pageNumStr += "<div class=\"m-pagination-item page-num start-page\">" + index + "</div>";
		} else if (pageTotal === index) {
			pageNumStr += "<div class=\"m-pagination-item page-num end-page\">" + index + "</div>";
		} else {
			pageNumStr += "<div class=\"m-pagination-item page-num \">" + index + "</div>";
		}
	}

	/**
  * 生成分页器中的每一页
  */
	function generatePagination(element) {
		var pageTotal = parseInt(element.attr("data-pageTotal")); // 总页数
		var pageIndex = parseInt(element.attr("data-pageIndex")); //当前页
		// 如果总页面小于等于6  则直接渲染即可
		if (pageTotal <= 5) {
			for (var i = 1; i <= pageTotal; i++) {
				generatePageItem(pageIndex, pageTotal, i);
			}
		} else {
			// 总页面大于6的时候 判断他的当前页面是否大于4条 如果不是则渲染前面的  后面需要加。。。
			if (pageIndex <= 4) {
				for (var _i = 0; _i <= 4; _i++) {
					generatePageItem(pageIndex, pageTotal, _i + 1);
				}
				pageNumStr += dottedStr;
				generatePageItem(pageIndex, pageTotal, pageTotal);
			} else if (pageIndex > pageTotal - 4) {
				//如果大于总页数-4 则渲染最后的   前面需要加。。。
				generatePageItem(pageIndex, pageTotal, 1);
				pageNumStr += dottedStr;
				for (var _i2 = pageTotal - 4; _i2 <= pageTotal; _i2++) {
					generatePageItem(pageIndex, pageTotal, _i2);
				}
			} else {
				// 如果当前页面是在中间的 则两边都加。。。
				generatePageItem(pageIndex, pageTotal, 1);
				pageNumStr += dottedStr;
				for (var _i3 = pageIndex - 1; _i3 <= pageIndex + 1; _i3++) {
					generatePageItem(pageIndex, pageTotal, _i3);
				}
				pageNumStr += dottedStr;
				generatePageItem(pageIndex, pageTotal, pageTotal);
			}
		}
		paginationStr = "\n\t\t\t<input type=\"text\" class=\"m-p-ipt\" placeholder=\"\u9875\u7801\">\n\t\t\t<div class=\"m-pagination-item m-p-go\">\u8DF3\u8F6C</div>\n\t\t\t<div class=\"m-pagination-item m-p-prev\">&lt</div>\n\t\t\t\t" + pageNumStr + "\n\t\t\t<div class=\"m-pagination-item m-p-next\">&gt</div>\n\t\t\t<div class=\"m-pagination-item\">\u5171 " + pageTotal + " \u9875</div>\n\t\t";
		element.html(paginationStr);
		pageNumStr = "";
		paginationStr = "";
	}

	/**
  * 上一页被点击
  */
	function handlePrevCLick() {
		paginationEl.on("click", ".m-p-prev", function () {
			var _this = $(this).parents(".m-pagination");
			var pageIndex = parseInt(_this.attr("data-pageIndex")); //当前页
			if (pageIndex > 1) {
				pageIndex -= 1;
				_this.attr("data-pageIndex", pageIndex); //当前页
				generatePagination(_this);
			} else {
				return;
			}
			console.log("handlePrevCLick");
			getPaginationData();
		});
	}

	/**
  * 下一页被点击
  */
	function handleNextCLick() {
		paginationEl.on("click", ".m-p-next", function () {
			var _this = $(this).parents(".m-pagination");
			var pageTotal = parseInt(_this.attr("data-pageTotal")); // 总页数
			var pageIndex = parseInt(_this.attr("data-pageIndex")); //当前页

			if (pageIndex < pageTotal) {
				pageIndex += 1;
				_this.attr("data-pageIndex", pageIndex); //当前页
				generatePagination(_this);
			} else {
				return;
			}
			console.log("handleNextCLick");
			getPaginationData();
		});
	}

	/**
  * 中间的每一个页面被点击
  */
	function paginationItemClick() {
		paginationEl.on("click", ".page-num", function () {
			var index = parseInt($(this).text());

			var _this = $(this).parents(".m-pagination");
			var pageTotal = parseInt(_this.attr("data-pageTotal")); // 总页数
			var pageIndex = parseInt(_this.attr("data-pageIndex")); //当前页

			if (index !== 1 && index !== pageTotal) {
				if (index === pageIndex) {
					return;
				}
				pageIndex = index;
				_this.attr("data-pageIndex", pageIndex); //当前页
				generatePagination(_this);
			} else if (index === 1) {
				pageIndex = 1;
				_this.attr("data-pageIndex", pageIndex); //当前页
				generatePagination(_this);
			} else if (index === pageTotal) {
				pageIndex = pageTotal;
				_this.attr("data-pageIndex", pageIndex); //当前页
				generatePagination(_this);
			} else {
				return;
			}
			console.log("handlePageClick");
			getPaginationData();
		});
	}

	/**
  * 通过输入页码进行跳转
  */
	function jumpPage() {
		paginationEl.on("click", ".m-p-go", function () {
			var _this = $(this).parents(".m-pagination");
			var pageTotal = parseInt(_this.attr("data-pageTotal")); // 总页数
			var pageIndex = parseInt(_this.attr("data-pageIndex")); //当前页
			var index = _this.children(".m-p-ipt").val();
			// 如果文本框没有输入页码则直接return  否则将输入的页码转换为整型
			if (index === "") {
				return;
			} else {
				index = parseInt(index);
			}
			// 如果当前输入的页码等于 当前已经跳转的页码 则直接return
			if (index === pageIndex) {
				return;
			}
			// 如果当前输入的页码 大于总页码  则跳转到最后一页
			if (index > pageTotal) {
				index = pageTotal;
			}

			pageIndex = index;
			_this.attr("data-pageIndex", pageIndex); //当前页
			generatePagination(_this);
			_this.children(".m-p-ipt").val(pageIndex);
			console.log("输入页码后点击跳转");
			getPaginationData();
		});
	}

	/** 如果文本框被输入了非整数之外的字符 则替换为空 只保留整数部分 */
	function regTestIpt() {
		paginationEl.on("keyup", ".m-p-ipt", function (e) {
			var _this = $(this).parents(".m-pagination");

			if (this.value.length === 1) {
				this.value = this.value.replace(/[^1-9]/g, "");
			} else {
				this.value = this.value.replace(/\D/g, "");
			}
			if (e.keyCode === 13) {
				_this.children(".m-p-go").click();
			}
		});
	}

	/** 分页器 结束 ***/

	/** switch 开始 ***/
	/**
  * 渲染 Switch到页面中
  */
	function renderSwitch() {
		var switchStr = '<span class="x-switch-core"><span class="x-switch-button"></span></span>';
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
});

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
	handleReadBtnClick(value);
}

/**
 * 根据switch状态来请求数据，
 * @param readStatus 全部信息还是未读信息
 */
function handleReadBtnClick(readStatus) {
	if (readStatus) {
		//todo 如果只读是被选中的
		console.log("全部显示");
		return;
	}
	console.log("未读");
	// todo 如果不是选中的只读
}
/** switch 结束 ***/
