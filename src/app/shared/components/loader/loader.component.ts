import { Component, Input } from '@angular/core';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-loader',
  imports: [NgxLoadingModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  @Input() loading: boolean = false;
}
