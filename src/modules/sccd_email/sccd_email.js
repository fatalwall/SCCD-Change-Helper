/* 
 *Copyright (C) 2017 Peter Varney - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license, 
 *
 * You should have received a copy of the MIT license with
 * this file. If not, visit : https://github.com/fatalwall/SCCD-Tools
 */ 

 function SendEmail(To, Cc, Subject){
	var href = "mailto:" + To + ">?";
	if (Cc != "") {
		href = href + "cc=" + Cc + "&";
	}
	href = href + "subject=" + Subject ;
	window.location.href = href; 
 }
 
function SendEmailOwner(OwnerID, OptionsEmail, Subject){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status ==200) {
			var To = "";
			var Cc = "";
			var obj = JSON.parse(this.responseText);
			
			//To address
			To = encodeURIComponent(obj.PERSONMboSet.PERSON[0].Attributes.DISPLAYNAME.content) + "<" + encodeURIComponent(obj.PERSONMboSet.PERSON[0].Attributes.PRIMARYEMAIL.content);
			
			//Cc addresses if any
			if (OptionsEmail != undefined) {
				if (OptionsEmail != "") {
					Cc = encodeURIComponent(OptionsEmail.replace(',',';'));
				}
			}
			//Subject
			console.log("Value:" + getVariableValue('value').toUpperCase());
			
			SendEmail(To,Cc,Subject);
		}
	};
	//Trigger event to send email by Person Owner
	if (OwnerID != undefined || OwnerID != ""){
		xmlhttp.open("GET", document.location.toString().split('?')[0].replace('maximo/ui/', 'maxrest/rest/mbo/') + "person/?personid=" + encodeURIComponent(OwnerID) + "&_format=json", true);
		xmlhttp.send();			
	}
}

function SendEmailOwnerGroup(OwnerGroup, OptionsEmail, Subject){
var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status ==200) {
			var obj = JSON.parse(this.responseText);

			SendEmailOwner(obj.PERSONGROUPTEAMMboSet.PERSONGROUPTEAM[0].Attributes.RESPPARTYGROUP.content, OptionsEmail, Subject);
		}
	};
	//Trigger event to send email by Person Owner
	if (OwnerGroup != undefined || OwnerGroup != ""){
		xmlhttp.open("GET", document.location.toString().split('?')[0].replace('maximo/ui/', 'maxrest/rest/mbo/') + "PERSONGROUPTEAM/?PERSONGROUP=" + encodeURIComponent(OwnerGroup) + "&GROUPDEFAULT=1&_format=json", true);
		xmlhttp.send();			
	}
}
 
var sccd_email = function() {
	'use strict';

	return {

		'Action': function () {
			chrome.storage.sync.get(
				['email'], 
				function(items) {
					var ownerid;
					var groupid;
					var Subject = "";
					switch (getVariableValue('value').toUpperCase()) {
						case 'ACTIVITY':
							ownerid=getFieldValue('mx23883b91');
							groupid=getFieldValue('mx70126015');
							Subject = encodeURIComponent(getFieldValue('mx1baa75a9') + " - " + getFieldValue('mxe7cd17de') + " - " + getFieldValue('mx82a32413')) ;
							break;
						case 'WOTRACK':
							ownerid=getFieldValue('mx6f7d4245');
							groupid=getFieldValue('mxe8db8906');
							Subject = encodeURIComponent(getFieldValue('mx1185dcd0') + " - " + getFieldValue('mx888c8d6a')) ;
							break;
						case 'CHANGE':
							ownerid=getFieldValue('mx4f03a39e');
							groupid=getFieldValue('mx63eba66');
							Subject = encodeURIComponent(getFieldValue('mx9d44d398') + " - " + getFieldValue('mxe9abc5a')) ;
							break;
						case 'INCIDENT':		
						case 'SR':
						case 'PROBLEM':
							ownerid=getFieldValue('mx480ab870');
							groupid=getFieldValue('mx9fe83828');
							Subject = encodeURIComponent(getFieldText('mxf4d1d458') + " - " + getFieldText('mxc13c620b')) ;
							break;
					}
																
					if (ownerid === undefined || ownerid === null || ownerid != ""){
						SendEmailOwner(ownerid, items.email, Subject);
					} else if (groupid === undefined || groupid === null || groupid != ""){ 
						SendEmailOwnerGroup(groupid, items.email, Subject);
					} 
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
			
			var EmailOwnerLI = document.createElement("li");
			EmailOwnerLI.setAttribute("id",id);
			EmailOwnerLI.setAttribute("role", "presentation");
			EmailOwnerLI.setAttribute("ctype", "toolbarbutton");

			var EmailOwnerA = document.createElement("a");
			EmailOwnerA.setAttribute("role", "button");
			EmailOwnerA.setAttribute("ctype", "toolbarbutton");
			EmailOwnerA.setAttribute("onkeydown", "itemAKey(event,this)");
			EmailOwnerA.setAttribute("onfocus", "appendClass(this,'onhover')");
			EmailOwnerA.setAttribute("onblur", "removeClass(this,'onhover')");
			EmailOwnerA.setAttribute("class", "on");
			EmailOwnerA.setAttribute("title", "Email Owner");
			EmailOwnerA.addEventListener("click", this.Action, false);

			var EmailOwnerButton = document.createElement("img");
			EmailOwnerButton.setAttribute("src", chrome.extension.getURL("modules/sccd_email/email.png"));
			EmailOwnerButton.setAttribute("alt", "Email Owner");
			EmailOwnerButton.setAttribute("title", "Email Owner");
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
