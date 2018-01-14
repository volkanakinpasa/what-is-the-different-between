if (!localStorage.getItem('install_time')) {

    var now = new Date().getTime();
    localStorage.setItem('install_time', now);
    chrome.tabs.create({url: "options.html"});

}

var empty = ' ';
var steamSearchText = 'What is the difference between';
var searchUrl = 'http://www.google.com/search?q=';

chrome.omnibox.onInputEntered.addListener(function(text, disposition) {
    chrome.storage.sync.get({
        searchUrl: searchUrl
        }, function(items) {
            if (items.searchUrl != null && items.searchUrl != undefined && items.searchUrl != '')
                searchUrl = items.searchUrl;

            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                var currentTab = tabs[0];
                text = steamSearchText + empty +  text;
                var url = searchUrl + text;
                chrome.tabs.update(currentTab.id, {"url": url});   
            });
    });
});

chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
    suggest([
        {content: text + empty, description: "<url><dim>" + steamSearchText + empty + "</dim><match>" + text + "</match></url>"}
    ]);
});