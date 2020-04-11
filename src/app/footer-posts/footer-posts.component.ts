import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer-posts',
  templateUrl: './footer-posts.component.html',
  styleUrls: ['./footer-posts.component.css']
})
export class FooterPostsComponent implements OnInit, OnDestroy {
  posts: Array<BlogPost>;
  private querySub;

  constructor( private data: PostService,
               private route: ActivatedRoute) { }

  ngOnInit(){
    this.data.getPosts(1,null,null).subscribe(
      data => this.posts = data.slice(0.3)
    )
  }

  ngOnDestroy(){
    if(this.querySub){
      this.querySub.unsubscribe();
    }
  }

}
