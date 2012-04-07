var getVideoObj = function(){
	var flashobj = window.document.getElementById("movie_player");
    if(flashobj){
        return flashobj;
    }

    var html5obj = window.document.getElementsByTagName("video")[0];
    if(html5obj){
        return html5obj;
    }
};

var addIcon = function(){
    var iconTag = document.createElement('IMG');
    iconTag.src = chrome.extension.getURL("icon2.png");
    iconTag.setAttribute("style","vertical-align:middle;float:right");
    document.getElementById("watch-actions").appendChild(iconTag);
};

var videoObj = function(){
    addIcon();
    var video = getVideoObj();
	if(video){
		setInterval(function(){
			if(video.getPlayerState() == 0/*unrealize*/){
				video.seekTo(0, true);
			}	
		}, 250);
	}
};

setTimeout(function(){
	videoObj();
}, 1000);
