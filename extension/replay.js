// Sungguk Lim <limasdf@gmail.com> all right reserved.

var getPlayerObj = function() {
  var flashPlayerObj = window.document.getElementById("movie_player");
  if (flashPlayerObj && 
      (flashPlayerObj.tagName === 'embed' || flashPlayerObj.tagName === 'EMBED')) {
    return flashPlayerObj;
  }

  var html5PlayerObj = window.document.getElementsByTagName("video")[0];
  if (html5PlayerObj) {
    html5PlayerObj.getPlayerState = function() {
      return html5PlayerObj.ended ? 0 : 1;
    }
    html5PlayerObj.seekTo = function(value) {
      html5PlayerObj.currentTime = value;
      html5PlayerObj.play(); // why play() is necessary?
    }
    html5PlayerObj.pauseVideo = function() {
      html5PlayerObj.pause();
    }
    html5PlayerObj.playVideo = function() {
      html5PlayerObj.play();
    }
    return html5PlayerObj;
  }
  return null;
};

var addCountMessage = function() {
  var likeCountTag = document.createElement('div');
  likeCountTag.id = "replayCount";
  likeCountTag.innerHTML = "0 " + chrome.i18n.getMessage("TimesAutoReplayed");

  var tagLocation = document.getElementById("watch7-views-info");
  if (tagLocation != null) {
    document.getElementById("watch7-views-info").childNodes[0].appendChild(likeCountTag);
  }
};

var replayCount = 0;
var updateReplayCount = function() {
  replayCount++;
  document.getElementById("replayCount").innerHTML =
      replayCount + " " +  chrome.i18n.getMessage("TimesAutoReplayed");
};

var pollingCheckAndSeek = function() {
  if(!document.getElementById("replayCount")) addCountMessage();
  replay();
};

var replay = function(interval){
  
  var playerObj = getPlayerObj();
  if (playerObj) {
    if(interval){
      setInterval(function() {
          if (playerObj.getPlayerState() == 0/*ended*/) {
            playerObj.seekTo(0, true);
            // Because of Youtube Bug.
            // registered on Youtube issue tracker.
            playerObj.pauseVideo();
            playerObj.playVideo();
            // End of temp code.
            updateReplayCount();
          }
        }, 250);
    }else{
            playerObj.seekTo(0, true); 
            playerObj.pauseVideo();
            playerObj.playVideo(); 
            updateReplayCount();
    }
  }

}
var addDebugMenu = function() {
  var div = document.createElement('div');
};

chrome.storage.local.get('YtAutoCheck', function (result) {
       
       if(result.YtAutoCheck != undefined){
            if(result.YtAutoCheck){ 
                setTimeout(function() {
                    pollingCheckAndSeek(true);
                }, 1000);
               

            }else{ 
              chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
                 if (msg.action == 'replay') {
                      pollingCheckAndSeek();
                 }
              });
            }

       }else{ 
        chrome.storage.local.set({  YtAutoCheck: true});
       }

});




