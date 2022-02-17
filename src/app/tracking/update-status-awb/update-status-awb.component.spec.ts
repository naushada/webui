import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStatusAwbComponent } from './update-status-awb.component';

describe('UpdateStatusAwbComponent', () => {
  let component: UpdateStatusAwbComponent;
  let fixture: ComponentFixture<UpdateStatusAwbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateStatusAwbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStatusAwbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
