import { Component, inject, Input } from '@angular/core';
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
  @Input() set activeSegment(value: string) {
    this.chatService.setCurrentSegment(value);
  }

  public chatService = inject(ChatService);

  getCurrentSegment(): string {
    return this.chatService.getCurrentSegment();
  }

  setSegment(value: string): void {
    this.chatService.setCurrentSegment(value);
  }
}