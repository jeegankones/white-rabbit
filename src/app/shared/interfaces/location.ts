export interface Location {
  id: string;
  active: boolean;
  address: string;
  code: string;
  connectedUsers: number;
  coordinates: {latitude: number; longitude: number};
}
