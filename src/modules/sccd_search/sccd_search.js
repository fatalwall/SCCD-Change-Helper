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
							//https://129.39.231.177/maximo/ui/?event=loadapp&value=change&additionalevent=useqbe&additionaleventvalue=wonum=531497
							window.location.href = document.location.toString().split('?')[0] + '?event=loadapp&value=change&additionalevent=useqbe&additionaleventvalue=wonum=' + sccdID[2] +'&uisessionid=' + UISESSIONID  + '&csrftoken=' + CSRFTOKEN ;
							break;
						case 'IN':
							//https://129.39.231.177/maximo/ui/?event=loadapp&value=incident&additionalevent=useqbe&additionaleventvalue=ticketid=694351
							window.location.href = document.location.toString().split('?')[0] + '?event=loadapp&value=incident&additionalevent=useqbe&additionaleventvalue=ticketid=' + sccdID[2] +'&uisessionid=' + UISESSIONID  + '&csrftoken=' + CSRFTOKEN ;
							break;
						case 'SR':
							//https://129.39.231.177/maximo/ui/?event=loadapp&value=sr&additionalevent=useqbe&additionaleventvalue=ticketid=723230
							window.location.href = document.location.toString().split('?')[0] + '?event=loadapp&value=sr&additionalevent=useqbe&additionaleventvalue=ticketid=' + sccdID[2] +'&uisessionid=' + UISESSIONID  + '&csrftoken=' + CSRFTOKEN ;
							break;
						case 'PR':
							//https://129.39.231.177/maximo/ui/?event=loadapp&value=problem&additionalevent=useqbe&additionaleventvalue=ticketid=500523
							window.location.href = document.location.toString().split('?')[0] + '?event=loadapp&value=problem&additionalevent=useqbe&additionaleventvalue=ticketid=' + sccdID[2] +'&uisessionid=' + UISESSIONID  + '&csrftoken=' + CSRFTOKEN ;
							break;
						case 'A':
							//https://129.39.231.177/maximo/ui/?event=loadapp&value=activity&additionalevent=useqbe&additionaleventvalue=wonum=509062
							window.location.href = document.location.toString().split('?')[0] + '?event=loadapp&value=activity&additionalevent=useqbe&additionaleventvalue=wonum=' + sccdID[2] +'&uisessionid=' + UISESSIONID  + '&csrftoken=' + CSRFTOKEN ;
							break;
						case 'WO':
							//This may be opening in the wrong applicaiton type
							//https://129.39.231.177/maximo/ui/?event=loadapp&value=wotrack&additionalevent=useqbe&additionaleventvalue=wonum=WO517000
							window.location.href = document.location.toString().split('?')[0] + '?event=loadapp&value=wotrack&additionalevent=useqbe&additionaleventvalue=wonum=WO' + sccdID[2] +'&uisessionid=' + UISESSIONID  + '&csrftoken=' + CSRFTOKEN ;
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

