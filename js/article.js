/**
	 * 一个标题信息对象
	 * @param {string} text 标题文本内容
	 * @param {number} level 标题级别1-6
	 */
function Title(text, level) {
	this.text = text;
	this.level = level;
	this.children = [];
}

// 标题树单例
var tree = {
	text: '目录',
	level: 0,
	children: [],
	insert: function (title) {
		var parent = tree;
		// 找到待插入标题的父节点(需要注意hn中n越大层级越深)
		while (title.level - parent.level > 1) {
			var children = parent.children;
			if (children.length === 0) {
				children.push(new Title(null, parent.level - 1));
			}
			parent = children[children.length - 1];
		}
		// 将待插入节点作为最后一个子节点
		parent.children.push(title);
	}
};

Vue.component('blog-catalog', {
	template: `
	<div class="title-wrapper">
		<p class="title" :class="cls" v-if="treeNode.text">
			<span class="expand-controller" :class="status" @click.stop="toggleChildren" v-html="sign"></span>
			<a class="title-link" :href="href" :data-level="treeNode.level">{{treeNode.text}}</a></p>
		<div class="children" v-show="isShow">
			<blog-catalog v-for="node in treeNode.children" :tree-node="node" :key="node.text"></blog-catalog>
		</div>
	</div>
	`,
	props: ['treeNode'],
	data: function () {
		return {
			isHideByUser: false
		}
	},
	computed: {
		cls: function () {
			return 'title' + this.treeNode.level;
		},
		href: function () {
			return '#' + this.treeNode.text;
		},
		isShow: function () {
			return this.hasChildren && !this.isHideByUser;
		},
		hasChildren: function () {
			return !!this.treeNode.children && this.treeNode.children.length > 0;
		},
		status: function () {
			return !this.hasChildren ? 'single' :
				this.isHideByUser ? 'closed' : 'open';
		},
		sign: function () {
			let controlStrMap = {
				single: '&nbsp;',
				closed: '+',
				open: '-'
			};
			return controlStrMap[this.status];
		}
	},
	methods: {
		toggleChildren: function () {
			if (this.hasChildren) {
				this.isHideByUser = !this.isHideByUser;
			}
		}
	}
});

new Vue({
	el: '#app',
	data: {
		tree: tree
	},
	mounted: function () {
		this.gatherTitles();
	},
	methods: {
		gatherTitles: function () {
			var post = this.$refs.post,
				hReg = /^[hH]\d$/;
			var postChild = post.firstChild;
			while (postChild !== null) {
				/*check the post element's children*/
				var name = postChild.nodeName;
				if (hReg.test(name)) {
					this.tree.insert(new Title(postChild.innerHTML, +(name.charAt(1))));
				}
				postChild = postChild.nextSibling;
			}
		}
	}
});

; (function () {

	window.onload = function () {
		// addCatalog();
		// getNodes();
		// setHandlers();
	}



	var nodes = {},
		stateStr = {
			openCata: {
				marginLeft: '25%'
			},
			closeCata: {
				marginLeft: '15%'
			},
			openNavStr: '极简',
			closeNavStr: '导航'
		},
		util = {
			addClass: function (ele, cls) {
				if (ele.className.indexOf(cls) === -1) {
					ele.className += ' ' + cls;
				}
			},
			removeClass: function (ele, cls) {
				var str = ele.className;
				while (str.indexOf(cls) >= 0) {
					str = str.replace(cls, ' ');
				}
				ele.className = str.replace(/\s{2,}/g, ' ').trim();
			},
			toggleClass: function (ele, cls) {
				if (ele.className.indexOf(cls) >= 0) {
					this.removeClass(ele, cls);
				} else {
					this.addClass(ele, cls);
				}
			}
		};

	function setHandlers() {
		nodes.navCtrl.onclick = function (e) {
			if (nodes.catalog.className.indexOf('hidden') !== -1) {
				showCatalog();
			} else {
				hideCatalog();
			}
		};
		nodes.mode.onclick = function (e) {
			if (nodes.nav.className.indexOf('hidden') !== -1) {
				nodes.mode.innerHTML = stateStr.openNavStr;
				util.removeClass(nodes.nav, 'hidden');
			} else {
				nodes.mode.innerHTML = stateStr.closeNavStr;
				util.addClass(nodes.nav, 'hidden');
				hideCatalog();
			}
		};
		nodes.catalog.onclick = function (event) {
			if (window.innerWidth <= 800) {
				hideCatalog();
			}
		};
	}

	function getNodes() {
		var doc = document;
		nodes.nav = doc.getElementById('top-nav');
		nodes.navCtrl = doc.getElementById('navCtrl');
		nodes.catalog = doc.getElementById('catalog-wraper');
		nodes.mode = doc.getElementById('mode');
		nodes.article = doc.getElementsByClassName('wrap')[0];
	}

	function hideCatalog() {
		util.addClass(nodes.catalog, 'hidden');
		util.removeClass(nodes.article, 'right');
	}
	function showCatalog() {
		util.removeClass(nodes.catalog, 'hidden');
		util.addClass(nodes.article, 'right');
	}

	function addCatalog() {
		var catalogWraper = document.getElementById('catalog-wraper');
		catalogWraper.appendChild(generateCatalog());
	}

	function generateCatalog() {
		var post = document.getElementsByClassName("post")[0];
		var hhigh = 0,/*最高标题号*/
			hmid = 0,/*具有两个以上元素的最高标题号*/
			hlow = 0;/*最低标题号*/
		var hIndex = 1
		len = 0;

		var catComplete = document.createElement("nav");/*complete catalog element*/
		catComplete.className = "catalog";

		/*get hhigh,hmid and hlow*/
		for (; hIndex <= 6; hIndex++) {
			if ((len = post.getElementsByTagName("h" + hIndex).length) > 0) {
				if (hhigh === 0) { hhigh = hIndex; }
				if (hmid === 0 && len >= 2) { hmid = hIndex; }
				hlow = hIndex;
			}
		}
		if (hmid === 0) {
			//at most 1 title in every title rank
			hmid = hhigh;
		}
		if (hlow == 0) {
			//no title in this article
			return catComplete;
		}

		/*generate catalog*/
		var postChild = post.firstChild,
			catChild = null;

		while (postChild !== null) {
			/*check the post element's children*/
			var name = postChild.nodeName;
			if (name.length === 2 && name.charAt(0).toLowerCase() === "h"
				&& Number(name.charAt(1)) >= hhigh && Number(name.charAt(1)) <= hlow) {
				/*a title element between rank hhigh and hmid*/
				var clsName = "";
				switch (Number(name.charAt(1)) - 1) {
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
				if (catChild = genTitleLink(clsName, postChild.id, postChild.firstChild.nodeValue)) {
					catComplete.appendChild(catChild);
					/*add a new catalog line*/
				}
			}
			postChild = postChild.nextSibling;
		}

		return catComplete;

	}

	function genTitleLink(clsName, href, content) {
		/*build a div containing a title link
		the div's class name is clsName,the link content is content, the link's href is #href */
		if (typeof clsName === "string" && typeof href === "string" && typeof content === "string") {
			var divEle = document.createElement("div"),
				aEle = document.createElement("a");
			aEle.appendChild(document.createTextNode(content));
			aEle.href = "#" + href;
			divEle.appendChild(aEle);
			divEle.className = clsName;
			return divEle;
		} else {
			return null;
		}
	}

})();
