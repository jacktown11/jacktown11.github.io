; (function () {
	var imagePath = '../images/proj/';

	window.onload = function () {
		init();
	};

	function init() {
		ajaxGet('../data/projects.json', renderProjects);
	}

	function renderProjects(jsonData) {
		var data = JSON.parse(jsonData);
		var frag = document.createDocumentFragment();
		data.forEach(function (item, index, arr) {
			var name = item.name,
				show = item.show,
				intro = item.intro,
				coverPath = imagePath + item.cover,
				github = item.github;
			frag.appendChild(createProjItem(name, show, intro, coverPath, github));
		});
		document.body.appendChild(frag);
	}

	function ajaxGet(url, successCall) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					successCall.call(this, xhr.responseText);
				}
			}
		};
		xhr.send(null);
	}

	function createProjItem(name, show, intro, coverPath, github) {
		var doc = document;
		var div = doc.createElement('div');
		div.className = 'proj';

		var githubIcon = '<a class="info github" href="' +
			github +
			'" target="_blank"><img src="../images/proj/github2.png" alt="github图标"></a>',
			showIcon = !show ? '' :
				('<a class="info show" href="' + show +
					'" target="_blank"><img src = "../images/proj/show1.png" alt="在线演示"></a>'),
			cover = '<img class="cover" src="' + coverPath +
				'" alt="项目封面">',
			detail = '<div class="detail"><div><h4>' + name + '</h4><p><span>' + intro + '<span></p></div></div>';
		div.innerHTML = githubIcon + showIcon + cover + detail;
		return div;
	}


	/**
	 * 加载一个新封面
	 * @param {HTMLElement} imgEle 图片元素img 
	 * @param {string} src 图片路径 
	 */
	function loadCover(imgEle, src) {
		var newImg = new Image();
		newImg.src = src;
		newImg.onload = function (event) {
			imgEle.src = src;
		};
	}
})();

