var empty = ' ';
var searchText = 'What is the difference between';
var searchUrl = 'http://www.google.com/search?q=';

chrome.omnibox.onInputEntered.addListener(function (text, disposition) {
  chrome.storage.sync.get(
    {
      searchUrl: searchUrl,
    },
    function (items) {
      if (
        items.searchUrl != null &&
        items.searchUrl != undefined &&
        items.searchUrl != ''
      )
        searchUrl = items.searchUrl;

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currentTab = tabs[0];
        text = searchText + empty + text;
        var url = searchUrl + escape(text);
        chrome.tabs.update(currentTab.id, { url: url });
      });
    }
  );
});

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason == 'install') {
    chrome.storage.local.get(['install_time'], function (result) {
      var now = new Date().getTime();
      chrome.storage.local.get({ install_time: now });
      chrome.tabs.create({ url: 'options.html' });
    });
  }
});
