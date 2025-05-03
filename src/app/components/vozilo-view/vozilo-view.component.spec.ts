import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoziloViewComponent } from './vozilo-view.component';

describe('VoziloViewComponent', () => {
  let component: VoziloViewComponent;
  let fixture: ComponentFixture<VoziloViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoziloViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoziloViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
