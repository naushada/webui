import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAwbComponent } from './single-awb.component';

describe('SingleAwbComponent', () => {
  let component: SingleAwbComponent;
  let fixture: ComponentFixture<SingleAwbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleAwbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAwbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
