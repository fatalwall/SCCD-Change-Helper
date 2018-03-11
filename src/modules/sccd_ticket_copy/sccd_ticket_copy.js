/* 
 *Copyright (C) 2018 Peter Varney - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license, 
 *
 * You should have received a copy of the MIT license with
 * this file. If not, visit : https://github.com/fatalwall/SCCD-Tools
 */ 

var sccd_ticket_copy = function() {
	'use strict';

	return {
		'Action': function () {
			var textArea = document.createElement("div");

			var htmlLink = "<a href='" + document.location.toString().split('?')[0] 
				+ "?event=loadapp&value=" + getVariableValue('value') 
				+ "&additionalevent=useqbe&additionaleventvalue=";
			
			switch (getVariableValue('value').toUpperCase()) {
				case 'ACTIVITY':
					htmlLink = htmlLink + "wonum=" + getFieldValue('mx1baa75a9');
					htmlLink = htmlLink + "'> " + getFieldValue('mx1baa75a9') + "</a> - " + getFieldValue('mx82a32413');
					break;
				case 'WOTRACK':
					htmlLink = htmlLink + "wonum=" + getFieldValue('mx1185dcd0');
					htmlLink = htmlLink + "'> " + getFieldValue('mx1185dcd0') + "</a> - " + getFieldValue('mx888c8d6a');
					break;
				case 'CHANGE':
					htmlLink = htmlLink + "wonum=" + getFieldValue('mx9d44d398');
					htmlLink = htmlLink + "'> " + getFieldValue('mx9d44d398') + "</a> - " + getFieldValue('mxe9abc5a');
					break;
				case 'INCIDENT':		
				case 'SR':
				case 'PROBLEM':
					htmlLink = htmlLink + "ticketid=" + getFieldText('mxf4d1d458');
					htmlLink = htmlLink + "'> " + getFieldText('mxf4d1d458') + "</a> - " + getFieldText('mxc13c620b');
					break;
			}
			
			
			
			textArea.innerHTML = htmlLink;
			
			document.body.appendChild(textArea);
			textArea.focus();
			
			window.getSelection().removeAllRanges();  
			var range = document.createRange(); 
			range.setStartBefore(textArea.firstChild);
			range.setEndAfter(textArea.lastChild);
			window.getSelection().addRange(range); 
			
			try {
				var successful = document.execCommand('copy');
				var msg = successful ? 'successful' : 'unsuccessful';
				console.log('Copying text command was ' + msg);
				console.log(textArea.innerHTML);
			} catch (err) {
				console.log('Oops, unable to copy');
			}

			document.body.removeChild(textArea);
		},
		'Remove': function (id) {
			var btn = document.getElementById(id);
			if (btn === undefined || btn===null){
				return true;
			} else {
				//Actions to delete element
				btn.parentElement.removeChild(btn);
			}
		},
        'Add': function (id) {
			//Change
			var SCCD = document.getElementById("mx22d674a4_holder");
			if (SCCD === undefined || SCCD===null){
				//Ticket(SR, IN, PR)
				SCCD = document.getElementById("mxca49cfc5_1");
			}
			if (SCCD === undefined || SCCD===null){
				//workorder
				SCCD = document.getElementById("mx22d674a4");
			}
			if (SCCD === undefined || SCCD===null){
				//Not on a record page
				return;
			}
			
			
			
			var UI = SCCD.getElementsByTagName("ul")[0]
			
			//Copy
			var CopyOwnerLI = document.createElement("li");
			CopyOwnerLI.setAttribute("id",id);
			CopyOwnerLI.setAttribute("role", "presentation");
			CopyOwnerLI.setAttribute("ctype", "toolbarbutton");

			var CopyOwnerA = document.createElement("a");
			CopyOwnerA.setAttribute("role", "button");
			CopyOwnerA.setAttribute("ctype", "toolbarbutton");
			CopyOwnerA.setAttribute("onkeydown", "itemAKey(event,this)");
			CopyOwnerA.setAttribute("onfocus", "appendClass(this,'onhover')");
			CopyOwnerA.setAttribute("onblur", "removeClass(this,'onhover')");
			CopyOwnerA.setAttribute("class", "on");
			CopyOwnerA.setAttribute("title", "Email Change Owner");
			CopyOwnerA.addEventListener("click", this.Action, false);

			var CopyOwnerButton = document.createElement("img");
			CopyOwnerButton.setAttribute("src", chrome.extension.getURL("modules/sccd_ticket_copy/copy.png"));
			CopyOwnerButton.setAttribute("alt", "Copy Ticket and Summary");
			CopyOwnerButton.setAttribute("title", "Copy Ticket and Summary");
			CopyOwnerButton.setAttribute("role", "presentation");
			CopyOwnerButton.setAttribute("height", "22");
			CopyOwnerButton.setAttribute("width", "22");

			//Add elements
			CopyOwnerA.appendChild(CopyOwnerButton);
			CopyOwnerLI.appendChild(CopyOwnerA);
			UI.appendChild(CopyOwnerLI);
        }
		
	};
	 
};
