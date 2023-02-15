import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CepService {
  constructor(
    private http: HttpClient
  ) {}

  searchForAddress(cep: string) {
    this.http.get(`https://viacep.com.br/ws/${cep}/json`)
      .subscribe(address => console.log(address))
  }
}
