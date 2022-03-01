// JavaScript Document
(function (doc, win) {
	var docEl = doc.documentElement, //文档根标签
		resizeEvent = "orientationchange" in window ? "orientationchang" : "resize"; //viewport变化事件源
	var rescale = function () {
		//重置方法
		win.clientWidth = docEl.clientWidth;
		if (!win.clientWidth) return;
		// 改变DOM根节点fontSize大小的值;
		// (屏幕宽度/设计图宽度) = 缩放或扩大的比例值;
		docEl.style.fontSize = 100 * (win.clientWidth / 1920) + "px";
	};
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvent, rescale, false);
	doc.addEventListener("DOMContentLoaded", rescale, false);
})(document, window);
