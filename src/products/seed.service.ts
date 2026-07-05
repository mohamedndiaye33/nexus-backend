import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // S'exécute automatiquement au démarrage du backend
  async onApplicationBootstrap() {
    const count = await this.productRepository.count();
    if (count > 0) {
      this.logger.log(`✅ Base déjà peuplée (${count} produits) — seed ignoré`);
      return;
    }

    this.logger.log('🌱 Base vide — injection des 35 produits Nexus Gaming...');
    await this.productRepository.save(NEXUS_PRODUCTS);
    this.logger.log(`🎮 ${NEXUS_PRODUCTS.length} produits injectés avec succès !`);
  }
}

// ─────────────────────────────────────────────────────────────────
// Tous les produits de la vitrine frontend (Produit.tsx)
// ─────────────────────────────────────────────────────────────────
const NEXUS_PRODUCTS = [
  // ── Consoles ──────────────────────────────
  {
    name: 'PS5 Slim Standard',
    description: 'Console PlayStation 5 Slim édition standard. Lecteur Blu-ray, 1To SSD.',
    price: 275000,
    stock: 10,
    category: 'Consoles',
    isActive: true,
  },
  {
    name: 'Xbox Series X',
    description: 'Console Microsoft Xbox Series X. 4K natif, 120fps, SSD 1To.',
    price: 300000,
    stock: 8,
    category: 'Consoles',
    isActive: true,
  },
  {
    name: 'Nintendo Switch2 OLED',
    description: 'Console hybride Nintendo Switch 2 écran OLED 7 pouces.',
    price: 245000,
    stock: 12,
    category: 'Consoles',
    isActive: true,
  },
  {
    name: 'PS5 Pro',
    description: 'Console PlayStation 5 Pro. Performances maximales, Ray Tracing amélioré.',
    price: 500000,
    stock: 5,
    category: 'Consoles',
    isActive: true,
  },
  {
    name: 'Xbox Series S Digital',
    description: 'Console Xbox Series S 100% numérique. Compacte et puissante.',
    price: 215000,
    stock: 15,
    category: 'Consoles',
    isActive: true,
  },
  {
    name: 'PS4 PRO',
    description: 'Console PlayStation 4 Pro 1To. Compatible 4K. Excellent rapport qualité/prix.',
    price: 190000,
    stock: 6,
    category: 'Consoles',
    isActive: true,
  },
  {
    name: 'Steam Deck OLED 512GB',
    description: 'Console PC portable Valve Steam Deck écran OLED, 512Go.',
    price: 475000,
    stock: 4,
    category: 'Consoles',
    isActive: true,
  },
  {
    name: 'ASUS ROG Ally Z1 Extreme',
    description: 'Console PC portable gaming ASUS ROG Ally, processeur Z1 Extreme.',
    price: 525000,
    stock: 3,
    category: 'Consoles',
    isActive: true,
  },

  // ── Manettes ──────────────────────────────
  {
    name: 'Manette Edge Dualsense',
    description: 'Manette PS5 DualSense Edge pro. Sticks interchangeables, boutons remappables.',
    price: 55000,
    stock: 20,
    category: 'Manettes',
    isActive: true,
  },
  {
    name: 'Manette PS4PRO',
    description: 'Manette DualShock 4 pour PS4 Pro. Touchpad, barre lumineuse.',
    price: 15000,
    stock: 25,
    category: 'Manettes',
    isActive: true,
  },
  {
    name: 'Manette ordi',
    description: 'Manette filaire USB compatible PC et Android. Plug & Play.',
    price: 10000,
    stock: 30,
    category: 'Manettes',
    isActive: true,
  },
  {
    name: 'Manette Xbox Serie X',
    description: 'Manette officielle Xbox Series X/S. Bluetooth, prise casque.',
    price: 30000,
    stock: 18,
    category: 'Manettes',
    isActive: true,
  },
  {
    name: 'Manette PS5 custom',
    description: 'Manette DualSense PS5 coloris custom. Vibrations haptiques, gâchettes adaptatives.',
    price: 2500,
    stock: 2,
    category: 'Manettes',
    isActive: true,
  },
  {
    name: 'Manette PS4 custom',
    description: 'Manette DualShock 4 PS4 coloris custom édition limitée.',
    price: 15000,
    stock: 7,
    category: 'Manettes',
    isActive: true,
  },

  // ── Jeux ──────────────────────────────────
  {
    name: 'Red Dead Redemption 2 PS5',
    description: 'Jeu PS5 Red Dead Redemption 2. Western open world, graphismes époustouflants.',
    price: 45000,
    stock: 14,
    category: 'Jeux',
    isActive: true,
  },
  {
    name: 'Spider-Man 2 PS5',
    description: 'Jeu PS5 Marvel\'s Spider-Man 2. Action/aventure exclusivité PlayStation.',
    price: 60000,
    stock: 11,
    category: 'Jeux',
    isActive: true,
  },
  {
    name: 'Ace Combat 7',
    description: 'Jeu de combat aérien Ace Combat 7 Skies Unknown. Compatible VR.',
    price: 30000,
    stock: 9,
    category: 'Jeux',
    isActive: true,
  },
  {
    name: 'FC 26',
    description: 'EA Sports FC 26, le football ultime. Modes Ultimate Team, Carrière.',
    price: 50000,
    stock: 20,
    category: 'Jeux',
    isActive: true,
  },
  {
    name: '2K 26',
    description: 'NBA 2K26 basketball simulation. MyCareer, MyTeam, WNBA.',
    price: 55000,
    stock: 16,
    category: 'Jeux',
    isActive: true,
  },
  {
    name: 'GTA 5',
    description: 'Grand Theft Auto V. Open world légendaire de Rockstar Games.',
    price: 25000,
    stock: 22,
    category: 'Jeux',
    isActive: true,
  },

  // ── Gift Cards ────────────────────────────
  {
    name: 'Gift Card PSN 10€',
    description: 'Carte cadeau PlayStation Network 10€. Crédit immédiat sur le PS Store.',
    price: 7500,
    stock: 50,
    category: 'Gift Cards',
    isActive: true,
  },
  {
    name: 'Gift Card PSN 100€',
    description: 'Carte cadeau PlayStation Network 100€. Crédit immédiat sur le PS Store.',
    price: 60000,
    stock: 30,
    category: 'Gift Cards',
    isActive: true,
  },
  {
    name: 'Gift Card PSN 50€',
    description: 'Carte cadeau PlayStation Network 50€. Crédit immédiat sur le PS Store.',
    price: 40000,
    stock: 40,
    category: 'Gift Cards',
    isActive: true,
  },
  {
    name: 'Gift Card Steam 20€',
    description: 'Carte cadeau Steam 20€. Valable sur toute la bibliothèque Steam.',
    price: 15000,
    stock: 45,
    category: 'Gift Cards',
    isActive: true,
  },
  {
    name: 'Gift Card Steam 50€',
    description: 'Carte cadeau Steam 50€. Valable sur toute la bibliothèque Steam.',
    price: 35000,
    stock: 35,
    category: 'Gift Cards',
    isActive: true,
  },
  {
    name: 'Gift Card Xbox 10€',
    description: 'Carte cadeau Microsoft Xbox 10€. Crédit Xbox/Microsoft Store.',
    price: 7500,
    stock: 50,
    category: 'Gift Cards',
    isActive: true,
  },
  {
    name: 'Gift Card Xbox 20€',
    description: 'Carte cadeau Microsoft Xbox 20€. Crédit Xbox/Microsoft Store.',
    price: 15000,
    stock: 40,
    category: 'Gift Cards',
    isActive: true,
  },

  // ── Setup ─────────────────────────────────
  {
    name: 'Écran Asus courbé',
    description: 'Écran gaming ASUS courbé 27" 165Hz. Résolution QHD, 1ms.',
    price: 100000,
    stock: 6,
    category: 'Setup',
    isActive: true,
  },
  {
    name: 'Chaise Gaming Secretlab',
    description: 'Chaise gaming Secretlab Titan. Soutien lombaire magnétique, cuir SoftWeave.',
    price: 30000,
    stock: 8,
    category: 'Setup',
    isActive: true,
  },
  {
    name: 'Clavier Mécanique RGB Pro',
    description: 'Clavier mécanique RGB TKL. Switchs optiques, éclairage per-key.',
    price: 35000,
    stock: 13,
    category: 'Setup',
    isActive: true,
  },
  {
    name: 'Souris Logitech G Pro Wireless',
    description: 'Souris gaming Logitech G Pro Wireless. 25 600 DPI, autonomie 70h.',
    price: 20000,
    stock: 17,
    category: 'Setup',
    isActive: true,
  },
  {
    name: 'Casque Astro A50 Wireless',
    description: 'Casque gaming Astro A50 sans fil. Dolby Audio, compatible PS5/PC.',
    price: 25000,
    stock: 10,
    category: 'Setup',
    isActive: true,
  },
  {
    name: 'Micro Shure SM7B Pro',
    description: 'Microphone dynamique Shure SM7B. Standard industrie, cardioïde.',
    price: 20000,
    stock: 7,
    category: 'Setup',
    isActive: true,
  },
  {
    name: 'Tapis XXL Pro',
    description: 'Tapis de souris XXL gaming 900x400mm. Surface optimisée, antidérapant.',
    price: 7000,
    stock: 25,
    category: 'Setup',
    isActive: true,
  },
  {
    name: 'Bureau Gaming Motorisé',
    description: 'Bureau gaming motorisé assis-debout. Hauteur réglable 70-120cm, 2 moteurs.',
    price: 40000,
    stock: 4,
    category: 'Setup',
    isActive: true,
  },
];
