import { Injectable } from '@angular/core';
import { ToastrService as NgxToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(
    private _toastrService: NgxToastrService
  ) { }

  // Show a success toast notification
  success(message: string, title?: string) {
    this._toastrService.success(message, title);
  }

  // Show an error toast notification
  error(message: string, title?: string) {
    this._toastrService.error(message, title);
  }

  // Show an info toast notification
  info(message: string, title?: string) {
    this._toastrService.info(message, title);
  }

  // Show a warning toast notification
  warning(message: string, title?: string) {
    this._toastrService.warning(message, title);
  }
}
