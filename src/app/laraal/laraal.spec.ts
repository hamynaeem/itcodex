import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Laraal } from './laraal';

describe('Laraal', () => {
  let component: Laraal;
  let fixture: ComponentFixture<Laraal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Laraal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Laraal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
