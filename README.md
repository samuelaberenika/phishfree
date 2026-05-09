<p align="center">
  <img src="docs/COMP1004-Computing_Project_Banner_GitHub.png" alt="PhishFree Banner">
</p>

<h1 align="center">PhishFree</h1>

<p align="center">
An interactive cybersecurity training platform designed to improve phishing detection through realistic email simulations, gamification, and immediate educational feedback.
</p>

<br>

---

## About the Project

Phishing attacks remain one of the most significant cybersecurity threats facing the United Kingdom. The NCSC Annual Review 2025 identifies academia as one of the top sectors reporting ransomware incidents, highlighting that university students and staff represent a particularly vulnerable group. Traditional awareness methods such as videos and policy documents often fail to create the active recall needed to recognise phishing threats in real time.

PhishFree is a browser-based Single Page Application (SPA) developed to address this problem. The application simulates a realistic corporate email environment where users must classify emails as either phishing or legitimate across four attack categories:

- Corporate
- Bank & Finance
- Social Media
- Academic

After each classification, the application provides immediate feedback explaining the phishing indicators present in the email, reinforcing learning through active participation rather than passive instruction.

The project was developed using HTML, CSS, Bootstrap and Vanilla JavaScript, with development managed across five Agile Scrum sprints and version control maintained through GitHub.

---

## Features

- Realistic phishing email simulations
- Immediate educational feedback
- Four phishing attack categories
- Three difficulty tiers (Easy, Medium, Hard)
- Dynamic scoring system
- High-score persistence using LocalStorage
- JSON-based email dataset
- Export round results as JSON
- Responsive Single Page Application architecture
- Keyboard shortcut support

---

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive layouts |
| Bootstrap | Layout utilities and responsiveness |
| Vanilla JavaScript | Game logic and DOM manipulation |
| JSON | Email dataset and result export |
| Fetch API | Runtime loading of email data |
| LocalStorage API | Persistent high-score storage |
| GitHub | Version control and sprint tracking |

---

## Architecture

The application follows a modular SPA architecture:

```text
emails.json
     ↓
data.js
     ↓
game.js
     ↓
ui.js
     ↓
index.html
