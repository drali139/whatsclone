import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonBackButton, IonTitle, 
  IonContent, IonFooter, IonButton, IonIcon, IonAvatar,
  IonInput, IonList } from '@ionic/angular/standalone';
import { ChatService } from 'src/app/core/services/chat.service';
import { CommonModule } from '@angular/common';
import { Chat, Message } from '../../../interfaces/chat.interface';
import { TextEllipsisPipe } from 'src/app/core/pipes/text-ellipsis.pipe';

@Component({
  selector: 'app-chat-screen',
  standalone: true,
  imports: [
    IonList, 
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonList,
    IonToolbar,
    IonBackButton,
    IonContent,
    IonFooter,
    IonIcon,
    IonAvatar,
    IonInput,
    TextEllipsisPipe
  ],
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.scss']
})
export class ChatScreenComponent {
  
  private route: ActivatedRoute = inject(ActivatedRoute);
  private chatService: ChatService = inject(ChatService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  
  
  public currentChat: WritableSignal<Chat | null> = signal<Chat | null>(null);
  public messages: WritableSignal<Message[]> = signal<Message[]>([]);
  public isOnline: WritableSignal<boolean> = signal<boolean>(false);
  // public lastSeen: WritableSignal<string> = signal<string>('last seen Dec 26, 6:13 PM');
  public lastSeen: string = 'last seen Dec 26, 6:13 PM';
 
  public messageForm: FormGroup = this.formBuilder.group({
    messageText: ['']
  });
  
  constructor() {
    this.initializeChat();
  }

  private initializeChat(): void {
    this.route.params.subscribe(params => {
      const chatId = parseInt(params['id']);
      const allChats = this.chatService.chats();
      const chat = allChats.find(c => c.id === chatId);
      
      if (chat) {
        this.currentChat.set(chat);
        this.messages.set(this.chatService.getMessages(chatId));
      }
    });
  }

  public getMessageStatus(status: string): string {
    const statusMap = {
      'sent': '✓',
      'delivered': '✓✓',
      'seen': '✓✓',
      'default': ''
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.default;
  }

  public sendMessage(): void {
    const text = this.messageForm.get('messageText')?.value;
    const currentChatValue = this.currentChat();
    
    if (text?.trim() && currentChatValue) {
      const newMessage: Message = {
        id: this.messages().length + 1,
        text: text,
        timestamp: new Date(),
        sent: true,
        status: 'sent'
      };
      
      this.chatService.addMessage(currentChatValue.id, newMessage);
      this.messages.set(this.chatService.getMessages(currentChatValue.id));
      this.messageForm.reset();
      
      
      this.handleMessageStatusUpdates(currentChatValue.id, newMessage.id);
    }
  }

  private handleMessageStatusUpdates(chatId: number, messageId: number): void {
    
    setTimeout(() => {
      this.chatService.updateMessageStatus(chatId, messageId, 'delivered');
      this.messages.set(this.chatService.getMessages(chatId));
    }, 3000);
    
    
    setTimeout(() => {
      this.chatService.updateMessageStatus(chatId, messageId, 'seen');
      this.messages.set(this.chatService.getMessages(chatId));
      this.isOnline.set(true);
    }, 5000);
  }
}