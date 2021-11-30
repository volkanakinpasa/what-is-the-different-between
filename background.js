import i18n from "./i18n/i18n.js";

(async () => {
  const searchText = await i18n.getMessage("searchText");
  const searchUrl = "https://www.google.com/search?q=";

  chrome.omnibox.onInputEntered.addListener(function (text, disposition) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentTab = tabs[0];

      text = searchText.replace("***", text);
      var url = searchUrl + text;
      console.log(url);
      chrome.tabs.update(currentTab.id, { url: url });
    });
  });
})();

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason == "install") {
    chrome.tabs.create({ url: "options.html" });
  }
});
