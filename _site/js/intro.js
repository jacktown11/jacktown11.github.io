;(function(){

window.onload = function () {
    new App();
};

var Utils = {
    // 加密和解密函数
    uniqueStr: 'jacktown-',
    encode: function(plainText, password) {
            return CryptoJS.AES.encrypt(plainText, password).toString();
    },
    decode: function(encodedStr, password) {
        return CryptoJS.AES.decrypt(encodedStr, password).toString(CryptoJS.enc.Utf8);
    },
    setStore: function(key, value){
        localStorage.setItem(this.uniqueStr + key, value);
    },
    getStore: function(key){
        return localStorage.getItem(this.uniqueStr + key);
    },
    addClass: function(ele, cls){
        var clsArr = ele.className.trim().replace(/\s+/, ' ').split(' ');
        if(clsArr.indexOf(cls) < 0){
            ele.className += ' ' + cls;
        }
    },
    removeClass: function(ele, cls){
        var clsArr = ele.className.trim().replace(/\s+/, ' ').split(' ');
        clsArr = clsArr.filter(function(item){
            if(item === cls){
                return false;
            }else{
                return true;
            }
        });
        ele.className = clsArr.join(' ')
    }
};


function App(){
    var doc = document;
    this.nodes = {
        info: {
            phone: doc.getElementById('phone'),
            email: doc.getElementById('email'),
            weixin: doc.getElementById('weixin'),
            qq: doc.getElementById('qq'),
            name: doc.getElementById('name'),
            education: doc.getElementById('education'),
            picture: document.getElementById('picture')
        },
        interact: {
            // 与用户交互的元素
            interact: doc.getElementById('interact'),
            input: doc.getElementById('password'),
            confirm: doc.getElementById('confirm'),
            ignore: doc.getElementById('ignore'),
            warning: doc.getElementById('warning')
        }
    };
    this.encodedStr = 'U2FsdGVkX19/MDErDGUICKXGwgNMOabWiVRn0KhTeag68nY/JGMFxw8CNo+W6nQyIBssWB50E8A3jxT1BQQ7zBfdGADH0uD9Kw9KFWu1EkW97lHNNzbLMvYWJss453MYpfwy9Cd45jF6bjhWupURp0YZvULnT1GdWQ6ERjuaX/i8Eebapw1FoXT94Rzda468MWB3ebGcRKloATK2aL7DXh4S432osmBz9IhSeBP735aSsL+mN+09fAicr0PedgzVE2nCnKBPQucbTp5UGBNnButdmhwmJk4QLEmizfhbShGIa1gA0B7LXa7w+H7iT2MA';
    this.init();
}
App.prototype = {
    constructor: App,
    init: function(){
        this.setHandlers();
        this.checkStore();
    },
    setHandlers: function(){
        var self = this,
            interact = this.nodes.interact;
        interact.confirm.onclick = function(event){
            self.tryShow(event);
        };
        interact.input.onkeyup = function(event){
            if(event.keyCode === 13){
                self.tryShow(event);
            }
        };
        interact.ignore.onclick = function(event){
            Utils.addClass(interact.interact, 'hidden');
        };
    },
    checkStore: function(){
        var password = Utils.getStore('password');
        if(!password || !this.showPersonalInfo(password)){
            Utils.removeClass(this.nodes.interact.interact, 'hidden');
            this.nodes.interact.input.focus();
        }
    },
    tryShow: function(event){
        var password = this.nodes.interact.input.value.trim();
        var isOk = this.showPersonalInfo(password);
        if (isOk) {
            Utils.addClass(this.nodes.interact.interact, 'hidden');
        } else {
            this.showWrong();
        }
    },
    showPersonalInfo: function(password){
        var info = this.getInfoByPassword(password);
        if(!info){
            // 密码有误，没能获得私密信息
            return false;
        }

        var infoNodes = this.nodes.info;
        for(var key in infoNodes){
            if(key !== 'picture'){
                infoNodes[key].innerHTML = info[key];
            }else{
                Utils.removeClass(infoNodes[key], 'hidden');
                infoNodes[key].src = info[key];
            }
        }
        Utils.setStore('password', password);
        return true;
    },
    getInfoByPassword: function(password){
        var info = null;
        try{
            info = JSON.parse(Utils.decode(this.encodedStr, password));
        }catch(error){
            info = null;
        }
        return info;
    },
    showWrong: function(){
        var warning = this.nodes.interact.warning;
        Utils.removeClass(warning, 'hidden');
        warning.style.left = '-10px';
        setTimeout(function(){
            warning.style.left = '10px';
            setTimeout(function(){
                warning.style.left = '0px';
            },200);
        },200);
    }
};

})();
