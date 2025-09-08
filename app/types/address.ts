export interface Address {
  email: string;
  addressProps: {
    phone: string;
    streetAddress: string;
    postalCode: string;
    city: string;
    country: string;
  };
  setAddressProp: (field: keyof Address["addressProps"], value: string) => void;
  disabled?: boolean;
}
