export interface SubmitPayload {
  formatVersion: 3;
  category: string;
  type: 'single' | 'twopart';
  joke?: string;
  setup?: string;
  delivery?: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  lang: 'en'
}
