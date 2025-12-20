import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Flutter } from './flutter';

describe('Flutter', () => {
  let component: Flutter;
  let fixture: ComponentFixture<Flutter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Flutter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Flutter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
