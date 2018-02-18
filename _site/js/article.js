window.onload = function(){
	addCatalog();
	setHandlers();
}
function setHandlers(){
	var doc = document,
		setting = {
			toOpen: {
				str: '折叠目录',
				marginLeft: '25%'
			},
			toClose: {
				str: '展开目录',
				marginLeft: '15%'
			}
		},
		navCtrl = doc.getElementById('nav-toggle'),
		nav = doc.getElementById('catalog-wraper'),
		article = doc.getElementsByClassName('wrap')[0];
	navCtrl.onclick = function(e){
		if(nav.className.indexOf('hidden') !== -1){
			nav.className = '';
			navCtrl.innerHTML = setting.toOpen.str;
			article.style.marginLeft = setting.toOpen.marginLeft;
		}else{
			nav.className += ' hidden';
			navCtrl.innerHTML = setting.toClose.str;
			article.style.marginLeft = setting.toClose.marginLeft;
		}
	};
}
function addCatalog(){
	var catalogWraper = document.getElementById('catalog-wraper');
	catalogWraper.appendChild(generateCatalog());
}

function generateCatalog(){
	var post = document.getElementsByClassName("post")[0];
	var hhigh = 0,/*最高标题号*/
		hmid = 0,/*具有两个以上元素的最高标题号*/
		hlow = 0;/*最低标题号*/
	var hIndex = 1
		len = 0;

	var catComplete = document.createElement("nav");/*complete catalog element*/
	catComplete.className = "catalog";
	// var p = document.createElement("p");
	// p.appendChild(document.createTextNode("目录"));
	// catComplete.appendChild(p);

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
		return catComplete;
	}

	/*generate catalog*/
	var postChild = post.firstChild,
		catChild = null;

	while(postChild !== null){
		/*check the post element's children*/
		var name = postChild.nodeName;
		if(name.length === 2 && name.charAt(0).toLowerCase() === "h" 
			&& Number(name.charAt(1)) >= hhigh && Number(name.charAt(1)) <= hlow){
			/*a title element between rank hhigh and hmid*/
			var clsName = "";
			switch(Number(name.charAt(1))-1){
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

	return catComplete;

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