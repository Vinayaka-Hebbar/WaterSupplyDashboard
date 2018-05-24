import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  set userDetails(value: firebase.User) {
    this._userDetails = value;
  }
  get userDetails(): firebase.User {
    return this._userDetails;
  }
  get user(): Observable<firebase.User> {
    return this._user;
  }
  private _user: Observable<firebase.User>;
  private _userDetails: firebase.User = null;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, public _firebaseAuth: AngularFireAuth, private router: Router) {
    this._user = _firebaseAuth.authState;
  }

  public hasLogged(): boolean {
    return this._userDetails != null;
  }


  public login(email: string, password: string) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password).then((res) => {
      this.router.navigate(['/']);
    });
  }

  public signOut() {
    return this._firebaseAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
