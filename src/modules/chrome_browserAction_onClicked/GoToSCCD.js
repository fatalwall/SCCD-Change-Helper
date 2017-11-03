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
			if (tabs[0].url == 'chrome://newtab/') {
				//If browser is on a New Tab it should load the page here
				chrome.storage.sync.get(
					['sccdurl'], 
					function(items) {
						var sccdurl = items.sccdurl || 'https://sccd/maximo';
						chrome.tabs.update({url:sccdurl});
					}
				);	
			} else {
				//If browser tab has content open new tab
				chrome.storage.sync.get(
					['sccdurl'], 
					function(items) {
						var sccdurl = items.sccdurl || 'https://sccd/maximo';
						chrome.tabs.create({url:sccdurl});
					}
				);	
			}
		}
	);
}

