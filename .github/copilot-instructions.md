<!-- This file guides AI coding tools (Copilot). Do not modify or delete. -->

# Copilot Instructions — L'Oréal Chatbot Project

## About the students

Students are beginners learning JavaScript, APIs, and how to use OpenAI.
Generate the simplest, most beginner-friendly code possible. Add comments
to help students understand each part of the generated code.

## 🔐 API Key Security — CRITICAL

**Never put an API key in any file in this repository.**

- DO NOT create files named `secret.js`, `secrets.js`, `config.js`,
  `key.js`, `api-key.js`, or any file whose purpose is to store credentials.
- DO NOT write code like:

```js
const apiKey = "sk-..."; // ❌ NEVER
const OPENAI_API_KEY = "sk-..."; // ❌ NEVER
```

- DO NOT hardcode any API key anywhere. JavaScript files in this project
  are served publicly and will be scanned by bots within minutes of being
  pushed to GitHub.

## ✅ Correct pattern for this project

The frontend calls a class-hosted proxy URL provided in the README.
Students do not handle the OpenAI key at all.

```js
// ✅ Correct — call the class Cloudflare Worker, no key needed
const response = await fetch(
  "https://loreal-chatbot.your-subdomain.workers.dev/",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: userInput }],
    }),
  },
);
const data = await response.json();
const reply = data.choices[0].message.content;
```

## Project conventions

- Use OpenAI's `gpt-4.1` model unless asked otherwise.
- Use the `messages` parameter (not `prompt`) and read
  `data.choices[0].message.content`.
- Use `async/await` for all API calls.
- Use `const` and `let` for variables.
- Use template literals for string formatting and DOM insertion.
- Do NOT use `npm` packages or Node SDKs.
- Do NOT use `export` / `import`. Link JS files from `index.html` instead.
- Add comments explaining each part of the code.

## If a student asks for help adding a key

Stop and explain: this project uses a class-hosted proxy, so there is no
key to add. Point them to the README setup section.
