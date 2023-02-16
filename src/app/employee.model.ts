export interface Employee {
  name: string
  mobile: number
  gender: string
  email: string
  addressArray: AddressArray[]
  id: number
}

export interface AddressArray {
  addLine1: string
  addLine2: string
  district: string
  state: string
  pinCode: number
}