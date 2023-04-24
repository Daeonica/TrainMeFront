import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteUserComponent } from './edit-delete-user.component';

describe('EditDeleteUserComponent', () => {
  let component: EditDeleteUserComponent;
  let fixture: ComponentFixture<EditDeleteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeleteUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDeleteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
