export interface Profile {
  guest: boolean;
  username: string;
  fullname: string;
  location: string;
  bio: string;
  links: string;
  day: number;
  month: number;
  year: number;
  allowAnoymousQuestions: boolean;
  profileImageUrl: string;
  coverImageUrl: string;
  status: true;
  gender: string;
  followersCount: number;
  likesCount: number;
  postsCount: number;
  follow: boolean;
  unReadNotifications: number;
}
