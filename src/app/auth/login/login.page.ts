import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  data:any={};
  url;
  urlapi;
  username;

  constructor(private fcm: FCM, public http: HttpClient, public nav: NavController, private  router:  Router) { 
    this.data.username = '';
    this.data.password = '';
  }

  ngOnInit() {
    this.fcm.getToken().then(token => {
      console.log(token);
    });
  }

  obtenerURL(){
    let urlapi = localStorage.getItem("link");
    this.url = urlapi;
  }

  reload() {
    window.location.reload();
  } 

  aceptar() {
    localStorage.setItem("link", this.urlapi);
    let url = this.urlapi;
    console.log(url);
    //this.reload();
  }

  enviar(){
    let urlapi = localStorage.getItem("link");
    this.url = urlapi;
    console.log(this.url);
    this.http.post(this.url + '/login', this.data)
    .subscribe(data => {
      console.log(data);
      let navigator = data[0].rol;
      if(navigator == 'admin'){
        localStorage.setItem("username", this.data.username);
        
        localStorage.setItem("usuario", "admin");
        this.nav.navigateForward('/tabs/tabs/tab1');
      }
      else if(navigator == 'user'){
        localStorage.setItem("username", this.data.username);

        localStorage.setItem("usuario", "user");
        this.nav.navigateForward('/tabs/tabs/tab1');
      }else{
        console.log('no se encontro');
      }
      console.log(navigator);
     }, error => {
      console.log(error);
    });

    /*var dataToSend = {
      nombre: this.nombre,
      password: this.password,
    };
    console.log(this.nombre + this.password);
    /*this.productoCRUD.agregarProducto(dataToSend).subscribe(
      (dataReturnFromService)=>{
        this.dataFromService = JSON.stringify
        (dataReturnFromService);
      });

    this.authService.login(form.value).subscribe((res)=>{
      this.router.navigateByUrl('home');
    });*/
  }

}
