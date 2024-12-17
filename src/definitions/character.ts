/*
 * CHARACTER PROPS
 *
 * description: Character props for the application
 */
export type CharacterProps = {
  imageUrl: string;
  name: string;
  sourceUrl?: string;
  films?: string[];
  shortFilms?: string[];
  tvShows?: string[];
  parkAttractions?: string[];
  _id?: string;
  updatedAt?: string;
};
