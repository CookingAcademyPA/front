import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBlankComponent } from './menu-blank.component';

describe('MenuBlankComponent', () => {
  let component: MenuBlankComponent;
  let fixture: ComponentFixture<MenuBlankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuBlankComponent]
    });
    fixture = TestBed.createComponent(MenuBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
