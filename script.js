document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");

  fetch("artworks.json")
    .then(response => response.json())
    .then(data => {
      data.forEach(artwork => {
        const artworkCard = document.createElement("div");
        artworkCard.classList.add("artwork-card");

        artworkCard.innerHTML = `
          <img src="${artwork.image}" alt="${artwork.title}">
          <h2>${artwork.title}</h2>
          <p><strong>Artist:</strong> ${artwork.artist}</p>
          <p><strong>Year:</strong> ${artwork.year}</p>
          <p>${artwork.description}</p>
        `;

        gallery.appendChild(artworkCard);
      });
    })
    .catch(error => {
      console.error("Error loading artwork data:", error);
    });
});
