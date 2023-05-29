export type RawJwt = {
  sub: number;
  name: string;
  email: string;
};

export interface JwtPayload {
  userId: number;
  email: string;
  name: string;
}

export function isValidPayload(item: unknown): item is RawJwt {
  return (
    typeof item === 'object' &&
    item !== null &&
    'sub' in item &&
    typeof item['sub'] === 'number' &&
    'name' in item &&
    typeof item['name'] === 'string' &&
    'email' in item &&
    typeof item['email'] === 'string'
  );
}
