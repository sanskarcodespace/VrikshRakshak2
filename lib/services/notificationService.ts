"use client";

// Botanical thresholds (Species -> Max days without water)
export const SPECIES_THRESHOLDS: Record<string, number> = {
  "Silver Birch": 3,
  "Red Oak": 5,
  "Norway Spruce": 4,
  "English Oak": 6,
  "Cactus": 14,
  "Aloe Vera": 10,
  "Neem": 4,
  "Banyan": 7
};

export interface Notification {
  id: string;
  type: "WARNING" | "CRITICAL" | "INFO" | "SUCCESS";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionLabel?: string;
  treeId?: string;
}

export const checkWateringStatus = (lastWatered: string, species: string): boolean => {
  const threshold = SPECIES_THRESHOLDS[species] || 4; // Default 4 days
  const lastDate = new Date(lastWatered);
  const now = new Date();
  const diffDays = Math.ceil((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
  
  return diffDays > threshold;
};
