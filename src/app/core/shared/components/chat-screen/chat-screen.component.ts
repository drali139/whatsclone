import { Component, inject, signal, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonBackButton, IonTitle, 
  IonContent, IonFooter, IonButton, IonIcon, IonAvatar,
  IonInput
} from '@ionic/angular/standalone';
import { ChatService } from 'src/app/core/services/chat.service';
import { CommonModule } from '@angular/common';
import { Chat, Message } from '../../../interfaces/chat.interface';
import { TextEllipsisPipe } from 'src/app/core/pipes/text-ellipsis.pipe';
@Component({
  selector: 'app-chat-screen',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonTitle,
    IonContent,
    IonFooter,
    IonButton,
    IonIcon,
    IonAvatar,
    IonInput,
    TextEllipsisPipe
  ],
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.scss']
})
export class ChatScreenComponent {
  private route = inject(ActivatedRoute);
  private chatService = inject(ChatService);
  private fb = inject(FormBuilder);
  
  currentChat = signal<Chat | null>(null);
  messages = signal<Message[]>([]);
  lastSeen = 'last seen Dec 26, 6:13 PM';
  isOnline = signal(false);
  
  messageForm: FormGroup;
  
  constructor() {
    this.messageForm = this.fb.group({
      messageText: ['']
    });

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

  getMessageStatus(status: string) {
    switch (status) {
      case 'sent':
        return '✓';
      case 'delivered':
        return '✓✓';
      case 'seen':
        return '✓✓';
      default:
        return '';
    }
  }

  sendMessage() {
    const text = this.messageForm.get('messageText')?.value;
    if (text?.trim() && this.currentChat()) {
      const message: Message = {
        id: this.messages().length + 1,
        text: text,
        timestamp: new Date(),
        sent: true,
        status: 'sent'
      };
      
      this.chatService.addMessage(this.currentChat()!.id, message);
      this.messages.set(this.chatService.getMessages(this.currentChat()!.id));
      this.messageForm.reset();
      
      setTimeout(() => {
        this.chatService.updateMessageStatus(this.currentChat()!.id, message.id, 'delivered');
        this.messages.set(this.chatService.getMessages(this.currentChat()!.id));
      }, 3000);
      
      setTimeout(() => {
        this.chatService.updateMessageStatus(this.currentChat()!.id, message.id, 'seen');
        this.messages.set(this.chatService.getMessages(this.currentChat()!.id));
        this.isOnline.set(true);
      }, 5000);
    }
  }
}