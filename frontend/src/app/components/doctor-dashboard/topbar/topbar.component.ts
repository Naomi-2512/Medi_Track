import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<boolean>();
  isSidebarOpen = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.menuToggle.emit(this.isSidebarOpen);
    
    // Add or remove the 'open' class from sidebar for mobile view
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      if (this.isSidebarOpen) {
        sidebar.classList.add('open');
      } else {
        sidebar.classList.remove('open');
      }
    }
  }
}
