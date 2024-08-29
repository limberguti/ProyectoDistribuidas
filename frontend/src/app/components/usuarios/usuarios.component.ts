import { Component, OnInit } from '@angular/core';
import { UsuarioService, Usuario } from '../../service/usuario.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  selectedUsuario: Usuario = { id: 0, nombre: '', email: '', password: '' };
  isEditing: boolean = false;
  errorMessage: string = '';
  showModal: boolean = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(): void {
    this.usuarioService.listar().subscribe(data => {
      this.usuarios = data;
    });
  }

  openModal(isEditing: boolean, usuario?: Usuario): void {
    this.isEditing = isEditing;
    if (isEditing && usuario) {
      this.selectedUsuario = { ...usuario };
    } else {
      this.resetForm();
    }
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  crearUsuario(form: NgForm): void {
    if (form.valid && this.validateNombre(this.selectedUsuario.nombre) && this.isEmailUnique(this.selectedUsuario.email) && this.isNombreUnique(this.selectedUsuario.nombre)) {
      if (this.isEditing) {
        this.usuarioService.actualizar(this.selectedUsuario.id, this.selectedUsuario).subscribe(() => {
          this.listarUsuarios();
          form.reset(); // Llamada directa a reset aquí
          this.resetForm();
          this.closeModal();
          this.errorMessage = ''; // Limpia el mensaje de error en caso de éxito
          alert('Usuario actualizado con éxito.');
        }, () => {
          this.errorMessage = 'Hubo un problema al actualizar el usuario.';
        });
      } else {
        this.usuarioService.crear(this.selectedUsuario).subscribe(() => {
          this.listarUsuarios();
          form.reset(); // Llamada directa a reset aquí
          this.resetForm();
          this.closeModal();
          this.errorMessage = ''; // Limpia el mensaje de error en caso de éxito
          alert('Usuario creado con éxito.');
        }, () => {
          this.errorMessage = 'Hubo un problema al crear el usuario.';
        });
      }
    } else {
      this.errorMessage = 'Por favor, llena todos los campos correctamente.';
    }
  }
  
  validateNombre(nombre: string): boolean {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(nombre) && nombre.trim().length > 0; // Validar que el nombre no esté vacío
  }

  allowOnlyLetters(event: KeyboardEvent): void {
    const charCode = event.charCode;
    const charStr = String.fromCharCode(charCode);
    if (!/^[a-zA-Z\s]*$/.test(charStr)) {
      event.preventDefault();
    }
  }

  isEmailUnique(email: string): boolean {
    const normalizedEmail = email.trim().toLowerCase();
    return !this.usuarios.some(usuario => usuario.email.trim().toLowerCase() === normalizedEmail && usuario.id !== this.selectedUsuario.id);
  }

  isNombreUnique(nombre: string): boolean {
    const normalizedNombre = nombre.trim().toLowerCase();
    return !this.usuarios.some(usuario => usuario.nombre.trim().toLowerCase() === normalizedNombre && usuario.id !== this.selectedUsuario.id);
  }

  editarUsuario(usuario: Usuario): void {
    this.openModal(true, usuario);
    this.errorMessage = '';
  }

  eliminarUsuario(id: number): void {
    this.usuarioService.eliminar(id).subscribe(() => {
      this.listarUsuarios();
    });
  }

  resetForm(): void {
    this.selectedUsuario = { id: 0, nombre: '', email: '', password: '' };
    this.isEditing = false;
    this.errorMessage = '';
  }
}
