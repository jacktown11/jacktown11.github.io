window.onload = function(){
	generateCatalog();
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
	catComplete.className = "simple catalog inset close";

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
		p.className += 'outset';
		catComplete.insertBefore(p,catComplete.firstChild);
		p.onclick = function(){
			if(catComplete.className.indexOf('close') >= 0){
				console.log('have');
				catComplete.className = catComplete.className.replace(/close/g,'');
			}else{
				console.log('no');
				catComplete.className += catComplete.className.trim() + ' close';
			}
		}
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