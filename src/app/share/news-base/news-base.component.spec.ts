import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsBaseComponent } from './news-base.component';

describe('NewsBaseComponent', () => {
  let component: NewsBaseComponent;
  let fixture: ComponentFixture<NewsBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
