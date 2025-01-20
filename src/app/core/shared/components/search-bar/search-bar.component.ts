import { Component, OnInit, inject } from '@angular/core';
import { IonSearchbar } from '@ionic/angular/standalone';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [IonSearchbar, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchControl = new FormControl('');
  private chatService = inject(ChatService);

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.chatService.setSearchTerm(searchTerm || '');
    });
  }
}