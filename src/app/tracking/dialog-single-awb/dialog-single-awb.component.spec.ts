import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSingleAwbComponent } from './dialog-single-awb.component';

describe('DialogSingleAwbComponent', () => {
  let component: DialogSingleAwbComponent;
  let fixture: ComponentFixture<DialogSingleAwbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSingleAwbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSingleAwbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
