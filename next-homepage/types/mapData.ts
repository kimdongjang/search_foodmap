import { Shop } from './shop'

export interface mapData<T extends Shop> {
  latitude: number
  longitude: number
  markerList: Array<T>
  searchShopList(lat: number, lng: number): void
}
