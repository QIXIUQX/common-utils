let navMenuList = {
	defaultActive: 0,
	list: [
		{
			title: "搜索引擎",
			childrenList: [
				{
					title: "百度",
					url: "www.baidu.com"
				},
				{
					title: "必应",
					url: "cn.bing.com"
				}
			]
		},
		{
			title: "邮箱",
			childrenList: [
				{
					title: "网易163",
					url: "mail.163.com"
				},
				{
					title: "网易126",
					url: "mail.126.com"
				},
				{
					title: "网易163",
					url: "mail.163.com"
				},
				{
					title: "网易126",
					url: "mail.126.com"
				},
				{
					title: "网易163",
					url: "mail.163.com"
				},
				{
					title: "网易126",
					url: "mail.126.com"
				},
				{
					title: "网易163",
					url: "mail.163.com"
				},
				{
					title: "网易126",
					url: "mail.126.com"
				},
				{
					title: "网易163",
					url: "mail.163.com"
				},
				{
					title: "网易126",
					url: "mail.126.com"
				},
			]
		},
		{
			title: "开发",
			childrenList: [
				{
					title: "代码审核平台",
					url: "https://gitee.com/cookieYe/Yearning"
				},
				{
					title: "开源后台系统",
					url: "https://github.com/funnyzpc/mee-admin"
				}
			]
		},
		{
			title: "字体",
			childrenList: [
				{
					title: "字游",
					url: "weibo"
				},
				{
					title: "DaFang",
					url: ""
				}
			]
		},{
			title: "模板",
			childrenList: [
				{
					title: "AE",
					url: "weibo"
				},
				{
					title: "PR",
					url: ""
				},
				{
					title: "PS",
					url: ""
				}
			]
		}
		,{
			title: "测试内容",
			childrenList: [
				{
					title: "测试内容1",
					url: "weibo"
				},
				{
					title: "测试内容2",
					url: ""
				},
				{
					title: "测试内容3",
					url: ""
				},
				{
					title: "测试内容3",
					url: ""
				},
				{
					title: "测试内容3",
					url: ""
				},
				{
					title: "测试内容3",
					url: ""
				},
				{
					title: "测试内容3",
					url: ""
				},
				{
					title: "测试内容3",
					url: ""
				},
				{
					title: "测试内容3",
					url: ""
				},
				{
					title: "测试内容3",
					url: ""
				},
				{
					title: "测试内容3",
					url: ""
				},
				{
					title: "测试内容3",
					url: ""
				},
				{
					title: "测试内容3",
					url: ""
				},
				{
					title: "测试内容3",
					url: ""
				},
				{
					title: "测试内容3",
					url: ""
				},
				{
					title: "测试内容3",
					url: ""
				},
				{
					title: "测试内容3",
					url: ""
				},
				{
					title: "测试内容3",
					url: ""
				},
				{
					title: "测试内容3",
					url: ""
				}
			]
		}
	]
}
$(function () {
	let menuStr = ""
	let navMenu = $(".nav-menu")
	navMenuList.list.forEach((item, i) => {
		let childMenuStr = generateChildMenu(item.childrenList)
		let active = navMenuList.defaultActive === i ? "nav-menu-active" : ""
		menuStr += `
		<li class="nav-menu-item">
			<div class="menu-title">${item.title}</div>
			<ul class="child-menu ${active}">${childMenuStr}</ul>
		</li>
		`

		function generateChildMenu(childItemArr) {
			let str = ""
			childItemArr.forEach((item) => {
				str += `<li class="child-menu-item">${item.title}</li>`
			})
			return str
		}
	})
	navMenu.html(menuStr)
	navMenu.on("click", ".menu-title", function () {
		let firstMenu = $(this).siblings(".child-menu")
		if (firstMenu.hasClass("nav-menu-active")) {
			firstMenu.removeClass("nav-menu-active").stop().slideUp()
		} else {
			firstMenu.addClass("nav-menu-active").stop().slideDown()
		}
	})
	navMenu.on("click", ".child-menu-item", function () {
		$(this).addClass("nav-chile-item-active").siblings().removeClass("nav-chile-item-active").parents(".nav-menu-item").siblings().find(".child-menu-item").removeClass("nav-chile-item-active")
	})
	navMenu.find(".nav-menu-active").slideDown()
})