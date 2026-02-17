import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImagenServicio } from '../../Services/ImagenServicio';
import { Imagen } from '../../Model/imagen';
import { ConfigService } from '../../Services/ConfigService';
import { Config } from '../../Model/config';

@Component({
  selector: 'app-acceso-admin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './acceso-admin.html',
  styleUrl: './acceso-admin.css',
})
export class AccesoAdmin {
  private imagenServicio = inject(ImagenServicio);
  private configService = inject(ConfigService);
  private fb = inject(FormBuilder);
  imagenBanner: string = '';
  imagenes!: Imagen[];
  config!: Config;

  ngOnInit() {
    this.configService.obtenerConfiguraciones().subscribe((configs) => {
      this.config = configs[0];
      this.cargarFormulario();
    });
    this.obtenerImagenes();
  }

  formConfig = this.fb.nonNullable.group({
    banner: [''],
    texto_1: [''],
    texto_2: [''],
    texto_3: [''],
  });

  editarConfig() {
    this.config = { ...this.config, ...this.formConfig.getRawValue() };
    this.configService.updateConfig(this.config).subscribe(() => {
      console.log('Configuración editada');
    });
  }

  login: boolean = false;
  prestamos: boolean = false;
  home: boolean = false;

  cargarFormulario() {
    this.formConfig.patchValue({
      banner: this.config.banner,
      texto_1: this.config.texto_1,
      texto_2: this.config.texto_2,
      texto_3: this.config.texto_3,
    });
  }

  obtenerImagenes() {
    this.imagenServicio.obtenerImagenes().subscribe({
      next: (imagenes) => {
        this.imagenes = imagenes;
      },
      error: (error) => {
        console.error('Error al obtener las imágenes:', error);
      },
    });
  }

  guardar() {
    this.configService.updateConfig(this.config).subscribe(() => {
      console.log('Config actualizada');
    });
  }
  mostrarPrestamos() {
    if (this.login == true || this.home == true) {
      this.login = false;
      this.home = false;
    }
    this.prestamos = !this.prestamos;
  }
  mostrarHome() {
    if (this.prestamos == true || this.login == true) {
      this.prestamos = false;
      this.login = false;
    }
    this.home = !this.home;
  }
}
