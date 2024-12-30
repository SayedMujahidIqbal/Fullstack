export interface Diary {
  id: string;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type NewDiary = Omit<Diary, "id">;

export interface ValidationError {
  message: string;
  error: Record<string, string[]>;
}

export interface Notification {
  message: string;
}
