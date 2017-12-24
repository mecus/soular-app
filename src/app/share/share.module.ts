import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsBaseComponent } from './news-base/news-base.component';
import { NewsSideComponent } from './news-side/news-side.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NewsBaseComponent, NewsSideComponent],
  exports: [NewsBaseComponent, NewsSideComponent]
})
export class ShareModule { }
