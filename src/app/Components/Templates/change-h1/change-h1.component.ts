import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-change-h1',
  templateUrl: './change-h1.component.html',
  styleUrls: ['./change-h1.component.css']
})
export class ChangeH1Component {
  @Input() componentName: any;
}