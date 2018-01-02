import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';

declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  blog$;
  constructor(private blogService: BlogService, private _router: Router) { 
    blogService.getApiBlogs().subscribe((blogs)=>{
      this.blog$ = _.take(_.reverse(blogs['articles']), 3);
      console.log(blogs['articles']);
    });
  }
  slideUp(){
    let isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
    let option: ScrollToOptions = {
      "behavior": "smooth",
      "left": 0,
      "top": 650
    }
    if(isSmoothScrollSupported){
      window.scrollTo(option);
    }else{
      window.scrollTo(option.left, option.top);
    }
  }
  routeNavigation(route: string){
    let nav = route.toUpperCase();
    switch(nav){
      case 'CAREER':
        this._router.navigate(["/career"]);
        break;
      case 'SERVICES':
        this._router.navigate(["/services"]);
        break;
      case 'ABOUT':
        this._router.navigate(["/about"]);
        break;
    }

  }
  slideInterval:any = window.setInterval(()=>{
    $('.carousel').carousel('next');
  }, 10000);
  arrowInterval:any = setInterval(()=>{
    let arrow = document.getElementById('home-arrow');
    arrow.style.top = "80%";
    arrow.style.transition = "1s";
    setTimeout(()=>{
      arrow.style.top = "78%";
      arrow.style.transition = "1s";
    }, 1000);
  }, 2000);
  ngOnInit() {
    $('.carousel.carousel-slider').carousel({fullWidth: true});
    this.slideInterval;
    this.arrowInterval;
  }
  ngOnDestroy(){
    window.clearInterval(this.slideInterval);
    window.clearInterval(this.arrowInterval);
  }
}
