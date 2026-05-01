import type { AuthResponse, GardenResponse, PlantInfoResponse, PlantKind } from './types';

const BASE_URL = 'https://bankas2026-backend.hendrikpeter.net';

export class AuthExpiredError extends Error {
  constructor() {
    super('Authentication expired');
    this.name = 'AuthExpiredError';
  }
}

export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  } catch {
    throw new ApiError('Nätverksfel — kunde inte nå servern.', 0);
  }

  if (response.status === 401) {
    throw new AuthExpiredError();
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const detail = body?.errors?.detail ?? body?.reason ?? 'Något gick fel.';
    throw new ApiError(detail as string, response.status);
  }

  return response.json() as Promise<T>;
}

function authHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` };
}

export function signUp(username: string, pin: string): Promise<AuthResponse> {
  return request<AuthResponse>('/api/users/sign-up', {
    method: 'POST',
    body: JSON.stringify({ username, pin }),
  });
}

export function login(username: string, pin: string): Promise<AuthResponse> {
  return request<AuthResponse>('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ username, pin }),
  });
}

export function getMyFarm(token: string): Promise<GardenResponse> {
  return request<GardenResponse>('/api/farms/me', {
    headers: authHeaders(token),
  });
}

export function getPlantInfo(): Promise<PlantInfoResponse> {
  return request<PlantInfoResponse>('/api/farms/plant-info');
}

export function cleanPlot(token: string, plotNumber: number): Promise<GardenResponse> {
  return request<GardenResponse>(`/api/farms/plots/${plotNumber}/clean`, {
    method: 'POST',
    headers: authHeaders(token),
  });
}

export function seedPlot(token: string, plotNumber: number, plantKind: PlantKind): Promise<GardenResponse> {
  return request<GardenResponse>(`/api/farms/plots/${plotNumber}/seed`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ plant_kind: plantKind }),
  });
}

export function waterPlot(token: string, plotNumber: number): Promise<GardenResponse> {
  return request<GardenResponse>(`/api/farms/plots/${plotNumber}/water`, {
    method: 'POST',
    headers: authHeaders(token),
  });
}

export function harvestPlot(token: string, plotNumber: number): Promise<GardenResponse> {
  return request<GardenResponse>(`/api/farms/plots/${plotNumber}/harvest`, {
    method: 'POST',
    headers: authHeaders(token),
  });
}
