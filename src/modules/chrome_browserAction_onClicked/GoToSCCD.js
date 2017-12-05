/* 
 *Copyright (C) 2017 Peter Varney - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license, 
 *
 * You should have received a copy of the MIT license with
 * this file. If not, visit : https://github.com/fatalwall/SCCD-Tools
 */ 

chrome.browserAction.onClicked.addListener(function(tab) {
	OpenSCCD();
});

function OpenSCCD() {
	chrome.tabs.query({ currentWindow: true, active: true },
		function(tabs) {
			
				chrome.storage.sync.get(
					['sccdurl'], 
					function(items) {
						if (items.sccdurl === undefined || items.sccdurl == ''){
							//sccdurl is not set
							if (tabs[0].url == 'chrome://newtab/' || tabs[0].url == 'about:newtab') {
								//If browser is on a New Tab it should load the page here
								chrome.tabs.update({url:"modules/chrome_browserAction_onClicked/URL_Not_Set.html"});
							} else {
								//If browser tab has content open new tab
								chrome.tabs.create({url:"modules/chrome_browserAction_onClicked/URL_Not_Set.html"});
							}
						} else {
							//sccdurl is set
							if (tabs[0].url == 'chrome://newtab/' || tabs[0].url == 'about:newtab') {
								//If browser is on a New Tab it should load the page here
								chrome.tabs.update({url:items.sccdurl});
							} else {
								//If browser tab has content open new tab
								chrome.tabs.create({url:items.sccdurl});
							}
						}
					}
				);	
		}
	);
}

