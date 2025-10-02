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

EMAIL_DATA.push(
  {
    id: 'corp-e-3', category: 'corporate', difficulty: 'easy',
    sender: 'payroll@payroll-processing-secure.net',
    subject: 'Action Required: Update your bank details',
    body: 'Dear Employee,\n\nRe-enter banking info:\nhttp://payroll-update.payroll-processing-secure.net/update\n\nPayroll Dept',
    isPhishing: true,
    indicators: 'payroll-processing-secure.net is not a company domain. Never submit bank details via email link.'
  },
  {
    id: 'bank-e-2', category: 'bank', difficulty: 'easy',
    sender: 'statements@online.barclays.co.uk',
    subject: 'Your October statement is ready',
    body: 'Your October statement is ready.\n\nLog in at barclays.co.uk — do not click links in emails.\n\nBarclays Bank UK',
    isPhishing: false,
    indicators: 'Legitimate. Real barclays.co.uk domain. Explicitly says to type the address directly.'
  },
  {
    id: 'social-e-2', category: 'social', difficulty: 'easy',
    sender: 'info@twitter.com',
    subject: 'Welcome to X — Your account is ready',
    body: 'Welcome to X!\n\nYour account @jsmith92 is ready.\n\nIf you did not create this account you can safely ignore this email.\n\nThe X Team',
    isPhishing: false,
    indicators: 'Legitimate. Real twitter.com domain. No credentials requested.'
  },
  {
    id: 'acad-e-2', category: 'academic', difficulty: 'easy',
    sender: 'library@plymouth.ac.uk',
    subject: 'Library book due for return — Reminder',
    body: 'Dear Student,\n\nYour book is due in 3 days. Renew at plymouth.ac.uk/library.\n\nPlymouth University Library',
    isPhishing: false,
    indicators: 'Legitimate. Real .ac.uk domain. No credentials requested.'
  }
);
