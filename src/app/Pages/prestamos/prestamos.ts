import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ConfigService } from '../../Services/ConfigService';
import { Config } from '../../Model/config';

@Component({
  selector: 'app-prestamos',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './index.html',
  styleUrl: './prestamos.css',
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
    this.pregunta2 = !this.pregunta2;
  }
  nav3() {
    if (this.pregunta2 == true || this.pregunta1 == true) {
      this.pregunta2 = false;
      this.pregunta1 = false;
    }
    this.pregunta3 = !this.pregunta3;
  }
}
