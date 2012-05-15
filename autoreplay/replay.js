var getPlayerObj = function(){
    var flashPlayerObj = window.document.getElementById("movie_player");
    if(flashPlayerObj){
        return flashPlayerObj;
    }

    var html5PlayerObj = window.document.getElementsByTagName("video")[0];
    if(html5PlayerObj){
        html5PlayerObj.getPlayerState = function(){
            return html5PlayerObj.ended ? 0 : 1;
        }
        html5PlayerObj.seekTo = function(value){
            html5PlayerObj.currentTime = value;
            html5PlayerObj.play(); // why play() is necessary?
        }
        html5PlayerObj.pauseVideo= function(){
            html5PlayerObj.pause();
        }
        html5PlayerObj.playVideo= function(){
            html5PlayerObj.play();
        }
        return html5PlayerObj;
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
    var playerObj = getPlayerObj();
    if(playerObj){
	setInterval(function(){
		if(playerObj.getPlayerState() == 0/*ended*/){
			playerObj.seekTo(0, true);
	                // because of Youtube Bug.
	                // registered on Youtube issue tracker
	                playerObj.pauseVideo();
	                playerObj.playVideo();
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
