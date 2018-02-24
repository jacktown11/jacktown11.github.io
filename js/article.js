(function(){
	var nodes = {},
		stateStr = {
			openCata: {
				str: '折叠目录',
				marginLeft: '25%'
			},
			closeCata: {
				str: '展开目录',
				marginLeft: '15%'
			},
			openNavStr: '极简',
			closeNavStr: '导航'
		},
		util = {
		addClass: function(ele, cls){
			if(ele.className.indexOf(cls) === -1){
				ele.className += ' ' + cls;
			}
		},
		removeClass: function(ele, cls){
			var str = ele.className;
			while(str.indexOf(cls) >= 0){
				str = str.replace(cls, ' ');
			}
			ele.className = str.replace(/\s{2,}/g, ' ').trim();
		},
		toggleClass: function(ele, cls){
			if(ele.className.indexOf(cls) >= 0){
				this.removeClass(ele, cls);
			}else{
				this.addClass(ele, cls);
			}
		}
	};
	window.onload = function () {
		addCatalog();
		getNodes();
		setHandlers();
	}
	function setHandlers() {
		nodes.catalogCtrl.onclick = function (e) {
			if (nodes.catalog.className.indexOf('hidden') !== -1) {
				showCatalog();
			} else {
				hideCatalog();
			}
		};
		nodes.mode.onclick = function(e){
			if(nodes.nav.className.indexOf('hidden') !== -1){
				nodes.mode.innerHTML = stateStr.openNavStr;
				util.removeClass(nodes.nav, 'hidden');
				showCatalog();
			}else{
				nodes.mode.innerHTML = stateStr.closeNavStr;
				util.addClass(nodes.nav, 'hidden');
				hideCatalog();
			}
		}
	}

	function getNodes(){
		var doc = document;
		nodes.nav = doc.getElementById('top-nav');
		nodes.catalogCtrl = doc.getElementById('nav-toggle');
		nodes.catalog = doc.getElementById('catalog-wraper');
		nodes.mode = doc.getElementById('mode');
		nodes.article = doc.getElementsByClassName('wrap')[0];
	}

	function hideCatalog(){
		util.addClass(nodes.catalog, 'hidden');
		nodes.catalogCtrl.innerHTML = stateStr.closeCata.str;
		nodes.article.style.marginLeft = stateStr.closeCata.marginLeft;
	}
	function showCatalog(){
		util.removeClass(nodes.catalog, 'hidden');
		nodes.catalogCtrl.innerHTML = stateStr.openCata.str;
		nodes.article.style.marginLeft = stateStr.openCata.marginLeft;
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
		// var p = document.createElement("p");
		// p.appendChild(document.createTextNode("目录"));
		// catComplete.appendChild(p);

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
