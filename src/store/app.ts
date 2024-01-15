// Utilities
import { defineStore } from 'pinia'

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
  // System = 'system'
}

export const useAppStore = defineStore('app', {
  state: () => ({
    sidebarVisible: true,
    themeMode: ThemeMode.Light as ThemeMode,
    showPreferences: false
  }),
  persist: {
    paths: ['sidebarVisible', 'themeMode',]
  }
})
