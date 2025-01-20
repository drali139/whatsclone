import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat, Message } from '../interfaces/chat.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private currentSegment = signal<string>('all');
  private allChats = signal<Chat[]>([]);
  private searchTerm = signal<string>('');
  private http = inject(HttpClient);

  constructor() {
    this.loadChats();
  }

  private loadChats() {
    this.http.get<{chats: any[]}>('assets/data/chats.json')
      .subscribe(data => {
        const chatsWithDates = data.chats.map(chat => ({
          ...chat,
          time: new Date(chat.time),
          messages: (chat.messages || []).map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        this.allChats.set(chatsWithDates);
      });
  }

  public chats = computed(() => {
    const segment = this.currentSegment();
    const term = this.searchTerm().toLowerCase();
    let currentChats = this.allChats();
    
    switch (segment) {
      case 'unread':
        currentChats = currentChats.filter(chat => chat.unread > 0);
        break;
      case 'favorites':
        currentChats = currentChats.filter(chat => chat.isFavorite);
        break;
      case 'groups':
        currentChats = currentChats.filter(chat => chat.isGroup);
        break;
    }
    
    if (term) {
      currentChats = currentChats.filter(chat => 
        chat.name.toLowerCase().includes(term) || 
        chat.lastMessage?.toLowerCase().includes(term)
      );
    }
    
    return currentChats;
  });

  public hasNoChats = computed(() => this.chats().length === 0);
  public isSearching = computed(() => this.searchTerm().length > 0);

  setSearchTerm(term: string) {
    this.searchTerm.set(term);
  }

  setCurrentSegment(segment: string) {
    this.currentSegment.set(segment);
  }

  getCurrentSegment(): string {
    return this.currentSegment();
  }

  getMessages(chatId: number): Message[] {
    const chat = this.allChats().find(c => c.id === chatId);
    return chat?.messages || [];
  }

  addMessage(chatId: number, message: Message) {
    const currentChats = this.allChats();
    const updatedChats = currentChats.map(chat => 
      chat.id === chatId 
        ? {...chat, messages: [...chat.messages, message]} 
        : chat
    );
    this.allChats.set(updatedChats);
  }

  updateMessageStatus(chatId: number, messageId: number, status: 'sent' | 'delivered' | 'seen') {
    const currentChats = this.allChats();
    const updatedChats = currentChats.map(chat => 
      chat.id === chatId 
        ? {
            ...chat,
            messages: chat.messages.map(msg =>
              msg.id === messageId ? { ...msg, status } : msg
            )
          }
        : chat
    );
    this.allChats.set(updatedChats);
  }

  addChat(chat: Chat) {
    const currentChats = this.allChats();
    this.allChats.set([...currentChats, chat]);
  }

  deleteChat(id: number) {
    const currentChats = this.allChats();
    this.allChats.set(currentChats.filter(chat => chat.id !== id));
  }

  toggleFavorite(id: number) {
    const currentChats = this.allChats();
    const updatedChats = currentChats.map(chat => 
      chat.id === id ? {...chat, isFavorite: !chat.isFavorite} : chat
    );
    this.allChats.set(updatedChats);
  }

  markAsRead(id: number) {
    const currentChats = this.allChats();
    const updatedChats = currentChats.map(chat => 
      chat.id === id ? {...chat, unread: 0} : chat
    );
    this.allChats.set(updatedChats);
  }
}