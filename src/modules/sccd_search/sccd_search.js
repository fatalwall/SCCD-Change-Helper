/* 
 *Copyright (C) 2017 Peter Varney - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license, 
 *
 * You should have received a copy of the MIT license with
 * this file. If not, visit : https://github.com/fatalwall/SCCD-Tools
 */ 

var sccd_search = function() {
	'use strict';

	return {

		'Action': function (e) {
			var key=e.keyCode || e.which;
			if (key==13){
				var Search = document.getElementById('sccd_search_box');
				var r = new RegExp(Search.pattern);
				Search.value= Search.value.toUpperCase();
				if(r.test(Search.value)){
					//		<input type="text" size="45" name="uisessionid" id="uisessionid" value="2999" class="fld_ro" readonly="readonly" title="ui session id"/><br />
					//<input type="text" size="45" name="csrftokenholder" id="csrftokenholder" value="9iu225n3ua4q4qdrc05qick3h9" title="CSRF Token" readonly="readonly" class="fld_ro"/><br />
					
					var UISESSIONID = getFieldValue("uisessionid");
					var CSRFTOKEN = getFieldValue("csrftokenholder");
					var sccdID = (Search.value).match(Search.pattern);
					switch(sccdID[1]) {
						case 'CH':
							if (document.title != 'Changes')
							{ //If on start page
								window.location.href = document.location.toString().split('?')[0] + '?event=loadapp&value=change&additionalevent=useqbe&additionaleventvalue=wonum=' + sccdID[2] +'&uisessionid=' + UISESSIONID  + '&csrftoken=' + CSRFTOKEN ;
							}
							else
							{ //Check if on change Application page
								//As the above method does not work if your already on an IN hence
								var SCCD_APP_Search = document.getElementById('mxbc7f7c61');
								SCCD_APP_Search.value = Search.value;
								const event = new KeyboardEvent("keypress", {
								  view: window,
								  keyCode: 13,
								  bubbles: true,
								  cancelable: true
								});
								SCCD_APP_Search.dispatchEvent(event);
							}
							break;
						case 'IN':
							if (document.title != 'Incidents')
							{ //If on start page
								window.location.href = document.location.toString().split('?')[0] + '?event=loadapp&value=incident&additionalevent=useqbe&additionaleventvalue=ticketid=' + sccdID[2] +'&uisessionid=' + UISESSIONID  + '&csrftoken=' + CSRFTOKEN ;
							}
							else
							{ //Check if on Incident Application page
								//As the above method does not work if your already on an IN hence
								var SCCD_APP_Search = document.getElementById('mxbc7f7c61');
								SCCD_APP_Search.value = Search.value;
								const event = new KeyboardEvent("keypress", {
								  view: window,
								  keyCode: 13,
								  bubbles: true,
								  cancelable: true
								});
								SCCD_APP_Search.dispatchEvent(event);
							}

							// Alternative method but has very page specific requirements making it annoyingly not useful
							//var xhr = new XMLHttpRequest;xhr.open('GET', 'https://129.39.231.177/maxrest/rest/os/mxincident?TICKETID=' + Search.value + '&_format=json', true);
							//xhr.onload = function (e) {
							//	 var myArr = JSON.parse(this.responseText);
							//	 var TICKETUID = myArr.QueryMXINCIDENTResponse.MXINCIDENTSet.INCIDENT[0].Attributes.TICKETUID.content;
							//	 window.location.href = "javascript:sendEvent('openrecord','mxca643ac3','incident-" + TICKETUID + "');"; //Incident Analyst
							// };
							// xhr.send();
							

							break;
						case 'SR':
							if (document.title != 'Service Requests')
							{ //If on start page
								window.location.href = document.location.toString().split('?')[0] + '?event=loadapp&value=sr&additionalevent=useqbe&additionaleventvalue=ticketid=' + sccdID[2] +'&uisessionid=' + UISESSIONID  + '&csrftoken=' + CSRFTOKEN ;
							}
							else
							{ //Check if on change Application page
								//As the above method does not work if your already on an IN hence
								var SCCD_APP_Search = document.getElementById('mxbc7f7c61');
								SCCD_APP_Search.value = Search.value;
								const event = new KeyboardEvent("keypress", {
								  view: window,
								  keyCode: 13,
								  bubbles: true,
								  cancelable: true
								});
								SCCD_APP_Search.dispatchEvent(event);
							}
							break;
						case 'PR':							
							if (document.title != 'Problems')
							{ //If on start page
								window.location.href = document.location.toString().split('?')[0] + '?event=loadapp&value=problem&additionalevent=useqbe&additionaleventvalue=ticketid=' + sccdID[2] +'&uisessionid=' + UISESSIONID  + '&csrftoken=' + CSRFTOKEN ;
							}
							else
							{ //Check if on change Application page
								//As the above method does not work if your already on an IN hence
								var SCCD_APP_Search = document.getElementById('mxbc7f7c61');
								SCCD_APP_Search.value = Search.value;
								const event = new KeyboardEvent("keypress", {
								  view: window,
								  keyCode: 13,
								  bubbles: true,
								  cancelable: true
								});
								SCCD_APP_Search.dispatchEvent(event);
							}
							break;
						case 'A':
							if (document.title != 'Activities and Tasks')
							{ //If on start page
								window.location.href = document.location.toString().split('?')[0] + '?event=loadapp&value=activity&additionalevent=useqbe&additionaleventvalue=wonum=' + sccdID[2] +'&uisessionid=' + UISESSIONID  + '&csrftoken=' + CSRFTOKEN ;
							}
							else
							{ //Check if on change Application page
								//As the above method does not work if your already on an IN hence
								var SCCD_APP_Search = document.getElementById('mxbc7f7c61');
								SCCD_APP_Search.value = Search.value;
								const event = new KeyboardEvent("keypress", {
								  view: window,
								  keyCode: 13,
								  bubbles: true,
								  cancelable: true
								});
								SCCD_APP_Search.dispatchEvent(event);
							}
							break;
						case 'WO':
							//This may be opening in the wrong applicaiton type
							if (document.title != 'Work Order Tracking')
							{ //If on start page
								window.location.href = document.location.toString().split('?')[0] + '?event=loadapp&value=wotrack&additionalevent=useqbe&additionaleventvalue=wonum=WO' + sccdID[2] +'&uisessionid=' + UISESSIONID  + '&csrftoken=' + CSRFTOKEN ;
							}
							else
							{ //Check if on change Application page
								//As the above method does not work if your already on an IN hence
								var SCCD_APP_Search = document.getElementById('mxbc7f7c61');
								SCCD_APP_Search.value = Search.value;
								const event = new KeyboardEvent("keypress", {
								  view: window,
								  keyCode: 13,
								  bubbles: true,
								  cancelable: true
								});
								SCCD_APP_Search.dispatchEvent(event);
							}
							break;	
						default:
							alert('Improper entry. Please ensure you start with CH, IN, SR, WO, PR or A');

					}
					return true;
				}else{
					alert('Improper entry. Please ensure you are entering characters (CH, IN, SR, PR, WO, A) followed by 6 numbers.');
					return false;
				}
			}
		},
		
        'Add': function () {
			
			var SCCD = document.getElementsByClassName("titlebarlinks")[0];
			var TR = SCCD.getElementsByTagName("tr")[0];
			var TD = document.createElement("td");
			
			var Search = document.createElement("input");
			Search.setAttribute("type", "text");
			Search.setAttribute("id", "sccd_search_box");
			Search.setAttribute("name", "sccd_search_box");
			Search.setAttribute("pattern", "^(CH|IN|PR|SR|WO|A)([1-9][0-9]{5})$");
			Search.setAttribute("title", "Workorder or Ticket Number");
			Search.setAttribute("placeholder", "IN######");
			Search.setAttribute("autocomplete", "off");
			Search.setAttribute("maxlength", "8");
			Search.style["width"] = "70px";
			Search.addEventListener("keypress", this.Action, false);

			TD.appendChild(Search);
			TR.insertBefore(TD,TR.getElementsByTagName("td")[0]);
		}	
	};
};

