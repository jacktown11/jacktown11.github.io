window.onload = function(){
	$('li').click(function(){
		loadNew($(this));
	});

	loadNew($('li[data-src="intro.html"]'));
};

function loadNew($ele){
	var $oldEle = $('li.active');
	$oldEle.removeClass('active');
	$oldEle.next().removeClass('down');
	$oldEle.prev().removeClass('up');

	$ele.addClass('active');
	$ele.next().addClass('down');
	$ele.prev().addClass('up');

	$('.content').load($ele.attr('data-src'));
}