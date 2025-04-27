import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../../interfaces/medic.interface';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<boolean>();
  isSidebarOpen = true;
  user!: Doctor;

  constructor(private router: Router, private doctorServise : DoctorService) { }

  ngOnInit(): void {
    this.fetchUser()
  }
  fetchUser() {
    this.doctorServise.fetchDoctor().subscribe({
      next: (res) => {
        if (res.message && res.doctor) {
          this.user = res.doctor;
        } else {
          // console.error(res.error);
        }
      },
      error: (err) => {
        // console.error(err);
      }
    })
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
