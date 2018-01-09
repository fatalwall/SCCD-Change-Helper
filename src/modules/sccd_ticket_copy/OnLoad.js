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
	varTicket_Copy.Add();
}
