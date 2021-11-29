import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin=false;
  //EvenEmmiter permite crear un evento perosnalizado, en este caso se creo una instancia y un tipo void
  @Output() toggleSidenav=new EventEmitter<void>();
  constructor(private authSvc:AuthService) { }

  ngOnInit(): void { }
  
  onToggleSidenav():void{//cuando el usuario haga click en el header se emite el evento
    this.toggleSidenav.emit();
  }

  onLogout():void{
    this.authSvc.logout();
  }

}
