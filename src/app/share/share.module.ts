import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsBaseComponent } from './news-base/news-base.component';
import { NewsSideComponent } from './news-side/news-side.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { FlashComponent } from './flash/flash.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NewsBaseComponent, NewsSideComponent,
    NavigationComponent, FooterComponent, FlashComponent
  ],
  exports: [
    NewsBaseComponent, NewsSideComponent,
    NavigationComponent, FooterComponent, FlashComponent
  ]
})
export class ShareModule { }
