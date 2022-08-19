export interface Location {
  id: string;
  name: string;
  active: boolean;
  address: string;
  code: string;
  connectedUsers: number;
  coordinates: {lat: number; lng: number};
}
