/* --- STATE --- */
export interface CouriersPageState {
    entries: Dictionary<Courier>;
  }
  
  export type ContainerState = CouriersPageState;
  
  export interface Courier {
    active: Boolean;
    balance: Number;
    carBrand: String;
    carNumber: String;
    carPhoto: String;
    fio: String;
    id: Number;
    iin: String;
    passwordHash: String;
    phoneNumber: String;
    phoneValid: Boolean;
    photo: String;
    scan: String;
    wayOfTransfer: String;
    password:String;
  }
  
  export interface CreateCourierPayload {

    fio: String;
    iin: String;
    phoneNumber: String;
    photo: String;
    scan: String;
    password: String;
    wayOfTransfer: String;
    carNumber: String;
    carBrand: String;
    carPhoto: String;
  }
  