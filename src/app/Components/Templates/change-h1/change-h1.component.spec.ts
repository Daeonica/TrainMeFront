import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeH1Component } from './change-h1.component';

describe('ChangeH1Component', () => {
  let component: ChangeH1Component;
  let fixture: ComponentFixture<ChangeH1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeH1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeH1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
