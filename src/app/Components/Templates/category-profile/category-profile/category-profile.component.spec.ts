import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProfileComponent } from './category-profile.component';

describe('CategoryProfileComponent', () => {
  let component: CategoryProfileComponent;
  let fixture: ComponentFixture<CategoryProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
