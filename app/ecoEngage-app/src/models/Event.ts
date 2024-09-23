export interface Event {
  id: string,
  name: string,
  title: string,
  description: string,
  eventStartDate: Date,
  eventEndDate: Date,
  usersRegistered: string[],
  images: string[],
  location: {
    address1: string,
    address2?: string,
    city: string,
    state: string,
    zipCode: string,
    latitude: number,
    longitude: number
  }
}
