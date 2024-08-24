// document.getElementById('send').addEventListener('click', async () => {
//     const userInput = document.getElementById('userinput');
//     const chatlog = document.getElementById('chatlog');

//     const userMessage = userInput.value.trim();
//     if (userMessage === '') return;

//     // Display user's message
//     chatlog.innerHTML += `<div class="message user">${userMessage}</div>`;
//     userInput.value = '';

//     // Call the API
//     const url = 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2';
//     const options = {
//         method: 'POST',
//         headers: {
//             'x-rapidapi-key': '5a27b56f09msh98bca7eab65d29fp1a3a19jsn43275f875551',
//             'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             messages: [
//                 {
//                     role: 'user',
//                     content: userMessage
//                 }
//             ],
//             system_prompt: '',
//             temperature: 0.9,
//             top_k: 5,
//             top_p: 0.9,
//             max_tokens: 256,
//             web_access: false
//         })
//     };

//     try {
//         const response = await fetch(url, options);
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}, Status Text: ${response.statusText}`);
//         }
//         const result = await response.json();
//         console.log('API Response:', result); // Debugging output

//         if (result.result) {
//             const botMessage = result.result;
//             chatlog.innerHTML += `<div class="message bot">${botMessage}</div>`;
//         } else {
//             chatlog.innerHTML += `<div class="message bot">Sorry, I didn't get a response from the bot.</div>`;
//         }
        
//         chatlog.scrollTop = chatlog.scrollHeight;
//     } catch (error) {
//         console.error('Fetch error:', error);
//         chatlog.innerHTML += `<div class="message bot">An error occurred: ${error.message}</div>`;
//     }
// });
// Set up the new API endpoint and request options
// Set up the new API endpoint and request options
// Initialize conversation history


document.addEventListener('DOMContentLoaded', function() {
    const chatbox = document.getElementById('chatbox');
    const openChatButton = document.getElementById('open-chat');

    openChatButton.addEventListener('click', function() {
        if (chatbox.style.display === 'none' || chatbox.style.display === '') {
            chatbox.style.display = 'flex';
        } else {
            chatbox.style.display = 'none';
        }
    });
});
function escapeHTML(text) {
    const element = document.createElement('div');
    element.innerText = text;
    return element.innerHTML;
}


// Initialize conversation history
let conversationHistory = [];

// Set up the new API endpoint and request options
const url = 'https://chatgpt-best-price.p.rapidapi.com/v1/chat/completions';

// Event listener for the "Send" button
document.getElementById('send').addEventListener('click', async () => {
    const userInput = document.getElementById('userinput');
    const chatlog = document.getElementById('chatlog');

    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    // Display user's message
    chatlog.innerHTML += `<div class="message user">${escapeHTML(userMessage)}</div>`;
    userInput.value = '';

    // Add user's message to conversation history
    conversationHistory.push({
        role: 'user',
        content: userMessage
    });

    // Set up API request options with conversation history
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '5a27b56f09msh98bca7eab65d29fp1a3a19jsn43275f875551',
            'x-rapidapi-host': 'chatgpt-best-price.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: conversationHistory
        })
    };

    // Call the API
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}, Status Text: ${response.statusText}`);
        }
        const result = await response.json(); // Parse response as JSON
        console.log('API Response:', result); // Debugging output

        if (result.choices && result.choices.length > 0 && result.choices[0].message && result.choices[0].message.content) {
            const botMessage = escapeHTML(result.choices[0].message.content);
            // Display bot's message
            chatlog.innerHTML += `<div class="message bot">${botMessage}</div>`;

            // Add bot's message to conversation history
            conversationHistory.push({
                role: 'assistant',
                content: botMessage
            });
        } else {
            chatlog.innerHTML += `<div class="message bot">Sorry, I didn't get a response from the bot.</div>`;
        }
        
        chatlog.scrollTop = chatlog.scrollHeight;
    } catch (error) {
        console.error('Fetch error:', error);
        chatlog.innerHTML += `<div class="message bot">An error occurred: ${error.message}</div>`;
    }
});
