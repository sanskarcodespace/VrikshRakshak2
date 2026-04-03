import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type NotificationType = 'CRITICAL' | 'WARNING' | 'SUCCESS' | 'INFO';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  category: string;
  read: boolean;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: [
        { id: "1", type: "CRITICAL", title: "Hydration Alert", message: "Specimen T-845 (English Oak) has exceeded its 6-day watering threshold.", timestamp: "2026-04-03T12:00:00Z", category: "Hydration", read: false },
        { id: "2", type: "WARNING", title: "Growth Anomaly", message: "T-843 showing 15% slower growth than localized average.", timestamp: "2026-04-03T11:00:00Z", category: "Diagnostics", read: false },
      ],
      addNotification: (note) => set((state) => ({
        notifications: [
          {
            ...note,
            id: Math.random().toString(36).substring(7),
            timestamp: new Date().toISOString(),
            read: false,
          },
          ...state.notifications,
        ]
      })),
      markAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
      })),
      clearAll: () => set({ notifications: [] }),
    }),
    {
      name: 'vriksh-notifications',
    }
  )
);
