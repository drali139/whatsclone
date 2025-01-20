import { Injectable, signal, computed } from '@angular/core';

export type ViewType = 'chats' | 'updates' | 'communities' | 'calls';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private currentView = signal<ViewType>('chats');

  getCurrentView = computed(() => this.currentView());

  setCurrentView(view: ViewType) {
    this.currentView.set(view);
  }

  getEmptyStateMessage(): { title: string; subtitle?: string } {
    switch (this.currentView()) {
      case 'updates':
        return {
          title: 'No status updates',
          subtitle: 'Tap to add status update'
        };
      case 'communities':
        return {
          title: 'No communities',
          subtitle: 'Start connecting with different groups in one place'
        };
      case 'calls':
        return {
          title: 'No calls',
          subtitle: 'Start calling your friends and family'
        };
      default:
        return { title: '' };
    }
  }
}