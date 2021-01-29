import { Entity, PrimaryGeneratedColumn ,Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('categories')
class Category {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Category;
