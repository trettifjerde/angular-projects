import { Component, OnInit } from '@angular/core';
import { Post, PostRaw } from './post.interface';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoading = false;
  loadedPosts: Post[] = [];
  error: {status: number, statusText: string} | null = null;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: PostRaw) {
    this.postService.createPost(postData).subscribe(
      (res) => this.loadedPosts.push({id: res.name, title: postData.title, content: postData.content} as Post)
    );
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    this.postService.clearPosts().subscribe(() => this.loadedPosts = []);
  }

  private fetchPosts() {
    this.isLoading = true;
    this.postService.fetchPosts()
      .subscribe({
        next: posts => {
          console.log('success!')
            this.isLoading = false;
            this.loadedPosts = posts
          },
        error: error => {
          console.log('error! :c');
          this.isLoading = false;
          this.error = error;
        }
      });
  }


}
