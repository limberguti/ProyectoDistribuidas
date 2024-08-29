import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuario, UsuarioService } from '../../service/usuario.service';
import { Curso, InscripcionService } from '../../service/inscripcion.service';

@Component({
  selector: 'app-inscripcion',

  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {
  cursos: Curso[] = [];
  usuarios: Usuario[] = [];
  selectedCurso: Curso = { id: 0, nombre: '', usuarios: [] };
  isEditing: boolean = false;
  newUsuario: Usuario = { id: 0, nombre: '', email: '', password: '' };

  constructor(private insService: InscripcionService, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.listarCursos();
    this.listarUsuarios();
  }

  listarCursos(): void {
    this.insService.listar().subscribe(data => {
      this.cursos = data;
    });
  }

  listarUsuarios(): void {
    this.usuarioService.listar().subscribe(data => {
      this.usuarios = data;
    });
  }

  eliminarCurso(id: number): void {
    this.insService.eliminar(id).subscribe(() => {
      this.listarCursos();
    });
  }

  resetForm(form: NgForm): void {
    form.reset();
    this.selectedCurso = { id: 0, nombre: '', usuarios: [] };
    this.isEditing = false;
  }

  asignarUsuario(form: NgForm): void {
    if (form.valid && this.selectedCurso.id && this.newUsuario.id) {
      console.log('Asignando usuario:', this.newUsuario, 'al curso:', this.selectedCurso);
  
      this.insService.asignarUsuario(this.selectedCurso.id, this.newUsuario).subscribe(
        cursoActualizado => {
          console.log('Respuesta del servidor:', cursoActualizado);
          this.selectedCurso = cursoActualizado;
          this.listarCursos();
          form.reset();
          alert('Usuario asignado exitosamente.');
        },
        error => {
          console.error('Error al asignar usuario:', error);
  
          if (error.status === 409) {
            alert('El usuario ya está asignado a un curso.');
          } else if (error.status === 500) {
            alert('Error el usuario ya está asignado a un curso.');
          } else {
            alert('Error al asignar usuario: ' + (error.error?.error || 'Por favor, intenta de nuevo más tarde.'));
          }
        }
      );
    } else {
      console.error('Formulario no válido o falta el ID del curso o ID del usuario.');
      alert('Por favor completa todos los campos requeridos.');
    }
  }

  desinscribirUsuario(curso: Curso, usuario: Usuario): void {
    if (confirm(`¿Estás seguro de que quieres desinscribir a ${usuario.nombre} del curso ${curso.nombre}?`)) {
      this.insService.eliminarUsuario(curso.id, usuario.id).subscribe(
        () => {
          alert('Usuario desinscrito exitosamente.');
          this.listarCursos(); 
        },
        error => {
          console.error('Error al desinscribir usuario:', error);
          alert('Error al desinscribir usuario. Por favor, intenta de nuevo más tarde.');
        }
      );
    }
  }
  
   
}
