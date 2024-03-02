import { LoadingService } from './../../services/loading.service';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent  implements OnInit{

  isLoading = false;

  loadingService = inject(LoadingService)

  ngOnInit(): void {
    this.loadingService.getLoadingState().subscribe((isLoading) => this.isLoading = isLoading);
  }

}
