
;(function(){
	var imagePath = '../images/proj/',
		missImgSrc = imagePath + 'missing.jpg';
		
	window.onload = function () {
		init();
	};

	function init(){
		ajaxGet('../projects.json', renderProjects);
	}

	function renderProjects(jsonData){
		var data = JSON.parse(jsonData);
		var frag = document.createDocumentFragment();
		data.forEach(function(item, index, arr){
			var name = item.name,
				show = item.show,
				coverPath = imagePath + item.cover,
				github = item.github;
			frag.appendChild(createProjItem(name, show, coverPath, github));
		});
		var parent = document.getElementsByClassName('import-content')[0];
		parent.appendChild(frag);
	}

	function ajaxGet(url, successCall){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)){
				successCall.call(this, xhr.responseText);
			}
		};
		xhr.send();
	}

	function createProjItem(name, show, coverPath, github){
		var doc = document;
		var div = doc.createElement('div');
		div.className = 'proj';
		div.setAttribute('data-show', show);

		div.innerHTML = '<div class="links"><a href="' +
			github + 
			'"><img src="../images/github.png" alt="github图标"></a></div>' + 
			'<img class="cover" src="' + 
			coverPath + 
			'" alt="项目封面"><h3>' + 
			name + 
			'</h3>';
		return div;
	}


	/**
	 * 加载一个新封面
	 * @param {HTMLElement} imgEle 图片元素img 
	 * @param {string} src 图片路径 
	 */
	function loadCover(imgEle, src){
		var newImg = new Image();
		newImg.src = src;
		newImg.onload = function(event){
			imgEle.src = src;
		};
	}	
})();

