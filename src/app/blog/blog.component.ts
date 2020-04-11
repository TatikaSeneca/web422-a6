import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {
  page: number = 1;
  tag: string = null;
  category: string = null;
  private querySub;

  blogPosts: Array<BlogPost>;

  constructor(private route:ActivatedRoute, 
              private data: PostService) { }

  getPage(num){ 
    this.data.getPosts(num, this.tag, this.category).subscribe(
      data => {
        if(data.length > 0) {
          this.blogPosts = data;
          this.page = num;
        }
      });
  }

  ngOnInit() {    
    window.scrollTo(0,0);

    this.querySub = this.route.queryParams.subscribe(params => {
      if(params['tag']){
        this.tag = params['tag'];
        this.category = null;
      } 
      else{
        this.tag = null;
        }

      if(params['category']){
        this.category = params['category'];
        this.tag = null;
      }
      else{
        this.tag = null;
      }
      
      this.getPage(+params['page'] || 1);
    });
  }

  ngOnDestroy(){
    if(this.querySub){
      this.querySub.unsubscribe();    
    }
  }

}
