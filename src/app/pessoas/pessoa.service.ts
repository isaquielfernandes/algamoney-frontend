import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Pessoa } from '../core/model';
import { AuthHttp } from 'angular2-jwt';
import { environment } from 'src/environments/environment';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasURL: string;

  constructor(private http: AuthHttp) { 
    this.pessoasURL = `${environment.apiUrl}/pessoas`;
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasURL}`, {search: params})
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const pessoas = responseJson.content;

        const resultado = {
          pessoas,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {

    return this.http.get(`${this.pessoasURL}`)
    .toPromise()
    .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {

    return this.http.delete(`${this.pessoasURL}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {

    return this.http.put(`${this.pessoasURL}/${codigo}/ativo`, `${ativo}`)
    .toPromise()
    .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post(this.pessoasURL, JSON.stringify(pessoa))
    .toPromise()
    .then(response => response.json());
    
  }

  atualizar(pesssoa: Pessoa): Promise<Pessoa> {

    return this.http.put(`${this.pessoasURL}/${pesssoa.codigo}`, JSON.stringify(pesssoa))
    .toPromise()
    .then(response => response.json() as Pessoa);
  }

  buscarPorCodigo(codigo: number ): Promise<Pessoa>{

    return this.http.get(`${this.pessoasURL}/${codigo}`)
    .toPromise()
    .then(response => response.json() as Pessoa);
  }


}
