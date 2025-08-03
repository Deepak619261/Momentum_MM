import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrowserStorageService {
  /**
   * Check if code is running in a browser environment
   */
  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  /**
   * Safely get an item from localStorage
   * @param key Storage key
   * @param defaultValue Optional default value if key doesn't exist or in SSR
   */
  getItem<T>(key: string, defaultValue: T = null as unknown as T): T {
    if (!this.isBrowser()) {
      return defaultValue;
    }

    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return defaultValue;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading '${key}' from localStorage:`, error);
      return defaultValue;
    }
  }

  /**
   * Safely set an item in localStorage
   * @param key Storage key
   * @param value Value to store
   */
  setItem(key: string, value: any): boolean {
    if (!this.isBrowser()) {
      return false;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing '${key}' to localStorage:`, error);
      return false;
    }
  }

  /**
   * Safely remove an item from localStorage
   * @param key Storage key
   */
  removeItem(key: string): boolean {
    if (!this.isBrowser()) {
      return false;
    }

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing '${key}' from localStorage:`, error);
      return false;
    }
  }

  /**
   * Safely clear all items from localStorage
   */
  clear(): boolean {
    if (!this.isBrowser()) {
      return false;
    }

    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
}
