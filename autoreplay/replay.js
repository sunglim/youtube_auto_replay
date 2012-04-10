var getVideoObj = function(){
    var flashVideoObj = window.document.getElementById("movie_player");
    if(flashVideoObj){
        return flashVideoObj;
    }

    var html5VideoObj = window.document.getElementsByTagName("video")[0];
    if(html5VideoObj){
        html5VideoObj.getPlayerState = function(){
            return html5VideoObj.ended ? 0 : 1;
        }
        html5VideoObj.seekTo = function(value){
            html5VideoObj.currentTime = value;
            html5VideoObj.play(); // why play() is necessary?
        }
        html5VideoObj.pauseVideo= function(){
            html5VideoObj.pause();
        }
        html5VideoObj.playVideo= function(){
            html5VideoObj.play();
        }
        return html5VideoObj;
    }
    
    return null;
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
                // because of Youtube Bug.
                // registered on Youtube issue tracker
                video.pauseVideo();
                video.playVideo();
                // end of temp code
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
