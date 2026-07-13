import { Injectable, computed, signal } from '@angular/core';

export interface OpcionPaleta {
  readonly id: string;
  readonly nombre: string;
  readonly clase: string;
  /** Color de acento para la muestra del selector. */
  readonly muestra: string;
}

export interface OpcionFuente {
  readonly id: string;
  readonly nombre: string;
  readonly clase: string;
  /** Familia CSS para previsualizar la opción en el selector. */
  readonly familia: string;
}

export interface OpcionFondo {
  readonly id: string;
  readonly nombre: string;
  readonly clase: string;
}

export interface OpcionColorTexto {
  readonly id: string;
  readonly nombre: string;
  /** Valor CSS del color (puede referir variables de la paleta activa). */
  readonly css: string;
}

/**
 * Estado global de personalización visual (paleta, fuente del título y
 * fondo). Las clases activas se inyectan en el contenedor raíz (app.html)
 * y redefinen las variables CSS que consumen los tokens de Tailwind
 * (text-acento, bg-acento, font-script, ...) definidos en styles.css.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly paletas: readonly OpcionPaleta[] = [
    { id: 'oceano', nombre: 'Océano', clase: 'paleta-oceano', muestra: '#2563eb' },
    { id: 'rosa', nombre: 'Rosa', clase: 'paleta-rosa', muestra: '#e11d48' },
    { id: 'esmeralda', nombre: 'Esmeralda', clase: 'paleta-esmeralda', muestra: '#059669' },
    { id: 'lavanda', nombre: 'Lavanda', clase: 'paleta-lavanda', muestra: '#7c3aed' },
    { id: 'vino', nombre: 'Vino', clase: 'paleta-vino', muestra: '#991b1b' },
    { id: 'dorado', nombre: 'Dorado', clase: 'paleta-dorado', muestra: '#b45309' },
    { id: 'coral', nombre: 'Coral', clase: 'paleta-coral', muestra: '#ea580c' },
    { id: 'turquesa', nombre: 'Turquesa', clase: 'paleta-turquesa', muestra: '#0d9488' },
    { id: 'grafito', nombre: 'Grafito', clase: 'paleta-grafito', muestra: '#44403c' },
    { id: 'fucsia', nombre: 'Fucsia', clase: 'paleta-fucsia', muestra: '#c026d3' },
  ];

  readonly fuentes: readonly OpcionFuente[] = [
    { id: 'great-vibes', nombre: 'Great Vibes', clase: 'fuente-great-vibes', familia: '"Great Vibes", cursive' },
    { id: 'dancing', nombre: 'Dancing Script', clase: 'fuente-dancing', familia: '"Dancing Script", cursive' },
    { id: 'parisienne', nombre: 'Parisienne', clase: 'fuente-parisienne', familia: '"Parisienne", cursive' },
    { id: 'allura', nombre: 'Allura', clase: 'fuente-allura', familia: '"Allura", cursive' },
    { id: 'sacramento', nombre: 'Sacramento', clase: 'fuente-sacramento', familia: '"Sacramento", cursive' },
    { id: 'tangerine', nombre: 'Tangerine', clase: 'fuente-tangerine', familia: '"Tangerine", cursive' },
    { id: 'alex-brush', nombre: 'Alex Brush', clase: 'fuente-alex-brush', familia: '"Alex Brush", cursive' },
    { id: 'pinyon', nombre: 'Pinyon Script', clase: 'fuente-pinyon', familia: '"Pinyon Script", cursive' },
    { id: 'italianno', nombre: 'Italianno', clase: 'fuente-italianno', familia: '"Italianno", cursive' },
    { id: 'playfair', nombre: 'Playfair Display', clase: 'fuente-playfair', familia: '"Playfair Display", serif' },
  ];

  readonly fondos: readonly OpcionFondo[] = [
    { id: 'claro', nombre: 'Claro', clase: 'fondo-claro' },
    { id: 'blanco', nombre: 'Blanco', clase: 'fondo-blanco' },
    { id: 'marfil', nombre: 'Marfil', clase: 'fondo-marfil' },
    { id: 'degradado', nombre: 'Degradado', clase: 'fondo-degradado' },
    { id: 'puntos', nombre: 'Puntos', clase: 'fondo-puntos' },
    { id: 'lineas', nombre: 'Líneas', clase: 'fondo-lineas' },
    { id: 'pastel', nombre: 'Pastel', clase: 'fondo-pastel' },
    { id: 'intenso', nombre: 'Intenso', clase: 'fondo-intenso' },
    { id: 'aurora', nombre: 'Aurora', clase: 'fondo-aurora' },
    { id: 'amanecer', nombre: 'Amanecer', clase: 'fondo-amanecer' },
    { id: 'algodon', nombre: 'Algodón', clase: 'fondo-algodon' },
  ];

  /** Estilos disponibles para los nombres de la familia (padres/padrinos). */
  readonly fuentesNombres: readonly OpcionFuente[] = [
    { id: 'serif', nombre: 'Cormorant (serif)', clase: '', familia: '"Cormorant Garamond", serif' },
    { id: 'sans', nombre: 'Jost (moderna)', clase: '', familia: '"Jost", sans-serif' },
    ...this.fuentes,
  ];

  /** Colores disponibles para los nombres: los primeros siguen a la paleta activa. */
  readonly coloresNombres: readonly OpcionColorTexto[] = [
    { id: 'tinta', nombre: 'Tinta', css: 'var(--tema-tinta)' },
    { id: 'tinta-suave', nombre: 'Tinta suave', css: 'var(--tema-tinta-suave)' },
    { id: 'acento', nombre: 'Acento', css: 'var(--tema-acento)' },
    { id: 'acento-fuerte', nombre: 'Acento fuerte', css: 'var(--tema-acento-fuerte)' },
    { id: 'dorado', nombre: 'Dorado', css: '#b45309' },
    { id: 'vino', nombre: 'Vino', css: '#722f37' },
  ];

  /** Valores por defecto: paleta Océano, fuente Parisienne, fondo Aurora. */
  readonly paleta = signal<OpcionPaleta>(this.buscar(this.paletas, 'oceano'));
  readonly fuente = signal<OpcionFuente>(this.buscar(this.fuentes, 'parisienne'));
  readonly fondo = signal<OpcionFondo>(this.buscar(this.fondos, 'aurora'));
  readonly fuenteNombres = signal<OpcionFuente>(this.buscar(this.fuentesNombres, 'serif'));
  readonly colorNombres = signal<OpcionColorTexto>(this.buscar(this.coloresNombres, 'tinta'));

  /** Clases combinadas para el contenedor raíz. */
  readonly clases = computed(
    () => `${this.paleta().clase} ${this.fuente().clase} ${this.fondo().clase}`,
  );

  private buscar<T extends { id: string }>(opciones: readonly T[], id: string): T {
    return opciones.find((opcion) => opcion.id === id) ?? opciones[0];
  }
}
