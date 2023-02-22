export interface Employee {
  [x: string]: any
  id?: string
  name: string | null
  mobile: string | null
  gender: string | null
  email: string | null
  addressArray: (AddressArray | null)[]

}

export interface AddressArray {
  addLine1: string | null
  addLine2: string | null
  district: string | null
  state: string | null
  pinCode: string | null
}

export enum EmployeeHeaderStatus {
  Add = "Add",
  Edit = "Edit"
}