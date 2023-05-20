import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm';

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

	@ManyToOne(() => User, user => user.id,)
	@JoinColumn({ name: "client" })
	client: User;

	@ManyToOne(() => User, user => user.id)
	@JoinColumn({ name: "employee" })
	employee: User;

	@Column({
		type: 'enum',
		enum: ServiceStatus,
		default: ServiceStatus.REQUESTED})
	status: ServiceStatus;
}
