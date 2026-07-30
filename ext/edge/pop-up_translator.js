// Variable to keep track of the open pop-up
let popupWindowId = null;

// 1. Listen for when you click away (window focus changes)
chrome.windows.onFocusChanged.addListener((windowId) => {
  // If a pop-up is open, and you just clicked onto a DIFFERENT window...
  if (popupWindowId !== null && windowId !== popupWindowId) {
    chrome.windows.remove(popupWindowId).catch(() => {}); // Close the pop-up instantly
    popupWindowId = null; // Reset the tracker
  }
});

// 2. The main Alt+J shortcut logic
chrome.commands.onCommand.addListener((command) => {
  if (command === "pop-up_translator") {
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let activeTab = tabs[0];
      if (!activeTab) return;

      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        func: () => window.getSelection().toString().trim()
      }, (results) => {
        
        if (results && results[0] && results[0].result) {
          let selectedText = results[0].result.toLowerCase();
          let oxfordUrl = `https://www.oxfordlearnersdictionaries.com/definition/english/${encodeURIComponent(selectedText)}`;
          
          // If a pop-up is already open somehow, close it first
          if (popupWindowId !== null) {
            chrome.windows.remove(popupWindowId).catch(() => {});
          }

          // Create the pop-up and save its ID so we can close it later
          chrome.windows.create({
            url: oxfordUrl,
            type: "popup",
            width: 500,
            height: 600
          }, (newWindow) => {
            popupWindowId = newWindow.id; // Save the ID!
          });
        }
      });
    });
  }
});