import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { BlogPost } from './BlogPost';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  perPage: number = 6;
  blogURL: string = "https://aqueous-hamlet-01837.herokuapp.com/";
  
  constructor(private http: HttpClient) {}
  
  getPosts(page, tag, category): Observable<BlogPost[]>{

    let baseURL = (`${this.blogURL}api/posts?page=${page}&perPage=${this.perPage}`);
    
    //Add tag if not null
    if(tag != null){
      baseURL = (`${baseURL}&tag=${tag}`);  
    }
    //Also add category if not null
    if(category != null){
      baseURL = (`${baseURL}&category=${category}`); 
    }
    
    return this.http.get<BlogPost[]>(baseURL)      
  }

  getPostbyId(id): Observable<BlogPost>{
      return this.http.get<BlogPost>(`${this.blogURL}api/posts/${id}`)
  }
  getCategories(): Observable<any>{
    return this.http.get<any>(`${this.blogURL}api/categories`)
  }
  getTags(): Observable<any>{
    return this.http.get<any>(`${this.blogURL}api/tags`)
  }
  //lab6
  getAllPosts(): Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(`${this.blogURL}api/posts?page=1&perPage=${Number.MAX_SAFE_INTEGER}`);
  }
  newPost(data:BlogPost): Observable<any>{
    return this.http.post<any>(`${this.blogURL}api/posts`, data);
  }
  updatePostById(id:String, data:BlogPost): Observable<any>{
    return this.http.put<any>(`${this.blogURL}api/posts/${id}`, data);
  }
  deletePostById(id:String): Observable<any>{
    return this.http.delete<any>(`${this.blogURL}api/post/${id}`);
  }

}
