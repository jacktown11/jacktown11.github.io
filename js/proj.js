;(function(){
	var imagePath = '../images/proj/';
		
	window.onload = function () {
		init();
	};

	function init(){
		ajaxGet('../data/projects.json', renderProjects);
	}

	// function bindHandlers(){
	// 	var divs = document.getElementsByClassName('proj');
	// 	divs = [].slice.call(divs);
	// 	var handleClick = function(event){
	// 		if(event.target === this.firstChild){
	// 			return;
	// 		}else{
	// 			var url = this.getAttribute('data-show');
	// 			if(!!url){
	// 				window.open(url);
	// 			}
	// 			// window.open(this.getAttribute('data-show'));
	// 		}
	// 	};
	// 	divs.forEach(function(div, index, arr){
	// 		div.addEventListener('click',handleClick);
	// 	});
	// }

	function renderProjects(jsonData){
		var data = JSON.parse(jsonData);
		var frag = document.createDocumentFragment();
		data.forEach(function(item, index, arr){
			var name = item.name,
				show = item.show,
				intro = item.intro,
				coverPath = imagePath + item.cover,
				github = item.github;
			frag.appendChild(createProjItem(name, show, intro, coverPath, github));
		});
		var parent = document.getElementsByClassName('import-content')[0];
		parent.appendChild(frag);
		// bindHandlers();
	}

	function ajaxGet(url, successCall){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					successCall.call(this, xhr.responseText);
				}
			}
		};
		xhr.send(null);
	}

	function createProjItem(name, show, intro, coverPath, github){
		var doc = document;
		var div = doc.createElement('div');
		div.className = 'proj';
		div.innerHTML = 
			'<a class="info github" href="' +
			github + 
			'" target="_blank"><img src="../images/github.png" alt="github图标"></a>' + 
			'<a class="info show" href="'+ 
			show + 
			'" target="_blank"><img src = "../images/proj/show.png" alt="在线演示"></a>' + 
			'<img class="cover" src="' + 
			coverPath + 
			'" alt="项目封面"><div><h4>'+ 
			name + 
			'</h4><p>' + 
			intro + 
			'</p></div>';
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

