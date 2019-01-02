window.onload = function () {
	posts.init();
	catsAndTags.init();
	search.init();
};

// categories and tags
var catsAndTags = {
	filter: {
		SPIT: ',',
		cat: '',
		tags: [],
		setBySessionStorage: function () {
			this.cat = Util.storeGet('cat', '');
			var tagsStr = Util.storeGet('tags', '');
			this.tags = tagsStr ? tagsStr.split(this.SPIT) : [];
		},
		saveToSessionStorage: function () {
			Util.storeSet('cat', this.cat);
			Util.storeSet('tags', this.tags.join(this.SPIT));
		},
		setCat: function (cat) {
			this.cat = cat;
			this.saveToSessionStorage();
		},
		getCat: function () {
			return this.cat;
		},
		isContainTag: function (tag) {
			return this.tags.indexOf(tag) >= 0;
		},
		addTag: function (tag) {
			if (this.tags.indexOf(tag) < 0) {
				this.tags.push(tag);
				this.saveToSessionStorage();
			}
		},
		removeTag: function (tag) {
			var idx = this.tags.indexOf(tag);
			if (idx >= 0) {
				this.tags.splice(idx, 1);
				this.saveToSessionStorage();
			}
		},
		clearTags: function () {
			this.tags = [];
			this.saveToSessionStorage();
		}
	},
	cats: document.getElementById('categories'),
	tags: document.getElementById('tags'),
	pipe: document.getElementById('pipe'),
	tree: {}, // categories and tags tree
	init: function () {
		this.generateTree();
		this.filter.setBySessionStorage();
		this.renderByFilter();
		this.addEvent();
	},
	getFilterCondition: function () {
		return {
			cat: this.filter.cat,
			tags: this.filter.tags.concat()
		};
	},
	generateTree: function () {
		var tree = this.tree;
		var infos = posts.infos;
		infos.forEach(function (postInfo) {
			var category = postInfo.cats[0];
			if (!(category in tree)) {
				tree[category] = [];
			}
			postInfo.tags.forEach(function (tag) {
				Util.addIntoArr(tag, tree[category]);
			});
		});
	},
	renderByFilter: function () {
		this.renderCategories();
		this.renderTags();
		posts.filterPosts(this.getFilterCondition());
		posts.refreshPosts();
	},
	renderCategories: function () {
		var catStr = this.filter.getCat();
		// have been rendered before, refresh it
		if (this.cats.getElementsByTagName('span').length > 0) {
			var selected = this.cats.getElementsByClassName('selected');
			for (var i = 0; i < selected.length; i++) {
				Util.removeClass(selected[i], 'selected');
			}
		} else {
			// init render
			var tree = this.tree;
			var innerHTML = '';
			for (var category in tree) {
				innerHTML += '<span id="' + category + '">' + category + '</span>';
			}
			this.cats.innerHTML = innerHTML;
		}
		// set pipe
		if (catStr) {
			var catSpan = document.getElementById(catStr);
			if (catSpan) Util.addClass(catSpan, 'selected');
			this.connectByPipe(catSpan);
		} else {
			this.connectByPipe();
		}
	},
	renderTags: function () {
		// display all tags belong to specified category
		var filter = this.filter,
			catStr = filter.getCat(),
			tags = this.tags;
		if (catStr && this.tree[catStr]) {
			var innerHTML = '';
			this.tree[catStr].forEach(function (tag) {
				var cls = filter.isContainTag(tag) ? 'selected' : '';
				innerHTML += '<span class="' + cls + '" id="' + tag + '">' + tag + '</span>';
			});
			tags.innerHTML = innerHTML;
		} else {
			// if no category specified, nothing will be displayed
			tags.innerHTML = '';
		}
	},
	connectByPipe: function (categorySpan) {
		if (categorySpan) {
			var span = categorySpan;
			var left = span.offsetLeft,
				top = span.offsetTop,
				width = span.clientWidth,
				height = this.cats.clientHeight - top;
			this.setPipe(left, top, width, height);
		} else {
			// 未指定时分类时，隐藏链接块
			this.setPipe();
		}
	},
	setPipe: function (left, top, width, height) {
		var p = this.pipe;
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
	addEvent: function () {
		var self = this;

		// 分类点击事件
		this.cats.addEventListener('click', function (event) {
			var target = event.target,
				filter = self.filter;
			if (target.nodeName.toLowerCase() === 'span') {
				// 修改self.filter
				if (Util.hasClass(target, 'selected')) {
					filter.setCat('');
				} else {
					filter.setCat(target.innerHTML.trim())
				}
				filter.clearTags();

				self.renderByFilter();
			}
		});

		// 标签点击事件
		this.tags.addEventListener('click', function (event) {
			var target = event.target,
				filter = self.filter;
			if (target.nodeName.toLowerCase() === 'span') {
				var tagStr = target.innerHTML.trim();
				if (Util.hasClass(target, 'selected')) {
					filter.removeTag(tagStr);
				} else {
					filter.addTag(tagStr);
				}

				self.renderByFilter();
			}
		});

		window.onresize = function () {
			var cat = self.filter.getCat();
			if (cat) {
				self.connectByPipe(document.getElementById(cat));
			}
		};
	}
};

// search input and button
var search = {
	input: document.getElementById('searchInput'),
	init: function () {
		this.addEvent();
	},
	addEvent: function () {
		this.input.onkeyup = function (event) {
			var searchStr = this.value.trim();
			posts.searchPosts(searchStr); // emptry string actually mean no search string
		};
	}
};

// posts infomation and operation
var posts = {
	infos: [],
	init: function () {
		// get all post reference and datas binded on the list item
		// modify the date in the li>span
		var listItems = document.getElementById('aticleList').childNodes,
			// posts = [],
			temp = [];
		for (var i = 0, len = listItems.length; i < len; i++) {
			//filter to get all the 'li' element
			if (listItems[i].nodeType === 1) {
				temp.push(listItems[i]);
			}
		}
		listItems = temp;
		for (var i = 0, len = listItems.length; i < len; i++) {
			//get posts' data from list items
			var post = listItems[i];
			var postInfo = {
				node: post,
				isShow: false,
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
	filterPosts: function (filterConditon) {
		// if no request for  categories or tags, pass an empty array []
		this.infos.forEach(function (postInfo) {
			if ((!filterConditon.cat || postInfo.cats.indexOf(filterConditon.cat) >= 0)
				&& Util.ifContain(postInfo.tags, filterConditon.tags)) {
				postInfo.isShow = true;
			} else {
				postInfo.isShow = false;
			}
		});
	},
	refreshPosts: function () {
		this.infos.forEach(function (postInfo) {
			if (postInfo.isShow === true) {
				Util.removeClass(postInfo.node, 'hidden');
			} else {
				Util.addClass(postInfo.node, 'hidden');
			}
		});
	},
	searchPosts: function (searchStr) {
		// if no demand for searchStr, pass an empty string '' or just pass nothing

		// filter out post not belong to the current category and tags
		this.filterPosts(catsAndTags.getFilterCondition());

		// filter according to search string
		if (searchStr) {
			searchStr = searchStr.toLowerCase();
			this.infos.forEach(function (postInfo) {
				if (postInfo.isShow === true) {
					if ((postInfo.date + postInfo.title).toLowerCase().indexOf(searchStr) >= 0) {
						postInfo.isShow = true;
					} else {
						postInfo.isShow = false;
					}
				}
			});
		}
		this.refreshPosts();
	}
};

var Util = {
	UNIQUE_STR: 'JACKTWON_',
	ifContain: function (containerArr, demandArr) {
		// test if any item in demandArr is contained in containerArr
		return demandArr.length === 0 ||
			demandArr.some(function (item) {
				return containerArr.indexOf(item) >= 0;
			});
	},
	addIntoArr: function (item, arr) {
		if (arr.indexOf(item) < 0) {
			arr.push(item);
		}
	},
	removeClass: function (ele, className) {
		var cls = ele.className.split(/\s+/);
		var pos;
		while ((pos = cls.indexOf(className)) > -1) {
			cls.splice(pos, 1);
		}
		ele.className = cls.join(' ');
	},
	addClass: function (ele, className) {
		var cls = ele.className.split(/\s+/);
		var pos;
		if ((pos = cls.indexOf(className)) < 0) {
			cls.push(className);
		}
		ele.className = cls.join(' ');
	},
	hasClass: function (ele, className) {
		var cls = ele.className.split(/\s+/);
		return cls.indexOf(className) > -1;
	},
	toggleClass: function (ele, className) {
		if (this.hasClass(ele, className)) {
			this.removeClass(ele, className);
		} else {
			this.addClass(ele, className);
		}
	},
	// 以下两个是sessionStorage存取工具函数
	storeGet: function (key, theDefault) {
		var val = window.sessionStorage.getItem(this.UNIQUE_STR + key);
		return val == null ? theDefault : val;
	},
	storeSet: function (key, value) {
		window.sessionStorage.setItem(this.UNIQUE_STR + key, value);
	}
};

