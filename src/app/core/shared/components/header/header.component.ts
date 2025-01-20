import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonToolbar,IonTitle,IonButtons,IonButton,IonIcon,],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
}