import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-beta-bannner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beta-bannner.html',
  styleUrl: './beta-bannner.css',
})
export class BetaBannner {
  visible = true;

  ngOnInit() {
    const dismissed = sessionStorage.getItem('betaDismissed');
    this.visible = !dismissed;
  }

  close() {
    this.visible = false;
    sessionStorage.setItem('betaDismissed', 'true');
  }
}
