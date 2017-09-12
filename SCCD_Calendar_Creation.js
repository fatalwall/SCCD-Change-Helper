function CreateCalendarButton() {
	if (document.getElementById("mxb2c5b3bc").value != "DRAFT"
		&& document.getElementById("mxb2c5b3bc").value != "COMP"
		&& document.getElementById("mxb2c5b3bc").value != "CLOSE"
		&& document.getElementById("mxb2c5b3bc").value != "CAN"
		&& document.getElementById("mxb2c5b3bc").value != "REJECTED"
		&& document.getElementById("mxb2c5b3bc").value != "FAIL"
		) {
		var SCCD = document.getElementById("mx22d674a4_holder");
		var UI = SCCD.getElementsByTagName("ul")[0]

		
		var SendToCalendarLI = document.createElement("li");
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

		var SendToCalendarButton = document.createElement("img");
		SendToCalendarButton.setAttribute("src", chrome.extension.getURL("calendar.png"));
		SendToCalendarButton.setAttribute("alt", "Send to Calendar");
		SendToCalendarButton.setAttribute("role", "presentation");
		SendToCalendarButton.setAttribute("height", "22");
		SendToCalendarButton.setAttribute("width", "22");
		SendToCalendarButton.addEventListener("click", SendToCalendar, false);

		//Add elements
		SendToCalendarA.appendChild(SendToCalendarButton);
		SendToCalendarLI.appendChild(SendToCalendarA);
		UI.appendChild(SendToCalendarLI);
	}
}

function CreateEmailButton() {
	var SCCD = document.getElementById("mx22d674a4_holder");
	var UI = SCCD.getElementsByTagName("ul")[0]

	
	var EmailOwnerLI = document.createElement("li");
	EmailOwnerLI.setAttribute("role", "presentation");
	EmailOwnerLI.setAttribute("ctype", "toolbarbutton");

	var EmailOwnerA = document.createElement("a");
	EmailOwnerA.setAttribute("role", "button");
	EmailOwnerA.setAttribute("ctype", "toolbarbutton");
	EmailOwnerA.setAttribute("href", "javascript:sendEvent('EmailChangeOwner','EmailChangeOwner','')");
	EmailOwnerA.setAttribute("onkeydown", "itemAKey(event,this)");
	EmailOwnerA.setAttribute("onfocus", "appendClass(this,'onhover')");
	EmailOwnerA.setAttribute("onblur", "removeClass(this,'onhover')");
	EmailOwnerA.setAttribute("class", "on");

	var EmailOwnerButton = document.createElement("img");
	EmailOwnerButton.setAttribute("src", chrome.extension.getURL("email.png"));
	EmailOwnerButton.setAttribute("alt", "Email Change Owner");
	EmailOwnerButton.setAttribute("role", "presentation");
	EmailOwnerButton.setAttribute("height", "22");
	EmailOwnerButton.setAttribute("width", "22");
	EmailOwnerButton.addEventListener("click", EmailChangeOwner, false);

	//Add elements
	EmailOwnerA.appendChild(EmailOwnerButton);
	EmailOwnerLI.appendChild(EmailOwnerA);
	UI.appendChild(EmailOwnerLI);

}

function EmailChangeOwner(e){
	chrome.storage.sync.get(
		['email'], 
		function(items) {
			window.location.href = "mailto:" + encodeURIComponent(document.getElementById('mxc03801eb').value) + "<" + encodeURIComponent(document.getElementById('mx4f03a39e').value) + ">?cc=" + encodeURIComponent(items.email) + "&subject=" + encodeURIComponent(document.getElementById('mx9d44d398').value + " - " + document.getElementById('mxe9abc5a').value) ;
		}
	);
}

function SendToCalendar(e) {
	       /**
         * Add event to the calendar
         * @param  {string} subject     Subject/Title of event
         * @param  {string} description Description of event
         * @param  {string} location    Location of event
         * @param  {string} begin       Beginning date of event
         * @param  {string} stop        Ending date of event
		 * @param  {String} showAs		How the event should show in the calandar FREE BUSY
		 * @param  {String} email
         * @param  {number} before      Amount of time before event to trigger alarm
         * @param  {string} unit        Unit of time for alarm trigger
         */
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
				, '<div><a href=' + document.location.toString().split('?')[0] + '?event=loadapp&value=change&uniqueid=' + document.location.toString().split('uniqueid=')[1].split('&')[0] + '>SCCD Direct Link</a></div>' + document.getElementById('mxc0073963').contentDocument.body.innerHTML
				, ''
				, document.getElementById("mx6406e617").value
				, document.getElementById("mx38a35846").value
				, items.showAS
				, items.email
				, items.reminderTime
				, items.reminderUnit);
			} else {
				cal.addEvent(document.getElementById('mx9d44d398').value + " - " + document.getElementById('mxe9abc5a').value
				, '<div><a href=' + document.location.toString().split('?')[0] + '?event=loadapp&value=change&uniqueid=' + document.location.toString().split('uniqueid=')[1].split('&')[0] + '>SCCD Direct Link</a></div>' + document.getElementById('mxc0073963').contentDocument.body.innerHTML
				, ''
				, document.getElementById("mx6406e617").value
				, document.getElementById("mx38a35846").value
				, items.showAS
				, 'JohnSnow@TheWall.com'
				);
			}
			cal.download(document.getElementById('mx9d44d398').value);
		}
	);
}

CreateEmailButton();
CreateCalendarButton();


