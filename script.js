"use strict";

/*
  CareerConnect frontend demo.
  Not secure production authentication.
  Do not enter real passwords or sensitive information.
*/

const $ = (id) => document.getElementById(id);

const STORAGE = {
  users: "cc_demo_users",
  session: "cc_demo_session",
  preferences: "cc_demo_preferences",
  saved: "cc_demo_saved",
  applications: "cc_demo_applications"
};

const demoJobs = [
  {
    id: 1,
    title: "Junior Java Developer",
    company: "TechNova Solutions",
    location: "Bengaluru",
    type: "Full-time",
    workMode: "Hybrid",
    experience: "Fresher",
    salary: 450000,
    salaryText: "3–6 LPA",
    interest: "Software Development",
    skills: ["Java", "SQL", "Spring Boot", "Git"],
    education: ["BE / BTech", "BCA / BSc", "MCA / MSc"],
    description: "Work with a development team to build and maintain Java applications."
  },
  {
    id: 2,
    title: "Python Developer Intern",
    company: "CodeCraft Labs",
    location: "Remote",
    type: "Internship",
    workMode: "Remote",
    experience: "Fresher",
    salary: 200000,
    salaryText: "Below 3 LPA",
    interest: "Python Development",
    skills: ["Python", "SQL", "Git"],
    education: ["BE / BTech", "BCA / BSc", "MCA / MSc"],
    description: "Learn Python development, automation, APIs, and database integration."
  },
  {
    id: 3,
    title: "Junior Data Analyst",
    company: "InsightWorks",
    location: "Bengaluru",
    type: "Full-time",
    workMode: "On-site",
    experience: "Fresher",
    salary: 500000,
    salaryText: "3–6 LPA",
    interest: "Data Science and Analytics",
    skills: ["SQL", "Python", "Excel", "Power BI"],
    education: ["BE / BTech", "BCA / BSc", "MCA / MSc"],
    description: "Analyze datasets, prepare reports, and build useful business dashboards."
  },
  {
    id: 4,
    title: "Frontend Web Developer",
    company: "PixelBridge",
    location: "Hyderabad",
    type: "Full-time",
    workMode: "Hybrid",
    experience: "0-2 years",
    salary: 600000,
    salaryText: "3–6 LPA",
    interest: "Web Development",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    education: ["BE / BTech", "BCA / BSc", "MCA / MSc"],
    description: "Build responsive interfaces and accessible web experiences."
  },
  {
    id: 5,
    title: "Software Engineer Trainee",
    company: "NextGen Systems",
    location: "Pune",
    type: "Full-time",
    workMode: "On-site",
    experience: "Fresher",
    salary: 350000,
    salaryText: "3–6 LPA",
    interest: "Software Development",
    skills: ["Java", "Python", "SQL", "Git"],
    education: ["BE / BTech", "BCA / BSc", "MCA / MSc"],
    description: "Start your engineering career working on software development projects."
  },
  {
    id: 6,
    title: "QA Automation Intern",
    company: "QualityFirst",
    location: "Bengaluru",
    type: "Internship",
    workMode: "Hybrid",
    experience: "Fresher",
    salary: 240000,
    salaryText: "Below 3 LPA",
    interest: "Testing and QA",
    skills: ["Java", "JavaScript", "Selenium", "SQL"],
    education: ["BE / BTech", "BCA / BSc", "MCA / MSc"],
    description: "Learn test automation, test cases, bug reporting, and API testing."
  },
  {
    id: 7,
    title: "Machine Learning Intern",
    company: "DataSpring",
    location: "Remote",
    type: "Internship",
    workMode: "Remote",
    experience: "Fresher",
    salary: 250000,
    salaryText: "Below 3 LPA",
    interest: "Data Science and Analytics",
    skills: ["Python", "SQL", "Machine Learning"],
    education: ["BE / BTech", "BCA / BSc", "MCA / MSc"],
    description: "Explore datasets and build introductory machine learning models."
  },
  {
    id: 8,
    title: "Business Associate",
    company: "GrowthPath",
    location: "Mumbai",
    type: "Full-time",
    workMode: "On-site",
    experience: "Fresher",
    salary: 400000,
    salaryText: "3–6 LPA",
    interest: "Business and Management",
    skills: ["Communication", "Excel", "Analysis"],
    education: ["BE / BTech", "BCA / BSc", "MCA / MSc", "Other"],
    description: "Support business operations, client communication, and growth projects."
  },
  {
    id: 9,
    title: "React Developer",
    company: "BrightWeb",
    location: "Bengaluru",
    type: "Full-time",
    workMode: "Remote",
    experience: "0-2 years",
    salary: 800000,
    salaryText: "6–10 LPA",
    interest: "Web Development",
    skills: ["React", "JavaScript", "HTML", "CSS"],
    education: ["BE / BTech", "BCA / BSc", "MCA / MSc"],
    description: "Develop reusable UI components and integrate frontend APIs."
  },
  {
    id: 10,
    title: "Backend Python Developer",
    company: "CloudOrbit",
    location: "Hyderabad",
    type: "Full-time",
    workMode: "Hybrid",
    experience: "2-5 years",
    salary: 1200000,
    salaryText: "10+ LPA",
    interest: "Python Development",
    skills: ["Python", "SQL", "APIs", "Git"],
    education: ["BE / BTech", "BCA / BSc", "MCA / MSc"],
    description: "Build backend services, integrate APIs, and improve application reliability."
  }
];

