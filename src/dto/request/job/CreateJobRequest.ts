export default interface JobRequest {
  client: string;
  loadingDate: Date;
  unloadingDate: Date;
  vehicles: {
    vehicleNumber: string;
    driver: string;
  }[];
  costs: {
    title: string;
    description: string;
    cost: string;
  }[];
  meta: {
    from: {
      country: string;
      address: string;
      phone: string;
      name: string;
      email: string;
    };
    to: {
      country: string;
      address: string;
      phone: string;
      name: string;
      email: string;
    };
  };
  descriptions: {
    title: string;
    text: string;
  }[];
}
