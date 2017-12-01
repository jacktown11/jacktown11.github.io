
function deletePcClass(){
	if(navigator.userAgent.match(/Android/i)
		||navigator.userAgent.match(/webOS/i)
		||navigator.userAgent.match(/iPone/i)
		||navigator.userAgent.match(/iPad/i)
		||navigator.userAgent.match(/iPod/i)
		||navigator.userAgent.match(/BlackBerry/i)
		||navigator.userAgent.match(/Windows Phone/i)
		){
		var classPcs = document.getElementsByClassName("pc");
		while(classPcs[0]){
			classPcs[0].className = classPcs[0].className.replace("pc","");		
		}
	}
}

