import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  constructor() { }

  ngOnInit(): void {
    this.initializeMobileMenu();
    this.initializeSmoothScrolling();
  }

  private initializeMobileMenu(): void {
    setTimeout(() => {
      const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
      const mobileMenu = document.querySelector('.mobile-menu');
      const menuSpans = document.querySelectorAll('.mobile-menu-icon span');
      
      if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
          mobileMenu.classList.toggle('active');
          
          // Animate hamburger to X
          if (menuSpans.length === 3) {
            (menuSpans[0] as HTMLElement).style.transform = mobileMenu.classList.contains('active') 
              ? 'rotate(45deg) translate(5px, 5px)' 
              : 'none';
            
            (menuSpans[1] as HTMLElement).style.opacity = mobileMenu.classList.contains('active') 
              ? '0' 
              : '1';
            
            (menuSpans[2] as HTMLElement).style.transform = mobileMenu.classList.contains('active') 
              ? 'rotate(-45deg) translate(7px, -6px)' 
              : 'none';
          }
        });
        
        const mobileLinks = document.querySelectorAll('.mobile-menu a');
        mobileLinks.forEach(link => {
          link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            
            if (menuSpans.length === 3) {
              (menuSpans[0] as HTMLElement).style.transform = 'none';
              (menuSpans[1] as HTMLElement).style.opacity = '1';
              (menuSpans[2] as HTMLElement).style.transform = 'none';
            }
          });
        });
      }
    }, 0);
  }

  private initializeSmoothScrolling(): void {
    setTimeout(() => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(this: HTMLAnchorElement, e) {
          const href = this.getAttribute('href');
          
          if (href !== '#') {
            e.preventDefault();
            
            const targetElement = href ? document.querySelector(href) : null;
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }
        });
      });
    }, 0);
  }
}
