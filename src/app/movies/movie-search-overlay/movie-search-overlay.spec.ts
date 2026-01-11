import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSearchOverlay } from './movie-search-overlay';

describe('MovieSearchOverlay', () => {
  let component: MovieSearchOverlay;
  let fixture: ComponentFixture<MovieSearchOverlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieSearchOverlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieSearchOverlay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
