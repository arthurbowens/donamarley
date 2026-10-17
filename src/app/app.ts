import { Component, computed, signal } from '@angular/core';
import {
  cardPrice,
  discountPercent,
  formatBrl,
  Product,
  products,
  shopCategories,
  ShopCategory,
} from './catalog';
import { WhatsappIcon } from './whatsapp-icon';

interface CartLine {
  key: string;
  category: string;
  name: string;
  price: number;
  quantity: number;
}

interface ActiveFilter {
  id: string;
  label: string;
  type: 'category' | 'subcategory';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WhatsappIcon],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  /** Troque pelo WhatsApp da loja (DDI + DDD + número, só dígitos). */
  readonly whatsappPhone = '5511959710586';
  readonly whatsappDisplay = '+55 11 95971-0586';

  readonly shopCategories = shopCategories;
  readonly allProducts = products;
  readonly formatPrice = formatBrl;
  readonly discountPercent = discountPercent;
  readonly cardPrice = cardPrice;

  readonly year = new Date().getFullYear();
  readonly cartOpen = signal(false);
  readonly filtersOpen = signal(false);
  readonly cart = signal<CartLine[]>([]);

  readonly selectedCategoryId = signal<string | null>(null);
  readonly selectedSubcategory = signal<string | null>(null);
  readonly searchQuery = signal('');
  readonly megaMenuCategoryId = signal<string | null>(null);
  readonly mobileExpandedCategoryId = signal<string | null>(null);
  readonly currentPage = signal(1);
  readonly pageSize = 9;

  readonly cartCount = computed(() =>
    this.cart().reduce((total, line) => total + line.quantity, 0),
  );

  readonly cartSubtotal = computed(() =>
    this.cart().reduce((total, line) => total + line.price * line.quantity, 0),
  );

  readonly cartWhatsAppUrl = computed(() =>
    this.buildWhatsAppUrl(this.buildCartMessage()),
  );

  readonly storeWhatsAppUrl = this.buildWhatsAppUrl(
    'Olá! Vim pelo site da Dona Marley Perfumaria e gostaria de mais informações.',
  );

  readonly subcategoriesForSelectedCategory = computed(() => {
    const categoryId = this.selectedCategoryId();
    if (!categoryId) return [];
    return this.shopCategories.find((category) => category.id === categoryId)?.subcategories ?? [];
  });

  readonly activeFilters = computed((): ActiveFilter[] => {
    const filters: ActiveFilter[] = [];
    const categoryId = this.selectedCategoryId();
    const subcategory = this.selectedSubcategory();

    if (categoryId) {
      const category = this.shopCategories.find((item) => item.id === categoryId);
      if (category) {
        filters.push({ id: `cat-${categoryId}`, label: category.title, type: 'category' });
      }
    }

    if (subcategory) {
      filters.push({ id: `sub-${subcategory}`, label: subcategory, type: 'subcategory' });
    }

    return filters;
  });

  readonly filteredProducts = computed(() => {
    const categoryId = this.selectedCategoryId();
    const subcategory = this.selectedSubcategory();
    const query = this.searchQuery().trim().toLowerCase();

    return this.allProducts.filter((product) => {
      if (categoryId && product.categoryId !== categoryId) return false;
      if (subcategory && product.subcategory !== subcategory) return false;
      if (!query) return true;

      const haystack = [
        product.name,
        product.brand,
        product.categoryTitle,
        product.subcategory,
        product.description,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(query);
    });
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredProducts().length / this.pageSize)),
  );

  readonly paginatedProducts = computed(() => {
    const page = Math.min(this.currentPage(), this.totalPages());
    const start = (page - 1) * this.pageSize;
    return this.filteredProducts().slice(start, start + this.pageSize);
  });

  readonly paginationFrom = computed(() => {
    if (this.filteredProducts().length === 0) return 0;
    return (Math.min(this.currentPage(), this.totalPages()) - 1) * this.pageSize + 1;
  });

  readonly paginationTo = computed(() => {
    const total = this.filteredProducts().length;
    if (total === 0) return 0;
    return Math.min(this.currentPage() * this.pageSize, total);
  });

  readonly visiblePages = computed(() => {
    const total = this.totalPages();
    const current = Math.min(this.currentPage(), total);
    const pages = new Set<number>([1, total, current, current - 1, current + 1]);
    return [...pages].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);
  });

  toggleCart(): void {
    this.filtersOpen.set(false);
    this.closeMegaMenu();
    this.cartOpen.update((open) => !open);
  }

  closeCart(): void {
    this.cartOpen.set(false);
  }

  toggleFilters(): void {
    this.cartOpen.set(false);
    this.closeMegaMenu();
    this.filtersOpen.update((open) => !open);
  }

  closeFilters(): void {
    this.filtersOpen.set(false);
  }

  selectCategory(categoryId: string | null): void {
    this.selectedCategoryId.set(categoryId);
    this.selectedSubcategory.set(null);
    this.resetPagination();
    this.filtersOpen.set(false);
    this.closeMegaMenu();
  }

  selectSubcategory(subcategory: string | null): void {
    this.selectedSubcategory.set(subcategory);
    this.resetPagination();
    this.filtersOpen.set(false);
    this.closeMegaMenu();
  }

  openMegaMenu(categoryId: string): void {
    this.megaMenuCategoryId.set(categoryId);
  }

  closeMegaMenu(): void {
    this.megaMenuCategoryId.set(null);
  }

  toggleMegaMenu(categoryId: string): void {
    this.megaMenuCategoryId.update((current) => (current === categoryId ? null : categoryId));
  }

  isCategoryNavActive(categoryId: string): boolean {
    return (
      this.selectedCategoryId() === categoryId || this.megaMenuCategoryId() === categoryId
    );
  }

  categoryById(categoryId: string): ShopCategory | undefined {
    return this.shopCategories.find((category) => category.id === categoryId);
  }

  subcategoryColumns(categoryId: string): string[][] {
    const category = this.categoryById(categoryId);
    if (!category) return [];

    const items = category.subcategories;
    const columnCount = items.length > 5 ? 3 : 2;
    const columnSize = Math.ceil(items.length / columnCount);
    const columns: string[][] = [];

    for (let index = 0; index < items.length; index += columnSize) {
      columns.push(items.slice(index, index + columnSize));
    }

    return columns;
  }

  applyCategoryFilter(categoryId: string): void {
    this.selectedCategoryId.set(categoryId);
    this.selectedSubcategory.set(null);
    this.resetPagination();
    this.closeMegaMenu();
    this.closeFilters();
  }

  applySubcategoryFilter(categoryId: string, subcategory: string): void {
    this.selectedCategoryId.set(categoryId);
    this.selectedSubcategory.set(subcategory);
    this.resetPagination();
    this.closeMegaMenu();
    this.closeFilters();
  }

  toggleMobileCategory(categoryId: string): void {
    this.mobileExpandedCategoryId.update((current) => (current === categoryId ? null : categoryId));
  }

  removeFilter(filter: ActiveFilter): void {
    if (filter.type === 'category') {
      this.selectedCategoryId.set(null);
      this.selectedSubcategory.set(null);
    } else {
      this.selectedSubcategory.set(null);
    }
    this.resetPagination();
  }

  clearFilters(): void {
    this.selectedCategoryId.set(null);
    this.selectedSubcategory.set(null);
    this.searchQuery.set('');
    this.resetPagination();
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
    this.resetPagination();
  }

  goToPage(page: number): void {
    const safePage = Math.min(Math.max(1, page), this.totalPages());
    this.currentPage.set(safePage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  previousPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  private resetPagination(): void {
    this.currentPage.set(1);
  }

  addToCart(product: Product): void {
    const key = product.id;
    this.cart.update((lines) => {
      const existing = lines.find((line) => line.key === key);
      if (existing) {
        return lines.map((line) =>
          line.key === key ? { ...line, quantity: line.quantity + 1 } : line,
        );
      }
      return [
        ...lines,
        {
          key,
          category: product.categoryTitle,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ];
    });
  }

  changeQuantity(key: string, delta: number): void {
    this.cart.update((lines) =>
      lines
        .map((line) =>
          line.key === key ? { ...line, quantity: line.quantity + delta } : line,
        )
        .filter((line) => line.quantity > 0),
    );
  }

  removeFromCart(key: string): void {
    this.cart.update((lines) => lines.filter((line) => line.key !== key));
  }

  clearCart(): void {
    this.cart.set([]);
  }

  whatsAppUrlForProduct(product: Product): string {
    const message = [
      'Olá! Vim pelo site da Dona Marley Perfumaria.',
      '',
      'Tenho interesse no produto:',
      `• ${product.name}`,
      `• ${product.categoryTitle} > ${product.subcategory}`,
      `• ${product.volume}`,
      `• Valor no site: ${formatBrl(product.price)}`,
      '',
      product.description,
      '',
      'Pode confirmar disponibilidade e valores?',
    ].join('\n');

    return this.buildWhatsAppUrl(message);
  }

  ratingStars(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, index) => rating >= index + 1 - 0.25);
  }

  private buildCartMessage(): string {
    const lines = this.cart();
    if (lines.length === 0) {
      return 'Olá! Vim pelo site da Dona Marley Perfumaria.';
    }

    const items = lines
      .map(
        (line) =>
          `• ${line.quantity}x ${line.name} (${line.category}) - ${formatBrl(line.price * line.quantity)}`,
      )
      .join('\n');

    return [
      'Olá! Vim pelo site da Dona Marley Perfumaria.',
      '',
      'Meu pedido:',
      items,
      '',
      `Subtotal estimado: ${formatBrl(this.cartSubtotal())}`,
      '',
      'Pode confirmar disponibilidade e valores finais?',
    ].join('\n');
  }

  private buildWhatsAppUrl(message: string): string {
    return `https://wa.me/${this.whatsappPhone}?text=${encodeURIComponent(message)}`;
  }
}
