const API_BASE = "https://project-part-iii.onrender.com";

async function loadHabits() {
  try {
    const res = await fetch(`${API_BASE}/habits`);
    const data = await res.json();

    const container = document.getElementById("habits");
    container.innerHTML = "";

    data.forEach(habit => {
      const div = document.createElement("div");
      div.textContent = habit.name;
      container.appendChild(div);
    });

  } catch (err) {
    console.error(err);
  }
}

loadHabits();
