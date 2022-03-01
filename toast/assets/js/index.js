var _messageDuration
var _messageTimer = null
var _messageEl = $('	<div class="x-message-wrapper">' +
	'		<div class="x-message-container">' +
	'			<i class="x-message-icon x-message-icon-success"></i>' +
	'			<i class="x-message-icon x-message-icon-error"></i>' +
	'			<i class="x-message-icon x-message-icon-warning"></i>' +
	'			<i class="x-message-icon x-message-icon-info"></i>' +
	'			<p class="x-message-txt">12312</p>' +
	'			<i class="x-message-close-btn">X</i>' +
	'		</div>' +
	'	</div>'
)
_messageEl.css("top", 65).hide()

$(function () {
	$(".button-btn").on('click', commonUtils.throttle(click, 200))

	function click() {
		message({
			message: "我是消息",
			type: "error",
			duration: 4000
		})
	}

})

window.message = function (opts) {
	_messageDuration = opts.duration || 2000
	if (_messageTimer) {
		clearTimeout(_messageTimer)
		_messageTimer = null
	}
	var messageWrapEl = $(".x-message-wrapper")
	if (messageWrapEl.length > 0) {
		messageWrapEl.stop().animate({
			top: 100, opacity: "hide"
		}, 200, "linear", function () {
			messageWrapEl.remove()
		})
	}
	var _messageEl = $('	<div class="x-message-wrapper">' +
		'		<div class="x-message-container  x-message-container-' + opts.type + '">' +
		'			<i class="x-message-icon x-message-icon-' + opts.type + '"></i>' +
		'			<p class="x-message-txt">' + opts.message + '</p>' +
		'			<i class="x-message-close-btn x-message-btn-' + opts.type + '">\n' +
		'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></i>' +
		'		</div>' +
		'	</div>'
	)
	//添加到页面并且显示出来
	_messageEl.hide().appendTo("body").animate({
		top: 65, opacity: "show"
	})

	messageCloseBtnClick()
	// 时间到了删除元素
	_messageTimer = setTimeout(function () {
		clearTimeout(_messageTimer)
		_messageTimer = null
		_messageEl.stop().animate({
			top: 100, opacity: "hide"
		}, 200, "linear", function () {
			_messageEl.remove()
		})
	}, _messageDuration)

	/**
	 * 消息提示关闭按钮被点击
	 */
	function messageCloseBtnClick() {
		$(".x-message-close-btn").off().on("click", function () {
			_messageEl.stop().animate({
				top: 100, opacity: "hide"
			}, 200, "linear")
		})
	}
}