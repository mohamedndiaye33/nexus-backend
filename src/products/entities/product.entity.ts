import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products') // Nom de la table dans MySQL via WampServer
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Ex: "Clavier Mécanique Razer BlackWidow"

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number; // Ex: 129.99

  @Column()
  stock: number; // Quantité disponible

  @Column()
  category: string; // Ex: "Clavier", "Souris", "Composants", "Jeux"

  @Column({ default: true })
  isActive: boolean; // Produit affiché ou masqué sur la boutique
}