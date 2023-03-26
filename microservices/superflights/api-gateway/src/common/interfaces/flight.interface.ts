import { IPassenger } from "./passenger.interface"

export interface IFlight {
  pilot: string
  airplane: string
  destination: string
  flightDate: Date
  passengers: IPassenger[]
}