import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoziloTableComponent } from './vozilo-table.component';

describe('VoziloTableComponent', () => {
  let component: VoziloTableComponent;
  let fixture: ComponentFixture<VoziloTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoziloTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoziloTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
