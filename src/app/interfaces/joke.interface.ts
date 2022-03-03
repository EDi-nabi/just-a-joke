export interface Joke {
  error?: boolean;
  category: string;
  type: 'single' | 'twopart';
  joke?: string;
  setup?: string;
  delivery?: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    racist: boolean;
    sexist: boolean;
    political: boolean;
    explicit: boolean;
  },
  id: number;
  safe: boolean;
  lang: string;
  image?: string;
}
