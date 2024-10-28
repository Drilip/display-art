document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    const sortBySelect = document.getElementById("sort-by");
    let artworkData = [];
  
    // Fetch artwork data
    fetch("artworks.json")
      .then(response => response.json())
      .then(data => {
        artworkData = data;
        displayArtworks(artworkData);  // Initial display
      })
      .catch(error => {
        console.error("Error loading artwork data:", error);
      });
  
    // Listen for sorting selection changes
    sortBySelect.addEventListener("change", (event) => {
      const sortBy = event.target.value;
      const sortedData = sortArtworks(artworkData, sortBy);
      displayArtworks(sortedData);
    });
  
    // Sort artworks based on the selected attribute
    function sortArtworks(data, attribute) {
      return data.slice().sort((a, b) => {
        if (attribute === "year") {
          return parseInt(a[attribute]) - parseInt(b[attribute]);
        } else {
          return a[attribute].localeCompare(b[attribute]);
        }
      });
    }
  
    // Display artworks in the gallery
    function displayArtworks(data) {
      gallery.innerHTML = "";  // Clear current gallery
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
    }
  });
  