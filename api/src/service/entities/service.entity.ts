import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

export enum ServiceStatus {
	REQUESTED = 'Solicitado',
	ACCEPTED = 'Aceito',
	REJECTED = 'Recusado'
}

@Entity({ name: 'services' })
export class Service {
	@PrimaryGeneratedColumn()
    id: number

	@Column({ type: 'varchar', length: 300, nullable: false })
	description: string;

	@OneToOne(() => User, user => user.id)
	user: User;

	@OneToOne(() => User, user => user.id)
	architect: User;

	@Column({
		type: 'enum',
		enum: ServiceStatus,
		default: ServiceStatus.REQUESTED})
	status: ServiceStatus;
}
