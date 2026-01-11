document.addEventListener("DOMContentLoaded", () => {
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
      const r = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg })
      });
      const d = await r.json();
      body.innerHTML += `<p><b>Bot:</b> ${d.reply}</p>`;
    } catch {
      body.innerHTML += `<p><b>Bot:</b> Server not available</p>`;
    }
  });
});
