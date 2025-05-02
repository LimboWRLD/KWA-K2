import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PneumaticFormComponent } from './pneumatic-form.component';

describe('PneumaticFormComponent', () => {
  let component: PneumaticFormComponent;
  let fixture: ComponentFixture<PneumaticFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PneumaticFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PneumaticFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
