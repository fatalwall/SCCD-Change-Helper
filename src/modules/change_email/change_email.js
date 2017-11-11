/* 
 *Copyright (C) 2017 Peter Varney - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license, 
 *
 * You should have received a copy of the MIT license with
 * this file. If not, visit : https://github.com/fatalwall/SCCD-Tools
 */ 

var change_email = function() {
	'use strict';

	return {

		'Action': function () {
			chrome.storage.sync.get(
				['email'], 
				function(items) {
					if (validateEmail(document.getElementById('mx4f03a39e').value)) {
						//If userID and email are the same
						var href = "mailto:" + encodeURIComponent(document.getElementById('mxc03801eb').value) + "<" + encodeURIComponent(document.getElementById('mx4f03a39e').value) + ">?";
						if (items.email != undefined) {
							if (items.email != "") {
								href = href + "cc=" + encodeURIComponent(items.email.replace(',',';')) + "&";
							}
						}
						href = href + "subject=" + encodeURIComponent(document.getElementById('mx9d44d398').value + " - " + document.getElementById('mxe9abc5a').value) ;
						window.location.href = href;
					} else {
						//Method needed to convert userID to email
						var xmlhttp = new XMLHttpRequest();
						xmlhttp.onreadystatechange = function() {
							if(this.readyState == 4 && this.status ==200) {
								var obj = JSON.parse(this.responseText);
								
								var href = "mailto:" + encodeURIComponent(obj.PERSONMboSet.PERSON[0].Attributes.DISPLAYNAME.content) + "<" + encodeURIComponent(obj.PERSONMboSet.PERSON[0].Attributes.PRIMARYEMAIL.content) + ">?";
								if (items.email != undefined) {
									if (items.email != "") {
										href = href + "cc=" + encodeURIComponent(items.email.replace(',',';')) + "&";
									}
								}
								href = href + "subject=" + encodeURIComponent(document.getElementById('mx9d44d398').value + " - " + document.getElementById('mxe9abc5a').value) ;
								window.location.href = href;
							}
						};
						xmlhttp.open("GET", "https://129.39.231.177/maxrest/rest/mbo/person/?personid=" + getFieldValue('mx4f03a39e') + "&_format=json", true);
						xmlhttp.send();
					}
				}
			);
		},
		
        'Add': function () {
			var SCCD = document.getElementById("mx22d674a4_holder");
			var UI = SCCD.getElementsByTagName("ul")[0]
			
			var EmailOwnerLI = document.createElement("li");
			EmailOwnerLI.setAttribute("role", "presentation");
			EmailOwnerLI.setAttribute("ctype", "toolbarbutton");

			var EmailOwnerA = document.createElement("a");
			EmailOwnerA.setAttribute("role", "button");
			EmailOwnerA.setAttribute("ctype", "toolbarbutton");
			EmailOwnerA.setAttribute("onkeydown", "itemAKey(event,this)");
			EmailOwnerA.setAttribute("onfocus", "appendClass(this,'onhover')");
			EmailOwnerA.setAttribute("onblur", "removeClass(this,'onhover')");
			EmailOwnerA.setAttribute("class", "on");
			EmailOwnerA.setAttribute("title", "Email Change Owner");
			EmailOwnerA.addEventListener("click", this.Action, false);

			var EmailOwnerButton = document.createElement("img");
			EmailOwnerButton.setAttribute("src", chrome.extension.getURL("modules/change_email/email.png"));
			EmailOwnerButton.setAttribute("alt", "Email Change Owner");
			EmailOwnerButton.setAttribute("title", "Email Change Owner");
			EmailOwnerButton.setAttribute("role", "presentation");
			EmailOwnerButton.setAttribute("height", "22");
			EmailOwnerButton.setAttribute("width", "22");

			//Add elements
			EmailOwnerA.appendChild(EmailOwnerButton);
			EmailOwnerLI.appendChild(EmailOwnerA);
			UI.appendChild(EmailOwnerLI);
        }
		
	};
	 
};
