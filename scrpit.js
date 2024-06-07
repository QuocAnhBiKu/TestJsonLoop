const api = "http://localhost:3000"

async function fetchOptions() {
    try {
        const response = await fetch(`${api}/options`);
        if (response.ok) {
            const data = await response.json();
            populateSubjects(data.subjects);
        } else {
            console.error('Failed to fetch options:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching options:', error);
    }
}

function populateSubjects(subjects) {
    const subjectsSelect = document.getElementById('subjects');
    subjectsSelect.innerHTML = '<option value="">Select Subject</option>';
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = subject;
        subjectsSelect.appendChild(option);
    });

    subjectsSelect.addEventListener('change', () => {
        const selectedSubject = subjectsSelect.value;
        if (selectedSubject) {
            fetchChapters(selectedSubject);
        } else {
            resetSelect('chapters');
            resetSelect('questions');
        }
    });
}

async function fetchChapters(subject) {
    try {
        const response = await fetch(`${api}/options`);
        if (response.ok) {
            const data = await response.json();
            populateChapters(data.chapters[subject], data.questions[subject]);
        } else {
            console.error('Failed to fetch chapters:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching chapters:', error);
    }
}

function populateChapters(chapters, questions) {
    const chaptersSelect = document.getElementById('chapters');
    chaptersSelect.innerHTML = '<option value="">Select Chapter</option>';
    chapters.forEach(chapter => {
        const option = document.createElement('option');
        option.value = chapter;
        option.textContent = chapter;
        chaptersSelect.appendChild(option);
    });
    chaptersSelect.disabled = false;

    chaptersSelect.addEventListener('change', () => {
        const selectedChapter = chaptersSelect.value;
        if (selectedChapter) {
            populateQuestions(questions[selectedChapter]);
        } else {
            resetSelect('questions');
        }
    });
}

function populateQuestions(questions) {
    const questionsSelect = document.getElementById('questions');
    questionsSelect.innerHTML = '<option value="">Select Question</option>';
    for (const key in questions) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = questions[key];
        questionsSelect.appendChild(option);
    }
    questionsSelect.disabled = false;
}

function resetSelect(id) {
    const select = document.getElementById(id);
    select.innerHTML = `<option value="">Select ${id.charAt(0).toUpperCase() + id.slice(1)}</option>`;
    select.disabled = true;
}

async function submitAnswer(subject, chapter, question) {
    try {
        const response = await fetch(`${api}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ subject, chapter, question })
        });

        const result = await response.json();
        displayResponse(result.answer);
    } catch (error) {
        console.error('Error submitting answer:', error);
    }
}

function displayResponse(answer) {
    const responseContainer = document.getElementById('response-container');

    if (typeof answer === 'object') {
        answer = answer.answer;
    }

    responseContainer.innerHTML = `<p>Answer: ${answer}</p>`;
}

document.getElementById('options-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const subject = document.getElementById('subjects').value;
    const chapter = document.getElementById('chapters').value;
    const question = document.getElementById('questions').value;
    
    if (!subject || !chapter || !question) {
        alert('Please select subject, chapter, and question.');
        return;
    }
    
    await submitAnswer(subject, chapter, question);
});

// Fetch options data on page load
fetchOptions();