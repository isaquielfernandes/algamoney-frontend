import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokenRenokeUrl: string;

  constructor(
    private http: AuthHttp,
    private auth: AuthService
    ) { 
      this.tokenRenokeUrl = `${environment.apiUrl}/tokens/revoke`;
    }

    logout() {
      return this.http.delete(this.tokenRenokeUrl, {withCredentials: true})
        .toPromise()
        .then(() => {
          this.auth.limparAccessToken();
        });
    }
}
