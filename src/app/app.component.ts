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
 
    //   $('dropdown-button').dropdown({
    //     inDuration: 300,
    //     outDuration: 225,
    //     constrainWidth: false, // Does not change width of dropdown to that of the activator
    //     hover: false, // Activate on hover
    //     gutter: 0, // Spacing from edge
    //     belowOrigin: false, // Displays dropdown below the button
    //     alignment: 'left', // Displays dropdown with edge aligned to the left of button
    //     stopPropagation: false // Stops event propagation
    //   }
    // );
    
  }
}
