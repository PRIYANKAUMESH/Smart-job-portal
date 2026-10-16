# CareerConnect — Smart Job Portal

A responsive job portal frontend built using HTML5, CSS3, and JavaScript. It helps job seekers discover suitable job opportunities based on their skills, career interests, experience, and preferences.

## Features

### 1. Authentication
- User registration and login.
- Email and password validation.
- Password visibility toggle.
- Forgot-password demonstration.
- Logout functionality.
- Login required to access the dashboard.

### 2. Smart Job Recommendations
- Collect career interests and technical skills.
- Set education and experience preferences.
- Select preferred location and work arrangement.
- Choose employment type and salary range.
- Calculate estimated job-match scores.
- Display reasons why a job matches your preferences.

### 3. Job Search
- Search by job title, company, location, or skills.
- Filter jobs by experience and employment type.
- Clear search filters.
- View job descriptions, salaries, locations, and skills.

### 4. Saved Jobs
- Bookmark interesting jobs.
- Remove saved jobs.
- View saved opportunities in a separate section.

### 5. Application Tracking
- Apply to demo job listings.
- Prevent duplicate applications.
- View submitted applications.
- Track application status.

### 6. Candidate Dashboard
- Personalized welcome message.
- Recommended job count.
- Saved jobs count.
- Application count.
- Career preference management.
- Candidate profile information.

### 7. User Interface
- Responsive layout for mobile and desktop.
- Modern blue-and-white theme.
- Job cards and dashboard navigation.
- Form validation and feedback messages.
- Accessible status notifications.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling and responsive design |
| JavaScript | Application logic and interactivity |
| LocalStorage | Demo data persistence |
| Google Fonts | Typography |
| VS Code | Code editor |
| Live Server | Local development preview |

## Project Structure

```text
smart-job-portal/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## Requirements

You need:

- A modern web browser such as Chrome, Edge, or Firefox.
- Visual Studio Code or another text editor.
- The Live Server extension for VS Code (recommended).

No Node.js, Java, or MySQL is required to run this frontend-only version.

## Installation and Setup

### Step 1: Create the project folder

Create a folder named `smart-job-portal`.

### Step 2: Create the files

Inside the folder, create:

- `index.html`
- `style.css`
- `script.js`
- `README.md`

### Step 3: Add the source code

Copy the HTML, CSS, and JavaScript code into their respective files.

Make sure the filenames match exactly.

### Step 4: Open the project in VS Code

Open VS Code, select **File → Open Folder**, and choose `smart-job-portal`.

### Step 5: Run the project

Recommended method:

1. Install the Live Server extension.
2. Open `index.html`.
3. Right-click inside the editor.
4. Select **Open with Live Server**.
5. The application will open in your browser.

Alternatively, you can open `index.html` directly in a browser.

## How to Use

1. Open the application.
2. Select **Get Started**.
3. Register with a demo name, email, and password.
4. Return to the login page and sign in.
5. Complete your career preferences.
6. Enter skills such as Java, SQL, Python, or React.
7. Select **Save Preferences & Find Jobs**.
8. Review recommended job listings and their match scores.
9. Search and filter jobs.
10. Save jobs or select Apply.
11. View your saved jobs and applications.
12. Log out when finished.

## How Job Matching Works

The demo uses a weighted, rule-based matching algorithm.

| Matching Factor | Weight |
|---|---:|
| Skills | 35% |
| Career interest | 25% |
| Education | 15% |
| Experience | 10% |
| Location | 10% |
| Salary | 5% |
| Total | 100% |

The score estimates how well a job matches the entered preferences. It does not guarantee selection or employment.

Employment type and work arrangement can also be used as filters.

## Sample Job Listings

The application contains example listings for:

- Junior Java Developer
- Python Developer Intern
- Junior Data Analyst
- Frontend Web Developer
- Software Engineer Trainee
- QA Automation Intern
- Machine Learning Intern
- Business Associate
- React Developer
- Backend Python Developer

**These are demonstration listings, not verified real vacancies.**

## Data Storage

The frontend demo uses browser LocalStorage to preserve:

- Registered demo accounts.
- The current login session.
- Career preferences.
- Saved job IDs.
- Application records.

Data is stored in the browser on the current device and browser profile. Clearing browser storage may remove it.

## Important Security Limitations

This project is a learning prototype, not a production-ready authentication system.

- Passwords are stored in plain text in browser storage.
- Client-side checks can be bypassed.
- There is no real password-reset email.
- There is no backend or database.
- Recruiter and administrator dashboards are not fully implemented.
- Job listings are static demonstration data.
- Application records are not sent to employers.
- Match scores are based on simple rules rather than a trained AI model.

**Do not use real passwords or sensitive personal information with this prototype.**

## Future Enhancements

The project can be extended with:

- React.js frontend.
- Java Spring Boot REST API.
- Spring Security authentication and authorization.
- MySQL database.
- Secure password hashing.
- Resume upload and management.
- Real job API integration.
- Recruiter job posting and applicant management.
- Admin dashboard.
- Email notifications and password resets.
- AI-assisted job recommendations.
- Skill-gap analysis.
- Interview scheduling.
- Automated testing and deployment.

## Troubleshooting

### CSS is not loading

Verify that `style.css` is in the same folder as `index.html` and that the link is:

```html
<link rel="stylesheet" href="style.css">
```

### JavaScript is not working

Verify that `script.js` is in the same folder and that the HTML contains:

```html
<script src="script.js"></script>
```

Open the browser developer console with **F12** to check for errors.

### Login is unsuccessful

Register an account first, then use the same email and password on the login page. Do not clear browser storage between registration and login.

### Saved jobs disappear

Check that you are using the same browser and browser profile. Browser storage is local and can be cleared.

## License

This project is intended for educational and portfolio purposes. You may customize it for learning and demonstration.

---

**Project:** CareerConnect — Smart Job Portal  
**Frontend:** HTML5, CSS3, JavaScript  
**Version:** 1.0.0  
**Status:** Frontend demonstration prototype
