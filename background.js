
var empty = ' ';
var steamSearchText = 'What is the difference between';
var searchUrl = 'http://www.google.com/search?q=';
  
chrome.omnibox.onInputEntered.addListener(function(text, disposition) {
     chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var currentTab = tabs[0];
        text = steamSearchText + empty +  text;
        var url = searchUrl + text;
        chrome.tabs.update(currentTab.id, {"url": url});   
     });
});


chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
        suggest([
            {content: text + empty, description: "<url><dim>" + steamSearchText + empty + "</dim><match>" + text + "</match></url>"}
        ]);
});