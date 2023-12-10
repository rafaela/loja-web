import { Injectable } from '@angular/core';

import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root',
})
export class UiService {

  @BlockUI() blockUI;

  private _isBlocking: boolean = false;
  private _stopped: boolean = false;
  private _blockingMessage: string = '';

  get isBlocking(): boolean {

      return this._isBlocking;
  }

  get blockingMessage(): string {

      return this._blockingMessage;
  }

  constructor(private toastr: ToastrService) {
    toastr.toastrConfig.timeOut = 5000;
  }


  public block(message?: string) {

    this.blockUI.start("Carregando...");

    setTimeout(() => {
    }, 1000);
  }

  public unblock() {
      this.blockUI.stop();
  }

  public sucess(title, message){
    this.toastr.success(title, message, {timeOut: 3000})
  }

  public error(title, message){
    this.toastr.error(title, message, {timeOut: 3000})
  }

}
