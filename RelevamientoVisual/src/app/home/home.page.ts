import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router:Router,
    private authService:AuthService,
  ) {}

  async signOff():Promise<void>{
    try {
      console.log();
      this.authService.logout().then(e => {
        this.router.navigate(['../login']);
      })
    } catch (error) {
      console.log('Error->', error);
    }
  }

  onCosasLindas()
  {
    // this.srvPhoto.leerDBCosasLindas();
    this.router.navigateByUrl('cosas-lindas');
  }

  onCosasFeas()
  {
    // this.srvPhoto.leerDBCosasFeas();
    this.router.navigateByUrl('cosas-feas');
  }

  onGraficos()
  {
    // this.srvPhoto.leerDBCosasFeas();
    this.router.navigateByUrl('graficos');
  }

  onCosasPropias()
  {
    // this.srvPhoto.leerDBCosasFeas();
    this.router.navigateByUrl('cosas-propias');
  }

  

}
