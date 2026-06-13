import { info } from "console";
import { SearchMovie } from "../models/SearchResult";

export function createMovieCard(movie: SearchMovie, genresMap: Record<number, string>): HTMLElement {
  const card = activeDocument.createElement("div");
  card.className = "card";
  card.id = movie.id.toString();

  //#region Photo
  const photoDiv = activeDocument.createElement("div");
  photoDiv.className = 'movie-photo';
  const img = activeDocument.createElement("img");
  img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  img.alt = movie.title;
  photoDiv.appendChild(img);
  //#endregion

  //#region Info
  const infoDiv = activeDocument.createElement("div");
  infoDiv.className = "movie-info";
  
  const titleEl = activeDocument.createElement("h2");
  titleEl.textContent = movie.title;
  infoDiv.appendChild(titleEl);

  const originalTitleEl = activeDocument.createElement("span");
  originalTitleEl.textContent = `(${movie.original_title})`;
  originalTitleEl.className = "original-name";
  infoDiv.appendChild(originalTitleEl);

  const overviewEl = activeDocument.createElement("p");
  overviewEl.textContent = movie.overview;
  infoDiv.appendChild(overviewEl);
  //#endregion

  //#region Genres
  if(movie.genre_ids?.length){
    const genresDiv = activeDocument.createElement("div");
    genresDiv.className = "genres";
    movie.genre_ids.forEach(id => {
      const genre = activeDocument.createElement("div");
      genre.className = "genre";
      const span = activeDocument.createElement("span");
      span.textContent = genresMap[id] ?? "";
      genre.appendChild(span);
      genresDiv.appendChild(genre);
    });
    infoDiv.appendChild(genresDiv);
  };

  //#endregion

  //#region Subinfo
  const subInfoDiv = activeDocument.createElement("div");
  subInfoDiv.className = "movie-subinfo";
  
  const yearSpan = activeDocument.createElement("span");
  yearSpan.className = "realise-year";
  yearSpan.textContent = movie.release_date ? movie.release_date.slice(0, 4) : "";
  subInfoDiv.appendChild(yearSpan);

  const ratingEl = renderStars(movie.vote_average);
  subInfoDiv.appendChild(ratingEl);
  infoDiv.appendChild(subInfoDiv);

  //#endregion

  card.appendChild(photoDiv);
  card.appendChild(infoDiv);

  function renderStars(rating: number): HTMLDivElement {
    const container = activeDocument.createElement("div");
    container.classList.add("rating");

    const fullStars = Math.floor(rating);
    const partial = rating % 1;
    const emptyStars = 10 - fullStars - (partial > 0 ? 1 : 0);

    // full stars
    for (let i = 0; i < fullStars; i++) {
      const star = activeDocument.createElement("span");
      star.classList.add("star", "full");
      star.textContent = "★";
      container.appendChild(star);
    }

    // partical star
    if (partial > 0) {
      const wrapper = activeDocument.createElement("span");
      wrapper.classList.add("star", "empty");
      wrapper.textContent = "★";

      const overlay = activeDocument.createElement("span");
      overlay.classList.add("star", "part");
      overlay.textContent = "★";
      overlay.style.width = `${partial * 100}%`;

      wrapper.appendChild(overlay);
      container.appendChild(wrapper);
    }

    // empty stars
    for (let i = 0; i < emptyStars; i++) {
      const star = activeDocument.createElement("span");
      star.classList.add("star", "empty");
      star.textContent = "★";
      container.appendChild(star);
    }

    return container;
  }

  return card;
}

