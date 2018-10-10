window.onload = function(){
	posts.init();
	catsAndTags.init();
	search.init();
};

// categories and tags
let catsAndTags = {
	cats: document.getElementById('categories'),
	tags: document.getElementById('tags'),
	pipe: document.getElementById('pipe'),
	tree: {}, // categories and tags tree
	init(){
		this.generateTree();
		this.displayCategories();
		this.addEvent();
	},
	generateTree(){
		let tree = this.tree;
		let infos = posts.infos;
		infos.forEach(function (postInfo) {
			let category = postInfo.cats[0];
			if (!(category in tree)) {
				tree[category] = [];
			}
			postInfo.tags.forEach(function (tag) {
				Util.addIntoArr(tag, tree[category]);
			});
		});
	},
	displayCategories(){
		// display all categories
		let tree = this.tree;
		let innerHTML = '';
		for (let category in tree) {
			innerHTML += '<span>' + category + '</span>';
		}
		this.cats.innerHTML = innerHTML;
	},
	displayTags(category) {
		// display all tags belong to specified category
		let tags = this.tags;
		if (category) {
			let innerHTML = '';
			category.forEach(function (tag) {
				innerHTML += '<span>' + tag + '</span>';
			});
			tags.innerHTML = innerHTML;
		} else {
			// if no category specified, nothing will be displayed
			tags.innerHTML = '';
		}
	},
	connectByPipe(categorySpan) {
		let span = categorySpan;
		let left = span.offsetLeft,
		top = span.offsetTop,
		width = span.clientWidth,
		height = this.cats.clientHeight - top;
		this.setPipe(left, top, width, height);
	},
	setPipe(left, top, width, height) {
		let p = this.pipe;
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
	},
	addEvent(){
		let self = this;
		this.cats.addEventListener('click', function (event) {
			let cats = self.cats,
				tree = self.tree;
			let target = event.target;
			if (target.nodeName.toLowerCase() === 'span') {
				// 当点击的是某个代表分类的span标签时
				if (Util.hasClass(target, 'selected')) {
					// 取消当前分类被选中状态（这使得所有分类都未被选中）
					Util.removeClass(target, 'selected');
					self.setPipe();
					self.displayTags();
				} else {
					// 让当前分类切换为选中状态
					let currentSelected = cats.getElementsByClassName('selected')[0];
					if (currentSelected) {
						Util.removeClass(currentSelected, 'selected');
					}
					// 将这个被点击的分类设为选中
					Util.addClass(target, 'selected');
					self.connectByPipe(target);
					self.displayTags(tree[target.innerHTML.trim()]);
				}
				let cond = self.getFilterCondition();
				posts.filterPosts(cond);
				posts.refreshPosts();
			}
		}),
		this.tags.addEventListener('click', function (event) {
			let target = event.target;
			let tags = self.tags;
			if (target.nodeName.toLowerCase() === 'span') {
				if(Util.hasClass(target, 'selected')){
					Util.removeClass(target, 'selected');
				}else{
					let currentSelected = tags.getElementsByClassName('selected')[0];
					if(currentSelected){
						Util.removeClass(currentSelected, 'selected');
					}
					Util.addClass(target, 'selected');
				}
				let cond = self.getFilterCondition();
				posts.filterPosts(cond);
				posts.refreshPosts();
			}
		});
	},
	getFilterCondition(){
		let filterConditon = {
			cats: [],
			tags: []
		};
		let catsNode = catsAndTags.cats;
		let tagsNode = catsAndTags.tags;

		let selectedCategory = catsNode.getElementsByClassName('selected')[0];
		if (selectedCategory) {
			filterConditon.cats.push(selectedCategory.innerHTML.trim());
			let selectedTags = tagsNode.getElementsByClassName('selected');
			let len = selectedTags.length;
			if (len > 0) {
				for (let i = 0; i < len; i++) {
					filterConditon.tags.push(selectedTags[i].innerHTML.trim());
				}
			}
		}
		return filterConditon;
	}
};

// posts infomation and operation
let posts = {
	infos: [],
	init() {
		// get all post reference and datas binded on the list item
		// modify the date in the li>span
		let listItems = document.getElementById('aticleList').childNodes,
			// posts = [],
			temp = [];
		for (let i = 0, len = listItems.length; i < len; i++) {
			//filter to get all the 'li' element
			if (listItems[i].nodeType === 1) {
				temp.push(listItems[i]);
			}
		}
		listItems = temp;
		for (let i = 0, len = listItems.length; i < len; i++) {
			//get posts' data from list items
			let post = listItems[i];
			let postInfo = {
				node: post,
				isShow: true,
				title: post.getAttribute('data-title'),
				date: post.getAttribute('data-date').split(' ')[0],
				url: post.getAttribute('data-url'),
				tags: post.getAttribute('data-tags').trim().split(',').map(function (item) {
					return item.trim();
				}).filter(function (item) {
					return !!item;
				}),
				cats: post.getAttribute('data-categories').split(',').map(function (item) {
					return item.trim();
				})
			};
			this.infos.push(postInfo);
		}
		this.infos.forEach(function (postInfo) {
			// modify the date shown in the span
			postInfo.node.getElementsByTagName('span')[0].innerHTML = postInfo.date;
		});
	},
	filterPosts(filterConditon) {
		// if no request for  categories or tags, pass an empty array []
		this.infos.forEach(function (postInfo) {
			if (Util.ifContain(postInfo.cats, filterConditon.cats) &&
				Util.ifContain(postInfo.tags, filterConditon.tags)) {
				postInfo.isShow = true;
			} else {
				postInfo.isShow = false;
			}
		});
	},
	refreshPosts() {
		this.infos.forEach(function (postInfo) {
			if (postInfo.isShow === true) {
				Util.removeClass(postInfo.node, 'hidden');
			} else {
				Util.addClass(postInfo.node, 'hidden');
			}
		});
	},
	searchPosts(searchStr){
		// if no request for searchStr, pass an empty string ''
		this.infos.forEach(function (postInfo) {
			if(postInfo.isShow === true){
				if (postInfo.title.indexOf(searchStr) >= 0) {
					postInfo.isShow = true;
				} else {
					postInfo.isShow = false;
				}
			}
		});
		this.refreshPosts();
	}
};

let Util = {
	ifContain(containerArr, demandArr) {
		// test if any item in demandArr is contained in containerArr
		return demandArr.length === 0 ||
			demandArr.some(function (item) {
				return containerArr.indexOf(item) >= 0;
			});
	},
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

// search input and button
let search = {
	input: document.getElementById('searchInput'),
	confirm: document.getElementById('searchConfirm'),
	init(){
		this.addEvent();
	},
	addEvent(){
		let self = this;
		this.input.onkeyup = function (event) {
			if (event.keyCode === 13) {
				var searchStr = this.value.trim();
				if (!!searchStr) {
					posts.searchPosts(searchStr);
				}
			}
		};
		this.confirm.onclick = function (event) {
			var searchStr = self.input.value.trim();
			if (!!searchStr) {
				posts.searchPosts(searchStr);
			}
		};
	}
};
