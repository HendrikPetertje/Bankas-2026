export type PlantKind = 'LETTUCE' | 'TOMATO' | 'CARROT' | 'PUMPKIN';
export type PlotState = 'BARREN' | 'CLEANED' | 'SEEDED';

export interface Plot {
  number: number;
  state: PlotState;
  plant_kind: PlantKind | null;
  planted_at: string | null;
  last_watered_at: string | null;
  last_weeds_removed_at: string | null;
  water_stars: number | null;
  weed_stars: number | null;
}

export interface Garden {
  user_name: string;
  produced_g: number;
  plots: Plot[];
}

export interface Plant {
  kind: PlantKind;
  growing_time_s: number;
  weight_g: Record<string, number>;
}

export interface AuthResponse {
  token: string;
  garden: Garden;
}

export interface GardenResponse {
  garden: Garden;
}

export interface PlantInfoResponse {
  plants: Plant[];
}

export interface StoredAccount {
  username: string;
  token: string;
}

export type ToolType = 'seed' | 'water' | 'clean' | 'harvest' | null;

export type GameFrame = 'intro' | 'login' | 'garden';
