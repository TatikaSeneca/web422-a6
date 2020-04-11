import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  categories: Array<any>;
  private querySub;

  //inject the PostService
  constructor(private route: ActivatedRoute,
              private data: PostService) { }

  ngOnInit() { 
    this.querySub = this.route.queryParams.subscribe(params => {
      this.data.getCategories().subscribe(
        data => { 
          (data.length > 0)
          ? this.categories = data
          : this.categories = null;
        }
      )
    })
  }

  ngOnDestroy(){
    if(this.querySub){
      this.querySub.unsubscribe();
    }
  }

}
