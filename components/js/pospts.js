document.addEventListener('DOMContentLoaded', () => {
  const instagramGrid = document.getElementById('instagram-grid');

  // Cargar datos simulados desde un archivo JSON
  fetch('components/js/posts.json')
    .then((response) => response.json())
    .then((posts) => {
      posts.forEach((post) => {
        const postElement = document.createElement('div');
        postElement.classList.add('instagram-post');

        postElement.innerHTML = `
        <a href="${post.link}" target="_blank">
          <img src="${post.image}" alt="${post.caption}">
        </a>
        `;

        instagramGrid.appendChild(postElement);
      });
    })
    .catch((error) =>
      console.error('Error al cargar las publicaciones:', error)
    );
});

/*
document.addEventListener("DOMContentLoaded", () => {
  const instagramGrid = document.getElementById("instagram-grid");
  const ACCESS_TOKEN = "TU_ACCESS_TOKEN"; // Reemplázalo con tu token de Instagram.

  // Llamar a la API de Instagram
  fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink&access_token=${ACCESS_TOKEN}`)
    .then(response => response.json())
    .then(data => {
      if (data.data) {
        data.data.forEach(post => {
          if (post.media_type === "IMAGE" || post.media_type === "CAROUSEL_ALBUM") {
            const postElement = document.createElement("div");
            postElement.classList.add("instagram-post");

            postElement.innerHTML = `
              <img src="${post.media_url}" alt="${post.caption}">
              <p>${post.caption || "Sin descripción"}</p>
              <a href="${post.permalink}" target="_blank">Ver en Instagram</a>
            `;

            instagramGrid.appendChild(postElement);
          }
        });
      } else {
        console.error("Error en la API:", data.error.message);
      }
    })
    .catch(error => console.error("Error al llamar a la API:", error));
});
*/
