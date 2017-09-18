/* 
 *Copyright (C) 2017 Peter Varney - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license, 
 *
 * You should have received a copy of the MIT license with
 * this file. If not, visit : https://github.com/fatalwall/SCCD-Change-Helper
 */ 

chrome.browserAction.onClicked.addListener(function(tab) {
	OpenSCCD();
});

function OpenSCCD() {
	chrome.storage.sync.get(
		['sccdurl'], 
		function(items) {
			var sccdurl = items.sccdurl || 'https://sccd/maximo';
			chrome.tabs.create({url:sccdurl});
		}
	);

}

