export interface Chat {
    id: number;
    name: string;
    avatar: string;
  }
  
  export interface Message {
    id: number;
    text: string;
    timestamp: Date;
    sent: boolean;
    status: 'sent' | 'delivered' | 'seen';
  }