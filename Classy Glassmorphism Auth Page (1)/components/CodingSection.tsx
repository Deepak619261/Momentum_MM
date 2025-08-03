"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  ArrowLeft, 
  Plus, 
  Code, 
  CheckCircle2, 
  Clock,
  TrendingUp,
  Brain,
  Calendar,
  BarChart3
} from "lucide-react";

interface CodingSectionProps {
  onBack: () => void;
}

export function CodingSection({ onBack }: CodingSectionProps) {
  const [showAddTask, setShowAddTask] = useState(false);

  // Mock data
  const tasks = [
    { id: 1, title: "Two Sum", platform: "LeetCode", difficulty: "Easy", completed: true, timeSpent: 25 },
    { id: 2, title: "Binary Search", platform: "LeetCode", difficulty: "Medium", completed: true, timeSpent: 45 },
    { id: 3, title: "Valid Parentheses", platform: "LeetCode", difficulty: "Easy", completed: false, timeSpent: 0 },
  ];

  const stats = {
    totalSolved: 147,
    thisWeek: 15,
    currentStreak: 7,
    avgTime: 42
  };

  // Generate heatmap data for the past year
  const generateHeatmapData = () => {
    const data = [];
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const activity = Math.floor(Math.random() * 5); // 0-4 tasks per day
      data.push({
        date: date.toISOString().split('T')[0],
        count: activity,
        level: activity === 0 ? 0 : activity <= 1 ? 1 : activity <= 2 ? 2 : activity <= 3 ? 3 : 4
      });
    }
    return data;
  };

  const heatmapData = generateHeatmapData();

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
      
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-gray-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Code className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl text-white">Coding/Skills</h1>
              <p className="text-gray-400">Track your programming progress</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-300">Total Solved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-blue-400">{stats.totalSolved}</div>
              <p className="text-xs text-gray-400">All time</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-300">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-green-400">{stats.thisWeek}</div>
              <p className="text-xs text-gray-400">+3 from last week</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-300">Current Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-orange-400">{stats.currentStreak} days</div>
              <p className="text-xs text-gray-400">Keep it going!</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/10 border-white/20 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-300">Avg Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-purple-400">{stats.avgTime}m</div>
              <p className="text-xs text-gray-400">Per problem</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Tasks and Add Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Task Form */}
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Add New Task</CardTitle>
                  <Button 
                    onClick={() => setShowAddTask(!showAddTask)}
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                </div>
              </CardHeader>
              
              {showAddTask && (
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Problem Title</Label>
                      <Input 
                        id="title"
                        placeholder="e.g., Two Sum"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="platform">Platform</Label>
                      <Select>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="leetcode">LeetCode</SelectItem>
                          <SelectItem value="hackerrank">HackerRank</SelectItem>
                          <SelectItem value="codechef">CodeChef</SelectItem>
                          <SelectItem value="codeforces">Codeforces</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Time Spent (minutes)</Label>
                      <Input 
                        id="time"
                        type="number"
                        placeholder="45"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    Add Task
                  </Button>
                </CardContent>
              )}
            </Card>

            {/* Tasks List */}
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle>Recent Tasks</CardTitle>
                <CardDescription className="text-gray-400">
                  Your coding activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div 
                      key={task.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          task.completed ? 'bg-green-500/20' : 'bg-gray-500/20'
                        }`}>
                          {task.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                          ) : (
                            <Clock className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={task.completed ? 'text-white' : 'text-gray-300'}>
                              {task.title}
                            </span>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${
                                task.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                                task.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                'bg-red-500/20 text-red-300'
                              }`}
                            >
                              {task.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400">
                            {task.platform} • {task.timeSpent > 0 ? `${task.timeSpent}m` : 'Not started'}
                          </p>
                        </div>
                      </div>
                      
                      {!task.completed && (
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Heatmap and Progress */}
          <div className="space-y-6">
            {/* Heatmap */}
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Activity Heatmap
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Daily coding activity over the past year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-12 gap-1 mb-4">
                  {heatmapData.slice(-84).map((day, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-sm ${
                        day.level === 0 ? 'bg-gray-700' :
                        day.level === 1 ? 'bg-blue-900' :
                        day.level === 2 ? 'bg-blue-700' :
                        day.level === 3 ? 'bg-blue-500' :
                        'bg-blue-300'
                      }`}
                      title={`${day.date}: ${day.count} tasks`}
                    />
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-700 rounded-sm"></div>
                    <div className="w-2 h-2 bg-blue-900 rounded-sm"></div>
                    <div className="w-2 h-2 bg-blue-700 rounded-sm"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
                    <div className="w-2 h-2 bg-blue-300 rounded-sm"></div>
                  </div>
                  <span>More</span>
                </div>
              </CardContent>
            </Card>

            {/* Progress Charts */}
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Easy Problems</span>
                    <span className="text-sm">67/120</span>
                  </div>
                  <Progress value={56} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Medium Problems</span>
                    <span className="text-sm">45/200</span>
                  </div>
                  <Progress value={23} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Hard Problems</span>
                    <span className="text-sm">12/80</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* AI Analysis */}
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-300">
                    🎯 <strong>Recommendation:</strong> Focus on dynamic programming patterns. 
                    You've solved 67% of easy problems - time to tackle more mediums!
                  </p>
                  
                  <p className="text-sm text-gray-300">
                    📈 <strong>Trend:</strong> Your solving speed has improved by 23% this month. 
                    Keep practicing array and string problems.
                  </p>
                  
                  <Button 
                    size="sm" 
                    className="w-full bg-purple-500 hover:bg-purple-600"
                  >
                    Get Detailed Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}