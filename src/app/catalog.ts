import { buildProductPlaceholder } from './product-image';

export interface ShopCategory {
  id: string;
  title: string;
  subcategories: string[];
}

export interface Product {
  id: string;
  categoryId: string;
  categoryTitle: string;
  subcategory: string;
  brand: string;
  name: string;
  description: string;
  volume: string;
  price: number;
  originalPrice?: number;
  rating: number;
  highlight?: string;
  image: string;
}

export const shopCategories: ShopCategory[] = [
  {
    id: 'cabelos',
    title: 'Cabelos',
    subcategories: [
      'Kits de Tratamento',
      'Shampoo',
      'Condicionador',
      'Máscara Capilar',
      'Leave-in e Creme para Pentear',
      'Óleo de Cabelo',
    ],
  },
  {
    id: 'maquiagens',
    title: 'Maquiagens',
    subcategories: ['Olhos', 'Pele', 'Boca', 'Sobrancelhas', 'Pincéis'],
  },
  {
    id: 'perfumes',
    title: 'Perfumes e Perfumaria',
    subcategories: ['Kit presente', 'Body Slash', 'Feminino', 'Masculino', 'Infantil'],
  },
  {
    id: 'corpo',
    title: 'Corpo',
    subcategories: ['Hidratantes', 'Sabonetes', 'Esfoliantes', 'Sabonete Íntimo'],
  },
  {
    id: 'skincare',
    title: 'Skin Care',
    subcategories: [
      'Limpeza de pele',
      'Hidratante para o Rosto',
      'Creme para Rugas',
      'Protetor Solar Facial',
      'Creme Clareador',
    ],
  },
];

type ProductTemplate = {
  brand: string;
  name: string;
  description: string;
  volume: string;
  price: number;
  originalPrice?: number;
  rating: number;
  highlight?: string;
};

