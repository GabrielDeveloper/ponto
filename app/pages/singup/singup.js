import {Page, NavController, NavParams} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/singup/singup.html'
})
export class SingUpPage 
{
    static get parameters() {
        return [[NavController], [NavParams]];
    }

    constructor(nav, navParams) {
        this.navParams = navParams;
        this.username = navParams.get('username');;

    }

    singUp(){
        console.log(this);
    }
}
