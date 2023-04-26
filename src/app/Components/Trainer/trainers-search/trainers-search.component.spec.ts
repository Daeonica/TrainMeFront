import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainersSearchComponent } from './trainers-search.component';

describe('TrainersSearchComponent', () => {
  let component: TrainersSearchComponent;
  let fixture: ComponentFixture<TrainersSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainersSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
