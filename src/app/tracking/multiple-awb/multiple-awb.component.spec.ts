import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleAwbComponent } from './multiple-awb.component';

describe('MultipleAwbComponent', () => {
  let component: MultipleAwbComponent;
  let fixture: ComponentFixture<MultipleAwbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleAwbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleAwbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
