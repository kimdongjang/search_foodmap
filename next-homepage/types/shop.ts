
export interface Shop{
  id: number;
  name: string;
  addressName: string;
  loadAddressName: string;
  homepageLink: string;
  callNumber: string;
  categoryGroupCode: string;
  categoryGroupName: string;
  categoryName: string;
  updateAt: Date;
  lng: number;
  lat: number;
}
export interface ShopList extends Array<Shop> { }