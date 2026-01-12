document.addEventListener("DOMContentLoaded", () => {

  // ❌ HARD STOP if chatbot disabled
  if (!window.APP_CONFIG || !window.APP_CONFIG.CHATBOT_ENABLED) {
    console.log("Chatbot disabled");
    return;
  }

  const logo = document.getElementById("chatbot-logo");
  const bot = document.getElementById("chatbot");
  const close = document.getElementById("chatbot-close");
  const input = document.getElementById("chatbot-input");
  const body = document.getElementById("chatbot-body");

  if (!logo || !bot || !close || !input || !body) return;

  logo.onclick = () => {
    logo.classList.add("hidden");
    bot.classList.remove("hidden");
    body.innerHTML = "<p><b>Bot:</b> Hi! 😊</p>";
  };

  close.onclick = () => {
    bot.classList.add("hidden");
    logo.classList.remove("hidden");
  };

  input.addEventListener("keypress", async e => {
    if (e.key !== "Enter") return;
    const msg = input.value.trim();
    if (!msg) return;

    body.innerHTML += `<p><b>You:</b> ${msg}</p>`;
    input.value = "";

    try {
      const r = await fetch(
        `${window.APP_CONFIG.API_BASE_URL}/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: msg })
        }
      );

      const d = await r.json();
      body.innerHTML += `<p><b>Bot:</b> ${d.reply}</p>`;
    } catch {
      body.innerHTML += `<p><b>Bot:</b> Server not available</p>`;
    }
  });
});