let activeTab = "recommendations";
let currentJobMode = "allJobs";
let toastTimer;

function readStore(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

function writeStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    showToast("Browser storage is unavailable or full.");
    return false;
  }
}

function getUsers() {
  const users = readStore(STORAGE.users, []);
  return Array.isArray(users) ? users : [];
}

function getSession() {
  return readStore(STORAGE.session, null);
}

function getCurrentUser() {
  const session = getSession();
  if (!session) return null;

  return getUsers().find(user => user.id === session.userId) || null;
}

function getPreferences() {
  const user = getCurrentUser();
  if (!user) return {};

  const all = readStore(STORAGE.preferences, {});
  return all[user.id] || {};
}

function saveUserPreferences(preferences) {
  const user = getCurrentUser();
  if (!user) return false;

  const all = readStore(STORAGE.preferences, {});
  all[user.id] = preferences;

  return writeStore(STORAGE.preferences, all);
}

function getUserSavedIds() {
  const user = getCurrentUser();
  if (!user) return [];

  const all = readStore(STORAGE.saved, {});
  return all[user.id] || [];
}

function getUserApplications() {
  const user = getCurrentUser();
  if (!user) return [];

  const all = readStore(STORAGE.applications, {});
  return all[user.id] || [];
}

function updateUserCollection(key, value) {
  const user = getCurrentUser();
  if (!user) return false;

  const all = readStore(key, {});
  all[user.id] = value;

  return writeStore(key, all);
}

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function showPage(name) {
  const user = getCurrentUser();

  // Require login before entering private pages.
  if (name === "dashboard" && !user) {
    name = "login";
  }

  document.querySelectorAll(".page").forEach(page => {
    page.classList.add("hidden");
  });

  const target = $(name + "Page");
  if (target) target.classList.remove("hidden");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function togglePassword(id, button) {
  const input = $(id);
  const visible = input.type === "password";

  input.type = visible ? "text" : "password";
  button.textContent = visible ? "Hide" : "Show";
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function parseSkills(value) {
  return String(value || "")
    .split(",")
    .map(skill => normalize(skill))
    .filter(Boolean);
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function showLoggedInNavigation(user) {
  $("publicNav").classList.toggle("hidden", !!user);
  $("userNav").classList.toggle("hidden", !user);

  if (user) {
    $("navUser").textContent = user.name;
  }
}

function applyDefaultPreferences() {
  const prefs = getPreferences();

  $("interest").value = prefs.interest || "Software Development";
  $("skills").value = prefs.skills || "";
  $("education").value = prefs.education || "BE / BTech";
  $("experience").value = prefs.experience || "Fresher";
  $("preferredLocation").value = prefs.location || "";
  $("preferredType").value = prefs.type || "Any";
  $("preferredWorkMode").value = prefs.workMode || "Any";
  $("preferredSalary").value = prefs.salary || "Any";
}

function updateProfile() {
  const user = getCurrentUser();
  if (!user) return;

  $("welcomeTitle").textContent = "Welcome back, " + user.name.split(" ")[0] + "!";
  $("profileName").textContent = user.name;
  $("profileEmail").textContent = user.email;
  $("profileRole").textContent =
    user.role === "recruiter" ? "Recruiter account" : "Candidate account";

  $("profileAvatar").textContent = user.name.charAt(0).toUpperCase();
}

function openTab(tab) {
  if (!getCurrentUser()) {
    showPage("login");
    showToast("Please log in to access your dashboard.");
    return;
  }

  activeTab = tab;

  document.querySelectorAll(".side-link").forEach(button => {
    button.classList.toggle("active", button.dataset.tab === tab);
  });

  document.querySelectorAll(".tab-panel").forEach(panel => {
    panel.classList.add("hidden");
  });

  const panel = $(tab + "Panel");
  if (panel) panel.classList.remove("hidden");

  if (tab === "allJobs") {
    currentJobMode = "allJobs";
    renderJobs("allJobs");
  } else if (tab === "recommendations") {
    renderJobs("recommendations");
  } else if (tab === "saved") {
    renderJobs("saved");
  } else if (tab === "applications") {
    renderApplications();
  } else if (tab === "preferences") {
    applyDefaultPreferences();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function enterDashboard() {
  const user = getCurrentUser();

  if (!user) {
    showPage("login");
    return;
  }

  showLoggedInNavigation(user);
  updateProfile();
  applyDefaultPreferences();
  updateStats();
  showPage("dashboard");

  // Recruiters see a message; recruiter management needs a backend.
  if (user.role === "recruiter") {
    showToast("Recruiter demo account. Job management requires backend integration.");
  }

  const prefs = getPreferences();
  openTab(prefs.completed ? "recommendations" : "preferences");
}

// Registration
$("registerForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = $("registerName").value.trim();
  const email = normalize($("registerEmail").value);
  const password = $("registerPassword").value;
  const confirmPassword = $("confirmPassword").value;
  const role = $("registerRole").value;

  if (name.length < 2) {
    showToast("Please enter your full name.");
    return;
  }

  if (password.length < 8) {
    showToast("Password must contain at least 8 characters.");
    return;
  }

  if (password !== confirmPassword) {
    showToast("Passwords do not match.");
    return;
  }

  const users = getUsers();

  if (users.some(user => user.email === email)) {
    showToast("An account with this email already exists.");
    return;
  }

  // DEMO ONLY: never store plaintext passwords in a real application.
  const user = {
    id: "user_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8),
    name,
    email,
    password,
    role
  };

  if (!writeStore(STORAGE.users, [...users, user])) return;

  $("registerForm").reset();
  showToast("Account created. Please log in.");
  showPage("login");
  $("loginEmail").value = email;
});

// Login
$("loginForm").addEventListener("submit", event => {
  event.preventDefault();

  const email = normalize($("loginEmail").value);
  const password = $("loginPassword").value;

  const user = getUsers().find(item =>
    item.email === email && item.password === password
  );

  if (!user) {
    showToast("Invalid email or password. Please register first.");
    return;
  }

  if (!writeStore(STORAGE.session, { userId: user.id })) return;

  $("loginForm").reset();
  showLoggedInNavigation(user);
  enterDashboard();
  showToast("Welcome back, " + user.name.split(" ")[0] + "!");
});

// Forgot password: simulated only.
$("forgotForm").addEventListener("submit", event => {
  event.preventDefault();
  showToast("Password reset requires a secure backend email service.");
});

// Save preferences
$("preferencesForm").addEventListener("submit", event => {
  event.preventDefault();

  const prefs = {
    interest: $("interest").value,
    skills: $("skills").value.trim(),
    education: $("education").value,
    experience: $("experience").value,
    location: $("preferredLocation").value.trim(),
    type: $("preferredType").value,
    workMode: $("preferredWorkMode").value,
    salary: $("preferredSalary").value,
    completed: true
  };

  if (!saveUserPreferences(prefs)) return;

  showToast("Your career preferences have been saved.");
  updateStats();
  openTab("recommendations");
});

// Job match scoring
function getMatch(job) {
  const prefs = getPreferences();
  let score = 0;
  let possible = 0;
  const reasons = [];

  function evaluate(weight, condition, reason) {
    possible += weight;
    if (condition) {
      score += weight;
      if (reason) reasons.push(reason);
    }
  }

  const wantedSkills = parseSkills(prefs.skills);
  const jobSkills = job.skills.map(normalize);

  if (wantedSkills.length) {
    const matched = wantedSkills.filter(skill =>
      jobSkills.some(jobSkill =>
        jobSkill.includes(skill) || skill.includes(jobSkill)
      )
    );

    const ratio = matched.length / wantedSkills.length;
    score += 35 * ratio;
    possible += 35;

    if (matched.length) {
      reasons.push("Skills: " + matched.join(", "));
    }
  }

  evaluate(
    25,
    normalize(job.interest) === normalize(prefs.interest),
    "Matches your career interest"
  );

  evaluate(
    15,
    !prefs.education || job.education.includes(prefs.education),
    "Education preference matches"
  );

  evaluate(
    10,
    !prefs.experience ||
      prefs.experience === "Fresher" ||
      prefs.experience === job.experience ||
      (prefs.experience === "0-2 years" && job.experience === "Fresher"),
    "Experience level matches"
  );

  evaluate(
    10,
    !prefs.location ||
      normalize(prefs.location) === "anywhere" ||
      normalize(job.location).includes(normalize(prefs.location)) ||
      job.workMode === "Remote",
    "Location or remote preference matches"
  );

  evaluate(
    5,
    !prefs.salary || prefs.salary === "Any" ||
      prefs.salary === job.salaryText,
    "Salary preference matches"
  );

  // A job's work arrangement and employment type are also used
  // as hard filters when the user requests a specific value.
  const scorePercent = possible ? Math.round(score / possible * 100) : 0;

  return {
    score: scorePercent,
    reasons,
    matchedSkills: wantedSkills.filter(skill =>
      jobSkills.some(jobSkill =>
        jobSkill.includes(skill) || skill.includes(jobSkill)
      )
    )
  };
}

function passesPreferenceFilters(job) {
  const prefs = getPreferences();

  if (prefs.type && prefs.type !== "Any" && job.type !== prefs.type) {
    return false;
  }

  if (
    prefs.workMode && prefs.workMode !== "Any" &&
    job.workMode !== prefs.workMode
  ) {
    return false;
  }

  return true;
}

function matchesSearchFilters(job) {
  const query = normalize($("searchInput").value);
  const location = normalize($("locationFilter").value);
  const experience = $("experienceFilter").value;
  const type = $("typeFilter").value;

  const searchable = [
    job.title,
    job.company,
    job.location,
    ...job.skills
  ].join(" ").toLowerCase();

  return (!query || searchable.includes(query)) &&
    (!location ||
      normalize(job.location).includes(location) ||
      (job.workMode === "Remote" && location === "remote")) &&
    (!experience || job.experience === experience) &&
    (!type || job.type === type);
}

function renderJobs(mode) {
  if (!getCurrentUser()) {
    showPage("login");
    showToast("Please log in first.");
    return;
  }

  currentJobMode = mode;

  let jobs = [...demoJobs];

  if (mode === "saved") {
    const saved = getUserSavedIds();
    jobs = jobs.filter(job => saved.includes(job.id));
  } else if (mode === "allJobs") {
    jobs = jobs.filter(matchesSearchFilters);
  } else {
    jobs = jobs.filter(passesPreferenceFilters);

    jobs = jobs.map(job => ({
      ...job,
      match: getMatch(job)
    }));

    jobs.sort((a, b) => b.match.score - a.match.score);
  }

  if (mode === "allJobs") {
    $("allJobsCount").textContent = jobs.length + " results";
  }

  const container = $(
    mode === "saved" ? "savedJobsList" :
    mode === "allJobs" ? "allJobsList" :
    "recommendationsList"
  );

  container.innerHTML = "";

  if (!jobs.length) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No jobs found</h3>
        <p>Try changing your search or career preferences.</p>
      </div>`;
    updateStats();
    return;
  }

  jobs.forEach(job => {
    const saved = getUserSavedIds().includes(job.id);
    const applied = getUserApplications().some(app => app.jobId === job.id);
    const match = job.match || getMatch(job);

    const card = document.createElement("article");
    card.className = "job-card";

    const reasonText = match.reasons.length
      ? match.reasons.slice(0, 3).join(" · ")
      : "Based on the information currently available.";

    card.innerHTML = `
      <div class="job-card-top">
        <div class="company-logo">${escapeHTML(job.company.charAt(0))}</div>
        ${mode !== "allJobs"
          ? `<span class="match-pill">${match.score}% match</span>`
          : `<span class="status-pill">Demo listing</span>`}
      </div>
      <h3>${escapeHTML(job.title)}</h3>
      <p class="company-name">${escapeHTML(job.company)}</p>
      <div class="job-tags">
        <span>📍 ${escapeHTML(job.location)}</span>
        <span>💼 ${escapeHTML(job.type)}</span>
        <span>⌁ ${escapeHTML(job.experience)}</span>
        <span>₹ ${escapeHTML(job.salaryText)}</span>
      </div>
      <p class="job-description">${escapeHTML(job.description)}</p>
      <div class="job-tags">
        ${job.skills.slice(0, 4).map(skill =>
          `<span>${escapeHTML(skill)}</span>`
        ).join("")}
      </div>
      ${mode !== "allJobs"
        ? `<div class="match-reason">✦ ${escapeHTML(reasonText)}</div>`
        : ""}
      <div class="job-actions">
        <button class="btn btn-primary" data-action="apply" data-id="${job.id}"
          ${applied ? "disabled" : ""}>
          ${applied ? "Applied" : "Apply"}
        </button>
        <button class="bookmark-btn" aria-label="${saved ? "Remove saved job" : "Save job"}"
          title="${saved ? "Remove saved job" : "Save job"}"
          data-action="save" data-id="${job.id}">${saved ? "♥" : "♡"}</button>
      </div>
    `;

    container.appendChild(card);
  });

  updateStats();
}

function toggleSavedJob(id) {
  const saved = getUserSavedIds();
  const exists = saved.includes(id);

  const updated = exists
    ? saved.filter(savedId => savedId !== id)
    : [...saved, id];

  if (!updateUserCollection(STORAGE.saved, updated)) return;

  showToast(exists ? "Removed from saved jobs." : "Job saved successfully.");
  updateStats();
  renderJobs(currentJobMode);
}

function applyForJob(id) {
  const job = demoJobs.find(item => item.id === id);
  if (!job) return;

  const applications = getUserApplications();

  if (applications.some(app => app.jobId === id)) {
    showToast("You have already applied for this demo job.");
    return;
  }

  applications.push({
    jobId: id,
    title: job.title,
    company: job.company,
    status: "Applied",
    date: new Date().toLocaleDateString()
  });

  if (!updateUserCollection(STORAGE.applications, applications)) return;

  showToast("Demo application recorded successfully.");
  updateStats();
  renderJobs(currentJobMode);
}

document.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  if (!getCurrentUser()) {
    showPage("login");
    showToast("Please log in first.");
    return;
  }

  const id = Number(button.dataset.id);

  if (button.dataset.action === "save") {
    toggleSavedJob(id);
  }

  if (button.dataset.action === "apply") {
    applyForJob(id);
  }
});

function renderApplications() {
  const container = $("applicationsList");
  const applications = getUserApplications();

  container.innerHTML = "";

  if (!applications.length) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No applications yet</h3>
        <p>Explore jobs and select Apply to start tracking your applications.</p>
      </div>`;
    return;
  }

  applications.forEach(app => {
    const item = document.createElement("article");
    item.className = "application-item";
    item.innerHTML = `
      <div>
        <h3>${escapeHTML(app.title)}</h3>
        <p>${escapeHTML(app.company)} · Applied ${escapeHTML(app.date)}</p>
      </div>
      <span class="status-pill">${escapeHTML(app.status)}</span>
    `;
    container.appendChild(item);
  });
}

function updateStats() {
  $("recommendedCount").textContent =
    demoJobs.filter(passesPreferenceFilters).length;
  $("savedCount").textContent = getUserSavedIds().length;
  $("applicationCount").textContent = getUserApplications().length;
}

function clearFilters() {
  $("searchInput").value = "";
  $("locationFilter").value = "";
  $("experienceFilter").value = "";
  $("typeFilter").value = "";

  renderJobs("allJobs");
}

function logout() {
  try {
    localStorage.removeItem(STORAGE.session);
  } catch {
    // The UI will still return to the public page.
  }

  showLoggedInNavigation(null);
  showPage("home");
  showToast("You have logged out.");
}

function initializeApp() {
  const user = getCurrentUser();

  showLoggedInNavigation(user);

  if (user) {
    updateProfile();
    applyDefaultPreferences();
    updateStats();
    showPage("dashboard");

    const prefs = getPreferences();
    openTab(prefs.completed ? "recommendations" : "preferences");
  } else {
    showPage("home");
  }
}

initializeApp();