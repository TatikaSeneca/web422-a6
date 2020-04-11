import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {
  
  @Input() page: number = 1;

  @Output() 
  newPage = new EventEmitter();

  leftBtnClicked(num){
    if(this.page > 1){
      this.page--;
      this.newPage.emit(this.page);
    }
    else {
      this.newPage.emit(this.page);
    }
  }

  rightBtnClicked(){
      this.page++;
      this.newPage.emit(this.page);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
