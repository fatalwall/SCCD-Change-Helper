/* 
 *Copyright (C) 2017 Peter Varney - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license, 
 *
 * You should have received a copy of the MIT license with
 * this file. If not, visit : https://github.com/fatalwall/SCCD-Tools
 */ 

var sccd_attachment = function() {
	'use strict';

	return {

		'Action': function () {
			//open window
			topLevelMenus['shared'].menuClick({'image':'menu_icon_addnewfile.gif','id':'addnewfile','text':'Add New File','value':'addnewfile','target':'sr_mainrec_menus','event':'click'});
			
			
			//Modify default file type
			var inputFile = document.getElementById("file");
			inputFile.setAttribute("accept", "text");
		},
		
        'Add': function () {
			var SCCD = document.getElementById("mxc7e08a4a_1");
			if (SCCD === undefined){
				//if a service request
				SCCD = document.getElementById("mxae29c804_1");
			}
			if (SCCD === undefined){
				//Not on a record page
				return;
			}
			
			var div = document.createElement("div");
			a.setAttribute("aria-life", "polite");
			a.setAttribute("class", "bc");

			var a = document.createElement("a");
			a.setAttribute("title", "Add New File");
			a.setAttribute("clicked","true")
			a.addEventListener("click", this.Action, false);

			var img = document.createElement("img");
			img.setAttribute("src", chrome.extension.getURL("modules/change_email/email.png"));
			img.setAttribute("alt", "Add New File");
			img.setAttribute("title", "Add New File");
			img.setAttribute("height", "22");
			img.setAttribute("width", "22");

			//Add elements
			a.appendChild(img);
			div.appendChild(a);
			SCCD.appendChild(div);
        }
		
	};
	 
};
