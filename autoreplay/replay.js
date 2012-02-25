var videoObj = function(){
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
