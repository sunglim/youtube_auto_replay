var getVideoObj = function(){
    var videoObj;
	videoObj = window.document.getElementById("movie_player");
    if(videoObj){
        return videoObj;
    }

    videoObj = window.document.getElementsByTagName("video")[0];
    if(videoObj){
        videoObj.getPlayerState = function(){
            return videoObj.ended ? 0 : 1;
        }
        videoObj.seekTo = function(value){
            videoObj.currentTime = value;
            videoObj.play(); // why play() is necessary?
        }
    }
    
    return videoObj;
};

var addIcon = function(){
    var iconTag = document.createElement('IMG');
    iconTag.src = chrome.extension.getURL("icon2.png");
    iconTag.setAttribute("style","vertical-align:middle;float:right");
    document.getElementById("watch-actions").appendChild(iconTag);
};

var pollingCheckAndSeek = function(){
    addIcon();
    var video = getVideoObj();
	if(video){
		setInterval(function(){
			if(video.getPlayerState() == 0/*ended*/){
				video.seekTo(0, true);
			}	
		}, 250);
	}
};

var addDebugMenu = function(){
    var div = document.createElement('div');
}

setTimeout(function(){
    pollingCheckAndSeek();
}, 1000);
