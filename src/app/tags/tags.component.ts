import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit, OnDestroy {

  tags: Array<string>;
  private querySub;
    
  constructor(private data: PostService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.querySub = this.route.queryParams.subscribe(params => {
      this.data.getTags().subscribe(
        data => {
          (data.length > 0)
          ? this.tags = data
          : this.tags = null;
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
