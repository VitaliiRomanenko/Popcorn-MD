import { SearchMovie } from "../models/SearchResult";

export function createMovieCard(movie: SearchMovie, genresMap: Record<number, string>): HTMLElement {
  const card = document.createElement("div");
  card.className = "card";
  card.id = movie.id.toString();

  let genresHtml = "";
  if (movie.genre_ids && movie.genre_ids.length > 0) {
    genresHtml = `
      <div class="genres">
        ${movie.genre_ids.map(id => `
          <div class="genre"><span>${genresMap[id] ?? ""}</span></div>
        `).join("")}
      </div>
    `;
  }

  card.innerHTML = `
    <div class="movie-photo">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"/>
    </div>
    <div class="movie-info">
      <h2>${movie.title}</h2><span class="original-name">(${movie.original_title})</span>
      <p>${movie.overview}</p>
      ${genresHtml}
      <div class="movie-subinfo">
        <span class="realise-year">${movie.release_date.length === 0 ? "" : movie.release_date.slice(0, 4)}</span>
    </div>
  `;
  const ratingEl = renderStars(movie.vote_average);
  card.querySelector(".movie-subinfo")?.appendChild(ratingEl);

  function renderStars(rating: number): HTMLDivElement {
    const container = document.createElement("div");
    container.classList.add("rating");

    const fullStars = Math.floor(rating);
    const partial = rating % 1;
    const emptyStars = 10 - fullStars - (partial > 0 ? 1 : 0);

    // full stars
    for (let i = 0; i < fullStars; i++) {
      const star = document.createElement("span");
      star.classList.add("star", "full");
      star.textContent = "★";
      container.appendChild(star);
    }

    // partical star
    if (partial > 0) {
      const wrapper = document.createElement("span");
      wrapper.classList.add("star", "empty");
      wrapper.textContent = "★";

      const overlay = document.createElement("span");
      overlay.classList.add("star", "part");
      overlay.textContent = "★";
      overlay.style.width = `${partial * 100}%`;

      wrapper.appendChild(overlay);
      container.appendChild(wrapper);
    }

    // empty stars
    for (let i = 0; i < emptyStars; i++) {
      const star = document.createElement("span");
      star.classList.add("star", "empty");
      star.textContent = "★";
      container.appendChild(star);
    }

    return container;
  }

  return card;
}

