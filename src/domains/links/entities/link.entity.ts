import type { LinkModel } from '../models/link.model.js';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('links')
export class LinkEntity implements LinkModel {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public payload: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date | null;
}
