import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css']
})
export class PostsTableComponent implements OnInit {
  blogPosts: Array<BlogPost> = [];

  constructor( private data : PostService,
                private route: ActivatedRoute,
                private router: Router ) { }

  rowClicked(e, id){
    this.router.navigate(['admin/post', id]);
  }

  ngOnInit(): void {
    window.scrollTo(0,0);

    this.data.getAllPosts().subscribe( 
      data => this.blogPosts = data
    )
  }

}
