import { Component, OnInit } from '@angular/core';
import { CursoService, Curso } from '../../service/curso.service';
import { UsuarioService, Usuario } from '../../service/usuario.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {
  cursos: Curso[] = [];
  usuarios: Usuario[] = [];
  selectedCurso: Curso = { id: 0, nombre: '', usuarios: [] };
  isEditing: boolean = false;
  showModal: boolean = false;

  constructor(private cursoService: CursoService, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.listarCursos();
    this.listarUsuarios();
  }

  listarCursos(): void {
    this.cursoService.listar().subscribe(data => {
      this.cursos = data;
    });
  }

  listarUsuarios(): void {
    this.usuarioService.listar().subscribe(data => {
      this.usuarios = data;
    });
  }

  crearCurso(form: NgForm): void {
    if (form.valid && this.isNombreUnique(this.selectedCurso.nombre)) {
      if (this.isEditing) {
        this.cursoService.actualizar(this.selectedCurso.id, this.selectedCurso).subscribe(() => {
          this.listarCursos();
          this.resetForm(form);
          this.closeModal();
          alert('Curso actualizado con éxito.');
        });
      } else {
        this.cursoService.crear(this.selectedCurso).subscribe(() => {
          this.listarCursos();
          this.resetForm(form);
          this.closeModal();
          alert('Curso creado con éxito.');
        });
      }
    } else {
      alert('El nombre del curso ya está registrado.');
    }
  }

  isNombreUnique(nombre: string): boolean {
    return !this.cursos.some(curso => curso.nombre === nombre && curso.id !== this.selectedCurso.id);
  }

  editarCurso(curso: Curso): void {
    this.selectedCurso = { ...curso };
    this.isEditing = true;
    this.showModal = true;
  }

  eliminarCurso(id: number): void {
    this.cursoService.eliminar(id).subscribe(() => {
      this.listarCursos();
    });
  }

  resetForm(form: NgForm): void {
    form.reset();
    this.selectedCurso = { id: 0, nombre: '', usuarios: [] };
    this.isEditing = false;
  }

  openModal(isEditing: boolean): void {
    this.isEditing = isEditing;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
