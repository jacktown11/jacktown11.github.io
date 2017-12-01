window.onload = function(){
	init();
};

function init(){
	var	posts = initPosts();
	addTagsAndCats(posts);
	addEvents(posts);
}

function initPosts(){
	// get all post reference and datas binded on the list item
	// modify the date in the li>span
	var listItems = document.getElementById('aticle-list').childNodes,
		posts = [],
		temp = [];
	for(var i = 0, len = listItems.length; i < len; i++){
		//filter to get all the 'li' element
		if(listItems[i].nodeType === 1){
			temp.push(listItems[i]);
		}
	}
	listItems = temp;
	for(var i = 0, len = listItems.length; i < len; i++){
		//get posts' data from list items
		var post = listItems[i],
			postInfo = {};
		postInfo = {
			node: post,
			isShow: true,
			title: post.getAttribute('data-title'),
			date: post.getAttribute('data-date').split(' ')[0],
			url: post.getAttribute('data-url'),
			tags: post.getAttribute('data-tags').split('and').map(function(item,index,array){
				return item.trim();
			}),
			categories: post.getAttribute('data-categories').split('and').map(function(item,index,array){
				return item.trim();
			})
		};
		posts.push(postInfo);
	}
	posts.forEach(function(item, index, arr){
		// modify the date shown in the span
		item.node.getElementsByTagName('span')[0].innerHTML = item.date;
	});

	return posts;
}

function addTagsAndCats(posts){
	var tags = [],
		cats = [],
		tagsParentNode = document.getElementById('tags'),
		catsParentNode = document.getElementById('categories');
	posts.forEach(function(post,index,arr){
		//get all the tags and categories
		post.tags.forEach(function(tag,index,arr){
			if(tags.indexOf(tag) < 0 && tag !== ''){
				tags.push(tag);
			}			
		})
		post.categories.forEach(function(cat,index,arr){
			if(cats.indexOf(cat) < 0 && cat !== ''){
				cats.push(cat);
			}			
		})
	});

	// add tags and categories span element to dom
	if(tags.length >= 1){
		tagsParentNode.innerHTML +='<span>' + tags.join('</span><span>') + '</span>';	
	}
	if(cats.length >= 1){
		catsParentNode.innerHTML += '<span>'+  cats.join('</span><span>') +'</span>';
	}
}

function addEvents(posts){
	var tagNodes = document.getElementById('tags').getElementsByTagName('span'),
		catNodes = document.getElementById('categories').getElementsByTagName('span'),
		input = document.getElementById('search-input'),
		inputConfirm = document.getElementById('search-confirm');
	//when a tag or category is click, filter the posts
	for(var i = 0, len = tagNodes.length; i < len; i++){
		tagNodes[i].onclick = function(){
			toggleClass(this,'down');
			var cond = getFilterConditions();
			filterPosts(posts,cond.categories,cond.tags);
			displayPosts(posts);
		};
	}
	for(var i = 0, len = catNodes.length; i < len; i++){
		catNodes[i].onclick = function(){
			var isDown = this.className.indexOf('down') >= 0;
			removeSelectedCategories();
			if(!isDown){
				addClass(this,'down');			
			}
			var cond = getFilterConditions();
			filterPosts(posts,cond.categories,cond.tags);
			displayPosts(posts);
		};
	}

	//when finish search input, search for posts
	input.onkeyup = function(event){
		if(event.keyCode === 13){
			var searchStr = this.value.trim();
			if(!!searchStr){
				removeSelectedTags();
				removeSelectedCategories();
				searchPosts(posts,searchStr);
				displayPosts(posts);
			}
		}		
	}
	input.oninput = function(event){
		if(!this.value){
			removeSelectedTags();
			removeSelectedCategories();

			var cond = getFilterConditions();
			filterPosts(posts,cond.categories,cond.tags);
			displayPosts(posts);
		}
	}
	inputConfirm.onclick = function(event){
		var searchStr = input.value.trim();
		if(!!searchStr){
			removeSelectedTags();
			removeSelectedCategories();

			searchPosts(posts,searchStr);
			displayPosts(posts);
		}
	}
}

function getFilterConditions(){
	var filterConditon = {
		categories: [],
		tags: []
	};

	var tagNodes = document.getElementById('tags').getElementsByTagName('span'),
		categoryNodes = document.getElementById('categories').getElementsByTagName('span');
	for(var i = 0,len = tagNodes.length; i < len; i++){
		if(tagNodes[i].className.indexOf('down') >= 0){
			filterConditon.tags.push(tagNodes[i].innerHTML.trim());
		}		
	}
	for(var i = 0,len = categoryNodes.length; i < len; i++){
		if(categoryNodes[i].className.indexOf('down') >= 0){
			filterConditon.categories.push(categoryNodes[i].innerHTML.trim());
		}		
	}

	return filterConditon;
}

function removeSelectedTags(){
	var tagNodes = document.getElementById('tags').getElementsByTagName('span');
	for(var i = 0, len = tagNodes.length; i<len; i++){
		removeClass(tagNodes[i],'down');
	}
}

function removeSelectedCategories(){
	var categoryNodes = document.getElementById('categories').getElementsByTagName('span');
	
	for(var i = 0, len = categoryNodes.length; i<len; i++){
		removeClass(categoryNodes[i],'down');
	}
}

function filterPosts(posts,filterCategories,filterTags){
	// if no request for  categories or tags, pass an empty array []
	posts.forEach(function(post,index,arr){
		if(ifContain(post.categories, filterCategories) && 
			ifContain(post.tags, filterTags)){
			post.isShow = true;
		}else{
			post.isShow = false;
		}		
	});
}

function searchPosts(posts,searchStr){
	// if no request for searchStr, pass an empty string ''
	posts.forEach(function(post,index,arr){
		if(post.title.indexOf(searchStr) >= 0){
			post.isShow = true;
		}else{
			post.isShow = false;
		}		
	});
}

function displayPosts(posts){
	posts.forEach(function(post,index,arr){
		if(post.isShow === true){
			removeClass(post.node,'hidden');
		}else{
			addClass(post.node,'hidden');
		}
	});
}

function ifContain(containerArr, demandArr){
	// test if any item in demandArr is contained in containerArr
	return demandArr.every(function(item,index,arr){
		if(containerArr.indexOf(item) < 0){
			return false;
		}else{
			return true;
		}
	});
}

function addClass(el,className){
	if(el.className.indexOf(className) < 0){
		el.className = el.className.trim() + ' ' + className;
	}
}

function removeClass(el,className){
	while(el.className.indexOf(className) >= 0){
		el.className = el.className.replace(className,'');
	}
}

function toggleClass(el,className){
	if(el.className.indexOf(className) >= 0){
		removeClass(el,className);
	}else{
		addClass(el,className);
	}
}