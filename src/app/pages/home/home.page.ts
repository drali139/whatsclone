import { Component, inject, signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from 'src/app/core/shared/components/header/header.component';
import { SearchBarComponent } from 'src/app/core/shared/components/search-bar/search-bar.component'; 
import { IonContent } from '@ionic/angular/standalone';
import { SegmentsComponent } from 'src/app/core/shared/components/segments/segments.component';
import { ChatsListComponent } from 'src/app/core/shared/components/chats-list/chats-list.component';
import { FabComponent } from "../../core/shared/components/fab/fab.component";
import { FooterSegmentsComponent } from "../../core/shared/components/footer-segments/footer-segments.component";
import { ViewService } from 'src/app/core/services/view.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonContent, 
    HeaderComponent, 
    SearchBarComponent, 
    SegmentsComponent, 
    ChatsListComponent, 
    FabComponent, 
    FooterSegmentsComponent
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  public viewService:ViewService = inject(ViewService);
  // currentSegment: string = 'all';
  public currentSegment:WritableSignal<string> = signal<string>('');
 public handleSegmentChange(segment: string):void {
    this.currentSegment.set(segment);
  }
}