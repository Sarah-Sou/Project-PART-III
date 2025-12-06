const API_BASE = "https://project-part-iii.onrender.com";

async function loadHabits() {
  try {
    const res = await fetch(`${API_BASE}/habits`);
    const habits = await res.json();

    const container = document.getElementById("habits");
    container.innerHTML = "";

    if (!habits.length) {
      container.innerHTML = "<p>No habits found.</p>";
      return;
    }

    habits.forEach(habit => {
      const card = document.createElement("div");
      card.className = "habit-card";

      card.innerHTML = `
        <div class="habit-title">${habit.name}</div>
        <div class="actions">
          <a class="view-btn" href="${API_BASE}/habits/${habit._id}" target="_blank">View</a>
          <a class="edit-btn" href="edit.html?id=${habit._id}">Edit</a>
          <a class="delete-btn" href="#" onclick="deleteHabit('${habit._id}')">Delete</a>
        </div>
      `;
      container.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    document.getElementById("habits").innerHTML = "Error loading habits.";
  }
}

async function deleteHabit(id) {
  if (!confirm("Delete this habit?")) return;

  await fetch(`${API_BASE}/habits/${id}/delete`, {
    method: "POST"
  });

  loadHabits();
}

loadHabits();
