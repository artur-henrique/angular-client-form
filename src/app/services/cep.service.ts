import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AddressCep {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
}

@Injectable({ providedIn: 'root' })
export class CepService {
  constructor(
    private http: HttpClient
  ) {}

  searchForAddress(cep: string) {
    return this.http.get<AddressCep>(`https://viacep.com.br/ws/${cep}/json`);
  }
}
