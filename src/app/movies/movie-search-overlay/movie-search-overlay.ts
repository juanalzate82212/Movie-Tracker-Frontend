import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-movie-search-overlay',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movie-search-overlay.html',
  styleUrl: './movie-search-overlay.css',
})
export class MovieSearchOverlay implements OnInit {
  @Output() close = new EventEmitter<void>();

  searchControl = new FormControl('');
  results: any[] = [];

  ngOnInit(): void{
    this.searchControl.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      console.log('Buscando:', value);
    });
  }

  closeOverlay() {
    this.close.emit();
  }
}
