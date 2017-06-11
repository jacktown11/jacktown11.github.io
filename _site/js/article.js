window.onload = function(){
	toggleShow();
}

function toggleShow () {
	var fixed1 = document.getElementById('fixed1');
	var fixed2 = document.getElementById('fixed2');
	var homeLink = document.getElementById('home');
	var listLink = document.getElementById('list');
	var topLink = document.getElementById('totop');
	var botLink = document.getElementById('tobot');
	var e,timer1,timer2;

	//进入页面4秒内显示跳转链接，之后隐藏链接
	timer1 = setTimeout(function(){
			homeLink.style.visibility = 'hidden';
			listLink.style.visibility = 'hidden';
	},4000);
	timer2 = setTimeout(function(){
			topLink.style.visibility = 'hidden';
			botLink.style.visibility = 'hidden';		
	},4000);

	//鼠标进入左空白区，显示主页和文章列表链接
	fixed1.onmouseover = function(e){
		clearTimeout(timer1);		
		homeLink.style.visibility = 'visible';
		listLink.style.visibility = 'visible';
	};
	fixed1.onmouseout = function(e){
		if(e.toElement !== homeLink && e.toElement !== listLink){
			clearTimeout(timer1);
			homeLink.style.visibility = 'hidden';
			listLink.style.visibility = 'hidden';		
		}
	};

	//鼠标进入有空白区，显示页面内跳到文章顶部和底部的按钮
	fixed2.onmouseover = function(e){
		clearTimeout(timer2);						
		topLink.style.visibility = 'visible';
		botLink.style.visibility = 'visible';			
	};
	fixed2.onmouseout = function(e){
		if(e.toElement !== topLink && e.toElement !== botLink){	
			clearTimeout(timer2);				
			topLink.style.visibility = 'hidden';
			botLink.style.visibility = 'hidden';		
		}
	};
}