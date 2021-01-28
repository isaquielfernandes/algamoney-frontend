import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasURL: string;

  constructor(private http: AuthHttp) { 
    this.categoriasURL = `${environment.apiUrl}/categorias`;
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.categoriasURL)
      .toPromise()
      .then(response => response.json());
  }
}
