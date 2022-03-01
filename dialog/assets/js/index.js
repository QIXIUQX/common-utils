$(function () {
	$(".x-dialog-close-btn").on("click", function () {
		$(this).parents(".x-dialog-mask").hide();
	})
})