import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BlogService {
  api = "c31a3d9ce14047d19631863dfcabb1b9";
  url = 'https://newsapi.org/v2/top-headlines?' +
  'sources=bbc-news&' +
  'apiKey=c31a3d9ce14047d19631863dfcabb1b9';
  appleUrl = 'https://newsapi.org/v2/everything?' +
  'q=Apple&' +
  'from=2017-12-17&' +
  'sortBy=popularity&' +
  'apiKey=c31a3d9ce14047d19631863dfcabb1b9';
  constructor(private http: HttpClient) { }

  getApiBlogs(){
    return this.http.get(this.url);
  }
}
