/* 
 *Copyright (C) 2017 Peter Varney - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license, 
 *
 * You should have received a copy of the MIT license with
 * this file. If not, visit : https://github.com/fatalwall/SCCD-Tools
 */ 

var sccd_new_ticket = function() {
	'use strict';

	return {
		
        'Add': function () {
			console.log("sccd_new_ticekt.add - Start");
			
			var UISESSIONID = getFieldValue("uisessionid");
			var CSRFTOKEN = getFieldValue("csrftokenholder");
								
			var SCCD = document.getElementsByClassName("titlebarlinks")[0];
			var TR = SCCD.getElementsByTagName("tr")[0];
			var TD = document.createElement("td");
			TD.setAttribute("nowrap", "nowrap");
			TD.setAttribute("align", "middle");
			TD.setAttribute("valign", "middle");
			TD.setAttribute("style", "vertical-align:middle; padding-right: 5px; padding-left: 5px;");
			TD.setAttribute("height", "30");
			TD.setAttribute("width", "140");
			

			
			var quickButtons = document.createElement("div");
			quickButtons.setAttribute("style", "background-color: #fff; border-radius: 25px; border: 2px solid #2166ab; white-space: nowrap; height: 26px;");
			
			//Change
				var change_a = document.createElement("a");
				change_a.setAttribute("href", document.location.toString().split('?')[0] + '?event=loadapp&value='+'change'+'&additionalevent=insert&additionaleventvalue=templateid=&uisessionid=' + UISESSIONID  + '&csrftoken=' + CSRFTOKEN);
				change_a.setAttribute("title", "New Change");

				var change_img = document.createElement("img");
				change_img.setAttribute("src", "../webclient/skins-20170317-2238/tivoli13/images/action_insert_change.gif");
				change_img.setAttribute("alt", "New Change");
				change_img.setAttribute("class", "pwimg");
				
				change_a.appendChild(change_img);
				quickButtons.appendChild(change_a);
			
			//Problem
				var problem_a = document.createElement("a");
				problem_a.setAttribute("href", document.location.toString().split('?')[0] + '?event=loadapp&value='+'problem'+'&additionalevent=insert&additionaleventvalue=templateid=&uisessionid=' + UISESSIONID  + '&csrftoken=' + CSRFTOKEN);
				problem_a.setAttribute("title", "New Problem");

				var problem_img = document.createElement("img");
				problem_img.setAttribute("src", "../webclient/skins-20170317-2238/tivoli13/images/action_insert_problem.gif");
				problem_img.setAttribute("alt", "New Problem");
				problem_img.setAttribute("class", "pwimg");
				
				problem_a.appendChild(problem_img);
				quickButtons.appendChild(problem_a);
			
			//Incident
				var incident_a = document.createElement("a");
				incident_a.setAttribute("href", document.location.toString().split('?')[0] + '?event=loadapp&value='+'incident'+'&additionalevent=insert&additionaleventvalue=templateid=&uisessionid=' + UISESSIONID  + '&csrftoken=' + CSRFTOKEN);
				incident_a.setAttribute("title", "New Incident");

				var incident_img = document.createElement("img");
				incident_img.setAttribute("src", "../webclient/skins-20170317-2238/tivoli13/images/action_insert_incident.gif");
				incident_img.setAttribute("alt", "New Incident");
				incident_img.setAttribute("class", "pwimg");
				
				incident_a.appendChild(incident_img);
				quickButtons.appendChild(incident_a);
				
			//Service Request
				var servicerequest_a = document.createElement("a");
				servicerequest_a.setAttribute("href", document.location.toString().split('?')[0] + '?event=loadapp&value='+'sr'+'&additionalevent=insert&additionaleventvalue=templateid=&uisessionid=' + UISESSIONID  + '&csrftoken=' + CSRFTOKEN);
				servicerequest_a.setAttribute("title", "New Service Request");

				var servicerequest_img = document.createElement("img");
				servicerequest_img.setAttribute("src", "../webclient/skins-20170317-2238/tivoli13/images/action_insert_sr.gif");
				servicerequest_img.setAttribute("alt", "New Service Request");
				servicerequest_img.setAttribute("class", "pwimg");
				
				servicerequest_a.appendChild(servicerequest_img);
				quickButtons.appendChild(servicerequest_a);
				

			TD.appendChild(quickButtons);
			TR.insertBefore(TD,TR.getElementsByTagName("td")[0]);
			console.log("sccd_new_ticekt.add - Complete");
		}	
	};
};

