# SCCD Tools
For installation inscructions please see Wiki

## Overview
Google Chrome Extension for Creating a ICS file from a SCCD Change Record

This is a Chrome extention for use with IBM's SCCD ITIL Support Desk solution. This adds a new button to changes that are ready to go forward so that support teams who approve the change can socialize when the event will occur within their own team.

## Problem Statement
Company using a hosted SCCD for ITIL Support Desk ticketing system with limitations to what can and will be customized on the solution. Solution has many limitations that result in productivity loss.
- Searching for a record by ticket number requires navigating to the ticket types specific search page. Best case this is one mouse click to before data entry. Worse case requires three mouse clicks before data entry. If ticket is already closed addtional actions are required for those records to be showin in the search.
- Emailing Change owner for clarity or discusion of an issue with a change that an approver is reviewing. The Approver must go back and forth between email client and SCCD to copy and paste basic information such as change owners email address (additional look up required for usrs whos email and SCCD login are not the same), change number, change subject.
- Change approvers often need to communicate out to their support team awareness information about when a change will be occuring. This is done to reduce the effort of troubleshooting should an issue occur related to a change down the road. This is commonly handled with an meeting request sent through the users email client. This requires copping multiple fields back and forth between email client and SCCD.

## Propose Solution
Implement a Chrome/Firefox plugin to add the the following features without physically modifying SCCD:
- Text search bar on the top of every SCCD page. This will allow instant ticket number entry after login saving one to four mouse clicks
- Add a button to SCCD Change records to email change owner. This button will call a mailto event passing change owners email address in the To field, any default recipeits the reviewer wants CC'd on all emails, the change number and the change summary in the subject line
- Add a button to SCCD Change records to create an calendar invite in .ICS format. This will include Ticket number, Summary, Start and End date and time, Long description in HTML format, and default recipients.
