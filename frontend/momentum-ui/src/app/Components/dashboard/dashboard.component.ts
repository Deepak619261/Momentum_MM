import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule, TitleCasePipe, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

type Mode = 'single' | 'pair' | 'group';
type Section =
  | 'coding'
  | 'gym'
  | 'diet'
  | 'journaling'
  | 'self-talk'
  | 'tracking-sheet'
  | string;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, TitleCasePipe, DatePipe],
})
export class DashboardComponent implements OnInit {
  @Input() mode: Mode = 'single';
  @Output() sectionClick = new EventEmitter<string>();

  // Default sections
  fixedSections: Section[] = [
    'coding',
    'gym',
    'diet',
    'journaling',
    'self-talk',
    'tracking-sheet',
  ];
  customSections: string[] = [];
  selectedSection: Section | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Get the mode and section from query parameters
    this.route.queryParams.subscribe((params) => {
      if (params['mode']) {
        this.mode = params['mode'] as Mode;
      }

      if (params['section']) {
        this.selectedSection = params['section'];
      } else {
        // Default to the first section if none selected
        this.selectedSection = this.fixedSections[0];
      }

      // Check for custom sections stored in local storage
      this.loadCustomSections();
    });
  }

  handleSectionClick(section: string): void {
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

  // Navigate to home page when clicking on the logo/name
  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  // Check if running in browser environment
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Load custom sections from local storage
  loadCustomSections(): void {
    if (!this.isBrowser()) {
      return; // Skip local storage access in SSR
    }

    try {
      const storedSections = localStorage.getItem(
        `${this.mode}-custom-sections`
      );
      if (storedSections) {
        this.customSections = JSON.parse(storedSections);
      }
    } catch (error) {
      console.error('Error loading custom sections from localStorage:', error);
    }
  }

  // Create a new custom section
  createCustomSection(name: string): void {
    if (name && !this.customSections.includes(name)) {
      this.customSections.push(name);

      if (this.isBrowser()) {
        try {
          localStorage.setItem(
            `${this.mode}-custom-sections`,
            JSON.stringify(this.customSections)
          );
        } catch (error) {
          console.error('Error saving custom sections to localStorage:', error);
        }
      }

      this.handleSectionClick(name);
    }
  }

  // Check if a section is currently selected
  isSectionActive(section: string): boolean {
    return this.selectedSection === section;
  }

  // Get section specific data
  getSectionData(section: string): any {
    // This would be replaced with actual API calls in a real implementation
    // For now, return mock data based on section
    switch (section) {
      case 'coding':
        return {
          tasks: [
            { id: 1, name: 'Solve Two Sum', completed: true },
            { id: 2, name: 'Implement Binary Search', completed: false },
            {
              id: 3,
              name: 'Complete Dynamic Programming Tutorial',
              completed: false,
            },
          ],
          heatmapData: this.getMockHeatmapData('blue'),
        };
      case 'gym':
        return {
          exercises: [
            {
              id: 1,
              name: 'Bench Press',
              sets: 3,
              reps: 10,
              weight: 135,
              date: new Date(),
            },
            {
              id: 2,
              name: 'Squats',
              sets: 4,
              reps: 8,
              weight: 185,
              date: new Date(),
            },
            {
              id: 3,
              name: 'Pull-ups',
              sets: 3,
              reps: 12,
              weight: 0,
              date: new Date(),
            },
          ],
          heatmapData: this.getMockHeatmapData('red'),
        };
      case 'diet':
        return {
          meals: [
            {
              id: 1,
              name: 'Breakfast',
              calories: 450,
              protein: 25,
              carbs: 45,
              fat: 15,
            },
            {
              id: 2,
              name: 'Lunch',
              calories: 650,
              protein: 35,
              carbs: 60,
              fat: 22,
            },
            {
              id: 3,
              name: 'Dinner',
              calories: 550,
              protein: 30,
              carbs: 50,
              fat: 18,
            },
          ],
          heatmapData: this.getMockHeatmapData('green'),
        };
      case 'journaling':
        return {
          entries: [
            {
              id: 1,
              date: new Date(),
              content: 'Today was productive!',
              mood: 'happy',
            },
            {
              id: 2,
              date: new Date(Date.now() - 86400000),
              content: 'Struggling with focus.',
              mood: 'neutral',
            },
          ],
        };
      case 'self-talk':
        return {
          prompts: [
            { id: 1, prompt: 'What are your strengths today?' },
            { id: 2, prompt: 'What small goal can you set for tomorrow?' },
            { id: 3, prompt: 'Describe a challenge you overcame recently.' },
          ],
          responses: [],
        };
      case 'tracking-sheet':
        return {
          summary: [
            { section: 'Coding', status: 'Done', count: 2 },
            { section: 'Gym', status: 'Done', count: 1 },
            { section: 'Diet', status: 'Partial', count: 2 },
            { section: 'Journaling', status: 'Not Done', count: 0 },
          ],
          heatmapData: this.getMockMulticolorHeatmapData(),
        };
      default:
        // For custom sections
        return {
          tasks: [],
          heatmapData: this.getMockHeatmapData('purple'),
        };
    }
  }

  // Generate mock heatmap data for demonstration
  private getMockHeatmapData(color: string): any[] {
    const data = [];
    const today = new Date();

    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      data.push({
        date: date.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 5),
        color: color,
      });
    }

    return data;
  }

  // Generate multicolor heatmap data for tracking sheet
  private getMockMulticolorHeatmapData(): any[] {
    const data = [];
    const today = new Date();
    const colors = ['blue', 'red', 'green', 'purple'];

    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      // Generate between 0-4 entries per day across all categories
      const entries = [];
      const totalCount = Math.floor(Math.random() * 5);

      for (let j = 0; j < totalCount; j++) {
        entries.push({
          color: colors[Math.floor(Math.random() * colors.length)],
          count: 1,
        });
      }

      data.push({
        date: date.toISOString().split('T')[0],
        entries: entries,
      });
    }

    return data;
  }

  getModeClasses(): string {
    switch (this.mode) {
      case 'single':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
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
      case 'single':
        return 'Solo Mode';
      case 'pair':
        return 'Pair Mode';
      case 'group':
        return 'Group Mode';
      default:
        return 'Solo Mode';
    }
  }

  getRankLabel(): string {
    switch (this.mode) {
      case 'single':
        return 'Total Points';
      case 'pair':
        return 'Pair Rank';
      case 'group':
        return 'Group Rank';
      default:
        return 'Total Points';
    }
  }

  getRankValue(): string {
    switch (this.mode) {
      case 'single':
        return '1,247';
      case 'pair':
        return '#1';
      case 'group':
        return '#3';
      default:
        return '1,247';
    }
  }

  getRankSubtext(): string {
    switch (this.mode) {
      case 'single':
        return '+12 today';
      case 'pair':
        return 'vs Partner';
      case 'group':
        return 'of 12 members';
      default:
        return '+12 today';
    }
  }

  // Get section color for UI styling
  getSectionColor(section: string): string {
    switch (section) {
      case 'coding':
        return 'blue';
      case 'gym':
        return 'red';
      case 'diet':
        return 'green';
      case 'journaling':
      case 'self-talk':
        return 'yellow';
      case 'tracking-sheet':
        return 'gray';
      default:
        return 'purple'; // Custom sections
    }
  }

  // Get gamification data - points, badges, trophies
  getGamificationData(): any {
    return {
      points: 1247,
      pointsToday: 12,
      badges: [
        {
          id: 1,
          name: 'Code Ninja',
          description: 'Complete 50 coding tasks',
          earned: true,
        },
        {
          id: 2,
          name: 'Workout Warrior',
          description: 'Log 30 workouts',
          earned: true,
        },
        {
          id: 3,
          name: 'Diet Master',
          description: 'Track 100 meals',
          earned: false,
        },
      ],
      trophies: [
        {
          id: 1,
          name: 'Golden Keyboard',
          description: 'Top coder for 3 weeks',
          earned: false,
        },
        {
          id: 2,
          name: 'Iron Champion',
          description: 'Hit personal records 5 times',
          earned: true,
        },
      ],
      milestones: [
        { id: 1, name: '100 Workouts', current: 87, target: 100 },
        { id: 2, name: 'Coding Streak', current: 24, target: 30 },
      ],
    };
  }

  // Pair/Group specific functionality

  // Get leaderboard data
  getLeaderboardData(): any[] {
    if (this.mode === 'single') return [];

    // Mock data - would be from API in real implementation
    return [
      {
        id: 1,
        name: 'Alex',
        points: 1560,
        rank: 1,
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      {
        id: 2,
        name: 'Jordan',
        points: 1385,
        rank: 2,
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      {
        id: 3,
        name: 'You',
        points: 1247,
        rank: 3,
        avatar: 'https://i.pravatar.cc/150?img=3',
        isCurrentUser: true,
      },
      {
        id: 4,
        name: 'Taylor',
        points: 1120,
        rank: 4,
        avatar: 'https://i.pravatar.cc/150?img=4',
      },
      {
        id: 5,
        name: 'Morgan',
        points: 980,
        rank: 5,
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
    ];
  }

  // Get group challenges
  getChallenges(): any[] {
    if (this.mode === 'single') return [];

    return [
      {
        id: 1,
        title: 'Coding Sprint',
        description: 'Solve 5 LeetCode questions in a week',
        section: 'coding',
        progress: 3,
        target: 5,
        deadline: new Date(Date.now() + 3 * 86400000), // 3 days from now
      },
      {
        id: 2,
        title: 'Workout Challenge',
        description: 'Complete 10 workouts this month',
        section: 'gym',
        progress: 7,
        target: 10,
        deadline: new Date(Date.now() + 12 * 86400000), // 12 days from now
      },
    ];
  }

  // Get group goals
  getGroupGoals(): any[] {
    if (this.mode !== 'group') return [];

    return [
      {
        id: 1,
        title: 'Group Study Marathon',
        description: 'Collectively complete 100 coding tasks',
        section: 'coding',
        progress: 67,
        target: 100,
        deadline: new Date(Date.now() + 14 * 86400000), // 14 days from now
      },
      {
        id: 2,
        title: 'Fitness Month',
        description: 'Log 50 group workouts',
        section: 'gym',
        progress: 28,
        target: 50,
        deadline: new Date(Date.now() + 18 * 86400000), // 18 days from now
      },
    ];
  }

  // Get social feed
  getSocialFeed(): any[] {
    if (this.mode === 'single') return [];

    return [
      {
        id: 1,
        user: {
          id: 1,
          name: 'Alex',
          avatar: 'https://i.pravatar.cc/150?img=1',
        },
        content: 'Just completed a 5-day coding streak! #consistency',
        type: 'achievement',
        section: 'coding',
        likes: 4,
        comments: 2,
        timestamp: new Date(Date.now() - 2 * 3600000), // 2 hours ago
      },
      {
        id: 2,
        user: {
          id: 2,
          name: 'Jordan',
          avatar: 'https://i.pravatar.cc/150?img=2',
        },
        content: 'New personal record on bench press: 185lbs! 💪',
        type: 'record',
        section: 'gym',
        likes: 7,
        comments: 3,
        timestamp: new Date(Date.now() - 5 * 3600000), // 5 hours ago
      },
    ];
  }

  // Get AI insights based on section
  getAIInsights(section: string): string[] {
    switch (section) {
      case 'coding':
        return [
          "You're more productive in the morning. Try to schedule coding sessions before noon.",
          "You've been making great progress with array problems, but could improve on dynamic programming.",
          "Consider revisiting tree traversal algorithms as you've had challenges in that area.",
        ];
      case 'gym':
        return [
          'Your bench press has improved 15% in the last month. Great progress!',
          'You might want to increase your squat weight by 10% to continue progressing.',
          'Consider adding more rest days between upper body workouts for better recovery.',
        ];
      case 'diet':
        return [
          'Your protein intake is consistently below your target. Consider adding more protein sources.',
          'You tend to consume more calories on weekends. Planning meals ahead might help.',
          'Based on your workout intensity, increasing carbohydrates on training days could improve performance.',
        ];
      case 'journaling':
        return [
          'Your mood tends to be more positive on days you also logged a workout.',
          "Your journal entries show increased motivation when you're working on coding projects.",
          'Consider journaling in the morning to set a positive tone for the day.',
        ];
      case 'tracking-sheet':
        return [
          "You're most consistent with coding tasks, completing 92% of planned activities.",
          'Your overall task completion rate has improved by 15% this month.',
          "There's a positive correlation between completing morning workouts and productivity throughout the day.",
        ];
      default:
        return [
          'Custom sections help you track specific goals effectively.',
          'Consider setting specific milestones for this custom tracking area.',
        ];
    }
  }
}
