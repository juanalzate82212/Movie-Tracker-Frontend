import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailPageComponent } from './movie-detail-page';

describe('MovieDetailPage', () => {
  let component: MovieDetailPageComponent;
  let fixture: ComponentFixture<MovieDetailPageComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
