![title image](docs/COMP1004-Computing_Project_Banner_GitHub.png)

<p align="center"><strong>Module Overview</strong>
<br>
"To familiarise students with the software development lifecycle. <br> To develop techniques to elicit requirements from abstract problems. <br> To expose students to both technical and non-technical skills required to complete a software engineering project."
</p>
<br/>

<h2>Learning Outcomes</h2>

- Articulate the phases of the software development lifecycle.
- Define suitable functional and non-functional requirements that when implemented in software will solve a given problem.
- Identify and describe operational considerations of software, including the physical systems upon which they reside, cyber security and networking.
- Implement a system that fulfils a design specification to solve a given problem.
- Identify and discuss trade-offs in requirements analysis and production of software versus operational considerations such as time and cost.

<br>

<h2>Assessments</h2>
The module is assessed via 80% coursework and 20% practice. You must achieve an overall module grade of 40% to pass the module.

<details>
<summary><h3>Coursework 01 — Product and Report (80%)</h3></summary>

This part of the assessment scrutinizes the quality of your product, project planning, report content, and critical reflection.
<br><br>
Marks will be based on the report content, the final code/product submission, and the supervisor's experience of you working on your project.

<hr>
</details>

<details>
<summary><h3>Practice 01 — Poster, Viva and Video (20%)</h3></summary>

This part of the assessment scrutinizes your ability to present your work in various forms: as a poster, a video, your report, and by your performance in the viva.
<br><br>
Marks will be based on the representative aspects of your portfolio and presentations.

<hr>
</details>

<br>

<h2>Assessment Deadlines</h2>

| Submission                  | Deadline                   | Feedback           |
| --------------------------- | -------------------------- | ------------------ |
| Mid Project Review          | 15th January 2026 at 15:00 | 12th February 2026 |
| Project ePortfolio Complete | 30th April 2026 at 15:00   | 28th May 2026      |
| Viva                        | 12th May 2026 (9:00–17:00) | 28th May 2026      |

<br>

<h2>About the Project</h2>

Phishing attacks remain one of the most significant cybersecurity threats facing the United Kingdom. The NCSC Annual Review 2025 identifies academia as one of the top sectors reporting ransomware incidents, highlighting that university students and staff represent a particularly vulnerable group. Traditional awareness methods such as videos and policy documents have proven insufficient, as they fail to create the active recall needed to recognise threats in real time.

PhishFree is a browser-based Single Page Application built to address this gap. The application simulates a realistic email client environment in which users must classify emails as either phishing or legitimate across four attack categories: Corporate, Bank and Finance, Social Media, and Academic. Following each classification, the system delivers immediate feedback and explains the specific phishing indicators present in that email, reinforcing learning through active recall rather than passive instruction.

The application features three difficulty levels — Easy, Medium, and Hard — with a scoring system that rewards harder classifications more heavily. A high score is persisted via browser LocalStorage, and a round result is exported to a JSON flat file upon completion. The email dataset is loaded from a JSON flat file at runtime. The project was developed using HTML, CSS, and Vanilla JavaScript as a Single Page Application, with development managed across five Agile Scrum sprints and version control maintained throughout via GitHub.

<br>

<h2>Running the Project Locally</h2>

This application loads `emails.json` via `fetch()` and requires a local server to run correctly.

**Option 1 — VS Code Live Server**
<br>
Install the Live Server extension, right-click `index.html`, and select Open with Live Server.

**Option 2 — Node.js**

```bash
npx serve .
```

Then open `http://localhost:3000` in your browser.

<br>

<h2>File Structure</h2>

```
phishfree/
├── docs/                ← Banner image
├── fonts/               ← Forma DJR .ttf files
├── emails.json          ← Email dataset (JSON flat file input)
├── index.html           ← Single Page Application (all screens)
├── style.css            ← All styles
├── data.js              ← Loads emails.json via fetch()
├── game.js              ← GameController logic and scoring
└── ui.js                ← Screen management and DOM rendering
```
