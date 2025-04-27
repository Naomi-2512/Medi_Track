import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Doctor } from '../../../../interfaces/medic.interface';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,RouterLink,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
    user! : Doctor;
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
  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }
}
