document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    const sortSelect = document.getElementById("sort-select");
    const toggleVisibilityBtn = document.getElementById("toggle-visibility");
  
    let artworkData = [];
  
    // Fetch and render artworks
    function fetchArtworks() {
      fetch("artworks.json")
        .then(response => response.json())
        .then(data => {
          artworkData = data;
          renderArtworks();
        })
        .catch(error => {
          console.error("Error loading artwork data:", error);
        });
    }
  
    // Render artworks based on data and sorting
    function renderArtworks() {
      gallery.innerHTML = "";  // Clear existing content
  
      // Apply sorting
      const sortedData = [...artworkData].sort((a, b) => {
        const sortBy = sortSelect.value;
        if (sortBy === "year") return a[sortBy] - b[sortBy];
        return a[sortBy].localeCompare(b[sortBy]);
      });
  
      // Display sorted and visible artworks
      sortedData.forEach(artwork => {
        if (artwork.visible) {
          const artworkCard = document.createElement("div");
          artworkCard.classList.add("artwork-card");
  
          artworkCard.innerHTML = `
            <img src="${artwork.image}" alt="${artwork.title}">
            <h2>${artwork.title}</h2>
            <p><strong>Artist:</strong> ${artwork.artist}</p>
            <p><strong>Year:</strong> ${artwork.year}</p>
            <p>${artwork.description}</p>
            <button onclick="toggleArtworkVisibility('${artwork.title}')">
              Toggle Display
            </button>
          `;
  
          gallery.appendChild(artworkCard);
        }
      });
    }
  
    // Toggle visibility of each artwork
    function toggleArtworkVisibility(title) {
      const artwork = artworkData.find(a => a.title === title);
      if (artwork) {
        artwork.visible = !artwork.visible;
        renderArtworks(); // Re-render after toggling
      }
    }
  
    // Event listeners for sorting and visibility toggle
    sortSelect.addEventListener("change", renderArtworks);
    toggleVisibilityBtn.addEventListener("click", () => {
      artworkData.forEach(artwork => artwork.visible = !artwork.visible);
      renderArtworks();
    });
  
    // Initial fetch and render
    fetchArtworks();
  });
  