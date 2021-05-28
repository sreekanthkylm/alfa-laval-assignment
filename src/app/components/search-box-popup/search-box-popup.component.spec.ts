import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBoxPopupComponent } from './search-box-popup.component';

describe('SearchBoxPopupComponent', () => {
  let component: SearchBoxPopupComponent;
  let fixture: ComponentFixture<SearchBoxPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBoxPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
