/**
 * Configuración central de la invitación.
 * Todos los datos del evento se editan ÚNICAMENTE en este archivo;
 * ningún componente contiene textos ni datos del evento en duro.
 */

export interface Ubicacion {
  readonly nombre: string;
  readonly hora: string;
  readonly direccion: string;
  readonly mapsUrl: string;
  /** Imagen del lugar, colocada en src/assets/img/ */
  readonly imagenUrl: string;
}

export interface GrupoFamiliar {
  readonly titulo: string;
  readonly nombres: readonly string[];
}

export interface Familia {
  readonly grupos: readonly GrupoFamiliar[];
  /** Frase que cierra la sección familiar. */
  readonly fraseCierre: string;
}

export interface MesaRegalos {
  readonly tienda: string;
  readonly codigo: string;
  readonly url: string;
}

export interface CodigoVestimenta {
  readonly titulo: string;
  readonly advertencia: string;
  /** Colores sugeridos para invitados (clases hex para las muestras visuales). */
  readonly paletaSugerida: readonly { nombre: string; hex: string }[];
  /** Color reservado para la quinceañera. */
  readonly colorReservado: { nombre: string; hex: string };
  /** Imagen ilustrativa del código de vestimenta, en src/assets/img/ */
  readonly imagenUrl: string;
}

export interface InvitationConfig {
  readonly nombreQuinceanera: string;
  readonly fraseBienvenida: string;
  readonly fechaEvento: Date;
  /** Lada / código de país para los enlaces de WhatsApp (México = 52). */
  readonly codigoPaisWhatsapp: string;
  readonly whatsappConfirmacion: string;
  readonly whatsappFelicitaciones: string;
  readonly familia: Familia;
  readonly mesaRegalos: MesaRegalos;
  readonly pasesMaximosPorInvitado: number;
  readonly ubicaciones: {
    readonly misa: Ubicacion;
    readonly recepcion: Ubicacion;
  };
  readonly codigoVestimenta: CodigoVestimenta;
  /** Archivos colocados en la carpeta public/ */
  readonly musicaUrl: string;
  readonly heroImagenUrl: string;
}

export const INVITATION_CONFIG: InvitationConfig = {
  nombreQuinceanera: 'Melanie',
  fraseBienvenida: '¡Acompáñanos a celebrar!',
  fechaEvento: new Date('2026-08-08T18:45:00'),
  codigoPaisWhatsapp: '52',
  whatsappConfirmacion: '5545329137',
  whatsappFelicitaciones: '5638206542',
  familia: {
    grupos: [
      { titulo: 'Mis padres', nombres: ['Alma Jiménez', 'Gume León'] },
      { titulo: 'Mis padrinos', nombres: ['Blanca Jiménez', 'Gustavo Novas'] },
    ],
    fraseCierre: 'Acompáñanos a celebrar.',
  },
  mesaRegalos: {
    tienda: 'Liverpool',
    codigo: '51902017',
    url: 'https://mesaderegalos.liverpool.com.mx/milistaderegalos/51902017',
  },
  pasesMaximosPorInvitado: 6,
  ubicaciones: {
    misa: {
      nombre: 'Parroquia Nuestra Señora Aparecida del Brasil',
      hora: '18:45 hrs',
      direccion:
        'Francisco del Paso Y Troncoso 307, Jardín Balbuena, Venustiano Carranza, 15900 CDMX',
      mapsUrl: 'https://maps.app.goo.gl/hGEwBvVpamMZRpan9',
      imagenUrl: 'assets/img/CeremoniaReligiosa.jpg',
    },
    recepcion: {
      nombre: 'Salón de Fiestas Portofino',
      hora: '20:30 hrs',
      direccion: 'Calle Ote. 172 21, Moctezuma 2da Secc, Venustiano Carranza, 15530 Ciudad de México, CDMX',
      mapsUrl: 'https://maps.app.goo.gl/PJ3cFyz1iSYEQXUv6',
      imagenUrl: 'assets/img/Recepcion.png',
    },
  },
  codigoVestimenta: {
    titulo: 'Formal',
    advertencia: 'El color Azul está reservado exclusivamente para la quinceañera',
    paletaSugerida: [
      { nombre: 'Marfil', hex: '#f5f0e8' },
      { nombre: 'Piedra', hex: '#a8a29e' },
      { nombre: 'Vino', hex: '#722f37' },
      { nombre: 'Esmeralda', hex: '#0f6b4f' },
      { nombre: 'Grafito', hex: '#44403c' },
      { nombre: 'Lavanda', hex: '#b8a9c9' },
    ],
    colorReservado: { nombre: 'Azul', hex: '#1e40af' },
    imagenUrl: 'assets/img/CodigoVestimenta.png',
  },
  musicaUrl: 'cancion.mp3',
  heroImagenUrl: 'hero.jpg',
};
