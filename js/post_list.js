window.onload = function(){
	deletePcClass();
	setClick();
};


function setClick(){
	var sort = document.getElementById("sort");
	var dateBtn = document.getElementById("date"),
		nameBtn = document.getElementById("name"),
		input = sort.getElementsByTagName("input")[0],
		searchBtn = document.getElementById("search"),
		triangle = document.getElementById("category").getElementsByTagName("button")[0],
		catList = document.getElementById("category").getElementsByTagName("ul")[0],

		ul = document.getElementsByTagName("ul")[0],
		lis = ul.getElementsByTagName("li");
		liArr = Array.prototype.slice.call(lis,0);

	dateBtn.onclick = function(){
		reorderList(ul,liArr,"date");
	};
	nameBtn.onclick = function(){
		reorderList(ul,liArr,"name");
	};

	searchBtn.onclick = function(){
		var searchStr = input.value.trim();
		if(searchStr){
			search(ul,liArr,searchStr);		
		}
	};
	triangle.onclick = function(){
		var triCls= triangle.className,
			ulCls = catList.className;
		if(triCls.indexOf("active") >= 0){
			//当前分类列表处于开启状态
			triangle.className = triCls.replace(/active/g,"");
			catList.className = ulCls.replace(/active/g,"");
		}else{
			//当前分类列表处于关闭状态
			triangle.className += " active";
			catList.className += " active";
		}
	};

}

function reorderList(ul,liArr,type){
	var ulPa = ul.parentNode;
	ul = ulPa.removeChild(ul);
	while(ul.firstChild !== null){
		ul.removeChild(ul.firstChild);
	}
	switch(type){
		case "date":
			liArr.sort(dateSort);
			break;
		case "name":
			liArr.sort(nameSort);
			break;
	}
	for(var i = 0; i < liArr.length; i++){
		ul.appendChild(liArr[i]);
	}
	ulPa.appendChild(ul);
}

function search(ul,liArr,searchStr){
	//remove ul from the document, and clean its content
	var ulPa = ul.parentNode;
	ul = ulPa.removeChild(ul);
	while(ul.firstChild !== null){
		ul.removeChild(ul.firstChild);
	}
	//add the li containing searchStr to the ul
	for(var i = 0; i < liArr.length; i++){
		var text = liArr[i].getElementsByTagName("a")[0].firstChild;
		if(text.nodeValue.indexOf(searchStr) >= 0){
			ul.appendChild(liArr[i]);
		}
	}
	ulPa.appendChild(ul);
}

function dateSort(li1,li2){
	var result = (li1.nodeType === 1 && li2.nodeType === 1) 
		? (Date.parse(li2.getAttribute("data-date")) 
			- Date.parse(li1.getAttribute("data-date"))) 
		: 0;
	return result; 
}

function nameSort(li1,li2){
	var text1 = li1.getElementsByTagName("a")[0].title,
		text2 = li2.getElementsByTagName("a")[0].title;
	return text1.localeCompare(text2);
}
