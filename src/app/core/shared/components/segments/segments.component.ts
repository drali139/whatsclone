import { Component, signal, Output, EventEmitter } from '@angular/core';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-segments',
  standalone: true,
  imports: [
    IonSegment,
    IonSegmentButton,
    IonLabel,
    FormsModule
  ],
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.scss']
})
export class SegmentsComponent {
  public selectedSegment = signal<string>('all');
  @Output() segmentChanged = new EventEmitter<string>();

  updateSelectedSegment(event: any): void {
    this.selectedSegment.set(event.detail.value);
    this.segmentChanged.emit(event.detail.value);
  }
}