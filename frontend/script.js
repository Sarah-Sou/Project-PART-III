const API_BASE = "https://project-part-iii.onrender.com";

async function loadHabits() {
  try {
    const res = await fetch(`${API_BASE}/api/habits`);
    const habits = await res.json();

    const container = document.getElementById("habits");
    container.innerHTML = "";

    if (habits.length === 0) {
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
          <a class="edit-btn" href="${API_BASE}/habits/${habit._id}/edit" target="_blank">Edit</a>
          <a class="delete-btn" href="${API_BASE}/habits/${habit._id}/delete" target="_blank">Delete</a>
        </div>
      `;
      container.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    document.getElementById("habits").innerHTML = "Error loading habits.";
  }
}

loadHabits();
