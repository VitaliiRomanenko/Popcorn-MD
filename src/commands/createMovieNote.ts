import { Movie } from "../models/Movie";
import { TFile, Vault } from "obsidian";

export async function createMovieNote(movie: Movie, vault: Vault, templatePath: string): Promise<TFile | null> {
    const templateFile = vault.getAbstractFileByPath(templatePath);
    if (!(templateFile instanceof TFile)) {
        console.error("Template file not found");
        return null;
    }

    const templateContent = await vault.read(templateFile);

    const noteContent = templateContent
        .replace('"{{adult}}"', movie.adult ? "true" : "false")
        .replace('"{{collection}}"', `"${movie.belongs_to_collection?.name ?? ""}"`)
        .replace('"{{budget}}"', `"${String(movie.budget ?? "")}"`)
        .replace('"{{genres}}"', `[${movie.genres.map(g => `"[[${g.name}]]"`).join(", ")}]`)
        .replace('"{{homepage}}"', movie.homepage ?? "")
        .replace('"{{id}}"', String(movie.id ?? ""))
        .replace('"{{imdb_id}}"', movie.imdb_id ?? "")
        .replace('"{{origin_country}}"', `[${movie.origin_country?.map(c => `"[[${c}]]"`).join(", ") ?? ""}]`)
        .replace('"{{original_language}}"', movie.original_language ?? "")
        .replace('"{{original_title}}"', `'${movie.original_title ?? ""}'`)
        .replace('"{{overview}}"', `'${movie.overview ?? ""}'`)
        .replace('"{{popularity}}"', String(movie.popularity))
        .replace('"{{poster_path}}"', movie.poster_path ?? "")
        .replace('"{{production_companies}}"', `[${movie.production_companies.map(c => `"[[${c.name}]]"`).join(", ")}]`)
        .replace('"{{production_countries}}"', `[${movie.production_countries.map(c => `"[[${c.name}]]"`).join(", ")}]`)
        .replace('"{{release_date}}"', formatDate(movie.release_date) ?? "")
        .replace('"{{revenue}}"', String(movie.revenue))
        .replace('"{{runtime}}"', String(movie.runtime))
        .replace('"{{softcore}}"', String(movie.softcore ?? ""))
        .replace('"{{spoken_languages}}"', `[${movie.spoken_languages.map(l => `"[[${l.name}]]"`).join(", ")}]`)
        .replace('"{{status}}"', movie.status ?? "")
        .replace('"{{tagline}}"', `'${movie.tagline ?? ""}'`)
        .replace('"{{title}}"', `'${movie.title ?? ""}'`)
        .replace('"{{vote_average}}"', String(movie.vote_average))
        .replace('"{{vote_count}}"', String(movie.vote_count));

    const fileName = `${movie.title.replace(/[\\/:*?"<>|]/g, "_")}`;
    const note = await vault.create(`${fileName}.md`, noteContent);
    return note;
}

function formatDate(dateStr: string, locale: string = "default", options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, options);
}
