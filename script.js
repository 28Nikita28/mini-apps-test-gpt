const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatLog = document.getElementById('chat-log');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;

function sendMessage() {
    const userInputValue = userInput.value.trim();
    if (userInputValue !== '') {
        const userMessageHTML = `<div class="message user-message"><p>${userInputValue}</p></div>`;
        chatLog.innerHTML += userMessageHTML;
        userInput.value = '';
        fetchReply(userInputValue);
    }
}

sendBtn.addEventListener('click', sendMessage);

userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    }
});

// Установить начальную тему
body.classList.add('light-theme');

async function fetchReply(userInputValue) {
    try {
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userInput: userInputValue })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const aiMessageHTML = `<div class="message ai-message"><p>${data.choices[0].message.content}</p></div>`;
        chatLog.innerHTML += aiMessageHTML;
    } catch (error) {
        console.error('Error fetching the reply:', error);
        const errorMessageHTML = `<div class="message ai-message"><p>Произошла ошибка при получении ответа. Попробуйте еще раз. Ошибка: ${error.message}</p></div>`;
        chatLog.innerHTML += errorMessageHTML;
    }
}
