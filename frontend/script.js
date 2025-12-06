const API_BASE = "https://project-part-iii.onrender.com";

async function loadHabits() {
  try {
    const res = await fetch(`${API_BASE}/habits`);
    const data = await res.json();

    const container = document.getElementById("habits");
    container.innerHTML = "";

    if (!data.length) {
      container.innerHTML = "<p>No habits found.</p>";
      return;
    }

    data.forEach(habit => {
      const div = document.createElement("div");
      div.className = "habit-item";
      div.textContent = habit.name;

      // Make them clickable
      div.onclick = () => {
        window.location.href = `${API_BASE}/habits/${habit._id}`;
      };

      container.appendChild(div);
    });

  } catch (err) {
    console.error(err);
    document.getElementById("habits").innerHTML = "Error loading habits.";
  }
}

loadHabits();
