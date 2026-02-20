import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ConfigService } from '../../Services/ConfigService';
import { Config } from '../../Model/config';

@Component({
  selector: 'app-prestamos',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './index.html',
  styleUrls: ['./prestamos.css'],
})
export class Prestamos {
  private configService = inject(ConfigService);
  config!: Config;
  pregunta1: boolean = true;
  pregunta2: boolean = false;
  pregunta3: boolean = false;

  banner: string = '';
  texto_1: string = '';
  texto_2: string = '';
  texto_3: string = '';

  ngOnInit() {
    this.configService.obtenerConfiguraciones().subscribe((configs) => {
      this.config = configs[0];
      this.cargarFormulario();
    });

    this.checkScreen();
    window.addEventListener('resize', () => this.checkScreen());
  }

  items = [
    {
      titulo: 'De S/1,500 a S/40,000',
      img: '/icons/icon1.svg',
      descripcion: 'Accede a cualquier monto que necesites desde 1,500 soles hasta 40,000 soles.',
      height: '25%',
    },
    {
      titulo: 'De 12 a 48 meses',
      img: '/icons/icon2.svg',
      descripcion: 'Elige el plazo que más te convenga para poder pagar y cancelar tu préstamo.',
      height: '25%',
    },
    {
      titulo: 'Hasta 45 días',
      img: '/icons/icon3.svg',
      descripcion: 'Recibe total flexibilidad para iniciar el pago de tus cuotas de préstamo.',
      height: '22%',
    },
  ];
  currentIndex = 0;
  intervalId: any;
  isMobile = false;

  checkScreen() {
    this.isMobile = window.innerWidth < 413;

    if (this.isMobile && !this.intervalId) {
      this.startAutoPlay();
    }
    if (!this.isMobile && this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  startAutoPlay() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
    }, 3000);
  }

  cargarFormulario() {
    this.banner = this.config.banner;
    this.texto_1 = this.config.texto_1;
    this.texto_2 = this.config.texto_2;
    this.texto_3 = this.config.texto_3;
  }
  nav1() {
    if (this.pregunta2 == true || this.pregunta3 == true) {
      this.pregunta2 = false;
      this.pregunta3 = false;
    }
    this.pregunta1 = !this.pregunta1;
    if (this.pregunta1 == false && this.pregunta2 && this.pregunta3 == false) {
      this.pregunta1 = true;
    }
  }
  nav2() {
    if (this.pregunta1 == true || this.pregunta3 == true) {
      this.pregunta1 = false;
      this.pregunta3 = false;
    }
    if (this.pregunta1 == false && this.pregunta2 && this.pregunta3 == false) {
      this.pregunta1 = true;
    }

    this.pregunta2 = !this.pregunta2;
  }
  nav3() {
    if (this.pregunta2 == true || this.pregunta1 == true) {
      this.pregunta2 = false;
      this.pregunta1 = false;
    }
    if (this.pregunta1 == false && this.pregunta2 && this.pregunta3 == false) {
      this.pregunta1 = true;
    }
    this.pregunta3 = !this.pregunta3;
  }
}