const productTemplates: Record<string, ProductTemplate> = {
  'Kits de Tratamento': {
    brand: 'Dona Marley',
    name: 'Kit Reparação Completa Capilar',
    description: 'Shampoo, máscara e leave-in para fios ressecados e com brilho.',
    volume: '3 produtos',
    price: 189.9,
    originalPrice: 249.9,
    rating: 4.9,
    highlight: 'Achado do dia',
  },
  Shampoo: {
    brand: 'Dona Marley',
    name: 'Shampoo Nutrição Diária',
    description: 'Limpeza suave com óleo de argan para todos os tipos de cabelo.',
    volume: '300 ml',
    price: 54.9,
    rating: 4.7,
  },
  Condicionador: {
    brand: 'Dona Marley',
    name: 'Condicionador Desembaraçante',
    description: 'Hidrata sem pesar e facilita o penteado com perfume floral.',
    volume: '300 ml',
    price: 59.9,
    originalPrice: 69.9,
    rating: 4.8,
  },
  'Máscara Capilar': {
    brand: 'Dona Marley',
    name: 'Máscara Reparadora Intensa',
    description: 'Tratamento semanal com manteiga de karité para fios danificados.',
    volume: '250 g',
    price: 79.9,
    rating: 4.8,
  },
  'Leave-in e Creme para Pentear': {
    brand: 'Dona Marley',
    name: 'Leave-in Proteção Térmica',
    description: 'Controla frizz e protege os fios do calor da escova e chapinha.',
    volume: '200 ml',
    price: 64.9,
    rating: 4.6,
  },
  'Óleo de Cabelo': {
    brand: 'Dona Marley',
    name: 'Óleo Capilar Brilho Absoluto',
    description: 'Finalizador multifuncional com nutrição instantânea e efeito gloss.',
    volume: '60 ml',
    price: 49.9,
    originalPrice: 59.9,
    rating: 4.7,
  },
  Olhos: {
    brand: 'DM Beauty',
    name: 'Paleta Nude Atemporal',
    description: 'Sombras matte e shimmer para maquiagens do dia à noite.',
    volume: '12 cores',
    price: 119.9,
    originalPrice: 149.9,
    rating: 4.9,
    highlight: 'Mais vendido',
  },
  Pele: {
    brand: 'DM Beauty',
    name: 'Base Líquida Natural Glow',
    description: 'Cobertura média construível com acabamento luminoso e natural.',
    volume: '30 ml',
    price: 89.9,
    rating: 4.6,
  },
  Boca: {
    brand: 'DM Beauty',
    name: 'Batom Matte Conforto',
    description: 'Alta pigmentação com sensação confortável durante o dia.',
    volume: '4 g',
    price: 42.9,
    rating: 4.5,
  },
  Sobrancelhas: {
    brand: 'DM Beauty',
    name: 'Kit Sobrancelha Definida',
    description: 'Lápis, gel fixador e pincel para acabamento natural.',
    volume: '2 itens',
    price: 56.9,
    rating: 4.7,
  },
  Pincéis: {
    brand: 'DM Beauty',
    name: 'Kit Pincéis Essenciais',
    description: 'Cinco pincéis soft touch para rosto e olhos.',
    volume: '5 pincéis',
    price: 99.9,
    originalPrice: 129.9,
    rating: 4.8,
  },
  'Kit presente': {
    brand: 'Dona Marley',
    name: 'Kit Presente Aura Rosé',
    description: 'Body splash, hidratante e necessaire em embalagem para presente.',
    volume: 'Kit',
    price: 159.9,
    originalPrice: 199.9,
    rating: 4.9,
    highlight: 'Kit presente',
  },
  'Body Slash': {
    brand: 'Dona Marley',
    name: 'Body Splash Pétalas',
    description: 'Fragrância floral fresca ideal para o uso diário.',
    volume: '250 ml',
    price: 69.9,
    rating: 4.6,
  },
  Feminino: {
    brand: 'Dona Marley',
    name: 'Perfume Feminino Élégie',
    description: 'Notas de peônia, baunilha e âmbar com fixação elegante.',
    volume: '100 ml',
    price: 249.9,
    originalPrice: 299.9,
    rating: 4.9,
  },
  Masculino: {
    brand: 'Dona Marley',
    name: 'Perfume Masculino Urbano',
    description: 'Madeira aromática com toque cítrico para o dia a dia.',
    volume: '100 ml',
    price: 229.9,
    rating: 4.7,
  },
  Infantil: {
    brand: 'Dona Marley',
    name: 'Colônia Infantil Nuvem',
    description: 'Fórmula suave e perfume delicado para crianças.',
    volume: '100 ml',
    price: 49.9,
    rating: 4.8,
  },
  Hidratantes: {
    brand: 'DM Body',
    name: 'Hidratante Corporal Seda',
    description: 'Absorção rápida com manteiga de cacau e toque aveludado.',
    volume: '400 ml',
    price: 59.9,
    rating: 4.7,
  },
  Sabonetes: {
    brand: 'DM Body',
    name: 'Sabonete Líquido Cashmere',
    description: 'Limpeza cremosa com pH equilibrado para o banho diário.',
    volume: '300 ml',
    price: 34.9,
    originalPrice: 39.9,
    rating: 4.5,
  },
  Esfoliantes: {
    brand: 'DM Body',
    name: 'Esfoliante Açúcar & Mel',
    description: 'Renova a pele com micro partículas naturais e aroma suave.',
    volume: '200 g',
    price: 44.9,
    rating: 4.6,
  },
  'Sabonete Íntimo': {
    brand: 'DM Body',
    name: 'Sabonete Íntimo Fresh',
    description: 'Fórmula delicada com sensação de frescor prolongada.',
    volume: '200 ml',
    price: 29.9,
    rating: 4.8,
  },
  'Limpeza de pele': {
    brand: 'DM Skin',
    name: 'Gel de Limpeza Facial Suave',
    description: 'Remove impurezas mantendo a barreira natural da pele.',
    volume: '150 ml',
    price: 64.9,
    rating: 4.7,
  },
  'Hidratante para o Rosto': {
    brand: 'DM Skin',
    name: 'Hidratante Facial Hydro',
    description: 'Ácido hialurônico e niacinamida para pele viçosa.',
    volume: '50 g',
    price: 89.9,
    originalPrice: 109.9,
    rating: 4.8,
    highlight: 'Skincare',
  },
  'Creme para Rugas': {
    brand: 'DM Skin',
    name: 'Creme Anti-idade Renov',
    description: 'Peptídeos e retinol encapsulado para linhas finas.',
    volume: '30 g',
    price: 129.9,
    rating: 4.7,
  },
  'Protetor Solar Facial': {
    brand: 'DM Skin',
    name: 'Protetor Solar FPS 50 Toque Seco',
    description: 'Proteção UVA/UVB com base ideal para maquiagem.',
    volume: '40 ml',
    price: 79.9,
    rating: 4.9,
  },
  'Creme Clareador': {
    brand: 'DM Skin',
    name: 'Sérum Clareador Uniforme',
    description: 'Vitamina C estabilizada para tom mais uniforme e luminoso.',
    volume: '30 ml',
    price: 94.9,
    originalPrice: 114.9,
    rating: 4.6,
  },
};

function slug(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function buildProducts(): Product[] {
  const products: Product[] = [];

  for (const category of shopCategories) {
    for (const subcategory of category.subcategories) {
      const template = productTemplates[subcategory];
      if (!template) continue;

      const id = `${category.id}-${slug(subcategory)}`;
      products.push({
        id,
        categoryId: category.id,
        categoryTitle: category.title,
        subcategory,
        brand: template.brand,
        name: template.name,
        description: template.description,
        volume: template.volume,
        price: template.price,
        originalPrice: template.originalPrice,
        rating: template.rating,
        highlight: template.highlight,
        image: buildProductPlaceholder(template.name, subcategory),
      });
    }
  }

  return products;
}

export const products = buildProducts();

export function formatBrl(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function discountPercent(product: Product): number | null {
  if (!product.originalPrice || product.originalPrice <= product.price) return null;
  return Math.round((1 - product.price / product.originalPrice) * 100);
}

export function cardPrice(product: Product): number {
  return Math.round(product.price * 1.1 * 100) / 100;
}
