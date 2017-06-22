window.onload = function(){
	setClick();
};

function setClick(){
	var sort = document.getElementById("sort");
	var dateBtn = document.getElementById("date"),
		nameBtn = document.getElementById("name"),
		input = sort.getElementsByTagName("input")[0],
		searchBtn = document.getElementById("search"),
		ul = document.getElementsByTagName("ul")[0],
		lis = ul.getElementsByTagName("li");

	var ulStr = new Array(),
		dateOrder = new Array();
	var i = 0;
	for(;i<lis.length;i++){
		dateOrder[i] = i+1;
		var span = lis[i].getElementsByTagName("span")[0]; 
		var anchor = lis[i].getElementsByTagName("a")[0]; 
		ulStr[3*dateOrder[i] - 3] = span.firstChild.nodeValue;
		ulStr[3*dateOrder[i] - 2] = anchor.firstChild.nodeValue;
		ulStr[3*dateOrder[i] - 1] = anchor.href;
	}
	
	dateBtn.onclick = function(){
		reorderList(ul,ulStr,dateOrder);
	};
	nameBtn.onclick = function(){
		reorderList(ul,ulStr,getOrderByName(ulStr));
	};

	searchBtn.onclick = function(){
		var searchStr = input.value;
		if(searchStr){
			selectList(ul,ulStr,getRelatedOrder(ulStr,searchStr));		
		}
	};
}

function reorderList(ul,ulStr,order){
	var i = 0;
	var str = "";
	var lis = ul.getElementsByTagName("li");
	for(;i<lis.length;i++){
		lis[i].style.display = "block";
		if(i < order.length){
			var span = lis[i].getElementsByTagName("span")[0]; 
			var anchor = lis[i].getElementsByTagName("a")[0]; 
			span.firstChild.nodeValue = ulStr[3*order[i] - 3];
			anchor.firstChild.nodeValue = ulStr[3*order[i] - 2];
			anchor.href = ulStr[3*order[i] - 1];
		}
	}
}

function selectList(ul,ulStr,order){
	reorderList(ul,ulStr,order);
	var len = order.length;
	var lastLi = ul.getElementsByTagName("li")[len-1];
	var after = lastLi.nextSibling;
	while(after !== null){
		if(after.nodeName.toLowerCase() === "li"){
			after.style.display = "none";
		}

		after = after.nextSibling;
	}
}

function getOrderByName(ulStr){
	var order = new Array();
	for(var i = 0; i < ulStr.length/3;i++){
		order[i] = i+1;
	}
	order.sort(function(key1,key2){
		return ulStr[3*key1-2].localeCompare(ulStr[3*key2-2]);
	});
	return order;
}

function getRelatedOrder(ulStr,searchStr){
	var order = new Array();
	var i = 0,j = 0;
	for(;i<ulStr.length/3;i++){
		if(ulStr[3*i+1].indexOf(searchStr) >= 0){
			order[j++] = i+1;
		}
	}
	return order;
}