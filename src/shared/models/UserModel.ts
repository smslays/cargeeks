interface Name {
  first?: string;
  last?: string;
}
interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
}

interface User {
  _id?: string;
  userId?: number;
  name?: Name;
  mobile?: string;
  email?: string;
  address?: Address;
  pan?: string;
  status?: string;
  verified?: boolean;
  role?: string;
  avatar?: string | File;
  gender?: string;
  dob?: Date;
  password?: string ;
  occupation?: string;
}
export default User;
