import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Task {
  id: number;
  title: string;
  platform: string;
  difficulty: string;
  completed: boolean;
  timeSpent: number;
}

@Component({
  selector: 'app-coding-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coding-section.component.html',
  styleUrls: ['./coding-section.component.scss'],
})
export class CodingSectionComponent {
  @Output() onBack = new EventEmitter<void>();
  showAddTask = false;

  stats = {
    totalSolved: 147,
    thisWeek: 15,
    currentStreak: 7,
    avgTime: 42,
  };

  tasks: Task[] = [
    {
      id: 1,
      title: 'Two Sum',
      platform: 'LeetCode',
      difficulty: 'Easy',
      completed: true,
      timeSpent: 25,
    },
    {
      id: 2,
      title: 'Binary Search',
      platform: 'LeetCode',
      difficulty: 'Medium',
      completed: true,
      timeSpent: 45,
    },
    {
      id: 3,
      title: 'Valid Parentheses',
      platform: 'LeetCode',
      difficulty: 'Easy',
      completed: false,
      timeSpent: 0,
    },
  ];

  generateHeatmapData() {
    const data = [];
    const today = new Date();

    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const activity = Math.floor(Math.random() * 5);
      data.push({
        date: date.toISOString().split('T')[0],
        count: activity,
        level:
          activity === 0
            ? 0
            : activity <= 1
            ? 1
            : activity <= 2
            ? 2
            : activity <= 3
            ? 3
            : 4,
      });
    }
    return data;
  }

  heatmapData = this.generateHeatmapData();

  handleBack() {
    this.onBack.emit();
  }
}
