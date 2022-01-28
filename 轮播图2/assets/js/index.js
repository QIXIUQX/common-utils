$(function () {

	let swiperList1 = [
		{
			url: "https://c.wallhere.com/images/35/78/6e53dc31dee3e84a162aa14155d7-1563109.jpg!d",
			title: "1"
		},
		{
			url: "https://c.wallhere.com/images/d0/d0/3c9203dca6873e85879197389228-1520111.jpg!s",
			title: "1"
		},
	]
	let swiperList2 = [
		{
			url: "http://browser9.qhimg.com/bdr/__85/t016ad88ddaf2ae2d92.jpg",
			title: "1"
		},
	]
	let swiperList3 = [
		{
			url: "https://c.wallhere.com/images/e3/e0/4e1266b5cb36b21de25a7cf2a25f-1500665.jpg!d",
			title: "1"
		},{
			url: "https://c.wallhere.com/photos/5c/04/anime_anime_girls_vertical_water_bottle_tennis_rackets_blue_eyes_clouds_long_hair-2064997.jpg!d",
			title: "1"
		},{
			url: "https://c.wallhere.com/photos/bb/76/jx3_WuXia_Zhang_Xiao_Bai_tattoo_bareback-1185722.jpg!d",
			title: "1"
		},
	]
	let swiperList = [
		{
			url: "https://images.pexels.com/photos/5245865/pexels-photo-5245865.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
			title: "1"
		},
		{
			url: "https://images.pexels.com/photos/66997/pexels-photo-66997.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
			title: "1"
		},
		{
			url: "https://images.pexels.com/photos/36744/agriculture-arable-clouds-countryside.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
			title: "1"
		},
		{
			url: "https://images.pexels.com/photos/5245865/pexels-photo-5245865.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
			title: "1"
		},
		{
			url: "https://images.pexels.com/photos/462030/pexels-photo-462030.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
			title: "1"
		},
		{
			url: "https://images.pexels.com/photos/1237119/pexels-photo-1237119.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
			title: "1"
		}
	] // 数据
	let swiperContainerList = $(".swiper-container") // 获取到页面中所有的轮播图组件  通过这个确定需要多少个轮播图
	let swiperInnerItemStr = "" // 拼接每一个轮播item 的字符串
	let swiperTriggerStr = "" // 轮播图的小点
	let swiperTriggerArr
	let swiperAutoPlayTimer = null
	let swiperAutoPlayTimerDuration = 2000

	/**
	 * 切换方法
	 */
	function play() {
		swiperAutoPlayTimer = setInterval(function () {
			$(swiperContainerList[0]).children(".swiper-arrow-right").click()
		}, swiperAutoPlayTimerDuration)
	}

	/**
	 * 轮播图自动切换
	 */
	function autoPlay() {
		play()
		// 鼠标移入停止轮播
		$(swiperContainerList[0]).on("mouseover", function () {
			clearInterval(swiperAutoPlayTimer)
			swiperAutoPlayTimer = null
		})
		// 鼠标移出开始轮播
		$(swiperContainerList[0]).on("mouseout", function () {
			play()
		})
	}


	/**
	 * j检测页面上所有的轮播图组件，然后插入组件的子项
	 */
	function generateSwiperContainer() {
		swiperContainerList.each(function (i, item) {
			let str = `
			<div class="swiper-inner">
			</div>
			<div class="swiper-arrow-left">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
			     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
			     class="feather feather-chevron-left">
			<polyline points="15 18 9 12 15 6"></polyline>
			</svg>
			</div>
			<div class="swiper-arrow-right">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
			     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
			     class="feather feather-chevron-right">
			<polyline points="9 18 15 12 9 6"></polyline>
			</svg>
			</div>
			<div class="swiper-triggers"></div>	
			`
			$(item).html(str)
		})
		swiperTriggerArr = $(".swiper-triggers")
	}


	/**
	 * 生成轮播的每一个item 会根据传入的轮播图盒子自动搜索下面的swiperInner  然后将生成的内容插入到swiperInner中，插入页面后将swiperInnerItemStr清空
	 * @param swiperContainerItem {HTMLElement} 第几个轮播图父组件
	 * @param swiperList {Array} 轮播图展示的图片
	 */
	function generateSwiperItem(swiperContainerItem, swiperList) {
		let swiperInner
		let swiperItemArr
		let swiperItemLens = 0
		swiperList.forEach((item) => {
			swiperInnerItemStr += `<div class="swiper-inner-item"><a href="javascript:;" title="${item.title}"><img src="${item.url}" alt=""></a></div>`
			swiperTriggerStr += `<span class="swiper-triggers-dot"></span>`
		})
		$(swiperContainerItem).children(".swiper-inner").html(swiperInnerItemStr) // 设置 轮播图的每一个item
		$(swiperContainerItem).children(".swiper-triggers").html(swiperTriggerStr) // 设置 指示器个数
		$(swiperContainerItem).attr("data-currentIndex", 0) //设置每一个轮播图当前显示的是第几章
		swiperInnerItemStr = ""
		swiperTriggerStr = ""
		swiperInner = $(swiperContainerItem).children(".swiper-inner") // 轮播图主要组件
		swiperItemArr = swiperInner.children() //放着每一个item
		swiperItemLens = swiperItemArr.length  //一共几个轮播图item
		swiperInner.css("width", 100 * swiperItemLens + "%") // 设置轮播图的总宽度
		swiperItemArr.each(function (i, item) {
			$(item).css("width", 100 / swiperItemLens + "%")
		})
	}

	/**
	 * 指示器事件添加
	 */
	function addSwiperEvent() {
		swiperTriggerArr.each((i, item) => {
			$(item).on("click", ".swiper-triggers-dot", function () {
				let index = $(this).index()
				let swiperInner = $(this).parents(".swiper-container").children(".swiper-inner")
				let swiperItemLens = swiperInner.children().length
				swiperInner.css("transform", `translateX(-${(100 / swiperItemLens) * index}%)`) //所有图片盒子宽度
				$(this).parents(".swiper-container").attr("data-currentIndex", index)

				setDefaultStyle(this)
			})
			setDefaultStyle($($(item).children()[0]))
			setDefaultStyle($($(item).children()[1]))
		})
		$(".swiper-arrow-left").on("click", function () {
			let index = $(this).parents(".swiper-container").attr("data-currentIndex")
			let swiperInner = $(this).siblings(".swiper-inner")
			let swiperItemLens = swiperInner.children().length
			if (index > 0) {
				index--
				swiperInner.css("transform", `translateX(-${(100 / swiperItemLens) * index}%)`) //所有图片盒子宽度
				$(this).parents(".swiper-container").attr("data-currentIndex", index)
				setDefaultStyle(this)
			} else {
				index = swiperItemLens - 1
				swiperInner.css("transform", `translateX(-${(100 / swiperItemLens) * index}%)`) //所有图片盒子宽度
				$(this).parents(".swiper-container").attr("data-currentIndex", index)
				setDefaultStyle(this)
			}
		})
		$(".swiper-arrow-right").on("click", function () {
			let index = $(this).parents(".swiper-container").attr("data-currentIndex")
			let swiperInner = $(this).siblings(".swiper-inner")
			let swiperItemLens = swiperInner.children().length
			if (index < swiperItemLens - 1) {
				index++
				swiperInner.css("transform", `translateX(-${(100 / swiperItemLens) * index}%)`) //所有图片盒子宽度
				$(this).parents(".swiper-container").attr("data-currentIndex", index)
				setDefaultStyle(this)
			} else {
				index = 0
				swiperInner.css("transform", `translateX(-${(100 / swiperItemLens) * index}%)`) //所有图片盒子宽度
				$(this).parents(".swiper-container").attr("data-currentIndex", index)
				setDefaultStyle(this)
			}
		})
	}

	/**
	 * 设置默认样式
	 * @param _this {any} 当前被操作的对象
	 */
	function setDefaultStyle(_this) {
		let index = $(_this).parents(".swiper-container").attr("data-currentIndex")
		let dot = $(_this).parents(".swiper-container").children(".swiper-triggers").children()
		$(dot[index]).addClass("swiper-active").siblings().removeClass("swiper-active")
	}

	/**
	 * 初始化页面时候需要初始化内容都方到这里  在页面进入的时候会自动执行
	 */
	function init() {
		generateSwiperContainer()
		generateSwiperItem($(swiperContainerList[0]), swiperList)
		generateSwiperItem($(swiperContainerList[1]), swiperList1)
		generateSwiperItem($(swiperContainerList[2]), swiperList2)
		generateSwiperItem($(swiperContainerList[3]), swiperList3)
		generateSwiperItem($(swiperContainerList[4]), swiperList)
		generateSwiperItem($(swiperContainerList[5]), swiperList)
		addSwiperEvent()
		autoPlay()
	}

	init()
})
