window.onload = function(){
	deletePcClass();
	generateCatalog();
}

function toggleShow () {
	if(navigator.userAgent.match(/Android/i)
		||navigator.userAgent.match(/webOS/i)
		||navigator.userAgent.match(/iPone/i)
		||navigator.userAgent.match(/iPad/i)
		||navigator.userAgent.match(/iPod/i)
		||navigator.userAgent.match(/BlackBerry/i)
		||navigator.userAgent.match(/Windows Phone/i)
		){
		var classPcs = document.getElementsByClassName("pc");
		var classPc = null;
		while(classPcs[0]){
			classPcs[0].className = classPcs[0].className.replace("pc","");		
		}
		return;
	}
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

function generateCatalog(){
	var post = document.getElementsByClassName("post")[0];
	var hhigh = 0,/*最高标题号*/
		hmid = 0,/*具有两个以上元素的最高标题号*/
		hlow = 0;/*最低标题号*/
	var hIndex = 1
		len = 0;

	/*get hhigh,hmid and hlow*/
	for(;hIndex <= 6; hIndex++){
		if((len = post.getElementsByTagName("h"+hIndex).length)>0){
			if(hhigh === 0){	hhigh = hIndex;	}
			if(hmid === 0 && len >= 2){	hmid = hIndex;	}
			hlow = hIndex;
		}
	}
	if(hmid === 0){
		//at most 1 title in every title rank
		hmid = hhigh;
	}
	if(hlow == 0){
		//no title in this article
		return ;
	}

	/*generate catalog*/
	var catComplete = document.createElement("nav");/*complete catalog element*/
	var postChild = post.firstChild,
		catChild = null;
	catComplete.className = "simple catalog";

	while(postChild !== null){
		/*check the post element's children*/
		var name = postChild.nodeName;
		if(name.length === 2 && name.charAt(0).toLowerCase() === "h" 
			&& Number(name.charAt(1)) >= hhigh && Number(name.charAt(1)) <= hlow){
			/*a title element between rank hhigh and hmid*/
			var clsName = "";
			switch(Number(name.charAt(1))-hhigh){
				case 0:
					clsName = "first";
					break;
				case 1:
					clsName = "second";
					break;
				case 2:
					clsName = "third";
					break;
				case 3:
					clsName = "forth";
					break;
				case 4:
					clsName = "fifth";
					break;
				case 5:
					clsName = "sixth";
					break;
			}
			if(catChild = genTitleLink(clsName,postChild.id,postChild.firstChild.nodeValue)){
				catComplete.appendChild(catChild);
				/*add a new catalog line*/				
			}
		}
		postChild = postChild.nextSibling;
	}
	if(catComplete.firstChild){
		post.insertBefore(catComplete,post.firstChild);	
		var p = document.createElement("p");
		p.appendChild(document.createTextNode("目录"));
		catComplete.insertBefore(p,catComplete.firstChild);
	}

}

function genTitleLink(clsName,href,content){
	/*build a div containing a title link
	the div's class name is clsName,the link content is content, the link's href is #href */
	if(typeof clsName === "string" && typeof href === "string" && typeof content === "string"){
		var divEle = document.createElement("div"),
			aEle = document.createElement("a");
		aEle.appendChild(document.createTextNode(content));
		aEle.href = "#" + href;
		divEle.appendChild(aEle);
		divEle.className = clsName;	
		return divEle;		
	}else{
		return null;
	}
}