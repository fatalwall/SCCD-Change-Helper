/* 
 *Copyright (C) 2017 Peter Varney - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license, 
 *
 * You should have received a copy of the MIT license with
 * this file. If not, visit : https://github.com/fatalwall/SCCD-Tools
 */ 

 function setUrlIfUnset() {
	chrome.storage.sync.get(
		['sccdurl'], 
		function(items) {
			if (items.sccdurl === undefined || items.sccdurl == ''){
				const regex = /^(http[s]?:\/{2}.*\/maximo)\/.*$/g;
				var match = regex.exec(document.location.toString());
				var sccdurl = match[1];
				chrome.storage.sync.set(
					{ 'sccdurl': sccdurl }, 
					function() {
						console.log('SCCD URL detected and saved for first time visit. - ' + sccdurl);
					}
				);
			}
		}
	);	

}
 
setUrlIfUnset();
