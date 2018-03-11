/* 
 *Copyright (C) 2018 Peter Varney - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license, 
 *
 * You should have received a copy of the MIT license with
 * this file. If not, visit : https://github.com/fatalwall/SCCD-Tools
 */ 
 
if(getVariableValue('value')!='startcntr'){
	var varTicket_Copy = sccd_ticket_copy();
	
	var varTicket_Copy_onchange = function(element, callback) {
		var HTML = element.innerHTML;
		window.setInterval(function() {
			var newHTML = element.innerHTML;
			if(HTML !== newHTML) {
				HTML = newHTML;
				callback(element);
			}
		});
	}
	varTicket_Copy_onchange(document.body, function(){
			var rightScreenChange  = document.getElementById('mx9d44d398');
			var rightScreenTicket  = document.getElementById('mxf4d1d458');
			var rightScreenWorkorder  = document.getElementById('mx1185dcd0');
			if ((rightScreenChange === undefined || rightScreenChange === null) && (rightScreenTicket === undefined || rightScreenTicket === null) && (rightScreenWorkorder === undefined || rightScreenWorkorder === null)){
				//Not the right screen
				varTicket_Copy.Remove("SCCDToolsTicketCopyLink");
			} else {
				//The right screen
				var MyElement = document.getElementById("SCCDToolsTicketCopyLink");
				if (MyElement === undefined || MyElement===null){
						varTicket_Copy.Add("SCCDToolsTicketCopyLink");
				}
			}
	});
}
