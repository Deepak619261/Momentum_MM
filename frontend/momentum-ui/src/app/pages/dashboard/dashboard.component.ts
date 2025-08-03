import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule], // Ensure CommonModule is imported for ngIf, ngFor, etc.
})
export class DashboardComponent implements OnInit {
  @Input() mode: 'single' | 'pair' | 'group' = 'single';
  @Output() sectionClick = new EventEmitter<string>();

  selectedSection: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Get the mode from query parameters
    this.route.queryParams.subscribe((params) => {
      if (params['mode']) {
        this.mode = params['mode'] as 'single' | 'pair' | 'group';
      }
    });
  }

  handleSectionClick(section: string) {
    this.selectedSection = section;
    this.sectionClick.emit(section);

    // Update URL with the selected section
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        mode: this.mode,
        section: section,
      },
      queryParamsHandling: 'merge',
    });
  }

  getModeClasses(): string {
    switch (this.mode) {
      case 'pair':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'group':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  }

  getModeLabel(): string {
    switch (this.mode) {
      case 'pair':
        return 'Pair Mode';
      case 'group':
        return 'Group Mode';
      default:
        return 'Solo Mode';
    }
  }
}
