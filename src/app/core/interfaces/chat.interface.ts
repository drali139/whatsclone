export interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: Date;
  unread: number;
  avatar: string;
  isGroup: boolean;
  isFavorite: boolean;
  messages: Message[];
}

export interface Message {
  id: number;
  text: string;
  timestamp: Date;
  sent: boolean;
  status: 'sent' | 'delivered' | 'seen';
}