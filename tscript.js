let codeMirrorEditor;

// Predefined Twig templates
const predefinedTemplates = [
    {
        title: "Condition for Single Attendee (VIP)",
        twig: `{% if attendee.ticket_name == "VIP" %}
    Welcome VIP Guest!
{% else %}
    Welcome Guest!
{% endif %}`
    },
    {
        title: "Show Multiple Attendees Details",
        twig: `{% for attendee in order.attendees %}
    Name: {{ attendee.firstname }} {{ attendee.lastname }}
    Email: {{ attendee.email }}
{% endfor %}`
    },
    {
        title: "Ticket QR Code",
        twig: `<p style="text-align: center;">
    <img alt="Ticket QR" height="200" src="https://www.gevme.com/qr/{{attendee.ticket_no}}.png" style="width: 200px; height: 200px;" width="200">
</p>`
    },
    {
        title: "Nested Conditions Example",
        twig: `{% if attendee.ticket_name == "VIP" %}
    Welcome VIP Guest!
{% elseif attendee.ticket_name == "Student" %}
    Welcome Student Guest!
{% else %}
    Welcome Guest!
{% endif %}`
    },
    {
        title: "Show Attendee QR Codes",
        twig: `{% for attendee in order.attendees %}
    <p>
        Name: {{ attendee.firstname }} {{ attendee.lastname }}<br>
        QR Code: <img src="https://www.gevme.com/qr/{{attendee.ticket_no}}.png" alt="QR Code">
    </p>
{% endfor %}`
    }
];

// Initialize CodeMirror editor
window.onload = () => {
    const editorArea = document.getElementById("codeEditor");
    codeMirrorEditor = CodeMirror.fromTextArea(editorArea, {
        lineNumbers: true,
        mode: "xml",
        theme: "eclipse", // Default light theme
        readOnly: true
    });

    populateTemplates();
};

// Populate predefined templates
function populateTemplates() {
    const templateList = document.getElementById("templateList");
    predefinedTemplates.forEach(template => {
        const li = document.createElement("li");
        li.textContent = template.title;
        li.addEventListener("click", () => {
            codeMirrorEditor.setValue(template.twig);
        });
        templateList.appendChild(li);
    });
}

// Generate Twig Code
document.getElementById("generateTwig").addEventListener("click", () => {
    const condition = document.getElementById("condition").value.trim();
    const fieldLabel = document.getElementById("fieldLabel").value.trim();
    const outputTwig = document.getElementById("outputTwig").value.trim();

    if (!condition || !fieldLabel || !outputTwig) {
        alert("Please fill out all fields.");
        return;
    }

    const twigCode = `
{% if ${condition} %}
    ${outputTwig}
{% else %}
    Default content for ${fieldLabel}
{% endif %}
    `.trim();

    codeMirrorEditor.setValue(twigCode);
});

// Track the dark mode state
let isDarkMode = false;

// Initialize buttons
const toggleThemeButton = document.getElementById("toggleTheme");
const helpButton = document.getElementById("helpButton");
const exportButton = document.getElementById("exportButton");

// Initialize the modal
const helpModal = document.getElementById("helpModal");
const closeModalButton = document.getElementById("closeModal");

// Theme toggle functionality
toggleThemeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    isDarkMode = !isDarkMode;

    // Update CodeMirror editor theme dynamically
    const editorTheme = isDarkMode ? "monokai" : "eclipse";
    codeMirrorEditor.setOption("theme", editorTheme);

    // Update the button tooltip/title
    toggleThemeButton.title = isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode";
});

// Open Help Modal
helpButton.addEventListener("click", () => {
    helpModal.classList.remove("hidden");
    helpModal.classList.add("show");
});

// Close Help Modal
closeModalButton.addEventListener("click", () => {
    helpModal.classList.remove("show");
    helpModal.classList.add("hidden");
});

// Close Help Modal on clicking outside the modal content
window.addEventListener("click", (event) => {
    if (event.target === helpModal) {
        helpModal.classList.remove("show");
        helpModal.classList.add("hidden");
    }
});

// Export Twig Code functionality
exportButton.addEventListener("click", () => {
    const twigCode = codeMirrorEditor.getValue();
    if (!twigCode) {
        alert("No Twig code to export!");
        return;
    }

    // Create a Blob and trigger the download
    const blob = new Blob([twigCode], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "template.twig";
    link.click();
});

document.addEventListener('DOMContentLoaded', function () {
    // Check if the user is logged in (replace with your own logic)
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

    if (!isAuthenticated) {
        // Display warning message
        const warningDiv = document.createElement('div');
        warningDiv.textContent = 'Unauthorized access attempt! Redirecting to login page in 5 seconds...';
        warningDiv.style.position = 'fixed';
        warningDiv.style.top = '10px';
        warningDiv.style.left = '50%';
        warningDiv.style.transform = 'translateX(-50%)';
        warningDiv.style.backgroundColor = '#f44336'; // Red background
        warningDiv.style.color = '#fff'; // White text
        warningDiv.style.padding = '10px 20px';
        warningDiv.style.borderRadius = '5px';
        warningDiv.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';
        warningDiv.style.zIndex = '1000';
        document.write("Bad Attempt X");
        document.body.appendChild(warningDiv);

        // Redirect after 5 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 5000);
    }
});

    function logout() {
// sessionStorage.clear();
localStorage.clear();

// Optionally, clear cookies (if applicable)
document.cookie.split(";").forEach(function (cookie) {
  document.cookie = cookie
    .replace(/^ +/, "")
    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
});

// Redirect to index.html
window.location.href = "index.html";
}