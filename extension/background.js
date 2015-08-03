chrome.commands.onCommand.addListener(function(command) {
  if (command == "replay") { 
    chrome.tabs.query({}, function(tabs){
      var urls  = tabs.filter(function(tab) {
        return /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/.test(tab.url) == true; // if truthy then keep item
      }).map(function(tab) {
        return { // return what new object will look like
          title: tab.title,
        url: tab.url,
        id:tab.id
        };
      });
      for (var i = urls.length - 1; i >= 0; i--) {
        console.log(urls[i].title);
        chrome.tabs.sendMessage(urls[i].id, {action: "replay"}, function(response) {}); 
      };
    });
  }
});
