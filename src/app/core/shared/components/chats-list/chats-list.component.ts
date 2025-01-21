import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { IonList, IonItem, IonLabel, IonAvatar, IonBadge, IonButton } from '@ionic/angular/standalone';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChatService } from 'src/app/core/services/chat.service';
import { Chat } from '../../../interfaces/chat.interface';

@Component({
  selector: 'app-chats-list',
  standalone: true,
  imports: [
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonBadge,
    IonButton,
    DatePipe,
    RouterLink
  ],
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss']
})
export class ChatsListComponent {
  public currentSegment: WritableSignal<string> = signal<string>('all');
  public chatService: ChatService = inject(ChatService);

  @Input() set activeSegment(value: string) {
    this.currentSegment.set(value);
    this.chatService.setCurrentSegment(value);
  }

  getCurrentSegment(): string {
    return this.currentSegment();
  }

  setSegment(value: string): void {
    this.currentSegment.set(value);
    this.chatService.setCurrentSegment(value);
  }
}