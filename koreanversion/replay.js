var addIcon = function(){
    var iconTag = document.createElement('IMG');
    iconTag.src = chrome.extension.getURL("icon2.png");
    iconTag.setAttribute("style","vertical-align:middle;float:right");
    document.getElementById("watch-actions").appendChild(iconTag);
};
var videoObj = function(){
    addIcon();

	var logman = window.document.getElementById("movie_player");
	if(logman){
		setInterval(function(){
			if(logman.getPlayerState() == 0/*unrealize*/){
				logman.seekTo(0, true);
			}	
		}, 250);
	}
};

setTimeout(function(){
	videoObj();
}, 1000);
