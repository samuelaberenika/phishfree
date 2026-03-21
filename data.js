/*   PhishFree - data.js
   41 emails · 4 categories · 3 difficulty levels
   Categories: corporate, bank, social, academic
  */

'use strict';

const EMAIL_DATA = [

  /* ══════════════════════════════════════════════
     CORPORATE - EASY
  ══════════════════════════════════════════════ */

  {
    id: 'corp-e-1',
    category: 'corporate',
    difficulty: 'easy',
    sender: 'it-support@c0mpany-helpdesk.com',
    subject: 'URGENT: Your account will be suspended in 24 hours',
    body: `Dear Valued Employee,

We have detected suspicious activity on your corporate account. Your access will be SUSPENDED within 24 hours unless you verify your credentials immediately.

Click here to verify now: http://secure-login-verify.ru/corporate

You must enter your username, password, and employee ID to prevent suspension.

This is your FINAL WARNING. Do not ignore this message.

IT Security Team`,
    isPhishing: true,
    indicators: 'Multiple red flags: the domain "c0mpany-helpdesk.com" uses a zero instead of the letter "o" (typosquatting). The link goes to a .ru domain. Requests for your username, password, AND employee ID together is excessive harvesting. Legitimate IT departments never demand credentials by email - they use authenticated portals.'
  },

  {
    id: 'corp-e-2',
    category: 'corporate',
    difficulty: 'easy',
    sender: 'hr@nexusgroup-corp.com',
    subject: 'Office closure - Bank Holiday Monday',
    body: `Hi everyone,

Just a reminder that the office will be closed this coming Monday, 26th May, in observance of the Bank Holiday.

Normal working hours resume on Tuesday 27th May.

If you have any urgent queries over the weekend, please contact the on-call manager via the usual channels.

Have a great long weekend!

HR Team
Nexus Group`,
    isPhishing: false,
    indicators: 'This is a safe, routine internal communication. It uses the company\'s legitimate domain, contains no links, makes no requests for credentials or personal data, and uses no urgency tactics. Generic but entirely appropriate for a company-wide announcement.'
  },

  {
    id: 'corp-e-3',
    category: 'corporate',
    difficulty: 'easy',
    sender: 'payroll@payroll-processing-secure.net',
    subject: 'Action Required: Update your bank details for salary payment',
    body: `Dear Employee,

Our payroll system has been updated and we require all employees to re-enter their banking information to ensure your next salary payment is not delayed.

Please click the link below and submit your:
- Sort code
- Account number
- Name as it appears on your bank card

LINK: http://payroll-update.payroll-processing-secure.net/update

Failure to update within 48 hours may result in delayed payment.

Payroll Department`,
    isPhishing: true,
    indicators: 'Classic payroll redirect scam. "payroll-processing-secure.net" is not a company domain - legitimate payroll communications come from your company\'s own domain. No real payroll system asks employees to submit bank details via an email link. The threat of delayed payment within 48 hours is a pressure tactic designed to make you act without thinking.'
  },

  {
    id: 'corp-e-4',
    category: 'corporate',
    difficulty: 'easy',
    sender: 'donotreply@zoom.us',
    subject: 'Reminder: Team meeting starts in 15 minutes',
    body: `Meeting Reminder

Your meeting starts in 15 minutes.

Topic: Q4 Planning - Marketing Team
Time: 10:00 AM BST
Duration: 1 hour

Join Zoom Meeting:
https://zoom.us/j/94523018764?pwd=YTBmNmI2ZXJ

Meeting ID: 945 2301 8764
Passcode: 847291

Zoom Video Communications, Inc.`,
    isPhishing: false,
    indicators: 'Legitimate Zoom meeting reminder. The sender is @zoom.us (Zoom\'s real domain) and the meeting link goes to zoom.us directly. A meeting ID and passcode are provided - standard Zoom format. No requests for personal data, no urgency, no threats.'
  },

  /* ══════════════════════════════════════════════
     CORPORATE - MEDIUM
  ══════════════════════════════════════════════ */

  {
    id: 'corp-m-1',
    category: 'corporate',
    difficulty: 'medium',
    sender: 'microsoft365@micros0ft-admin.com',
    subject: 'Your Microsoft 365 licence expires today',
    body: `Dear User,

Your Microsoft 365 Business subscription is due to expire today. To avoid disruption to your email, Teams, and OneDrive access, please renew immediately.

Renew now: https://microsoft365-renew.micros0ft-admin.com/renew

If you do not renew within the next 4 hours, your mailbox will be placed in read-only mode and you will lose access to all Microsoft services.

Microsoft Licensing Team
Microsoft Corporation`,
    isPhishing: true,
    indicators: 'Look carefully at the sender domain: "micros0ft-admin.com" - the letter "o" in Microsoft has been replaced with the number zero. This is typosquatting. Microsoft communicates licensing renewals through your IT admin, not directly to individual employees. The 4-hour deadline is artificial pressure to stop you scrutinising the link.'
  },

  {
    id: 'corp-m-2',
    category: 'corporate',
    difficulty: 'medium',
    sender: 'noreply@slack.com',
    subject: 'You have 3 unread messages in Slack',
    body: `Hi there,

You have 3 unread messages waiting for you in Slack.

Open the Slack app to view your messages and stay connected with your team.

If you no longer wish to receive these notifications, you can update your preferences in your Slack account settings under Notifications.

The Slack Team`,
    isPhishing: false,
    indicators: 'Legitimate Slack digest notification. The sender is from the real slack.com domain. The email does not ask for credentials, contains no suspicious links, and provides a clear option to manage notification preferences. Slack sends exactly these types of unread message digest emails.'
  },

  {
    id: 'corp-m-3',
    category: 'corporate',
    difficulty: 'medium',
    sender: 'ceo.james.harrison@nexusgroup-corp.com',
    subject: 'Confidential: Urgent wire transfer needed',
    body: `Hi,

I'm currently in a board meeting and cannot take calls. I need you to process an urgent wire transfer of £24,800 to a new vendor before close of business today.

This is time-sensitive and must be kept confidential until the deal is announced next week. Please do not discuss with colleagues or finance.

I'll explain everything in full when I'm out of the meeting. Can you confirm you can handle this?

James Harrison
CEO, Nexus Group`,
    isPhishing: true,
    indicators: 'This is a Business Email Compromise (BEC) or "CEO fraud" attack. The email address can be spoofed to appear legitimate. Key indicators: request for financial action via email without normal procurement channels, insistence on secrecy ("don\'t discuss with finance"), extreme urgency, and the sender being unavailable to call. Always verify large financial transfers directly by phone using a number you already know - never one provided in the email.'
  },

  {
    id: 'corp-m-4',
    category: 'corporate',
    difficulty: 'medium',
    sender: 'printer-admin@nexusgroup-corp.com',
    subject: 'Scanned document from HP LaserJet Pro - Floor 3',
    body: `A document was scanned and sent to your email address.

Device: HP-LaserJet-M428fdn-Floor3
Scanned by: Reception
Pages: 3
File format: PDF

See attachment: SCAN_20251028_103421.pdf

For technical support, contact IT Helpdesk.

Nexus Group IT`,
    isPhishing: true,
    indicators: 'Printer scan phishing is a sophisticated and increasingly common attack. Despite the email appearing to come from an internal corporate domain, the PDF attachment typically contains malware or a credential-harvesting link. Red flags: you weren\'t expecting a scan, it\'s generically "from Reception" with no context, and the filename is a standard auto-generated string. Always verify unexpected attachments by contacting the supposed sender directly - do not open them unprompted.'
  },

  /* ══════════════════════════════════════════════
     CORPORATE - HARD
  ══════════════════════════════════════════════ */

  {
    id: 'corp-h-1',
    category: 'corporate',
    difficulty: 'hard',
    sender: 'noreply@docusign.com',
    subject: 'Document ready for signature: Q4 Supplier Agreement',
    body: `DocuSign

A document has been sent to you for review and signature.

Document: Q4 Supplier Agreement - Nexus Group
Sent by: procurement@nexusgroup-corp.com
Message: "Please review and sign at your earliest convenience."

REVIEW DOCUMENT

This link will expire in 48 hours.

Questions? Visit our Help Center or contact support@docusign.com

DocuSign - The Global Standard for eSignature`,
    isPhishing: true,
    indicators: 'This looks extremely convincing, but "REVIEW DOCUMENT" links to a fake domain (docusign-secure-review.pages.dev) rather than the real app.docusign.com. Legitimate DocuSign signature request links always go to docusign.com or docusign.net - never a subdomain of another service. Always hover over links (or long-press on mobile) to see the actual destination URL before clicking anything in a DocuSign email.'
  },

  {
    id: 'corp-h-2',
    category: 'corporate',
    difficulty: 'hard',
    sender: 'security-alerts@linkedin.com',
    subject: 'Someone from your company viewed your profile',
    body: `Hi,

A recruiter from your organisation recently viewed your LinkedIn profile.

See who\'s looking:
• Senior Recruiter at Nexus Group
• Head of Talent Acquisition
• 3 others from your extended network

Upgrade to LinkedIn Premium to see the full list and track every visit.

LinkedIn Career Alerts`,
    isPhishing: false,
    indicators: 'Legitimate LinkedIn notification. The sender is from the real linkedin.com domain, the content is consistent with LinkedIn\'s standard engagement emails (profile view notifications), no credentials are requested, and no suspicious action is required. LinkedIn regularly sends these promotional notifications to encourage Premium upgrades.'
  },

  {
    id: 'corp-h-3',
    category: 'corporate',
    difficulty: 'hard',
    sender: 'it.helpdesk@nexus-group.co.uk',
    subject: 'MFA platform migration - re-enrol your device this week',
    body: `Hi,

As part of our ongoing security improvements, we are migrating all employees to our new MFA platform by end of this week.

To complete the transition, please visit the IT portal and re-enrol your device:

https://it-portal.nexus-group.co.uk/mfa-enrolment

You will need your employee ID and your current authenticator app to complete the process. The steps take under 3 minutes.

If you have any issues, please raise a ticket via the helpdesk portal or contact us directly.

IT Helpdesk
Nexus Group`,
    isPhishing: false,
    indicators: 'Legitimate IT communication. The sender domain matches the company\'s UK domain (nexus-group.co.uk), and the link goes to the company\'s own IT portal on the same domain. No sensitive credentials are requested upfront, and a proper helpdesk support channel is provided. MFA migration emails do occur in real companies and this is exactly what a genuine one looks like.'
  },

  {
    id: 'corp-h-4',
    category: 'corporate',
    difficulty: 'hard',
    sender: 'benefits@workday.com',
    subject: 'Open Enrolment: Update your benefits by 1st November',
    body: `Hi,

Your company\'s annual benefits open enrolment period is now open. You have until 1st November to review and update your selections for the upcoming year.

Log in to Workday to manage your benefits:
https://wd3.myworkday.com/nexusgroup/login

If you miss this deadline, your current elections will automatically roll over for another year.

Questions? Contact your HR team at hr@nexusgroup-corp.com

Workday Benefits`,
    isPhishing: false,
    indicators: 'Legitimate Workday benefits notification. The link goes to wd3.myworkday.com - the real Workday domain used by enterprise clients. It provides an alternative contact (your HR team at the company\'s domain), and the consequence of missing the deadline is a reasonable rollover - not a threat. This is how genuine enterprise HR software sends benefits reminders.'
  },

  /* ══════════════════════════════════════════════
     BANK - EASY
  ══════════════════════════════════════════════ */

  {
    id: 'bank-e-1',
    category: 'bank',
    difficulty: 'easy',
    sender: 'security@lloyds-bank-alert.com',
    subject: 'ALERT: Suspicious transaction detected on your account',
    body: `Dear Lloyds Bank Customer,

We have detected an unusual transaction of £1,247.00 on your account ending in 4421.

To prevent further unauthorised activity, your card has been temporarily frozen.

To unfreeze your account and verify this transaction, please click below immediately:

http://lloyds-secure-verify.com/account-verify

You will need to enter your:
• Internet Banking username
• Full password
• Memorable word
• Card number

Lloyds Bank Security Team`,
    isPhishing: true,
    indicators: 'Multiple clear phishing indicators: the domain "lloyds-bank-alert.com" is not Lloyds\'s official domain (lloydsbank.com). No real bank ever requests your full password, memorable word, AND card number simultaneously via email. The frozen account threat is a classic social engineering tactic to create panic and bypass critical thinking.'
  },

  {
    id: 'bank-e-2',
    category: 'bank',
    difficulty: 'easy',
    sender: 'statements@online.barclays.co.uk',
    subject: 'Your October statement is ready',
    body: `Your October statement is ready to view.

You had 23 transactions this month.

To view your full statement, log in as usual at barclays.co.uk or through the Barclays app. Do not click any links in emails - always type the address directly.

You are receiving this because you opted in to paperless statements. You can change this preference in your account settings.

Barclays Bank UK PLC`,
    isPhishing: false,
    indicators: 'Legitimate bank notification. The sender domain is barclays.co.uk, no credentials are requested, and - notably - the email explicitly tells you to type the address directly rather than click a link. This is exactly how security-conscious banks communicate. The opt-out reminder is standard practice for paperless statements.'
  },

  {
    id: 'bank-e-3',
    category: 'bank',
    difficulty: 'easy',
    sender: 'alerts@payment-confirmation-hsbc.co.uk',
    subject: 'Your HSBC account: immediate action required',
    body: `Dear HSBC Customer,

Your account has been limited due to a failed identity verification check.

To avoid your account being permanently closed, you must complete re-verification within 12 hours.

Complete Verification Now:
http://hsbc-account-verify.payment-confirmation-hsbc.co.uk

HSBC Customer Support`,
    isPhishing: true,
    indicators: 'A subdomain attack - "hsbc" appears in the URL but is NOT the main domain. The actual domain is "payment-confirmation-hsbc.co.uk", not hsbc.co.uk. Phishers exploit the fact that people scan URLs quickly and see a familiar word. HSBC\'s genuine domain is hsbc.co.uk. The 12-hour deadline and permanent closure threat are panic-inducing pressure tactics.'
  },

  /* ══════════════════════════════════════════════
     BANK - MEDIUM
  ══════════════════════════════════════════════ */

  {
    id: 'bank-m-1',
    category: 'bank',
    difficulty: 'medium',
    sender: 'fraud.protection@haliifax-bank.co.uk',
    subject: 'Your account has been temporarily restricted',
    body: `Dear Customer,

As part of our commitment to keeping your money safe, we have temporarily restricted your Halifax account following a failed login attempt from an unrecognised device.

To restore full access, please verify your identity:

Verify My Account →

This will take less than 2 minutes. You will need your online banking details and a one-time passcode sent to your registered mobile.

Halifax Fraud Prevention Team
Halifax - A Member of Lloyds Banking Group`,
    isPhishing: true,
    indicators: 'Spot the typo in the domain: "haliifax-bank.co.uk" has a double "i" - this is typosquatting designed to mimic Halifax\'s real domain (halifax-online.co.uk). The email looks professionally formatted and uses genuine branding, but the domain is the critical giveaway. Always check the full sender address carefully, especially the domain after the @ symbol.'
  },

  {
    id: 'bank-m-2',
    category: 'bank',
    difficulty: 'medium',
    sender: 'noreply@monzo.com',
    subject: 'You sent £45.00 to Sarah Mitchell',
    body: `You sent £45.00

To: Sarah Mitchell
Reference: "Dinner last week :)"

Date: 28 October 2025 at 19:32

If you didn't make this payment, open the Monzo app and tap "Something wrong?" on the transaction to report it immediately.

Monzo Bank Limited is authorised by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and the Prudential Regulation Authority.`,
    isPhishing: false,
    indicators: 'Genuine Monzo payment confirmation. The sender is @monzo.com (Monzo\'s real domain), and the email contains specific transaction details a phisher wouldn\'t know (exact amount, recipient name, personalised reference, precise timestamp). Crucially, it directs you to the app - not a link in the email - if something is wrong.'
  },

  {
    id: 'bank-m-3',
    category: 'bank',
    difficulty: 'medium',
    sender: 'customer.services@natwest-secure.support',
    subject: 'NatWest: Important update to your account security',
    body: `Dear NatWest customer,

We are writing to inform you that your online banking security settings require updating following recent changes to our systems.

Please complete the security update by 1st November to maintain uninterrupted access to your account.

Update Security Settings →

NatWest Customer Services
National Westminster Bank Plc`,
    isPhishing: true,
    indicators: 'The sender domain "natwest-secure.support" is not NatWest\'s official domain (natwest.com). Phishers use words like "secure" and "support" in domain names to appear trustworthy. NatWest would send genuine communications from @natwest.com. This attack is more sophisticated because the email body is clean and professional - the domain is the only tell.'
  },

  /* ══════════════════════════════════════════════
     BANK - HARD
  ══════════════════════════════════════════════ */

  {
    id: 'bank-h-1',
    category: 'bank',
    difficulty: 'hard',
    sender: 'noreply@chase.com',
    subject: 'Account notification: new payee added',
    body: `We added a new payee to your account.

Payee name: T. Anderson
Sort code: 30-94-57
Date added: 28 Oct 2025 at 11:14

If you authorised this change, no action is needed.

If you did not authorise this change, please call us immediately on 0800 242 424 or visit chase.co.uk/help to report it.

Chase Bank UK`,
    isPhishing: false,
    indicators: 'Legitimate Chase security alert. The sender is @chase.com (Chase\'s real domain) and - critically - the email contains NO clickable links. Instead it provides a phone number to call and a URL to type manually. This is a hallmark of genuine bank security notifications. Real banks often send no-action-required alerts exactly like this and deliberately avoid links to prevent phishing confusion.'
  },

  {
    id: 'bank-h-2',
    category: 'bank',
    difficulty: 'hard',
    sender: 'security@starlingbank.com',
    subject: 'Verify your identity to continue using Starling',
    body: `Hi,

To comply with updated FCA financial regulations, we need to verify your identity before 5th November 2025.

This is required for all Starling customers and takes less than 5 minutes.

Start Verification →

You will need your passport or driving licence. This is a secure, encrypted process and your data will not be shared with third parties.

If you have already completed this, please disregard this email.

Starling Bank Limited`,
    isPhishing: true,
    indicators: 'Highly sophisticated attack - the sender appears to be from the real starlingbank.com domain (headers can be spoofed). However, Starling\'s actual ID verification is performed entirely within the app, never via an email link. The "Start Verification →" link leads to a convincing but fake site. Any time a bank asks you to verify identity via an email link, go directly to the official app instead - never click the link.'
  },

  {
    id: 'bank-h-3',
    category: 'bank',
    difficulty: 'hard',
    sender: 'no-reply@post.revolut.com',
    subject: 'Your Revolut card was used in a new country',
    body: `Card used abroad

Your Revolut card ending in 4829 was just used in Germany.

Amount: €124.50
Merchant: Rewe Group
Time: 28 Oct 2025, 14:22 CET

If this was you, no action needed.

If this wasn\'t you, freeze your card instantly in the Revolut app under Cards → Freeze.

Revolut Ltd`,
    isPhishing: false,
    indicators: 'Legitimate Revolut transaction notification. Revolut does use the post.revolut.com subdomain for transactional emails. There are no links to click - it instructs you to use the Revolut app directly. Specific transaction details are provided (card last 4 digits, exact amount, merchant name, timestamp) that a phisher would not have access to.'
  },

  /* ══════════════════════════════════════════════
     SOCIAL MEDIA - EASY
  ══════════════════════════════════════════════ */

  {
    id: 'social-e-1',
    category: 'social',
    difficulty: 'easy',
    sender: 'security@inst4gram-verify.com',
    subject: 'Your Instagram account has been flagged for removal',
    body: `Dear Instagram User,

Your account has been reported multiple times and is scheduled for permanent deletion within 24 hours due to repeated violations of our Community Guidelines.

To appeal this decision and protect your account, click the link IMMEDIATELY:

http://instagram-account-recovery.inst4gram-verify.com/appeal

If you do not submit your appeal within 24 hours, your account and all content will be permanently deleted.

Instagram Safety Team
Meta Platforms`,
    isPhishing: true,
    indicators: 'Obvious phishing: the domain is "inst4gram-verify.com" - a fake that replaces the letter "a" with a "4". Instagram\'s real domain is instagram.com. Genuine account warnings come from @mail.instagram.com. The extreme urgency ("IMMEDIATELY", "24 hours", "permanent deletion") is a classic fear tactic designed to make you act without thinking.'
  },

  {
    id: 'social-e-2',
    category: 'social',
    difficulty: 'easy',
    sender: 'info@twitter.com',
    subject: 'Welcome to X - Your account is ready',
    body: `Welcome to X!

Your account @jsmith92 is ready to go.

Get started by following some accounts or sharing your first post.

If you did not create this account, you can safely ignore this email - no action is needed.

The X Team`,
    isPhishing: false,
    indicators: 'Standard and legitimate welcome email from X (Twitter). X still uses the twitter.com domain for system emails. The content is non-threatening, no credentials are requested, no suspicious links, and it includes a standard disclaimer for users who didn\'t create the account. Exactly what a legitimate welcome email looks like.'
  },

  /* ══════════════════════════════════════════════
     SOCIAL MEDIA - MEDIUM
  ══════════════════════════════════════════════ */

  {
    id: 'social-m-1',
    category: 'social',
    difficulty: 'medium',
    sender: 'no-reply@facebookmail.com',
    subject: 'Unusual login attempt on your Facebook account',
    body: `Hi,

We noticed an unusual login attempt to your Facebook account from a device we don\'t recognise.

Location: Warsaw, Poland
Device: Windows PC
Time: 28 Oct 2025, 03:14 AM

If this was you, no action is needed.

If this wasn\'t you, please secure your account right away:

Secure My Account →

The Facebook Team`,
    isPhishing: true,
    indicators: 'This is a sophisticated attack - Facebook does legitimately send emails from facebookmail.com. However, the "Secure My Account" button links to a phishing site, not Facebook. The alarming overseas location is chosen to provoke a panicked reaction from UK users. If you receive a genuine login alert, go directly to facebook.com and check Security Settings - never follow a link in the email itself.'
  },

  {
    id: 'social-m-2',
    category: 'social',
    difficulty: 'medium',
    sender: 'noreply@linkedin.com',
    subject: 'James Cooper has accepted your connection request',
    body: `James Cooper accepted your invitation.

James Cooper
Senior Software Engineer at Barclays

You\'re now connected. Start a conversation or see James\'s full profile.

Send a message  |  View profile

LinkedIn Corp., 1000 W Maude Avenue, Sunnyvale, CA 94085
© 2025 LinkedIn Corporation. All rights reserved.`,
    isPhishing: false,
    indicators: 'Legitimate LinkedIn connection notification. The sender is @linkedin.com (real domain), a specific named person is referenced, no personal data is requested, and the standard corporate footer with company address is included. LinkedIn sends these exact emails when connection requests are accepted.'
  },

  {
    id: 'social-m-3',
    category: 'social',
    difficulty: 'medium',
    sender: 'support@tiktok-creator-fund.io',
    subject: 'Congratulations! You qualify for the TikTok Creator Reward',
    body: `Hi Creator,

You have been selected to receive a Creator Reward of £500 based on your content engagement metrics this month.

To claim your reward, we need to verify your identity and payment information. Please complete the form within 48 hours:

Claim Your Reward →

Required information:
• Full legal name
• Date of birth
• Bank account sort code and account number

TikTok Creator Partnerships`,
    isPhishing: true,
    indicators: 'TikTok\'s official domain is tiktok.com - not "tiktok-creator-fund.io". This email requests highly sensitive financial and personal data. Legitimate creator monetisation schemes do not ask for bank details via email links. The combination of an unexpected prize, tight deadline, and financial data request is a textbook scam pattern.'
  },

  {
    id: 'social-m-4',
    category: 'social',
    difficulty: 'medium',
    sender: 'team@substack.com',
    subject: 'Your free trial of Substack Pro ends in 3 days',
    body: `Hi,

Your 30-day free trial of Substack Pro is ending soon.

After your trial ends, you\'ll move to the free plan. You won\'t lose any subscribers or posts - you\'ll just lose access to Pro features like subscriber analytics and custom domain.

To keep Pro, update your payment method at substack.com/settings.

The Substack Team`,
    isPhishing: false,
    indicators: 'Legitimate Substack trial expiration notice. The sender is @substack.com (real domain). Crucially, it directs you to substack.com/settings manually - not via a link in the email. It explains specific feature changes clearly and honestly, with no threats. This is how legitimate SaaS trial expiry emails should look.'
  },

  /* ══════════════════════════════════════════════
     SOCIAL MEDIA - HARD
  ══════════════════════════════════════════════ */

  {
    id: 'social-h-1',
    category: 'social',
    difficulty: 'hard',
    sender: 'security@mail.instagram.com',
    subject: 'Your Instagram password was changed',
    body: `Hi,

The password for your Instagram account was recently changed. If you made this change, no action is needed.

If you did not change your password, secure your account immediately using the link below:

Undo Password Change

This link expires in 1 hour.

The Instagram Team`,
    isPhishing: true,
    indicators: 'Highly sophisticated - mail.instagram.com IS a real Instagram email domain, making this genuinely difficult to identify. The "Undo Password Change" button links to a convincing lookalike site, not Instagram. If you receive this and genuinely didn\'t change your password, go directly to instagram.com/accounts/password/reset - never use the email link. The 1-hour expiry is real urgency manipulation.'
  },

  {
    id: 'social-h-2',
    category: 'social',
    difficulty: 'hard',
    sender: 'noreply@youtube.com',
    subject: 'Your YouTube channel has been approved for monetisation',
    body: `Great news!

Your channel has met the YouTube Partner Programme requirements and is now eligible for monetisation.

To activate monetisation:
1. Go to YouTube Studio
2. Click Earn → Apply to YPP
3. Review and accept the programme terms

Access YouTube Studio at studio.youtube.com

The YouTube Creator Support Team
Google LLC`,
    isPhishing: false,
    indicators: 'Legitimate YouTube monetisation notification. The sender is @youtube.com (real domain) and the instructions direct you to studio.youtube.com - not a link in the email. It\'s from Google LLC (correct parent company) and the guidance to navigate to the platform manually is a strong signal of a genuine email.'
  },

  {
    id: 'social-h-3',
    category: 'social',
    difficulty: 'hard',
    sender: 'noreply@discordapp.com',
    subject: 'You\'ve been gifted Discord Nitro - 1 month free',
    body: `You received a gift!

A friend has gifted you 1 month of Discord Nitro.

To claim your gift, click below. This offer expires in 48 hours.

Claim Nitro Gift

Discord Inc. · 444 De Haro Street, San Francisco, CA 94107`,
    isPhishing: true,
    indicators: 'Discord does use discordapp.com for system emails, making this very convincing. However, the "Claim Nitro Gift" button links to a phishing site. Real Discord Nitro gifts appear as a notification directly inside the Discord app - you do not claim them through email links. The 48-hour expiry is artificial urgency. Always claim Discord gifts through the app, never via email.'
  },

  /* ══════════════════════════════════════════════
     ACADEMIC - EASY
  ══════════════════════════════════════════════ */

  {
    id: 'acad-e-1',
    category: 'academic',
    difficulty: 'easy',
    sender: 'student.services@university-portal-login.com',
    subject: 'URGENT: Your student portal access expires today',
    body: `Dear Student,

Your access to the University Student Portal is set to expire TODAY at midnight. Thousands of students have already been locked out this week.

To retain access to your grades, timetable, and coursework submissions, you MUST update your credentials now:

http://student-portal-reactivate.university-portal-login.com/login

Please enter your:
- Student ID number
- Current password
- Date of birth
- Emergency contact email

Student Services
University IT Department`,
    isPhishing: true,
    indicators: 'No UK university uses a domain like "university-portal-login.com" - real university portals use .ac.uk domains. Requesting student ID, password, date of birth, AND emergency contact simultaneously is extreme data harvesting. The fake "thousands locked out" claim is false social proof to make the threat feel real. Universities never require credential re-entry via email links.'
  },

  {
    id: 'acad-e-2',
    category: 'academic',
    difficulty: 'easy',
    sender: 'library@plymouth.ac.uk',
    subject: 'Library book due for return - Reminder',
    body: `Dear Student,

This is a reminder that the following item is due for return in 3 days:

Title: Introduction to Computer Networks (7th Ed.)
Author: Forouzan, B.A.
Due date: 31 October 2025
Loan reference: PU-2025-091847

You can renew online via the Library Portal at plymouth.ac.uk/library, or return it to the main library desk.

Overdue items incur a fine of 20p per day.

Plymouth University Library Services`,
    isPhishing: false,
    indicators: 'Legitimate library reminder from Plymouth University. The sender uses the university\'s real .ac.uk domain, specific book and loan reference information is included (which a phisher wouldn\'t have), no credentials are requested, and it directs you to the official university website. This is a routine administrative email.'
  },

  {
    id: 'acad-e-3',
    category: 'academic',
    difficulty: 'easy',
    sender: 'it-helpdesk@university-uk-support.org',
    subject: 'Your university email storage is 100% full',
    body: `Dear Student,

Your university email account has reached its storage limit and you can no longer send or receive emails.

To increase your storage limit and prevent loss of important academic emails, please verify your account:

CLICK HERE TO VERIFY

You must complete this within 12 hours or your account will be permanently suspended.

IT Helpdesk`,
    isPhishing: true,
    indicators: 'University IT departments use .ac.uk domains - not "university-uk-support.org". The vague "CLICK HERE" link hides a phishing URL. No IT department permanently suspends accounts over storage in 12 hours - they send automated alerts with self-service renewal options. Legitimate storage warnings come from official university domains with specific guidance, not panic-inducing ultimatums.'
  },

  /* ══════════════════════════════════════════════
     ACADEMIC - MEDIUM
  ══════════════════════════════════════════════ */

  {
    id: 'acad-m-1',
    category: 'academic',
    difficulty: 'medium',
    sender: 'noreply@outlook.com',
    subject: 'Your assignment has been received - COMP1004',
    body: `Your submission has been received.

Module: COMP1004 - Computing Practice
Assignment: Coursework 1
Submitted: 28 Oct 2025 at 23:47
File: PhishFree_Report.docx (1.2 MB)

You will receive your grade and feedback within 15 working days.

Please retain this email as confirmation of your submission.

Plymouth University - Turnitin Submission System`,
    isPhishing: false,
    indicators: 'Legitimate Turnitin/assignment submission confirmation. These commonly arrive from third-party platforms like Turnitin via Outlook relay. No credentials are requested, and specific module, filename, and timestamp details are provided - information a phisher wouldn\'t know. The 15-day feedback timeframe is standard. This is exactly what genuine submission confirmations look like.'
  },

  {
    id: 'acad-m-2',
    category: 'academic',
    difficulty: 'medium',
    sender: 'scholarships@education-grant-uk.com',
    subject: 'You have been selected for a £3,500 student bursary',
    body: `Dear Student,

Following a review of academic performance across participating UK universities, you have been selected to receive a non-repayable student bursary of £3,500.

To claim your award, please complete the short application within 72 hours:

Claim Your Bursary →

You will need to provide:
• Your Student ID
• National Insurance number
• Bank sort code and account number

Education Grant UK - Supporting Student Success`,
    isPhishing: true,
    indicators: '"Education-grant-uk.com" is not a government or university domain. Legitimate bursaries are administered through your university\'s official financial support office - never via unsolicited emails. Requesting your NI number and bank details as part of a surprise prize is financial fraud. Real bursaries never require bank details via email links.'
  },

  {
    id: 'acad-m-3',
    category: 'academic',
    difficulty: 'medium',
    sender: 'timetabling@uop.ac.uk',
    subject: 'Timetable change: COMP1004 - Week 7',
    body: `Dear student,

Please note the following timetable change for Week 7 (4–8 November):

Module: COMP1004 Computing Practice
Original: Tuesday 5 Nov, 10:00–12:00, Room B402
New slot: Wednesday 6 Nov, 14:00–16:00, Room A201

This change is due to a room booking conflict. We apologise for any inconvenience.

For queries, please contact your module leader directly.

Timetabling Office
University of Plymouth`,
    isPhishing: false,
    indicators: 'Legitimate timetable change notification from the University of Plymouth (uop.ac.uk). It contains specific module, time, and room information that a phisher wouldn\'t have. No links, no credential requests, no urgency. The explanation ("room booking conflict") and apology are consistent with genuine administrative communications.'
  },

  {
    id: 'acad-m-4',
    category: 'academic',
    difficulty: 'medium',
    sender: 'noreply@canvas.net',
    subject: 'Assignment feedback available: COMP1004 Coursework 1',
    body: `Your instructor has posted feedback on your submission.

Course: COMP1004 Computing Practice
Assignment: Coursework 1
Grade: 68/100
Feedback posted by: Dr. V. Kelefouras

Log in to Canvas at canvas.net/login to view your full feedback and comments.

Canvas by Instructure`,
    isPhishing: true,
    indicators: 'Canvas\'s real domain structure is instructure.com, or your university\'s specific Canvas URL - not the generic "canvas.net". Your university would never direct you to a generic third-party URL for grades. Specific grades in emails can be used to add authenticity to phishing attempts. Always access your grades through your university\'s official LMS link, not from an email.'
  },

  /* ══════════════════════════════════════════════
     ACADEMIC - HARD
  ══════════════════════════════════════════════ */

  {
    id: 'acad-h-1',
    category: 'academic',
    difficulty: 'hard',
    sender: 'research.funding@ukri.org',
    subject: 'Invitation: UKRI Undergraduate Research Grant 2025',
    body: `Dear Student,

We are pleased to invite you to apply for the UKRI Undergraduate Research Grant 2025, offering funding of up to £5,000 for approved original research projects.

Your department has nominated you based on your academic performance this year.

To begin your application, please log in using your university credentials via our secure portal:

Access Application Portal →

Applications close 15th November 2025.

UK Research and Innovation (UKRI)
Polaris House, Swindon, SN2 1FL`,
    isPhishing: true,
    indicators: 'UKRI (ukri.org) is a real organisation, making this highly convincing. However, the "Access Application Portal" link leads to a credential harvesting site. The real UKRI grants portal is accessed at ukri.org/opportunity - never via an unsolicited email link. Critically, it asks you to log in with university credentials through an external link, which is always a red flag. Navigate to ukri.org directly to verify any opportunity.'
  },

  {
    id: 'acad-h-2',
    category: 'academic',
    difficulty: 'hard',
    sender: 'student.records@uop.ac.uk',
    subject: 'Your Academic Transcript - Requested Copy',
    body: `Dear Student,

As requested, please find your official academic transcript attached to this email.

If you did not request a transcript, please contact the Student Records office immediately at studentrecords@uop.ac.uk or call +44 (0)1752 585858.

Student Records Office
University of Plymouth
Drake Circus, Plymouth, PL4 8AA`,
    isPhishing: false,
    indicators: 'Legitimate student records email from the University of Plymouth (.ac.uk domain). The email contains no links to click and provides a real phone number and direct email address for verification. If you\'re uncertain whether you requested it, the guidance to contact the office directly (not via a link) is the appropriate and secure response. This is standard practice for official academic documents.'
  },

  {
    id: 'acad-h-3',
    category: 'academic',
    difficulty: 'hard',
    sender: 'digital.exams@examinations.uop.ac.uk',
    subject: 'Online exam instructions - December Assessment Period',
    body: `Dear Student,

Your December examinations will be conducted online using the university\'s secure exam platform. Please read the following instructions carefully before your first exam.

Before your exam:
• Download the Respondus LockDown Browser via the link in your Moodle course page (not from this email)
• Complete the practice session available from 1st November
• Ensure your photo ID is visible to the webcam at the start of each session

For technical issues on exam day, contact IT on: ithelp@uop.ac.uk

Academic Registry
University of Plymouth`,
    isPhishing: false,
    indicators: 'Legitimate exam instructions email. The sender subdomain (examinations.uop.ac.uk) is on the official university domain. Critically, it explicitly directs students to Moodle (the university\'s own platform) to download software - not to an external link in the email. IT contact is via institutional email. This is exactly how real exam communications are structured.'
  },

  {
    id: 'acad-h-4',
    category: 'academic',
    difficulty: 'hard',
    sender: 'plagiarism-detection@turnitin.com',
    subject: 'Similarity report available: COMP1004 Coursework 1',
    body: `Your Turnitin report is ready.

Assignment: Final Year Project - Draft 1
Submitted by: you
Similarity index: 12%
Date processed: 28 Oct 2025

To view your full originality report, log in to Turnitin via your institution\'s learning management system (Moodle). Do not use links in emails.

Turnitin - Empowering Academic Integrity`,
    isPhishing: false,
    indicators: 'Legitimate Turnitin similarity report notification. The sender is @turnitin.com (real domain). Notably, the email explicitly tells you to log in via your institution\'s Moodle - not a link in the email. A specific similarity percentage is provided (12%) which would require access to your actual submission. No credentials requested, no urgency.'
  }

];
