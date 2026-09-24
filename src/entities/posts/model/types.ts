export interface UserPosts {
  id: number;
  content: string;
  date: string;
  username: string;
  userPictureSrc: string;
  imageContentSrc: string;
  onDelete?: () => void
}

export interface PostToSend {
  content: string;
  username: string;
  userPictureSrc: string;
  imageContentSrc: string;
}

export interface WallStore {
  isLoading: boolean;
  sendPost: () => Promise<boolean>;
  setInputPost: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSending: boolean;
  isPostSend: boolean;
  contentText: string;
  contentPicture: string;
  postIsEmpty: boolean;
  isTyping: boolean;
  inputPost: string;
  resetSendStatus: () => void;
}