import { Injectable } from "@angular/core";
import { Client, Contact, Plan } from "../model/client.model";

@Injectable({ providedIn: 'root' })
export class ClientService {
  clients: Client[] = [
    {
      name: 'Liam Neesson',
      dob: new Date(1990, 8, 16),
      phone: '5511988776655',
      email: 'liam.neesson@gmail.com',
      contact: [ Contact.ALL ],
      indicatedBy: 'John',
      plan: Plan.SIMPLE,
      address: [
        {
          street: 'R. Bacharel Clito César Rabelo',
          number: 86,
          neighborhood: 'São Judas',
          city: 'Itajaí',
          state: 'Santa Catarina',
          complement: 'Perto da panificadora Big Pão',
          alias: 'Residencial'
        },
      ],
      tags: [ 'semanal', 'mensal' ]
    },

    {
      name: 'Isabella Patel',
      dob: new Date(1996, 4, 3),
      phone: '5511988776655',
      email: 'isabella@gmail.com',
      contact: [ Contact.ALL ],
      indicatedBy: 'John',
      plan: Plan.SIMPLE,
      address: [
        {
          street: 'R. Bacharel Clito César Rabelo',
          number: 86,
          neighborhood: 'São Judas',
          city: 'Itajaí',
          state: 'Santa Catarina',
          complement: 'Perto da panificadora Big Pão',
          alias: 'Residencial'
        },
      ],
      tags: [ 'semanal', 'mensal' ]
    },

    {
      name: 'Sophia Smith',
      dob: new Date(1989, 2, 21),
      phone: '5511988776655',
      email: 'sophia@gmail.com',
      contact: [ Contact.ALL ],
      indicatedBy: 'John',
      plan: Plan.SIMPLE,
      address: [
        {
          street: 'R. Bacharel Clito César Rabelo',
          number: 86,
          neighborhood: 'São Judas',
          city: 'Itajaí',
          state: 'Santa Catarina',
          complement: 'Perto da panificadora Big Pão',
          alias: 'Residencial'
        },
      ],
      tags: [ 'semanal', 'mensal' ]
    },

    {
      name: 'Noah Patel',
      dob: new Date(2002, 1, 28),
      phone: '5511988776655',
      email: 'noah@gmail.com',
      contact: [ Contact.ALL ],
      indicatedBy: 'Liam',
      plan: Plan.SIMPLE,
      address: [
        {
          street: 'R. Indaial',
          number: 86,
          neighborhood: 'Centro',
          city: 'Curitiba',
          state: 'Santa Catarina',
          complement: 'Perto da panificadora Big Pão',
          alias: 'Residencial'
        },
      ],
      tags: [ 'semanal' ]
    },

    {
      name: 'Emma Singh',
      dob: new Date(2001, 5, 12),
      phone: '5511988776660',
      email: 'emma.singh@gmail.com',
      contact: [ Contact.EMAIL, Contact.CALL ],
      indicatedBy: 'John',
      plan: Plan.PREMIUM,
      address: [
        {
          street: 'R. Lauro Muller',
          number: 86,
          neighborhood: 'Alphaville',
          city: 'Itajaí',
          state: 'São Paulo',
          complement: 'Perto da drogaria Catarinense',
          alias: 'Residencial'
        },
      ],
      tags: [ 'semanal', 'mensal' ]
    },

    {
      name: 'Kim Tanaka',
      dob: new Date(2002, 10, 2),
      phone: '5511988776655',
      email: 'kim@gmail.com',
      contact: [ Contact.ALL ],
      indicatedBy: 'Julian',
      plan: Plan.SIMPLE,
      address: [
        {
          street: 'R. Afonso ',
          number: 86,
          neighborhood: 'São Judas',
          city: 'Itajaí',
          state: 'Santa Catarina',
          complement: 'Perto da panificadora Big Pão',
          alias: 'Residencial'
        },
      ],
      tags: [ 'semanal', 'mensal' ]
    }
  ]

  findAll() {
    return this.clients;
  }
}
