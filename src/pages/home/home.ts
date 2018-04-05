import { Component } from '@angular/core';
import { NavController, LoadingController,ToastController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';


import { AuthService } from '../../providers/auth-service/auth-service';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AuthService]
})
export class HomePage {

	pnr:string;

	pnrData =  { trainname:'', trainno:'', dateofjourney:''};

	
	loading:any;
	data:any;
	

  constructor(public navCtrl: NavController, public auth: AuthService, private toastCtrl: ToastController,  public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

  }


  ionViewCanEnter() {
    // if(!this.auth.isLoggedIn){
    // 	this.navCtrl.push(LoginPage);
    //   }
    // this.pnr =2244601500;
  }

	doLogin(){
		this.navCtrl.push(LoginPage);
	}

	doRegister(){
		this.navCtrl.push(RegisterPage);
	}

	showErrAlert(error) {
	    let alert = this.alertCtrl.create({
	      title: 'Error',
	      subTitle: error,
	      buttons: [{
          text: 'Retry',
          handler: () => {
          	this.checkPnr();
          }
        },
        {
          text: 'Cancel',
        }
        ]
	    });
	    alert.present();
	  }

	checkPnr(){

		if(this.pnr == null ){
			this.showErrAlert('Enter Valid PNR Number');
		}else{
			this.showLoader('Searching...');
			this.auth.checkPnrAuth(this.pnr).then((result) => {
			this.loading.dismiss();
			this.data = result;
			this.pnrData = this.data.response;
			if(this.data.response.error){
				this.showErrAlert('Request time out');
				console.log('Error');
			}
			}, (err) => {
			this.loading.dismiss();
			this.presentToast(err);
			});
		}
		
		
	}

	showLoader(text){
    this.loading = this.loadingCtrl.create({
        content: text
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }

        

  }
	
