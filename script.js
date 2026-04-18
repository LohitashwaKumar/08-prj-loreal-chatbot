/* DOM elements */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");
const promptButtons = document.querySelectorAll(".prompt-btn");

/* Replace with your Cloudflare Worker URL */
const API_URL = "https://loreal-chatbot-api.lohitthrish.workers.dev/";

/* Conversation history */
const messages = [
  {
    role: "system",
    content:
      "You are a L'Oréal beauty assistant. Help users discover makeup, skincare, haircare, and fragrance products. Give friendly, personalized recommendations and routines based on their needs. Keep responses clear, helpful, and concise."
  }
];

/* Add message to chat UI */
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("msg", sender);
  msg.textContent = text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

/* Initial bot message */
addMessage("👋 Hello! I’m your L’Oréal Beauty Assistant. Ask me about skincare, makeup, haircare, or routines.", "ai");

/* Send message to API */
async function sendMessage(userText) {
  addMessage(userText, "user");

  messages.push({
    role: "user",
    content: userText
  });

  addMessage("Typing...", "ai");
  const typingMessage = chatWindow.lastChild;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: messages
      })
    });

    const data = await response.json();

    const aiReply = data.choices[0].message.content;

    typingMessage.remove();

    addMessage(aiReply, "ai");

    messages.push({
      role: "assistant",
      content: aiReply
    });
  } catch (error) {
    typingMessage.remove();
    addMessage("Sorry, something went wrong while connecting to the assistant.", "ai");
    console.error(error);
  }
}

/* Handle form submit */
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = userInput.value.trim();
  if (!text) return;

  sendMessage(text);
  userInput.value = "";
});

/* Handle quick prompt buttons */
promptButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const promptText = button.dataset.prompt;
    sendMessage(promptText);
  });
});
