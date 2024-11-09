const form = document.getElementById("resume-form");
const resumeDisplayElement = document.getElementById("resume-display");
const copyLinkButton = document.getElementById("copy-link");
const downloadPDFButton = document.getElementById("download-pdf");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const education = document.getElementById("education").value;
    const experience = document.getElementById("experience").value;
    const skills = document.getElementById("skills").value;

    // Generate unique URL
    const uniqueURL = `${window.location.origin}/${username}`;
    localStorage.setItem(username, JSON.stringify({ name, email, phone, education, experience, skills }));

    const resumeHtml = `
        <h2>${name}'s Resume</h2>
        <h3>Personal Information</h3>
        <p><b>Email:</b> <span contenteditable="true">${email}</span></p>
        <p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>
        
        <h3>Education</h3>
        <p contenteditable="true">${education}</p>

        <h3>Experience</h3>
        <p contenteditable="true">${experience}</p>

        <h3>Skills</h3>
        <p contenteditable="true">${skills}</p>
    `;

    if (resumeDisplayElement) {
        resumeDisplayElement.innerHTML = resumeHtml;
    }

    // Enable buttons
    copyLinkButton.style.display = 'block';
    downloadPDFButton.style.display = 'block';
});

// Copy the unique URL to clipboard
copyLinkButton.addEventListener('click', function () {
    const username = document.getElementById("username").value.trim();
    const uniqueURL = `${window.location.origin}/${username}`;
    navigator.clipboard.writeText(uniqueURL).then(() => {
        alert(`Shareable link copied: ${uniqueURL}`);
    });
});

// Download resume as PDF
downloadPDFButton.addEventListener('click', function () {
    const element = document.getElementById("resume-display");
    if (element) {
        html2pdf().from(element).save('Resume.pdf');
    }
});

// Load resume from local storage if URL matches
const path = window.location.pathname.replace('/', '');
if (path) {
    const savedResume = localStorage.getItem(path);
    if (savedResume) {
        const { name, email, phone, education, experience, skills } = JSON.parse(savedResume);
        resumeDisplayElement.innerHTML = `
            <h2>${name}'s Resume</h2>
            <h3>Personal Information</h3>
            <p><b>Email:</b> <span contenteditable="true">${email}</span></p>
            <p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>
            
            <h3>Education</h3>
            <p contenteditable="true">${education}</p>

            <h3>Experience</h3>
            <p contenteditable="true">${experience}</p>

            <h3>Skills</h3>
            <p contenteditable="true">${skills}</p>
        `;
    }
}
