/* 
 *Copyright (C) 2017 Peter Varney - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license, 
 *
 * You should have received a copy of the MIT license with
 * this file. If not, visit : https://github.com/fatalwall/SCCD-Tools
 */ 

var change_calendar = function() {
	'use strict';

	return {

		'Action': function () {
			chrome.storage.sync.get(
				['showAS', 'reminderTime', 'reminderUnit', 'reminderEnabled', 'email'], 
				function(items) {
					if (typeof items.showAS === 'undefined'){
						items.showAS = 'FREE';
					}
					if (typeof items.reminderTime === 'undefined'){
						items.reminderTime = 15;
					}
					if (typeof items.reminderUnit === 'undefined'){
						items.reminderUnit = 'M';
					}
					if (typeof items.reminderEnabled === 'undefined'){
						items.reminderEnabled = true;
					}
					
					var cal = ics();
					if (items.reminderEnabled == true) {
						cal.addEvent(document.getElementById('mx9d44d398').value + " - " + document.getElementById('mxe9abc5a').value
						, '<div><a href=' + document.location.toString().split('?')[0] + '?event=loadapp&value=change&additionalevent=useqbe&additionaleventvalue=wonum=' + getFieldValue('mx9d44d398') + '>SCCD Direct Link</a></div>' + document.getElementById('mxc0073963').contentDocument.body.innerHTML
						, ''
						, document.getElementById("mx6406e617").value
						, document.getElementById("mx38a35846").value
						, items.showAS
						, items.email
						, items.reminderTime
						, items.reminderUnit);
					} else {
						cal.addEvent(document.getElementById('mx9d44d398').value + " - " + document.getElementById('mxe9abc5a').value
						, '<div><a href=' + document.location.toString().split('?')[0] + '?event=loadapp&value=change&additionalevent=useqbe&additionaleventvalue=wonum=' + getFieldValue('mx9d44d398') + '>SCCD Direct Link</a></div>' + document.getElementById('mxc0073963').contentDocument.body.innerHTML
						, ''
						, document.getElementById("mx6406e617").value
						, document.getElementById("mx38a35846").value
						, items.showAS
						, items.email
						);
					}
					cal.download(document.getElementById('mx9d44d398').value);
				}
			);
		},
		'Remove': function(id) {
			var btn = document.getElementById(id);
			if (btn === undefined || btn===null){
				return true;
			} else {
				//Actions to delete element
				btn.parentElement.removeChild(btn);

			}
		},
        'Add': function (id) {
			if (['DRAFT', 'COMP', 'CLOSE', 'CAN', 'Rejected', 'FAIL'].indexOf(getFieldValue("mxb2c5b3bc")) < 0) {
				//document.getElementById("mxb2c5b3bc").value != "DRAFT"
				//&& document.getElementById("mxb2c5b3bc").value != "COMP"
				//&& document.getElementById("mxb2c5b3bc").value != "CLOSE"
				//&& document.getElementById("mxb2c5b3bc").value != "CAN"
				//&& document.getElementById("mxb2c5b3bc").value != "REJECTED"
				//&& document.getElementById("mxb2c5b3bc").value != "FAIL"
				
				var SCCD = document.getElementById("mx22d674a4_holder");
				var UI = SCCD.getElementsByTagName("ul")[0];
				
				var SendToCalendarLI = document.createElement("li");
				SendToCalendarLI.setAttribute("id",id);
				SendToCalendarLI.setAttribute("role", "presentation");
				SendToCalendarLI.setAttribute("ctype", "toolbarbutton");

				var SendToCalendarA = document.createElement("a");
				SendToCalendarA.setAttribute("role", "button");
				SendToCalendarA.setAttribute("ctype", "toolbarbutton");
				SendToCalendarA.setAttribute("href", "javascript:sendEvent('SendToCalendar','SendToCalendar','')");
				SendToCalendarA.setAttribute("onkeydown", "itemAKey(event,this)");
				SendToCalendarA.setAttribute("onfocus", "appendClass(this,'onhover')");
				SendToCalendarA.setAttribute("onblur", "removeClass(this,'onhover')");
				SendToCalendarA.setAttribute("class", "on");
				SendToCalendarA.setAttribute("title", "Send to Calendar");
				SendToCalendarA.addEventListener("click", this.Action, false);

				var SendToCalendarButton = document.createElement("img");
				SendToCalendarButton.setAttribute("src", chrome.extension.getURL("modules/change_calendar/calendar.png"));
				SendToCalendarButton.setAttribute("alt", "Send to Calendar");
				SendToCalendarButton.setAttribute("title", "Send to Calendar");
				SendToCalendarButton.setAttribute("role", "presentation");
				SendToCalendarButton.setAttribute("height", "22");
				SendToCalendarButton.setAttribute("width", "22");

				//Add elements
				SendToCalendarA.appendChild(SendToCalendarButton);
				SendToCalendarLI.appendChild(SendToCalendarA);
				UI.appendChild(SendToCalendarLI);
			}
		}	
	};
};

