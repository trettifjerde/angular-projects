import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  url = 'https://academind34-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: {title: string, content: string}) {
    this.http.post(this.url + '/posts.json', postData)
    .subscribe(
      (res) => {
        console.log(res);
      }
    );
  }

  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http.get(this.url + '/posts.json')
      .pipe(
        map(res => Object.entries(res).reduce(
          (acc, [key, value]) => {
            value.id = key;
            acc.push(value);
            return acc;
        }, []))
      )
      .subscribe(r => console.log(r));
  }
}
