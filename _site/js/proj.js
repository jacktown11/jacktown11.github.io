// ajax,
// method: get and post
// dataType: json, xml, txt
function ajax(config) {
	config = config || {};
	config.type = config.type || 'GET';
	config.async = config.async || 'true';
	config.data = config.data || {};
	config.success = config.success || function () { };
	config.error = config.error || function () { };

	// 组装参数列表
	var paramArr = [],
		param = config.data;
	for (var key in param) {
		if (Array.isArray(param[key])) {
			var arr = params[key];
			for (var i = 0; i < arr.length; i++) {
				var item = arr[i];
				paramArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(item));
			}
		} else {
			paramArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(param[key]));
		}
	}
	var paramStr = paramArr.join('&');

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
				var data;
				switch (config.dataType.toLowerCase()) {
					case 'json':
						if (window.JSON && JSON.parse) {
							data = JSON.parse(xhr.responseText);
						} else {
							data = eval(xhr.responseText);
						}
						break;
					case 'xml':
						data = xhr.responseXML;
						break;
					default:
						data = xhr.responseText;
						break;
				}
				config.success(data);
			} else {
				config.error();
			}
		}
	};
	if (config.type.toUpperCase() === 'GET') {
		xhr.open(config.type, config.url + '?' + paramStr, config.async);
		xhr.send(null);
	} else {
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.open(config.type, config.url, config.async);
		xhr.send(paramStr);
	}
}
new Vue({
	el: '#proj-list',
	data: {
		projects: [],
		isLoaded: false
	},
	created: function () {
		var self = this;
		ajax({
			url: '/data/projects.json',
			dataType: 'json',
			success: function (data) {
				data.forEach(function (item) {
					item.isEnlarge = false;
				});
				self.projects = data;
				self.isLoaded = true;
			}
		});
	}
});
