import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PneumaticTableComponent } from './pneumatic-table.component';

describe('PneumaticTableComponent', () => {
  let component: PneumaticTableComponent;
  let fixture: ComponentFixture<PneumaticTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PneumaticTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PneumaticTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
