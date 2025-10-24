let cachedLastSelectedText = "";

chrome.runtime.onMessage.addListener((req, _, sendResponse) => {
  if (req.type === "TEXT_SELECTED") {
    cachedLastSelectedText = req.text;
  }

  if (req.type === "GET_LAST_SELECTED_TEXT") {
    sendResponse({ text: cachedLastSelectedText });

    return true;
  }
});
