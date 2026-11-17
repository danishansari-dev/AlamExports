
import { ProductCategory, Material, Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'pr-jute-01',
    title: 'Heritage Jute Floor Rug',
    category: ProductCategory.FLOOR_RUGS,
    material: [Material.JUTE],
    image: 'https://images.unsplash.com/photo-1579650700185-3e284898394b?auto=format&fit=crop&q=80&w=800',
    video: 'https://cdn.pixabay.com/vimeo/455423854/carpet-49666.mp4?width=1280&hash=85e8d6f5f3e5f3e5f3e5f3e5f3e5f3e5',
    description: 'A heavy-duty, hand-braided jute rug designed for high-traffic export markets. Features natural golden hues and superior tensile strength.',
    specs: ['Weight: 2500 GSM', 'Thickness: 10mm', 'Anti-static properties', 'Available in custom sizes']
  },
  {
    id: 'pr-wool-01',
    title: 'Artisan Wool Hand Woven Carpet',
    category: ProductCategory.HAND_WOVEN_CARPETS,
    material: [Material.WOOL, Material.COTTON],
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=800',
    video: 'https://cdn.pixabay.com/vimeo/345513233/weaving-24956.mp4?width=1280&hash=f5e5f3e5f3e5f3e5f3e5f3e5f3e5f3e5',
    description: 'Premium New Zealand wool blended with Indian cotton for a soft touch and high durability. Ideal for luxury hospitality projects.',
    specs: ['80% Wool, 20% Cotton', 'Hand-loomed in Bhadohi', 'Colorfast dyes', 'Export grade backing']
  },
  {
    id: 'pr-bath-01',
    title: 'Cotton Tufted Bath Mat',
    category: ProductCategory.BATH_MATS,
    material: [Material.COTTON],
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    description: 'High-absorbency tufted bath mats with non-slip finish. Specifically manufactured for department store volume orders.',
    specs: ['100% Ring-spun cotton', 'Machine washable', 'Anti-skid coating available', 'Standard sizes: 50x80cm']
  },
  {
    id: 'pr-cushion-01',
    title: 'Textured Cotton Pillow Cover',
    category: ProductCategory.PILLOW_COVERS,
    material: [Material.COTTON, Material.SILK],
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800',
    description: 'Sophisticated pillow covers featuring intricate hand-guided embroidery and silk highlights.',
    specs: ['YKK Hidden zippers', 'Reinforced seams', 'Material: Cotton duck with silk embroidery', 'Size: 45x45cm']
  }
];

export const CATEGORY_METADATA = [
  { 
    category: ProductCategory.FLOOR_RUGS, 
    image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?auto=format&fit=crop&q=80&w=800',
    description: 'Our flagship range of large-format area rugs. From minimalist textures to ornate designs, manufactured to meet global size standards.'
  },
  { 
    category: ProductCategory.HAND_WOVEN_CARPETS, 
    image: 'https://images.unsplash.com/photo-1594897030264-ab7d87efc473?auto=format&fit=crop&q=80&w=800',
    description: 'Traditional hand-woven carpets from heritage weaving clusters. Each piece showcases centuries-old techniques with export-grade finishing.'
  },
  { 
    category: ProductCategory.BATH_MATS, 
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=800',
    description: 'Specialized high-absorbency tufted and woven bath mats for global retail chains and hospitality sectors.'
  }
];
