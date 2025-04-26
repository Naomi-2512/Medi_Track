import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {
  message: string | null = null;
  type: boolean | null = null;
  
  constructor(private notificationsService: NotificationsService) {}
  
  ngOnInit(): void {
    this.notificationsService.message$.subscribe(message => {
      this.message = message;
    });
    
    this.notificationsService.type$.subscribe(type => {
      this.type = type;
    });
  }
  
  close(): void {
    this.notificationsService.clearNotification();
  }
}
