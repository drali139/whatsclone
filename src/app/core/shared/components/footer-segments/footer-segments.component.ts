import { Component, computed, inject } from '@angular/core';
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
  private viewService = inject(ViewService);
  selectedSegment = computed(() => this.viewService.getCurrentView());

  segmentChanged(event: any) {
    this.viewService.setCurrentView(event.detail.value as ViewType);
  }
}