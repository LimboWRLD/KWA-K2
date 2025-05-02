import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoziloFormComponent } from './vozilo-form.component';

describe('VoziloFormComponent', () => {
  let component: VoziloFormComponent;
  let fixture: ComponentFixture<VoziloFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoziloFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoziloFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
