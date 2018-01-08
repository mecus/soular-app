import { Component, OnInit, Input, OnChanges} from '@angular/core';
// import { document } from '../../../../server/node_modules/firebase-functions/lib/providers/firestore';

@Component({
  selector: 'flash-notice',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss']
})
export class FlashComponent implements OnInit, OnChanges {
  @Input() notice? = null;
  flashNotice;
  constructor() { }
  closeFlash(){
    let backGround = document.getElementById('background');
    backGround.style.marginTop = "-40px";
  }
  ngOnInit() {
    this.flashNotice = this.notice;
    if(this.flashNotice){
      let text = document.getElementById('text');
      let backGround = document.getElementById('background');
      backGround.style.backgroundColor = "green";
      text.style.color = "#ffffff";
      setTimeout(()=>{
        this.flashNotice = null;
      }, 4000);
    }
  }
  ngOnChanges(notice){
    if(this.notice){
      this.flashNotice = this.notice.text;
      let text = document.getElementById('text');
      let backGround = document.getElementById('background');
      backGround.style.marginTop = "0";
      text.style.backgroundColor = this.notice.background;
      text.style.color = this.notice.textColor;
      backGround.style.transition = "0.3s";
      setTimeout(()=>{
        backGround.style.transition = "0.3s";
        backGround.style.marginTop = "-400px";
      }, this.notice.timeout);
    }
  }

}
