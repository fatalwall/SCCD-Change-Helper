/* 
 *Copyright (C) 2017 Peter Varney - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license, 
 *
 * You should have received a copy of the MIT license with
 * this file. If not, visit : https://github.com/fatalwall/SCCD-Tools
 */ 

var varChange_Calendar = change_calendar();

var varChange_Calendar_onchange = function(element, callback) {
	var HTML = element.innerHTML;
	window.setInterval(function() {
		var newHTML = element.innerHTML;
		if(HTML !== newHTML) {
			HTML = newHTML;
			callback(element);
		}
	});
}
varChange_Calendar_onchange(document.body, function(){
		var rightScreen  = document.getElementById('mx9d44d398');
		if (rightScreen === undefined || rightScreen===null){
			//Not the right screen
			varChange_Calendar.Remove("SCCDToolsChangeCalendar");
		} else {
			//The right screen
			var MyElement = document.getElementById('SCCDToolsChangeCalendar')
			if (MyElement === undefined || MyElement===null){
				varChange_Calendar.Add("SCCDToolsChangeCalendar");
			}
		}
});