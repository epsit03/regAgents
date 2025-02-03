// import Shepherd from 'shepherd.js/dist/js/shepherd.esm.min.js';

const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
        classes: 'shepherd-theme-custom',
        scrollTo: true
    }
});

// tour.addStep({
//     id: 'welcome',
//     title: 'Welcome to DynamicTwigGen!',
//     text: 'This interactive guide will walk you through the features of this tool.',
//     buttons: [
//         {
//             text: 'Next',
//             action: tour.next
//         }
//     ]
// });

tour.addStep({
    id: 'condition-field',
    title: 'Condition Input',
    text: 'Enter a condition here to filter results dynamically using Twig.',
    attachTo: { element: '#condition', on: 'bottom' },
    buttons: [
        {
            text: 'Back',
            action: tour.back
        },
        {
            text: 'Next',
            action: tour.next
        }
    ]
});

tour.addStep({
    id: 'field-label',
    title: 'Field Label',
    text: 'This helps you label your generated Twig code for reference.',
    attachTo: { element: '#fieldLabel', on: 'bottom' },
    buttons: [
        {
            text: 'Back',
            action: tour.back
        },
        {
            text: 'Next',
            action: tour.next
        }
    ]
});

tour.addStep({
    id: 'output',
    title: 'Twig Output',
    text: 'Define the output that will be displayed when the condition is met.',
    attachTo: { element: '#outputTwig', on: 'bottom' },
    buttons: [
        {
            text: 'Back',
            action: tour.back
        },
        {
            text: 'Next',
            action: tour.next
        }
    ]
});

tour.addStep({
    id: 'generate-button',
    title: 'Generate Twig Code',
    text: 'Click here to generate the Twig template based on your inputs.',
    attachTo: { element: '#generateTwig', on: 'top' },
    buttons: [
        {
            text: 'Back',
            action: tour.back
        },
        {
            text: 'Next',
            action: tour.next
        }
    ]
});

tour.addStep({
    id: 'code-editor',
    title: 'Generated Code',
    text: 'The generated Twig code will be displayed here for review.',
    attachTo: { element: '#codeEditor', on: 'top' },
    buttons: [
        {
            text: 'Back',
            action: tour.back
        },
        {
            text: 'Next',
            action: tour.next
        }
    ]
});

tour.addStep({
    id: 'export-button',
    title: 'Export Feature',
    text: 'You can export the generated code by clicking this button.',
    attachTo: { element: '#exportButton', on: 'bottom' },
    buttons: [
        {
            text: 'Back',
            action: tour.back
        },
        {
            text: 'Finish',
            action: tour.complete
        }
    ]
});

// Start tour on button click
// document.getElementById('tour').addEventListener('click', () => {
//     tour.start();
// });

