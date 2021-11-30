var empty = ' ';
var searchText = 'What is the difference between';
var searchUrl = 'http://www.google.com/search?q=';

chrome.omnibox.onInputEntered.addListener(function (text, disposition) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currentTab = tabs[0];
    text = searchText + empty + text;
    var url = searchUrl + escape(text);
    chrome.tabs.update(currentTab.id, { url: url });
  });
});

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason == 'install') {
    chrome.tabs.create({ url: 'options.html' });
  }
});
