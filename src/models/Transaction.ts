import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import Category from './Category';

@Entity('transactions')
class Transaction {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  type: 'income' | 'outcome';

  @Column('decimal')
  value: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @Column()
  category_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
