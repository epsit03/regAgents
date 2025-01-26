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
    let editor; // To hold the CodeMirror instance
    const inputSection = document.getElementById('input-section');

    // Helper function to process and trim input details
    const parseDetails = (details) => details.split(',').map(x => x.trim());

    // Helper function to convert CSS property names to camelCase
    const toCamelCase = (str) => str.replace(/-([a-z])/g, g => g[1].toUpperCase());

    const apiTemplate = {
        method: {
            label: 'Select API Method:',
            options: ['GET', 'POST', 'PUT', 'DELETE']
        },
        additionalInputs: {
            GET: { label: 'Enter API Endpoint:', placeholder: 'e.g., https://api.example.com/data' },
            POST: { label: 'Enter API Endpoint and Payload:', placeholder: 'e.g., https://api.example.com/data' },
            PUT: { label: 'Enter API Endpoint and Payload:', placeholder: 'e.g., https://api.example.com/data' },
            DELETE: { label: 'Enter API Endpoint:', placeholder: 'e.g., https://api.example.com/data' }
        },
        generate: (method, endpoint, payload) => {
            const commonFetch = (method, endpoint, payload = '') => `
fetch('${endpoint}', {
method: '${method}',
${payload ? `headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(${payload})` : ''}
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`;

            if (method === 'GET' || method === 'DELETE') {
                return commonFetch(method, endpoint);
            } else {
                return commonFetch(method, endpoint, payload);
            }
        }
    };

    const templates = {
        "complex-css": {
action: {
    label: 'Choose Custom CSS Styling',
    options: [
        "Enter CSS Selectors (comma-separated)",
        "Enter Base Styles (JSON format)",
        "Enter Event-Based Styles (JSON format)",
        "Add Transitions (optional)"
    ],
},
additionalInputs: {
    "Enter CSS Selectors (comma-separated)": {
        label: "Enter CSS Selectors",
        placeholder: "#id, .class, div"
    },
    "Enter Base Styles (JSON format)": {
        label: "Enter Base Styles",
        placeholder: '{"color": "blue", "background-color": "lightgray"}'
    },
    "Enter Event-Based Styles (JSON format)": {
        label: "Enter Event-Based Styles",
        placeholder: '{"click": {"transform": "scale(1.2)", "color": "red"}}'
    },
    "Add Transitions (optional)": {
        label: "Add Transitions",
        placeholder: "all 0.5s ease"
    }
},
generate: ({ selectors, baseStyles, eventStyles, transitions, option }) => {
    const selectorsArray = selectors.split(",").map(sel => sel.trim());
    let code = "";

    switch (option) {
        case "Enter CSS Selectors (comma-separated)":
            // Example logic for handling selectors
            code += `// Handle selectors only\n`;
            selectorsArray.forEach(selector => {
                code += `
console.log("Selector: ${selector}");\n`;
            });
            break;

        case "Enter Base Styles (JSON format)":
            // Apply base styles dynamically
            code += `// Apply base styles dynamically\n`;
            selectorsArray.forEach(selector => {
                code += `
document.querySelectorAll('${selector}').forEach(element => {
Object.assign(element.style, ${baseStyles});
});\n`;
            });
            break;

        case "Enter Event-Based Styles (JSON format)":
            // Add event-based styles
            if (eventStyles) {
                const events = JSON.parse(eventStyles);
                for (const [event, styles] of Object.entries(events)) {
                    selectorsArray.forEach(selector => {
                        code += `
// Add ${event} event listener for '${selector}'
document.querySelectorAll('${selector}').forEach(element => {
element.addEventListener('${event}', function() {
    Object.assign(this.style, ${JSON.stringify(styles)});
});
});\n`;
                    });
                }
            } else {
                code += "// No event styles provided\n";
            }
            break;

        case "Add Transitions (optional)":
            // Add transitions
            if (transitions) {
                code += `// Add transitions\n`;
                selectorsArray.forEach(selector => {
                    code += `
document.querySelectorAll('${selector}').forEach(element => {
element.style.transition = '${transitions}';
});\n`;
                });
            } else {
                code += "// No transitions provided\n";
            }
            break;

        default:
            code += "// Invalid option selected\n";
    }

    return code;
}
},
        multiStepForm: {
action: {
    label: 'Generate Multi-Step Form Logic:',
    options: ['Basic Multi-Step Form Navigation']
},
generate: () => `
document.addEventListener('DOMContentLoaded', () => {
console.log("Initializing Multi-Step Form...");
const steps = Array.from(document.querySelectorAll('.form-step'));
let currentStep = 0;

const updateStepDisplay = () => {
    steps.forEach((step, index) => {
        step.style.display = index === currentStep ? 'block' : 'none';
    });
};

const showNextStep = () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateStepDisplay();
    }
};

const showPreviousStep = () => {
    if (currentStep > 0) {
        currentStep--;
        updateStepDisplay();
    }
};

// Create navigation buttons
const navContainer = document.createElement('div');
navContainer.style.display = 'flex';
navContainer.style.justifyContent = 'space-between';
navContainer.style.marginTop = '20px';

const prevButton = document.createElement('button');
prevButton.textContent = 'Previous';
prevButton.disabled = true;
prevButton.style.padding = '10px';
prevButton.style.backgroundColor = '#888';
prevButton.style.color = '#fff';
prevButton.style.cursor = 'pointer';
prevButton.style.borderRadius = '5px';
prevButton.addEventListener('click', () => {
    showPreviousStep();
    prevButton.disabled = currentStep === 0;
    nextButton.textContent = currentStep === steps.length - 1 ? 'Submit' : 'Next';
});

const nextButton = document.createElement('button');
nextButton.textContent = 'Next';
nextButton.style.padding = '10px';
nextButton.style.backgroundColor = '#4CAF50';
nextButton.style.color = '#fff';
nextButton.style.cursor = 'pointer';
nextButton.style.borderRadius = '5px';
nextButton.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        showNextStep();
        prevButton.disabled = false;
    } else {
        console.log('Form submitted!');
    }
    nextButton.textContent = currentStep === steps.length - 1 ? 'Submit' : 'Next';
});

navContainer.appendChild(prevButton);
navContainer.appendChild(nextButton);
document.body.appendChild(navContainer);

updateStepDisplay();
});
`
},
        dom: {
            action: {
                label: 'Select DOM Action:',
                options: ['Change Style', 'Add Content', 'Remove Element', 'Event Listener']
            },
            additionalInputs: {
                'Change Style': { label: 'Enter DOM Selector and CSS Property:', placeholder: 'e.g., #myDiv, color: red' },
                'Add Content': { label: 'Enter DOM Selector and Content:', placeholder: 'e.g., #myDiv, Hello World!' },
                'Remove Element': { label: 'Enter DOM Selector:', placeholder: 'e.g., #myDiv' },
                'Event Listener': { label: 'Enter DOM Selector and Event Type:', placeholder: 'e.g., #myButton, click' }
            },
            generate: (action, details) => {
                if (!details) return '';
                
                switch (action) {
                    case 'Change Style': {
                        const [selector, style] = parseDetails(details);
                        if (!selector || !style) return '';
                        
                        const [property, value] = style.split(':').map(x => x.trim());
                        const camelProperty = toCamelCase(property);
                        return `document.querySelector('${selector}').style.${camelProperty} = '${value}';`;
                    }
                    case 'Add Content': {
                        const [selector, content] = parseDetails(details);
                        if (!selector || !content) return '';
                        return `document.querySelector('${selector}').innerHTML = '${content}';`;
                    }
                    case 'Remove Element': {
                        if (!details) return '';
                        return `document.querySelector('${details}').remove();`;
                    }
                    case 'Event Listener': {
                        const [selector, eventType] = parseDetails(details);
                        if (!selector || !eventType) return '';
                        return `document.querySelector('${selector}').addEventListener('${eventType}', () => {
console.log('${eventType} event triggered on ${selector}');
// Add your event handling code here
});`;
                    }
                    default:
                        return '';
                }
            }
        },
        api: apiTemplate,
        validation: {
        action: {
            label: 'Select Validation Type:',
            options: ['Check Empty Fields', 'Email Validation', 'Custom Validation']
        },
        additionalInputs: {
            'Check Empty Fields': { label: 'Enter Form ID:', placeholder: 'e.g., myForm' },
            'Email Validation': { label: 'Enter Email Input ID:', placeholder: 'e.g., emailInput' },
            'Custom Validation': { label: 'Enter Form ID and Validation Logic:', placeholder: 'e.g., myForm, Custom Logic' }
        },
        generate: (type, formId, logic) => {
            const commonValidation = (validationLogic) => `
const form = document.getElementById('${formId}');
form.addEventListener('submit', (e) => {
e.preventDefault();
${validationLogic}
});`;

            switch (type) {
                case 'Check Empty Fields':
                    return commonValidation(`
const isEmpty = Array.from(form.elements).some(input => input.value.trim() === '');
if (isEmpty) alert('Please fill in all fields!');
else alert('Form submitted!');
`);
                case 'Email Validation':
                    return commonValidation(`
const emailInput = document.getElementById('${formId}');
emailInput.addEventListener('blur', () => {
const email = emailInput.value;
const isValid = /^[\\w.-]+@[\\w.-]+\\.\\w+$/.test(email);
if (!isValid) alert('Invalid email address!');
});
`);
                case 'Custom Validation':
                    return commonValidation(logic);
                default:
                    return '';
            }
        }
    },
        attendee: {
            action: {
                label: 'Select Attendee Form Functionality:',
                options: [
                    'Prevent Copy-Paste in Confirm Email',
                    'Email Address Validation',
                    'Convert Form to Multi-Step'
                ]
            },
            additionalInputs: {
                'Prevent Copy-Paste in Confirm Email': {
                    label: 'Enter Email Confirmation Field Name:',
                    placeholder: 'e.g., attendee[confirm_email]'
                },
                'Email Address Validation': {
                    label: 'Enter Email and Confirm Email Field Names:',
                    placeholder: 'e.g., attendee[email], attendee[confirm_email]'
                },
                'Convert Form to Multi-Step': {
                    label: 'Enter class:',
                    placeholder: 'e.g., .gf-item'
                }
            },
            generate: (action, details) => {
                switch (action) {
                    case 'Prevent Copy-Paste in Confirm Email': {
                        return `
const confmails = document.querySelectorAll('input[name^="${details}"]');
document.addEventListener('paste', event => {
if ([...confmails].includes(event.target)) {
event.preventDefault();
if (!document.querySelector('.paste-alert-shown')) {
  alert('Please refrain from pasting your email address to confirm. Kindly type it');
  const marker = document.createElement('div');
  marker.className = 'paste-alert-shown';
  document.body.appendChild(marker);
  setTimeout(() => {
    document.body.removeChild(marker);
  }, 500);
}
}
});
`;
                    }
                    case 'Convert Form to Multi-Step': {
                return `
window.onload = function () {
console.log("Window loaded. Initializing the form navigation...");
setTimeout(() => {
    try {
        // Basic styling for the page
        console.log("Applying basic styles...");
        //document.body.style.background = "linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #d3d3d3 100%)";
        //document.body.style.color = "#333";
        document.body.style.fontFamily = "Arial, sans-serif";
        document.body.style.margin = "0";
        document.body.style.padding = "20px";

        const attendeeForms = Array.from(document.querySelectorAll('${details}'));
        const submitButtonsRow = document.querySelector('.buttons.ticket-forms-row');
        let currentAttendeeIndex = 0;

        // Hide the buttons row initially
        if (submitButtonsRow) {
            submitButtonsRow.style.display = 'none';
            console.log("Submit buttons row hidden.");
        } else {
            console.error("Submit buttons row not found.");
        }

        // Create navigation container and buttons
        const navigationContainer = document.createElement('div');
        navigationContainer.style.display = 'flex';
        navigationContainer.style.justifyContent = 'center';
        navigationContainer.style.marginTop = '20px';

        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.style.padding = '10px';
        prevButton.style.backgroundColor = '#888';
        prevButton.style.color = '#fff';
        prevButton.style.cursor = 'pointer';
        prevButton.style.borderRadius = '5px';
        prevButton.style.marginRight = '10px';
        prevButton.style.display = 'none';

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.style.padding = '10px';
        nextButton.style.backgroundColor = '#4CAF50';
        nextButton.style.color = '#fff';
        nextButton.style.cursor = 'pointer';
        nextButton.style.borderRadius = '5px';

        // Append buttons to the navigation container
        navigationContainer.appendChild(prevButton);
        navigationContainer.appendChild(nextButton);

        // Event listener for 'Previous' button
        prevButton.addEventListener('click', () => {
            if (currentAttendeeIndex > 0) {
                console.log("Previous button clicked.");
                currentAttendeeIndex--;
                updateAttendeeFormDisplay();
                updateButtonVisibility();
            }
        });

        // Event listener for 'Next' button
        nextButton.addEventListener('click', () => {
            if (currentAttendeeIndex < attendeeForms.length) {
                console.log("Next button clicked.");
                currentAttendeeIndex++;
                updateAttendeeFormDisplay();
            }
            updateButtonVisibility();
        });

        // Function to display the current attendee form and update circles
        function updateAttendeeFormDisplay() {
            attendeeForms.forEach((form, index) => {
                form.style.display = (index === currentAttendeeIndex || currentAttendeeIndex === attendeeForms.length) ? 'block' : 'none';
            });
            if (currentAttendeeIndex === attendeeForms.length) {
                console.log("Displaying all forms for final review.");
                attendeeForms.forEach(form => form.style.display = 'block');
                if (submitButtonsRow) submitButtonsRow.style.display = 'flex'; // Show submit buttons
            } else if (submitButtonsRow) {
                submitButtonsRow.style.display = 'none'; // Hide submit buttons otherwise
            }
            updateProgressCircles();
        }

        // Progress circle container
        const progressCircleContainer = document.createElement('div');
        progressCircleContainer.style.display = 'flex';
        progressCircleContainer.style.justifyContent = 'center';
        progressCircleContainer.style.marginBottom = '20px';

        // Create a circle for each attendee form and an extra one for the final review
        const progressCircles = Array.from({ length: attendeeForms.length + 1 }, (_, index) => {
            const circle = document.createElement('div');
            circle.style.width = '30px';
            circle.style.height = '30px';
            circle.style.borderRadius = '50%';
            circle.style.backgroundColor = '#ddd';
            circle.style.cursor = 'pointer';
            circle.style.margin = '0 5px';
            circle.style.display = 'flex';
            circle.style.alignItems = 'center';
            circle.style.justifyContent = 'center';
            circle.style.fontSize = '16px';
            circle.style.color = '#333';
            circle.style.fontWeight = 'bold';
            circle.textContent = index < attendeeForms.length ? index + 1 : 'All';
            circle.addEventListener('click', () => {
                currentAttendeeIndex = index;
                updateAttendeeFormDisplay();
                updateButtonVisibility();
            });
            progressCircleContainer.appendChild(circle);
            return circle;
        });

        // Update circle colors based on the current attendee
        function updateProgressCircles() {
            console.log("Updating progress circles...");
            progressCircles.forEach((circle, index) => {
                circle.style.backgroundColor = index === currentAttendeeIndex ? '#4CAF50' : '#ddd';
                circle.style.color = index === currentAttendeeIndex ? '#fff' : '#333';
            });
        }

        // Locate the ticket-forms container
        const ticketFormsContainer = document.querySelector('.ticket-forms-container');
        if (ticketFormsContainer) {
            console.log("Ticket forms container found. Inserting progress circles and navigation container.");
            // Insert the progress circles above the ticket-forms container
            ticketFormsContainer.parentNode.insertBefore(progressCircleContainer, ticketFormsContainer);

            // Insert the navigation container below the ticket-forms container
            ticketFormsContainer.parentNode.insertBefore(navigationContainer, ticketFormsContainer.nextSibling);
        } else {
            console.error("Ticket forms container not found.");
        }

        // Show only the first form on load
        updateAttendeeFormDisplay();

        // Update button visibility based on form index
        function updateButtonVisibility() {
            console.log("Updating button visibility...");
            prevButton.style.display = currentAttendeeIndex > 0 ? 'inline-block' : 'none';
            if (currentAttendeeIndex === attendeeForms.length) {
                nextButton.style.display = 'none';
            } else {
                nextButton.style.display = 'inline-block';
                nextButton.textContent = currentAttendeeIndex === attendeeForms.length - 1 ? 'Summary' : 'Next';
            }
        }

        // Initial setup for button visibility
        updateButtonVisibility();

    } catch (error) {
        console.error("An error occurred during form initialization:", error);
    }
}, 500);  // 500ms delay to ensure elements are loaded
};
`;
                    }
                    default:
                        return '';
                }
            }
        }
    };

    function initializeEditor() {
        editor = CodeMirror(document.getElementById('editor-container'), {
            lineNumbers: true,
            mode: "javascript",
            theme: "dracula",
            value: "// Generated JavaScript code will appear here"
        });
    }

    function populateInputs() {
        const category = document.getElementById('category').value;

        if (templates[category]) {
            createDynamicInputs(category);
        }
    }

    function createDynamicInputs(category) {
        const actionTemplate = templates[category].action || templates[category].method;
        inputSection.innerHTML = `
            <label for="action-select">${actionTemplate.label}</label>
            <select id="action-select" onchange="populateAdditionalInputs('${category}')">
                <option value="">-- Select Action --</option>
                ${actionTemplate.options.map(option => `<option value="${option}">${option}</option>`).join('')}
            </select>
            <div id="additional-inputs">
             </div>
        `;
    }

    function populateAdditionalInputs(category) {
        const action = document.getElementById('action-select').value;
        const additionalInputs = templates[category].additionalInputs[action];
        const additionalInputSection = document.getElementById('additional-inputs');
        additionalInputSection.innerHTML = '';

        if (additionalInputs) {
            additionalInputSection.innerHTML = `
                <label for="dynamic-input">${additionalInputs.label}</label>
                <input type="text" id="dynamic-input" placeholder="${additionalInputs.placeholder}" />
            `;
            if (category === 'api' && (action === 'POST' || action === 'PUT')) {
                additionalInputSection.innerHTML += `
                    <label for="payload-input">Enter JSON Payload:</label>
                    <textarea id="payload-input" placeholder='{"key": "value"}'></textarea>
                `;
            }
            if (category === 'complex-css' && action === 'Enter Base Styles (JSON format)') {
        additionalInputSection.innerHTML += `
            <label for="base-styles-input">Base Styles (JSON):</label>
            <textarea id="base-styles-input" placeholder='${additionalInputs.placeholder}'></textarea>
        `;
    }
        }
    }

    function generateAdvancedCode() {
const category = document.getElementById('category').value;
const action = document.getElementById('action-select')?.value;
const userInput = document.getElementById('dynamic-input')?.value?.trim();
const payload = document.getElementById('payload-input')?.value?.trim();

if (!category || !action) {
    alert('Please fill in all required fields.');
    return;
}

let codeSnippet = '';

if (category === 'dom') {
    codeSnippet = templates.dom.generate(action, userInput);
} else if (category === 'api') {
    codeSnippet = templates.api.generate(action, userInput, payload || '{}');
} else if (category === 'validation') {
    codeSnippet = templates.validation.generate(action, ...userInput.split(','));
} else if (category === 'attendee') {
    codeSnippet = templates.attendee.generate(action, userInput);
} else if (category === 'complex-css') {
    const inputs = {
        selectors: document.getElementById('dynamic-input')?.value.trim(),
        baseStyles: document.getElementById('base-styles-input')?.value.trim(),
        eventStyles: document.getElementById('event-styles-input')?.value.trim(),
        transitions: document.getElementById('transitions-input')?.value.trim(),
        option: action
    };

    // Validation based on the specific action
    if (action === "Enter CSS Selectors (comma-separated)" && !inputs['selectors']) {
        alert("Please provide CSS selectors.");
        return;
    } else if (action === "Enter Base Styles (JSON format)" && !inputs['baseStyles']) {
        alert("Please provide base styles in JSON format.");
        return;
    } else if (action === "Enter Event-Based Styles (JSON format)" && !inputs['eventStyles']) {
        alert("Please provide event styles in JSON format.");
        return;
    } else if (action === "Add Transitions (optional)" && !inputs['transitions']) {
        alert("Please provide transition styles.");
        return;
    }

    codeSnippet = templates[category].generate(inputs);
}

if (!codeSnippet) {
    alert('Invalid input format. Please check the placeholder example.');
    return;
}

editor.setValue(codeSnippet);
}

    function copyToClipboard() {
        if (!editor) return;
        const code = editor.getValue();
        if (code.trim() === '') {
            alert('There is no code to copy!');
            return;
        }
        navigator.clipboard.writeText(code)
            .then(() => alert('Code copied to clipboard!'))
            .catch(() => alert('Failed to copy code.'));
    }

    initializeEditor();