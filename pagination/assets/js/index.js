$(function () {
	let paginationEl = $(".m-pagination")
	let pageNumStr = "" // 生成分页具体页数内容
	let dottedStr = "..." // 生成分页中的点
	let paginationStr = '' // 生成分页的整个item
	function init() {
		setDefaultPagination()
		handlePrevCLick()
		handleNextCLick()
		paginationItemClick()
		regTestIpt()
		jumpPage()
	}

	init()

	function setDefaultPagination() {
		for (let i = 0; i < paginationEl.length; i++) {
			generatePagination($(paginationEl[i]))
		}

	}


	/**
	 *
	 * @param index
	 */

	/**
	 * 生成页数  每次都会调用该方法 将最后的结果拼接到  pageNumStr 中  pageNumStr 在插入页面后会被复制为“”
	 * @param pageIndex 当前页数
	 * @param pageTotal 总页数
	 * @param index 每次拼接字符串的类型是什么   每次调用时候的index 值
	 */
	function generatePageItem(pageIndex, pageTotal, index) {
		if (pageIndex === index) {
			pageNumStr += `<div class="m-pagination-item page-num current-page">${index}</div>`
		} else if (1 === index) {
			pageNumStr += `<div class="m-pagination-item page-num start-page">${index}</div>`
		} else if (pageTotal === index) {
			pageNumStr += `<div class="m-pagination-item page-num end-page">${index}</div>`
		} else {
			pageNumStr += `<div class="m-pagination-item page-num ">${index}</div>`
		}
	}

	/**
	 * 生成分页器中的每一页
	 */
	function generatePagination(element) {
		let pageTotal = parseInt(element.attr("data-pageTotal")) // 总页数
		let pageIndex = parseInt(element.attr("data-pageIndex")) //当前页
		// 如果总页面小于等于6  则直接渲染即可
		if (pageTotal <= 5) {
			for (let i = 1; i <= pageTotal; i++) {
				generatePageItem(pageIndex, pageTotal, i)
			}
		} else {  // 总页面大于6的时候 判断他的当前页面是否大于4条 如果不是则渲染前面的  后面需要加。。。
			if (pageIndex <= 4) {
				for (let i = 0; i <= 4; i++) {
					generatePageItem(pageIndex, pageTotal, i + 1)
				}
				pageNumStr += dottedStr
				generatePageItem(pageIndex, pageTotal, pageTotal)
			} else if (pageIndex > pageTotal - 4) {   //如果大于总页数-4 则渲染最后的   前面需要加。。。
				generatePageItem(pageIndex, pageTotal, 1)
				pageNumStr += dottedStr
				for (let i = pageTotal - 4; i <= pageTotal; i++) {
					generatePageItem(pageIndex, pageTotal, i)
				}
			} else { // 如果当前页面是在中间的 则两边都加。。。
				generatePageItem(pageIndex, pageTotal, 1)
				pageNumStr += dottedStr
				for (let i = pageIndex - 1; i <= pageIndex + 1; i++) {
					generatePageItem(pageIndex, pageTotal, i)
				}
				pageNumStr += dottedStr
				generatePageItem(pageIndex, pageTotal, pageTotal)
			}
		}
		paginationStr = `
			<input type="text" class="m-p-ipt" placeholder="页码">
			<div class="m-pagination-item m-p-go">跳转</div>
			<div class="m-pagination-item m-p-prev">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
			</div>
				${pageNumStr}
			<div class="m-pagination-item m-p-next">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
			</div>
		`
		element.html(paginationStr)
		pageNumStr = ''
		paginationStr = ''
	}

	/**
	 * 上一页被点击
	 */
	function handlePrevCLick() {
		paginationEl.on("click", ".m-p-prev", function () {
			let _this = $(this).parents(".m-pagination")
			let pageIndex = parseInt(_this.attr("data-pageIndex")) //当前页
			if (pageIndex > 1) {
				pageIndex -= 1
				_this.attr("data-pageIndex", pageIndex) //当前页
				generatePagination(_this)
			} else {
				return
			}
			console.log("handlePrevCLick")
		})
	}

	/**
	 * 下一页被点击
	 */
	function handleNextCLick() {
		paginationEl.on("click", ".m-p-next", function () {
			let _this = $(this).parents(".m-pagination")
			let pageTotal = parseInt(_this.attr("data-pageTotal")) // 总页数
			let pageIndex = parseInt(_this.attr("data-pageIndex")) //当前页


			if (pageIndex < pageTotal) {
				pageIndex += 1
				_this.attr("data-pageIndex", pageIndex) //当前页
				generatePagination(_this)
			} else {
				return
			}
			console.log("handleNextCLick")
		})
	}

	/**
	 * 中间的每一个页面被点击
	 */
	function paginationItemClick() {
		paginationEl.on("click", ".page-num", function () {
			let index = parseInt($(this).text())

			let _this = $(this).parents(".m-pagination")
			let pageTotal = parseInt(_this.attr("data-pageTotal")) // 总页数
			let pageIndex = parseInt(_this.attr("data-pageIndex")) //当前页


			if (index !== 1 && index !== pageTotal) {
				if (index === pageIndex) {
					return;
				}
				pageIndex = index
				_this.attr("data-pageIndex", pageIndex) //当前页
				generatePagination(_this)
			} else if (index === 1) {
				pageIndex = 1
				_this.attr("data-pageIndex", pageIndex) //当前页
				generatePagination(_this)
			} else if (index === pageTotal) {
				pageIndex = pageTotal
				_this.attr("data-pageIndex", pageIndex) //当前页
				generatePagination(_this)
			} else {
				return
			}
			console.log("handlePageClick")
		})
	}

	/**
	 * 通过输入页码进行跳转
	 */
	function jumpPage() {
		// $(".m-pagination").on("click", ".m-p-go", function () {
		paginationEl.on("click", ".m-p-go", function () {

			let _this = $(this).parents(".m-pagination")
			let pageTotal = parseInt(_this.attr("data-pageTotal")) // 总页数
			let pageIndex = parseInt(_this.attr("data-pageIndex")) //当前页
			let index = _this.children(".m-p-ipt").val()
			// 如果文本框没有输入页码则直接return  否则将输入的页码转换为整型
			if (index === "") {
				return;
			} else {
				index = parseInt(index)
			}
			// 如果当前输入的页码等于 当前已经跳转的页码 则直接return
			if (index === pageIndex)
				return

			// 如果当前输入的页码 大于总页码  则跳转到最后一页
			if (index > pageTotal) {
				index = pageTotal
			}

			pageIndex = index
			_this.attr("data-pageIndex", pageIndex) //当前页
			generatePagination(_this)
			_this.children(".m-p-ipt").val(pageIndex)
			console.log("跳转到输入的页码");
		})
	}


	/** 如果文本框被输入了非整数之外的字符 则替换为空 只保留整数部分 */
	function regTestIpt() {
		paginationEl.on("keyup", ".m-p-ipt", function (e) {
			let _this = $(this).parents(".m-pagination")

			if (this.value.length === 1) {
				this.value = this.value.replace(/[^1-9]/g, "");
			} else {
				this.value = this.value.replace(/\D/g, "");
			}
			if (e.keyCode === 13) {
				_this.children(".m-p-go").click()
			}
		})
	}
})