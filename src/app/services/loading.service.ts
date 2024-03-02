import { Injectable } from '@angular/core';
import { BehaviorSubject, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = new BehaviorSubject<boolean>(false);

  show(){
    this.isLoading.next(true);
  }

  hide(){
    this.isLoading.next(false);
  }

  getLoadingState(){
    return this.isLoading.asObservable();
  }
}
