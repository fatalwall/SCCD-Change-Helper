// Copyright (c) 2017 Peter Varney. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function loadOptions() {
	chrome.storage.sync.get(
		['sccdurl', 'showAS', 'reminderTime', 'reminderUnit', 'reminderEnabled', 'email', 'newTicketChange', 'newTicketProblem', 'newTicketIncident', 'newTicketServiceRequest'], 
		function(items) {
			document.getElementById('sccdurl').value = items.sccdurl || 'https://sccd/maximo';
			document.getElementById('showAS').value = items.showAS || 'FREE';
			document.getElementById('reminderTime').value = items.reminderTime || '15';
			document.getElementById('reminderUnit').value = items.reminderUnit || 'M';
			if (items.reminderEnabled === undefined){
				document.getElementById('reminderEnabled').checked = true;
			} else {
				document.getElementById('reminderEnabled').checked = items.reminderEnabled;
			}
			document.getElementById('email').value = items.email || '';
			
			if (items.newTicketChange === undefined){
				document.getElementById('newTicketChange').checked = false;
			} else {
				document.getElementById('newTicketChange').checked = items.newTicketChange;
			}
			
			if (items.newTicketProblem === undefined){
				document.getElementById('newTicketProblem').checked = false;
			} else {
				document.getElementById('newTicketProblem').checked = items.newTicketProblem;
			}
			
			if (items.newTicketIncident === undefined){
				document.getElementById('newTicketIncident').checked = true;
			} else {
				document.getElementById('newTicketIncident').checked = items.newTicketIncident;
			}
			
			if (items.newTicketServiceRequest === undefined){
				document.getElementById('newTicketServiceRequest').checked = true;
			} else {
				document.getElementById('newTicketServiceRequest').checked = items.newTicketServiceRequest;
			}
		}
	);
}

function storeOptions() {
	var sccdurl = document.getElementById('sccdurl').value;
	var showAS = document.getElementById('showAS').value;
	var reminderTime = document.getElementById('reminderTime').value;
	var reminderUnit = document.getElementById('reminderUnit').value;
	var reminderEnabled = document.getElementById('reminderEnabled').checked;
	var email = document.getElementById('email').value;
	var newTicketChange = document.getElementById('newTicketChange').checked;
	var newTicketProblem = document.getElementById('newTicketProblem').checked;
	var newTicketIncident = document.getElementById('newTicketIncident').checked;
	var newTicketServiceRequest = document.getElementById('newTicketServiceRequest').checked;
	chrome.storage.sync.set(
		{
		'sccdurl': sccdurl,
		'showAS': showAS,
		'reminderTime': reminderTime,
		'reminderUnit': reminderUnit,
		'reminderEnabled': reminderEnabled,
		'email': email,
		'newTicketChange': newTicketChange,
		'newTicketProblem': newTicketProblem,
		'newTicketIncident': newTicketIncident,
		'newTicketServiceRequest': newTicketServiceRequest
		}, 
		function() {
			console.log('Options Saved');
		}
	);
}

window.onload = function() {
  loadOptions();

  document.getElementById('sccdurl').onchange = storeOptions;
  document.getElementById('showAS').onchange = storeOptions;
  document.getElementById('reminderTime').onchange = storeOptions;
  document.getElementById('reminderUnit').onchange = storeOptions;
  document.getElementById('reminderEnabled').onchange = storeOptions;
  document.getElementById('email').onchange = storeOptions;

  //New Ticket Buttons
  document.getElementById('newTicketChange').onchange = storeOptions;
  document.getElementById('newTicketProblem').onchange = storeOptions;
  document.getElementById('newTicketIncident').onchange = storeOptions;
  document.getElementById('newTicketServiceRequest').onchange = storeOptions;
}