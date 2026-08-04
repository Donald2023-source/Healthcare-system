export interface Patient {
  _id: string;

  hospitalNumber: string;

  gender: string;

  user: {
    _id: string;

    firstName: string;

    middleName?: string;

    lastName: string;

    phoneNumber: string;

    email: string;
  };
}