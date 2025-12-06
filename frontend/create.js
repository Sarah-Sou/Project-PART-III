const API_BASE = "https://project-part-iii-fixed.onrender.com";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadHabit() {
  const res = await fetch(`${API_BASE}/habits/${id}`);
  const habit = await res.json();

  document.getElementById("habitName").value = habit.name;
}

document.getElementById("editForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("habitName").value;

  await fetch(`${API_BASE}/habits/${id}/edit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });

  window.location.href = "index.html";
});

loadHabit();
