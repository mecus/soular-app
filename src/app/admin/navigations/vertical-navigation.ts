import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vertical-nav',
  templateUrl: './vertical-navigation.html',
  styleUrls: ['./navigations.scss']
})
export class VarticalNavigation implements OnInit {
    cusMenu: boolean = false;
  constructor() { }

  customerOpen(){
    let targElm = document.getElementById('customer-actions');
    let icon1 = document.getElementById('openIcon1');
    let icon2 = document.getElementById('openIcon2');

    if(this.cusMenu == false){
        targElm.style.height = "70px";
        icon1.style.display = "none";
        icon1.style.transition = "1s";
        icon2.style.display = "block";
        icon2.style.transition = "1s";
        this.cusMenu = true;
    }else{
        let targElm = document.getElementById('customer-actions');
        let icon = document.getElementById('openIcon');
        targElm.style.height = "0px";
        icon1.style.display = "block";
        icon1.style.transition = "1s";
        icon2.style.display = "none";
        icon2.style.transition = "1s";
        this.cusMenu = false;
    }

  }
  customerClose(){

  }

  ngOnInit() {
  }

}