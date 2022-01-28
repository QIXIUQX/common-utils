$(function () {
	let swiperList = [
		{
			title: "1",
			url: "https://hddesktopwallpapers.in/wp-content/uploads/2015/09/glacier-wallpaper-snow.jpg"
		},
		{
			title: "1",
			url: "https://hddesktopwallpapers.in/wp-content/uploads/2015/09/waterfall-wallpaper-for-mobile.jpg"
		},
		{
			title: "1",
			url: "https://hddesktopwallpapers.in/wp-content/uploads/2015/09/flora-and-fauna.jpg"
		},
		{
			title: "1",
			url: "https://hddesktopwallpapers.in/wp-content/uploads/2015/06/Red-Roses-Wallpapers-HD-A7-680x425.jpg"
		}
	] // 服务器请求过来的数据
	let pointer = $(".pointer")  // 指示器
	let pointerStr = ""  //插入的指示器个数字符串
	let currentIndex = 0  //当前播放的轮播图
	let prev = $(".prev") //上一页
	let next = $(".next")// 下一页
	let swiperContainer = $(".x-swiper")  // 轮播图组件的父盒子
	let swiperInner = $(".x-swiper-inner")  //存放每一个轮播图的子盒子
	let swiperItemLens = null   //轮播图个数
	let swiperItem =null //用于给 每一个轮播图设置宽度，
	let swiperAutoPlayDuration = 1000 // 自动播放延迟
	let swiperAutoPlayTimer = null // 自动播放定时器
	let swiperInnerStr = ''   //  轮播图内容字符串

	/**
	 * 设置每一个item内容
	 */
	function generateSwiperInner() {
		swiperList.forEach((item) => {
			swiperInnerStr += `<div class="x-swiper-item" title="${item.title}"><a href=""><img src="${item.url}" alt=""></a></div>`
		})
		swiperInner.html(swiperInnerStr)
		swiperInnerStr = ""
		swiperItem = $(".x-swiper-item")
		swiperItemLens = swiperList.length  // 轮播图的图片个数
		swiperInner.css("width", 100 * swiperItemLens + '%') //所有图片盒子宽度
		swiperItem.css("width", (100 /swiperItemLens)  + '%')
	}

	/**
	 * 添加鼠标移入移除问题
	 */
	function addMouseOUtOrMouseoverEvent() {
		swiperContainer.on("mouseover", function () {
			clearInterval(swiperAutoPlayTimer)
			swiperAutoPlayTimer = null
		})
		swiperContainer.on("mouseout", function () {
			autoPlaySlider()
		})
	}


	function autoPlaySlider() {
		swiperAutoPlayTimer = setInterval(function () {
			next.click()
		}, swiperAutoPlayDuration)
	}

	/**
	 * 下一页被点击
	 */
	next.on("click", function () {
		if (currentIndex >= swiperItemLens-1) {
			currentIndex = 0
		} else {
			currentIndex++
		}
		swiperInner.css("transform", `translateX(-${(100 /swiperItemLens) * currentIndex}%)`) //所有图片盒子宽度
		setCurrentIndexStyle()
	})

	/**
	 * 上一页被点击
	 */
	prev.on("click", function () {
		if (currentIndex <= 0) {
			currentIndex = swiperItemLens-1
		} else {
			currentIndex--
		}
		swiperInner.css("transform", `translateX(-${(100 /swiperItemLens) * currentIndex}%)`) //所有图片盒子宽度
		setCurrentIndexStyle()
	})

	/**
	 * 渲染轮播图指示器
	 */
	function renderPointer() {
		for (let i = 0; i <= swiperItemLens-1; i++) {
			pointerStr += "<a href=\"javascript:;\"></a>"
		}
		pointer.html(pointerStr)

	}

	/**
	 * 设置活跃的轮播图 指示器
	 */
	function setCurrentIndexStyle() {
		pointer.children().eq(currentIndex).addClass('active').siblings().removeClass('active')
	}

	/**
	 * 渲染轮播图指示器被点击时候的动作
	 */
	function pointerItemClick() {
		pointer.children().on("click", function () {
			currentIndex = $(this).index()
			console.log(currentIndex)
			swiperInner.css("transform", `translateX(-${(100 /swiperItemLens) * currentIndex}%)`) //所有图片盒子宽度
			setCurrentIndexStyle()
		})
	}

	/**
	 * 初始化时候调用
	 */
	function init() {
		generateSwiperInner()
		renderPointer()
		setCurrentIndexStyle()
		addMouseOUtOrMouseoverEvent()
		pointerItemClick()
		autoPlaySlider()
	}

	init()

})