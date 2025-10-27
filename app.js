fetch('data.json')
  .then(res => res.json())
  .then(data => {
    // Theme setup
    document.getElementById('body').style.background = data.theme.gradient;
    document.querySelector('#profile-btn').style.backgroundColor = data.theme.primary;

    // Fill main info
    document.getElementById('name').textContent = data.name;
    document.getElementById('role').textContent = data.role;
    document.getElementById('bio').textContent = data.bio;
    document.getElementById('photo-container').innerHTML = `
      <img src="${data.photo}" alt="${data.name}" class="w-full h-72 object-cover">
    `;
    document.getElementById('profile-btn').textContent = `Visit ${data.name.split(' ')[0]}'s Page`;
    document.getElementById('profile-btn').href = data.button_url;

    // Cards
    const cardsSection = document.getElementById('cards');
    data.cards.forEach(card => {
      const div = document.createElement('div');
      div.className = "bg-white/90 p-4 rounded-xl shadow hover:shadow-lg transition";
      div.innerHTML = `
        <h3 class="font-semibold text-lg mb-2 text-[${data.theme.accent}]">${card.title}</h3>
        <p class="text-gray-700 text-sm leading-relaxed">${card.content}</p>
      `;
      cardsSection.appendChild(div);
    });

    // Socials
    const socialsDiv = document.getElementById('socials');
    const icons = {
      facebook: "🌐",
      instagram: "📸",
      x: "✖️"
    };
    Object.entries(data.socials).forEach(([key, url]) => {
      const a = document.createElement('a');
      a.href = url;
      a.target = "_blank";
      a.innerHTML = `<span class="text-xl">${icons[key]}</span>`;
      socialsDiv.appendChild(a);
    });
  })
  .catch(err => console.error("Error loading tutor data:", err));
