import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div class="container">
      <h1 class="text-center">Acesso Negado!</h1>
    </div>
  `,
})
export class NaoAutorizadoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
