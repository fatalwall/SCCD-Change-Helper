/* 
 *Copyright (C) 2017 Peter Varney - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license, 
 *
 * You should have received a copy of the MIT license with
 * this file. If not, visit : https://github.com/fatalwall/SCCD-Tools
 */ 

 if(getVariableValue('value')!='startcntr'){
	 //Monitor for changes to the page
	 var sccd_attachment_onchange = function(element, callback) {
		var HTML = element.innerHTML;
		window.setInterval(function() {
			var newHTML = element.innerHTML;
			if(HTML !== newHTML) {
				HTML = newHTML;
				callback(element);
			}
		});
	}

	sccd_attachment_onchange(document.body, function(){
		if (window.frames['upload_iframe']!=undefined && window.frames['upload_iframe'].contentDocument.getElementById('file')!= undefined){
			//Modify default file type	
			var inputFile = window.frames['upload_iframe'].contentDocument.getElementById('file');
			inputFile.setAttribute("accept", "text");
		} else if (document.getElementById('ATTACHMENTS_ADDNEWATTACHMENTS_level_1_0_a') != undefined && sccd_attachment_pressed==true){
			//Open Add New Attachments popup
			sccd_attachment_pressed = false;
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			var cb = document.getElementById("ATTACHMENTS_ADDNEWATTACHMENTS_level_1_0_a");
			cb.dispatchEvent(evt);
		}
	});
} 
var sccd_attachment_pressed = false;
var sccd_attachment = function() {
	'use strict';

	return {

		'Action': function () {
			//open popup menu
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			var cb = document.getElementById("mx585dff66");
			if (cb === undefined || cb === null){
				cb = document.getElementById("mx460d5c8");
			}
			sccd_attachment_pressed = true;
			cb.dispatchEvent(evt);
		},
		
        'Add': function () {
			                                    mxc7e08a4a_1
			var SCCD = document.getElementById("mxc7e08a4a_1");
			if (SCCD === undefined || SCCD===null){
				//if a service request
				SCCD = document.getElementById("mxae29c804_1");
			}
			if (SCCD === undefined || SCCD===null){
				//Not on a record page
				return;
			}
			
			var div = document.createElement("div");
			div.setAttribute("aria-life", "polite");
			div.setAttribute("class", "bc");

			var a = document.createElement("a");
			a.setAttribute("title", "Add New File");
			a.setAttribute("clicked","true")
			a.addEventListener("click", this.Action, false);
			a.setAttribute('class','ti   ');

			var img = document.createElement("img");
			img.setAttribute("src", chrome.extension.getURL("modules/sccd_ticket_attachment/add_attachment.png"));
			img.setAttribute("alt", "Add New File");
			img.setAttribute("title", "Add New File");
			img.setAttribute("height", "20");
			img.setAttribute("width", "20");

			//Add elements
			a.appendChild(img);
			div.appendChild(a);
			SCCD.appendChild(div);
        }
	};
	 
};
