document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     📝 БРОНДОО ФОРМАСЫ
  ========================== */
  const form = document.querySelector(".passenger-form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = Object.fromEntries(new FormData(form));

      if (!data.firstName || !data.lastName || !data.phone) {
        alert("Бардык талааларды толтуруңуз");
        return;
      }

      const message = `
✈️ Hamza Airlines — Брондоо

👤 Аты: ${data.firstName}
👤 Фамилиясы: ${data.lastName}
⚧ Жынысы: ${data.gender}
🎂 Туулган күнү: ${data.birthDate}
🌍 Жарандыгы: ${data.nationality}

🛂 Паспорт/ID: ${data.passportNumber}
📅 Жарактуулугу: ${data.expiryDate}
💺 Орун: ${data.seat}

📞 Телефон: ${data.phoneCode}${data.phone}
📧 Email: ${data.email}

🛡 Камсыздандыруу: ${data.insurance ? "Ооба" : "Жок"}
      `.trim();

      const whatsappNumber = "996505564252"; // ⬅️ өз номериң
      const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      window.open(whatsappURL, "_blank");
      form.reset();
    });
  }


  /* =========================
     ✈️ КАТТАМДАР КАРТАСЫ
  ========================== */
  if (!document.getElementById("map")) return;

  const map = L.map("map").setView([41.2044, 74.7661], 5);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
  }).addTo(map);

  const planeIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

  const routes = [
    { from: [40.6090, 72.7933], to: [25.2532, 55.3657], name: "Ош → Дубай" },
    { from: [40.6090, 72.7933], to: [41.2753, 28.7519], name: "Ош → Стамбул" },
    { from: [40.6090, 72.7933], to: [55.9726, 37.4146], name: "Ош → Москва" },
    { from: [40.6090, 72.7933], to: [43.3521, 77.0405], name: "Ош → Алматы" }
  ];

  routes.forEach(route => {

    L.polyline([route.from, route.to], {
      color: "#1e90ff",
      weight: 2,
      dashArray: "6,6"
    }).addTo(map);

    const plane = L.marker(route.from, {
      icon: planeIcon
    }).addTo(map).bindPopup(`✈️ ${route.name}`);

    animatePlane(plane, route.from, route.to);
  });

  function animatePlane(marker, start, end) {
    let progress = Math.random();

    setInterval(() => {
      progress += 0.002;
      if (progress >= 1) progress = 0;

      const lat = start[0] + (end[0] - start[0]) * progress;
      const lng = start[1] + (end[1] - start[1]) * progress;

      marker.setLatLng([lat, lng]);
    }, 30);
  }

});
