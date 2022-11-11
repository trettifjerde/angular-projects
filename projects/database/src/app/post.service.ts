import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, tap, throwError } from "rxjs";
import { Post, PostRaw } from "./post.interface";

@Injectable({providedIn: 'root'})
export class PostService {
    posts: Post[] = [];

    constructor(private http: HttpClient) {}

    fetchPosts() : Observable<Post[]>{
        return this.http.get<{[key: string]: PostRaw}>('/posts.json', {
            observe: 'body', //observe: 'response' || 'body' || 'events'
        })
        .pipe(
            /*
            map(res => Object.entries(res).reduce(
            (acc, [key, value]) => {
                value.id = key;
                acc.push(value);
                return acc;
            }, [])),*/
            map(
                (res) => {
                    if (res === null) 
                        throw 400;
                    
                    return Object.entries(res).map(([key, value]) => { return { ...value, id: key } as Post})
                }
            ),
            catchError(errorCode => { 
                const error = {status: 500, statusText: 'Something went wrong'};
                switch(errorCode) {
                    case 400:
                        error.status = errorCode;
                        error.statusText = 'posts not found';
                        break;
                    default:
                        console.log(errorCode);
                }
                return throwError(error)
            })
        )
    }

    createPost(post: PostRaw) {
        return this.http.post<{name: string}>('/posts.json', post)
    }

    clearPosts(): Observable<Object> {
        return this.http.delete('/posts.json', {observe: 'events'}).pipe(
            tap(event => console.log(event))
        )
    }
}