import { Component, EventEmitter, Input,Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent
 {
  @Input()
  parentData!:any;


  @Output()
  eventCustomer :EventEmitter<any>=new EventEmitter<any>();


  emitevent(){
    this.eventCustomer.emit(11);
  }


}
