import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { products } from './catalog';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should filter products by category', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.selectCategory('cabelos');
    expect(app.filteredProducts().every((product) => product.categoryId === 'cabelos')).toBe(true);
  });

  it('should add product to cart', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.addToCart(products[0]);
    expect(app.cartCount()).toBe(1);
  });
});
