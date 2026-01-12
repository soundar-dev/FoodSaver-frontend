document.addEventListener("DOMContentLoaded", () => {
  const logo = document.getElementById("chatbot-logo");
  const bot = document.getElementById("chatbot");
  const close = document.getElementById("chatbot-close");
  const input = document.getElementById("chatbot-input");
  const body = document.getElementById("chatbot-body");

  // ❌ If chatbot UI not present, do nothing
  if (!logo || !bot || !close || !input || !body) return;

  // ❌ TEMPORARILY DISABLED (NO BACKEND)
  logo.onclick = () => {
    logo.classList.add("hidden");
    bot.classList.remove("hidden");
    body.innerHTML = `
      <p><b>Bot:</b> 🤖 Chatbot is temporarily disabled.</p>
      <p style="font-size:13px;opacity:.7">
        Feature will be enabled soon.
      </p>
    `;
  };

  close.onclick = () => {
    bot.classList.add("hidden");
    logo.classList.remove("hidden");
  };

  // ❌ BLOCK INPUT
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      input.value = "";
    }
  });
});
