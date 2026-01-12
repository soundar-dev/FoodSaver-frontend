document.addEventListener("DOMContentLoaded", () => {
  const logo  = document.getElementById("chatbot-logo");
  const bot   = document.getElementById("chatbot");
  const close = document.getElementById("chatbot-close");
  const input = document.getElementById("chatbot-input");
  const body  = document.getElementById("chatbot-body");

  if (!logo || !bot || !close || !input || !body) return;

  /* ===============================
     CHATBOT API (RENDER BACKEND)
     =============================== */
  const CHATBOT_API =
    "https://foodsaver-backend-d964.onrender.com/chat";

  logo.onclick = () => {
    logo.classList.add("hidden");
    bot.classList.remove("hidden");
    body.innerHTML = `<p><b>Bot:</b> Hi! 😊 How can I help you?</p>`;
  };

  close.onclick = () => {
    bot.classList.add("hidden");
    logo.classList.remove("hidden");
  };

  input.addEventListener("keypress", async (e) => {
    if (e.key !== "Enter") return;

    const msg = input.value.trim();
    if (!msg) return;

    body.innerHTML += `<p><b>You:</b> ${msg}</p>`;
    input.value = "";

    try {
      const res = await fetch(CHATBOT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: msg })
      });

      if (!res.ok) {
        throw new Error("Chatbot error");
      }

      const data = await res.json();
      body.innerHTML += `<p><b>Bot:</b> ${data.reply}</p>`;
    } catch (err) {
      body.innerHTML +=
        `<p><b>Bot:</b> ⚠️ Chatbot service unavailable</p>`;
    }
  });
});
