/* 
 *Copyright (C) 2017 Peter Varney - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license, 
 *
 * You should have received a copy of the MIT license with
 * this file. If not, visit : https://github.com/fatalwall/SCCD-Tools
 */ 

 function validateEmail(email) 
{
    var val = /\S+@\S+\.\S+/;
    return val.test(email);
}
 
var varChange_Email = sccd_email();

var varChange_Email_onchange = function(element, callback) {
	var HTML = element.innerHTML;
	window.setInterval(function() {
		var newHTML = element.innerHTML;
		if(HTML !== newHTML) {
			HTML = newHTML;
			callback(element);
		}
	});
}
	
varChange_Email_onchange(document.body, function(){
	var rightScreenChange  = document.getElementById('mx9d44d398');
	var rightScreenTicket  = document.getElementById('mxf4d1d458');
	var rightScreenWorkorder  = document.getElementById('mx1185dcd0');
	if ((rightScreenChange === undefined || rightScreenChange === null) && (rightScreenTicket === undefined || rightScreenTicket === null) && (rightScreenWorkorder === undefined || rightScreenWorkorder === null)){
		//Not the right screen
		varChange_Email.Remove("SCCDToolsEmailOwner");
	} else {
		//The right screen
		var MyElement = document.getElementById('SCCDToolsEmailOwner');
		if (MyElement === undefined || MyElement===null){
			varChange_Email.Add("SCCDToolsEmailOwner");
		}
	}
});