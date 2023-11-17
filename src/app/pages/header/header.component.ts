import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isExpanded: boolean = true;

  constructor(private api: ApiService){}

  sair(){
    this.api.logout();
  }
}
