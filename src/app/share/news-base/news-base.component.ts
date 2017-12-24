import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-news-base',
  templateUrl: './news-base.component.html',
  styleUrls: ['./news-base.component.scss']
})
export class NewsBaseComponent implements OnInit {
  blog$;
  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.getApiBlogs().subscribe(news =>{
      this.blog$ = _.take(_.reverse(news['articles']), 3);
    });
  }

}
