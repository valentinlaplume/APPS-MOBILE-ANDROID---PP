import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth, signOut } from "firebase/auth";
// import { CosaslindasComponent } from '../cosaslindas/cosaslindas.component';
// import { GraphsComponent } from '../graphs/graphs.component';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.page.html',
  styleUrls: ['./home2.page.scss'],
})
export class Home2Page implements OnInit {

  constructor(private routerRecieved:Router, 
    public authSvc:AuthService,
    public router:Router,
    ) {}

  ngOnInit() 
  {
    const auth = getAuth();
    
    try
    {
      if (auth.currentUser.email != null)
      {}
    }
    catch(e)
    {
      this.routerRecieved.navigate(['/home']);
    }
  }

  logOut(){
    this.authSvc.logout().then(e => {
      let audio = new Audio();
      audio.src = '../../assets/sonidos/volver.mp3';
      audio.load();
      audio.play();
      this.router.navigate(['../login']);
    });
  }

  cosasLindasClick()
  {
    this.routerRecieved.navigate(['/cosaslindas']);
  }

  cosasFeasClick()
  {
    this.routerRecieved.navigate(['/cosasfeas']);
  }

  navigateToGraphs()
  {
    // GraphsComponent.prototype.cargarData();
    this.routerRecieved.navigate(['/graphs']);
  }

  navigateToOwnPhotos()
  {
    // GraphsComponent.prototype.cargarData();
    this.routerRecieved.navigate(['/cosaspropias']);
  }

}
