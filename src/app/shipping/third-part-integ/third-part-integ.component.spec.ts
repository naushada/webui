import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartIntegComponent } from './third-part-integ.component';

describe('ThirdPartIntegComponent', () => {
  let component: ThirdPartIntegComponent;
  let fixture: ComponentFixture<ThirdPartIntegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirdPartIntegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPartIntegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
