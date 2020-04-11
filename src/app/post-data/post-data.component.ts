import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BlogPost } from "../BlogPost";
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgModel, NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit, OnDestroy {
  post: BlogPost;
  commentName: string;
  commentText: string;
  private querySub;

  constructor(  private data: PostService,
                private route: ActivatedRoute) { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.querySub = this.route.params.subscribe( params => {
      this.data.getPostbyId(params['id']).subscribe(
      data => {
        this.post = data;
        this.post.views += 1;
        this.data.updatePostById(this.post._id, this.post).subscribe(); 
       })
    });
  }

  ngOnDestroy(){
    if(this.querySub){
      this.querySub.unsubscribe();
    }
  }

  submitComment(f: NgForm): void{
    let newComments = { author: this.commentName, 
                        comment: this.commentText,
                        date: new Date().toLocaleDateString()
     }; 
    this.post.comments.push( newComments ); 
    this.data.updatePostById(this.post._id, this.post).subscribe(
      data => { this.resetComments() });
  }

  resetComments(){
    this.commentName = '';
    this.commentText = '';
  }
  
}
