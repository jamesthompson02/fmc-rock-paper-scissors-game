import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickAnOptionComponent } from './pick-an-option.component';

describe('PickAnOptionComponent', () => {
  let component: PickAnOptionComponent;
  let fixture: ComponentFixture<PickAnOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickAnOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickAnOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
