window.$ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
}

NodeList.prototype.__proto__ = Array.prototype;

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
this.forEach(function (elem, i) {
  elem.on(name, fn);
});

}

function default_value(){
	chrome.storage.local.get('YtAutoCheck', function (result) {
       
       if(result.YtAutoCheck){
       		$("input[name=check]")[0].setAttribute("checked", "checked");
       }else{
       		$("input[name=check]")[0].removeAttribute("checked");
       }

    });
}


function save_options() { 

	var value=$("input[name=check]")[0].checked; 
  	
  	chrome.storage.local.set({
	    YtAutoCheck: value
	  }, function() {
	    // Update status to let user know options were saved.
	    var status = document.getElementById('status');
	    status.textContent = 'Options saved.';
	    setTimeout(function() {
	      status.textContent = '';
	    }, 950);
	  });
 
}


default_value();

$('button').on('click', function (e) {
    save_options();
}); 