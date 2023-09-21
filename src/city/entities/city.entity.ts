import { StateEntity } from 'src/state/entities/state.entity';
import { AddressEntity } from '../../address/entities/address.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,

} from 'typeorm';

@Entity({ name: 'city' })
export class CityEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'state_id', nullable: false })
  stateId: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  //uma cidade varios enderecos
  @OneToMany(() => AddressEntity, (address) => address.city)
  addresses?: AddressEntity[];

  //varias cidades por estado
  @ManyToOne(() => StateEntity, (state) => state.cities)
  @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
  state?: StateEntity;
}