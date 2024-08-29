/*import { Component } from '@angular/core';

import { Message } from '../message';
import { MyHttpService } from '../my-http.service';

@Component({
  selector: 'app-welcome-content',
  templateUrl: './welcome-content.component.html',
  styleUrls: ['./welcome-content.component.css']
})
export class WelcomeContentComponent {

  content: string = "";

  constructor(private http: MyHttpService) {}

  ngOnInit(): void {
    this.http.get("/public/messages").subscribe((data: Message) => this.content = data.message);
  }

}
*/

import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service'; 
import { CursoService } from '../service/curso.service'; 
import { InscripcionService } from '../service/inscripcion.service'; // Asegúrate de importar el servicio correcto
import { Observable } from 'rxjs';

@Component({
  selector: 'app-welcome-content',
  templateUrl: './welcome-content.component.html',
  styleUrls: ['./welcome-content.component.css']
})
export class WelcomeContentComponent implements OnInit {

  content: string = '';
  usuariosCount: number = 0;
  cursosCount: number = 0;
  inscripcionesCount: number = 0;

  constructor(private usuarioService: UsuarioService,
    private cursoService: CursoService,
    private inscripcionService : InscripcionService
  ) {}

  ngOnInit(): void {
    this.usuarioService.listar().subscribe(data => this.usuariosCount = data.length);
    this.cursoService.listar().subscribe(data => this.cursosCount = data.length);
    this.inscripcionService.listar().subscribe(data => this.inscripcionesCount = data.length);
  }
}
