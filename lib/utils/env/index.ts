const read = (names: string[]): string | undefined => {
  if (typeof process !== 'undefined') {
    for (const n of names) {
      const v = (process.env as Record<string, string | undefined>)[n];
      if (v) return v;
    }
  }
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    for (const n of names) {
      const v = localStorage.getItem(n) || undefined;
      if (v) return v;
    }
  }
  return undefined;
};

export class Env {
  static get(name: string, def?: string): string | undefined {
    const v = read([name]);
    return v ?? def;
  }
  static appEnv(): string | undefined {
    return read(['NEXT_PUBLIC_APP_ENV']);
  }
  static apiUrl(): string | undefined {
    return read(['NEXT_PUBLIC_API_URL']);
  }
  static ak(): string | undefined {
    return read(['NEXT_PUBLIC_API_AK', 'NEXT_PUBLIC_APP_ACCESS_KEY', 'AK']);
  }
  static sk(): string | undefined {
    return read(['NEXT_PUBLIC_API_SK', 'NEXT_PUBLIC_APP_END_KEY', 'SK']);
  }
}
