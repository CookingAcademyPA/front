import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookingClassComponent } from './cooking-class.component';

describe('CookingClassComponent', () => {
  let component: CookingClassComponent;
  let fixture: ComponentFixture<CookingClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CookingClassComponent]
    });
    fixture = TestBed.createComponent(CookingClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
