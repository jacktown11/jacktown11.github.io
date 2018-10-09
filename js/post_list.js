window.onload = function(){
	init();
};

function init(){
	let	posts = initPosts();
	posts.cats = genCategoryTree(posts);
	displayCategories(posts.cats);
	addEvents(posts);
}

let Util = {
	addIntoArr(item, arr){
		if(arr.indexOf(item) < 0){
			arr.push(item);
		}
	},
	removeClass(ele, className) {
		let cls = ele.className.split(/\s+/);
		let pos;
		while ((pos = cls.indexOf(className)) > -1) {
			cls.splice(pos, 1);
		}
		ele.className = cls.join(' ');
	},
	addClass(ele, className) {
		let cls = ele.className.split(/\s+/);
		let pos;
		if ((pos = cls.indexOf(className)) < 0) {
			cls.push(className);
		}
		ele.className = cls.join(' ');
	},
	hasClass(ele, className) {
		let cls = ele.className.split(/\s+/);
		return cls.indexOf(className) > -1;
	},
	toggleClass(ele, className) {
		if (this.hasClass(ele, className)) {
			this.removeClass(ele, className);
		} else {
			this.addClass(ele, className);
		}
	}
};
let nodes = {
	pipe: document.getElementById('pipe'),
	categories: document.getElementById('categories'),
	tags: document.getElementById('tags')
};
function initPosts(){
	// get all post reference and datas binded on the list item
	// modify the date in the li>span
	var listItems = document.getElementById('aticleList').childNodes,
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
			tags: post.getAttribute('data-tags').trim().split(',').map(function(item){
				return item.trim();
			}).filter(function(item){
				return !!item;
			}),
			categories: post.getAttribute('data-categories').split(',').map(function(item){
				return item.trim();
			})
		};
		posts.push(postInfo);
	}
	posts.forEach(function(item){
		// modify the date shown in the span
		item.node.getElementsByTagName('span')[0].innerHTML = item.date;
	});

	return posts;
}
function genCategoryTree(posts){
	// get category and tag tree
	let cats = {};
	posts.forEach(function(postInfo){
		let category = postInfo.categories[0];
		if(!(category in cats)){
			cats[category] = [];
		}
		postInfo.tags.forEach(function(tag){
			Util.addIntoArr(tag, cats[category]);
		});
	});
	return cats;
}

// 显示所有的分类
function displayCategories(cats){
	let categories = nodes.categories;
	let innerHTML = '';
	for(let category in cats){
		innerHTML += '<span>' + category + '</span>';
	}
	nodes.categories.innerHTML = innerHTML;
}

// 显示某一分类下的所有标签
function displayTags(category){
	let tags = nodes.tags;
	if(category){
		let innerHTML = '';
		category.forEach(function(tag){
			innerHTML += '<span>' + tag + '</span>';
		});
		tags.innerHTML = innerHTML;
	}else{
		tags.innerHTML = '';
	}
}

function addEvents(posts){
	var tagNodes = document.getElementById('tags').getElementsByTagName('span'),
		catNodes = document.getElementById('categories').getElementsByTagName('span'),
		input = document.getElementById('searchInput'),
		inputConfirm = document.getElementById('searchConfirm');
	//when a tag or category is click, filter the posts
	for(var i = 0, len = tagNodes.length; i < len; i++){
		tagNodes[i].onclick = function(){
			toggleClass(this,'down');
			var cond = getFilterCondition();
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
			var cond = getFilterCondition();
			filterPosts(posts,cond.categories,cond.tags);
			displayPosts(posts);
		};
	}

	nodes.categories.addEventListener('click', function (event) {
		let target = event.target;
		if (target.nodeName.toLowerCase() === 'span') {
			// 当点击的是某个代表分类的span标签时
			if (Util.hasClass(target, 'selected')) {
				// 取消当前分类被选中状态（这使得所有分类都未被选中）
				Util.removeClass(target, 'selected');
				setPipe();
				displayTags();
			} else {
				// 让当前分类切换为选中状态
				let currentSelected = nodes.categories.getElementsByClassName('selected')[0];
				if (currentSelected) {
					Util.removeClass(currentSelected, 'selected');
				}
				// 将这个被点击的分类设为选中
				Util.addClass(target, 'selected');
				connectByPipe(target);
				displayTags(posts.cats[target.innerHTML.trim()]);
			}
			let cond = getFilterCondition();
			filterPosts(posts, cond.categories, cond.tags);
			displayPosts(posts);
		}
	});

	nodes.tags.addEventListener('click', function(event){
		let target = event.target;
		if(target.nodeName.toLowerCase() === 'span'){
			Util.toggleClass(target, 'selected');
		}
		let cond = getFilterCondition();
		filterPosts(posts, cond.categories, cond.tags);
		displayPosts(posts);
	});
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
	};
	input.oninput = function(event){
		if(!this.value){
			removeSelectedTags();
			removeSelectedCategories();

			var cond = getFilterCondition();
			filterPosts(posts,cond.categories,cond.tags);
			displayPosts(posts);
		}
	};
	inputConfirm.onclick = function(event){
		var searchStr = input.value.trim();
		if(!!searchStr){
			removeSelectedTags();
			removeSelectedCategories();

			searchPosts(posts,searchStr);
			displayPosts(posts);
		}
	};
}
function connectByPipe(categorySpan) {
	let span = categorySpan;
	let left = span.offsetLeft,
		top = span.offsetTop,
		width = span.clientWidth,
		height = nodes.categories.clientHeight - top;
	setPipe(left, top, width, height);
}
function setPipe(left, top, width, height) {
	let p = nodes.pipe;
	if (left !== undefined) {
		p.style.left = left + 'px';
		p.style.top = top + 'px';
		p.style.width = width + 'px';
		p.style.height = height + 'px';
		p.style.display = 'block';
	} else {
		// 不带参数时，隐藏连接块
		p.style.display = 'none';
	}
}
function getFilterCondition(){
	let filterConditon = {
		categories: [],
		tags: []
	};
	let categories = nodes.categories;
	let tags = nodes.tags;

	let selectedCategory = categories.getElementsByClassName('selected')[0];
	if(selectedCategory){
		filterConditon.categories.push(selectedCategory.innerHTML.trim());
		let selectedTags = tags.getElementsByClassName('selected');
		let len = selectedTags.length;
		if(len > 0){
			for(let i = 0; i <len; i++){
				filterConditon.tags.push(selectedTags[i].innerHTML.trim());
			}
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

function filterPosts(posts, filterCategories, filterTags){
	// if no request for  categories or tags, pass an empty array []
	posts.forEach(function(post){
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
	posts.forEach(function(post){
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
	return demandArr.length === 0 || 
		demandArr.some(function(item){
			return containerArr.indexOf(item) >= 0;
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