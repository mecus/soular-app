import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-news-side',
  templateUrl: './news-side.component.html',
  styleUrls: ['./news-side.component.scss']
})
export class NewsSideComponent implements OnInit {
  news$;
  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.getApiBlogs().subscribe(news =>{
      this.news$ = _.take(_.reverse(news['articles']), 4);
    });
  }

}
