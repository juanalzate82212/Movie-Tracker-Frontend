import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetaBannner } from './beta-bannner';

describe('BetaBannner', () => {
  let component: BetaBannner;
  let fixture: ComponentFixture<BetaBannner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetaBannner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetaBannner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
