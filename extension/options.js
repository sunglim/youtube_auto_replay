function localize() {
  document.getElementById('replay_check').innerText = chrome.i18n.getMessage('ReplayCheck');
  document.getElementById('auto_check_span').innerText = chrome.i18n.getMessage('Check');
  document.getElementById('save_button').innerText = chrome.i18n.getMessage('Button');
}

function restore_options() {
  chrome.storage.local.get({
    YtAutoCheck: true
  }, function(result) {
    document.getElementById('auto_check').checked = result.YtAutoCheck;
  });
}

function save_options() { 
  var value = document.getElementById('auto_check').checked; 

  chrome.storage.local.set({
    YtAutoCheck: value
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = chrome.i18n.getMessage("OptionSave");
    setTimeout(function() {
      status.textContent = '';
    }, 950);
  });
}

function init() {
  localize();
  restore_options();
}

document.addEventListener('DOMContentLoaded', init);
document.getElementById('save_button').addEventListener('click', save_options);
