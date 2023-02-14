export class Employee {
  name: string;
  email: string;
  mobile: number;
  gender: string;
  address: {
    line1: string;
    line2: string;
    district: string;
    state: string;
    pin: number;
  }[];

  constructor(
    name: string,
    email: string,
    mobile: number,
    gender: string,
    address: {
      line1: string;
      line2: string;
      district: string;
      state: string;
      pin: number;
    }[]
  ) {
    this.name = name;
    this.email = email;
    this.mobile = mobile;
    this.gender = gender;
    this.address = address;
  }
}
