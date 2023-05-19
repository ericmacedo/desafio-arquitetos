import { Entity, Column, PrimaryGeneratedColumn, AfterLoad } from 'typeorm';

export enum Gender {
	MALE = 'Masculino',
	FEMALE = 'Feminino',
	OTHER = 'Outro'
}

export enum UserRole {
	CLIENT = 'Cliente',
	EMPLOYEE = 'Funcionário'
}

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn()
    id: number

	@Column({ type: 'varchar', length: 300, nullable: false })
  	name: string;

  	@Column({ type: 'varchar', length: 300, nullable: false })
  	email: string;
	
	@Column({ type: 'varchar', length: 300, nullable: false })
	phone: string;

	@Column({ type: 'date', nullable: false })
	birth: string;

	@Column({ type: 'enum', enum: Gender })
	gender: Gender;

	@Column({ type: 'enum', enum: UserRole })
	role: UserRole;

	age: number;

	@AfterLoad()
	setComputed() {
		/*	Computes age based on birth date
		* ref: https://stackoverflow.com/a/21984136 */
		
		var ageDifMs = Date.now() - (new Date(this.birth)).getTime();
		var ageDate = new Date(ageDifMs);
		this.age = Math.abs(ageDate.getUTCFullYear() - 1970);
	}
}
