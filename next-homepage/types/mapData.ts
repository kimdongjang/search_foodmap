import { Shop } from './shop'

export interface mapData<T extends Shop> {
  latitude: number
  longitude: number
  markerList: Array<T>
}
