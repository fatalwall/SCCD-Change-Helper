/*
Licence: MIT
Original Source: https://github.com/nwcell/ics.js
Modifications for attendies 
*/

/* global saveAs, Blob, BlobBuilder, console */
/* exported ics */


var ics = function() {
    'use strict';

    if (navigator.userAgent.indexOf('MSIE') > -1 && navigator.userAgent.indexOf('MSIE 10') == -1) {
        console.log('Unsupported Browser');
        return;
    }

    var SEPARATOR = (navigator.appVersion.indexOf('Win') !== -1) ? '\r\n' : '\n';
    var calendarEvents = [];
    var calendarStart = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0'
    ].join(SEPARATOR);
	var calendarSubject;
	var calendarDescription;
	var calendarLocation;
	var calendarBegin;
	var calendarStop;
	var calendarShowAs;
	var calendarAlarmBefore;
	var calendarAlarmUnit;
	var calendarAttendees = [];
    var calendarEnd = SEPARATOR + 'END:VCALENDAR';

    return {
        /**
         * Returns events array
         * @return {array} Events
         */
        'events': function() {
            return calendarEvents;
        },

        /**
         * Returns calendar
         * @return {string} Calendar in iCalendar format
         */
        'calendar': function() {
            return calendarStart + SEPARATOR + calendarEvents.join(SEPARATOR) + calendarEnd;
        },

        /**
         * Add event to the calendar
         * @param  {string} subject     Subject/Title of event
         * @param  {string} description Description of event
         * @param  {string} location    Location of event
         * @param  {string} begin       Beginning date of event
         * @param  {string} stop        Ending date of event
		 * @param  {String} showAs		How the event should show in the calandar FREE BUSY
		 * @param  {String} email		How the event should show in the calandar FREE BUSY
         * @param  {number} before      Amount of time before event to trigger alarm
         * @param  {string} unit        Unit of time for alarm trigger
         */
        'addEvent': function(subject, description, location, begin, stop, showAs, email, before, unit) {
            // I'm not in the mood to make these optional... So they are all required
            if (typeof subject === 'undefined' ||
                typeof description === 'undefined' ||
                typeof location === 'undefined' ||
                typeof begin === 'undefined' ||
                typeof stop === 'undefined'
            ) {
                return false;
            };

            //TODO add time and time zone? use moment to format?
            var start_date = new Date(begin);
            var end_date = new Date(stop);

            var start_year = ("0000" + (start_date.getFullYear().toString())).slice(-4);
            var start_month = ("00" + ((start_date.getMonth() + 1).toString())).slice(-2);
            var start_day = ("00" + ((start_date.getDate()).toString())).slice(-2);
            var start_hours = ("00" + (start_date.getHours().toString())).slice(-2);
            var start_minutes = ("00" + (start_date.getMinutes().toString())).slice(-2);
            var start_seconds = ("00" + (start_date.getSeconds().toString())).slice(-2);

            var end_year = ("0000" + (end_date.getFullYear().toString())).slice(-4);
            var end_month = ("00" + ((end_date.getMonth() + 1).toString())).slice(-2);
            var end_day = ("00" + ((end_date.getDate()).toString())).slice(-2);
            var end_hours = ("00" + (end_date.getHours().toString())).slice(-2);
            var end_minutes = ("00" + (end_date.getMinutes().toString())).slice(-2);
            var end_seconds = ("00" + (end_date.getSeconds().toString())).slice(-2);

            var start_time = 'T' + start_hours + start_minutes + start_seconds;
			var end_time = 'T' + end_hours + end_minutes + end_seconds;

            var start = start_year + start_month + start_day + start_time;
            var end = end_year + end_month + end_day + end_time;

            var calendarEvent = [
                'BEGIN:VEVENT',
			].concat(
				this.SetAttendee(email)
			).concat([
                'CLASS:PUBLIC',
                //'DESCRIPTION:' + description.replace(/(\r\n|\n|\r)/gm,""),
                'DTSTART;VALUE=DATE:' + start,
                'DTEND;VALUE=DATE:' + end,
                'LOCATION:' + location,
                'SUMMARY;LANGUAGE=en-us:' + subject,
                'TRANSP:TRANSPARENT',
				'X-ALT-DESC;FMTTYPE=text/html:' + description.replace(/(\r\n|\n|\r)/gm,""),
            ]).concat(
				this.SetShowAs(showAs)
			).concat(
                this.createAlarm(before, unit)
            ).concat([
                'END:VEVENT'
            ]).join(SEPARATOR);

            calendarEvents.push(calendarEvent);
            return calendarEvent;
        },
		
		
		/**
         * Adds an Attendee group if one has been provided
         * @param  {string} Value        Email address that should be added
         */
        'SetAttendee': function (value) {
            if (typeof value === 'undefined' || value == '' ) {
                return [];
            };

			var attendee = [];
			
			//Determine if one or multiple addresses
			if (value.toString().indexOf(',') == -1){
				//Only one email address
				var attendee = [
				'ATTENDEE:mailto:' + value,
				];
			}else{
				//multiple email addresses
				var email = value.toString().split(',');
				attendee = ['ATTENDEE:mailto:' + email[0],];
				for (var i = 1, len = email.length; i < len; i++) {
					attendee.push(['ATTENDEE:mailto:' + email[i],]);
				}
			}
            return attendee;
        },
		
		 /**
         * Identifies how the Event shows in the calendar
         * @param  {string} Value        How the event should show in the calandar FREE BUSY
         */
        'SetShowAs': function (value) {
            if (typeof value === 'undefined' ) {
                return [];
            };

            var showAs = [
				'X-MICROSOFT-CDO-BUSYSTATUS:' + value,
				'X-MICROSOFT-CDO-INTENDEDSTATUS:' + value,
            ];

            return showAs;
        },
		
        /**
         * Creates alarms for calendar event
         * @param  {number} before      Amount of time before event to trigger alarm
         * @param  {string} unit        Unit of time for alarm trigger
         */
        'createAlarm': function (before, unit) {
            if (typeof before === 'undefined' || typeof unit === 'undefined') {
                return [];
            };

            var alarm = [
                'BEGIN:VALARM',
                'TRIGGER:-PT' + before + unit,
                'ACTION:DISPLAY',
                'DESCRIPTION:Reminder',
                'END:VALARM'
            ];

            return alarm;
        },

        /**
         * Download calendar using the saveAs function from filesave.js
         * @param  {string} filename Filename
         * @param  {string} ext      Extention
         */
        'download': function(filename, ext) {
            if (calendarEvents.length < 1) {
                return false;
            }

            ext = (typeof ext !== 'undefined') ? ext : '.ics';
            filename = (typeof filename !== 'undefined') ? filename : 'calendar';
            var calendar = calendarStart + SEPARATOR + calendarEvents.join(SEPARATOR) + calendarEnd;

            var blob;
            if (navigator.userAgent.indexOf('MSIE 10') === -1) { // chrome or firefox
                blob = new Blob([calendar]);
            } else { // ie
                var bb = new BlobBuilder();
                bb.append(calendar);
                blob = bb.getBlob('text/x-vCalendar;charset=' + document.characterSet);
            }
            saveAs(blob, filename + ext);
            return calendar;
        }
    };
};
