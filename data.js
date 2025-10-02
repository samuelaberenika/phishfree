'use strict';

const EMAIL_DATA = [
  {
    id: 'corp-e-1', category: 'corporate', difficulty: 'easy',
    sender: 'it-support@c0mpany-helpdesk.com',
    subject: 'URGENT: Your account will be suspended in 24 hours',
    body: 'Dear Employee,\n\nYour account will be SUSPENDED unless you verify now:\nhttp://secure-login-verify.ru/corporate\n\nIT Security',
    isPhishing: true,
    indicators: 'Domain uses zero instead of o (typosquatting). Link goes to .ru. IT never demands credentials by email.'
  },
  {
    id: 'corp-e-2', category: 'corporate', difficulty: 'easy',
    sender: 'hr@nexusgroup-corp.com',
    subject: 'Office closure — Bank Holiday Monday',
    body: 'Hi everyone,\n\nOffice closed Monday 26th May for Bank Holiday.\n\nHR Team',
    isPhishing: false,
    indicators: 'Safe routine communication. Legitimate company domain, no links, no credential requests.'
  },
  {
    id: 'bank-e-1', category: 'bank', difficulty: 'easy',
    sender: 'security@lloyds-bank-alert.com',
    subject: 'ALERT: Suspicious transaction on your account',
    body: 'Dear Lloyds Customer,\n\nUnusual transaction detected. Unfreeze here:\nhttp://lloyds-secure-verify.com/account-verify\n\nLloyds Security',
    isPhishing: true,
    indicators: 'lloyds-bank-alert.com is not lloydsbank.com. Banks never ask for credentials via email link.'
  },
  {
    id: 'social-e-1', category: 'social', difficulty: 'easy',
    sender: 'security@inst4gram-verify.com',
    subject: 'Your Instagram account has been flagged for removal',
    body: 'Dear User,\n\nAccount deleted in 24 hours.\nAppeal: http://inst4gram-verify.com/appeal\n\nInstagram Safety',
    isPhishing: true,
    indicators: 'inst4gram uses 4 instead of a. Real Instagram emails come from mail.instagram.com.'
  },
  {
    id: 'acad-e-1', category: 'academic', difficulty: 'easy',
    sender: 'student.services@university-portal-login.com',
    subject: 'URGENT: Your student portal access expires today',
    body: 'Dear Student,\n\nPortal access expires TODAY.\nUpdate: http://student-portal-reactivate.university-portal-login.com\n\nIT Dept',
    isPhishing: true,
    indicators: 'No UK university uses .com. They use .ac.uk domains.'
  }
];
