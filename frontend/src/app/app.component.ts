/* import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { MyHttpService } from './my-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  componentToShow: string = "welcome";

  constructor(private http: MyHttpService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if (params["code"] !== undefined) {
          this.http.getToken(params["code"]).subscribe(result => {
            if (result === true) {
              this.componentToShow = "protected";
            } else {
              this.componentToShow = "welcome";
            }
          });
        }
      }
    );
  }

}
 */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyHttpService } from './my-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  componentToShow: string = "welcome";

  constructor(private http: MyHttpService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params["code"] !== undefined) {
        this.http.getToken(params["code"]).subscribe(result => {
          if (result === true) {
            this.componentToShow = "protected"; // Mostrar componente protegido
          } else {
            this.componentToShow = "welcome";
          }
        });
      }
    });
  }

  confirmLogout(): void {
    const confirmed = confirm("¿Está seguro que desea salir?");
    if (confirmed) {
      this.logout();
    }
  }
  logout(): void {
    this.http.logout();  // Eliminar el token de autenticación
    this.router.navigate(['/']);  // Redirigir al usuario a la página de inicio
    this.componentToShow = "welcome";  // Volver a mostrar la vista de bienvenida
  }

  navigateToUsuarios(): void {
    this.router.navigate(['/usuarios']);  // Navegar a la vista de usuarios
  }

  navigateToCursos(): void {
    this.router.navigate(['/cursos']);  // Navegar a la vista de usuarios
  }

  navigateToInscripcion(): void {
    this.router.navigate(['/inscripcion']);  // Navegar a la vista de usuarios
  }
}