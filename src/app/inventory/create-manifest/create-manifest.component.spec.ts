import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateManifestComponent } from './create-manifest.component';

describe('CreateManifestComponent', () => {
  let component: CreateManifestComponent;
  let fixture: ComponentFixture<CreateManifestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateManifestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateManifestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
