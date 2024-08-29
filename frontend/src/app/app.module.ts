import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeContentComponent } from './welcome-content/welcome-content.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ProtectedContentComponent } from './protected-content/protected-content.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';


const routes: Routes = [
  { path: '', component: WelcomeContentComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'inscripcion', component: InscripcionComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeContentComponent,
    LoginFormComponent,
    ProtectedContentComponent,
    UsuariosComponent,
    CursosComponent,
    InscripcionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
