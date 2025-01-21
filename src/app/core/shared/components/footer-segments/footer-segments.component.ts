import { Component, inject, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonFooter, IonSegment, IonSegmentButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { ViewService, ViewType } from 'src/app/core/services/view.service';

@Component({
  selector: 'app-footer-segments',
  templateUrl: './footer-segments.component.html',
  styleUrls: ['./footer-segments.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonFooter,
    IonSegment,
    IonSegmentButton,
    IonIcon,
    IonLabel
  ]
})
export class FooterSegmentsComponent {
  public viewService: ViewService = inject(ViewService);
  public selectedSegment: WritableSignal<ViewType> = signal<ViewType>('chats');

  constructor() {
    this.selectedSegment.set(this.viewService.getCurrentView());
  }

  public handleSegmentChange(event: any): void {
    const newValue = event.detail.value as ViewType;
    this.selectedSegment.set(newValue);
    this.viewService.setCurrentView(newValue);
  }
}