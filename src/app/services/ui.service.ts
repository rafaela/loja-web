import { Injectable } from '@angular/core';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  @BlockUI() blockUI: NgBlockUI | undefined;

  private _isBlocking: boolean = false;
  private _stopped: boolean = false;
  private _blockingMessage: string = '';

  get isBlocking(): boolean {

      return this._isBlocking;
  }

  get blockingMessage(): string {

      return this._blockingMessage;
  }

  constructor() {
  }


  public block(message?: string) {

    this._blockingMessage = message || 'Um momento...';
    this._stopped = false;

    if (!this._isBlocking && this.blockUI) {

        this.blockUI.start(this.blockingMessage);
    }

    setTimeout(() => {

        if (!this._stopped) {

            this._isBlocking = true;
        }

    }, 250);
  }

  public unblock() {
    if (!this._isBlocking && this.blockUI) {
      this.blockUI.stop();
      this._isBlocking = false;
      this._stopped = true;
    }
  }

}
