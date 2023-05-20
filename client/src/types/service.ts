import User from "./user";

export const ServiceStatusOptions = ['Solicitado', 'Aceito', 'Recusado'];
export type ServiceStatus = typeof ServiceStatusOptions[number];

export default interface Service {
  id: number;
  name: string;
  description: string;
  employee: User;
  client: User;
  status: ServiceStatus;
}
