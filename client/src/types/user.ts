export const UserRoles = ['Cliente', 'Funcionário'];
export type UserRole = typeof UserRoles[number];


export const Genders = ['Masculino', 'Feminino', 'Outro'];
export type Gender = typeof Genders[number];

export default interface User {
	id: number;
	name: string;
	email: string;
	phone: string;
	birth: string;
	role: UserRole;
	gender: Gender;
}
