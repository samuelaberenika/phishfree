/*  PhishFree - data.js
    Loads email dataset from emails.json flat file
*/

'use strict';

let EMAIL_DATA = [];

async function loadEmails() {
  const response = await fetch('emails.json');
  EMAIL_DATA = await response.json();
}