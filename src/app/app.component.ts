import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd, NavigationStart } from '@angular/router';
declare let $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private _router:Router){}
  goToto(){
    let isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
    let option: ScrollToOptions = {
      "behavior": "smooth",
      "left": 0,
      "top": 0
    }
    window.scrollTo(option);
  }
  
  ngOnInit(){
    this._router.events.subscribe((event: RouterEvent) => {
      if(!(event instanceof NavigationEnd)){
        // console.log("Started Routed Successfully");
        return;
      }
      setTimeout(()=> {
        window.scrollTo(0, 0);
      },100);
    });

    window.addEventListener('scroll', (e)=>{
      let yPos = window.pageYOffset;
      let goTo = document.getElementById('goTop');
      if(yPos > 500){
        goTo.style.opacity = "1";
        goTo.style.transition = "2s";
      }else{
        goTo.style.opacity = "0";
        goTo.style.transition = "1s";
      }
    });
      $('dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left', // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
      }
    );
    
  }
}
