import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Client, Contact, Plan } from "../model/client.model";

@Injectable({ providedIn: 'root' })
export class ClientService {
  onClientListChange = new Subject<Client[]>();

  clients: Client[] = [
    {
      _id: 1,
      name: 'Liam Neesson',
      dob: new Date(1990, 8, 16),
      phone: '5511988776655',
      email: 'liam.neesson@gmail.com',
      contact: [ Contact.ALL ],
      indicatedBy: 'John',
      plan: Plan.SIMPLE,
      adresses: [
        {
          street: 'R. Bacharel Clito César Rabelo',
          number: 86,
          neighborhood: 'São Judas',
          cep: '',
          city: 'Itajaí',
          state: 'Santa Catarina',
          complement: 'Perto da panificadora Big Pão',
          alias: 'Residencial'
        },
        {
          street: 'R. Indaial',
          number: 254,
          neighborhood: 'São João',
          cep: '',
          city: 'Blumenau',
          state: 'Santa Catarina',
          complement: 'Perto do Shopping Itaguaçu',
          alias: 'Residencial'
        },
      ],
      tags: [ 'semanal' ]
    },

    {
      _id: 2,
      name: 'Isabella Patel',
      dob: new Date(1996, 4, 3),
      phone: '5511988776655',
      email: 'isabella@gmail.com',
      contact: [ Contact.ALL ],
      indicatedBy: 'John',
      plan: Plan.SIMPLE,
      adresses: [
        {
          street: 'R. Bacharel Clito César Rabelo',
          number: 86,
          neighborhood: 'São Judas',
          cep: '',
          city: 'Itajaí',
          state: 'Santa Catarina',
          complement: 'Perto da panificadora Big Pão',
          alias: 'Residencial'
        },
      ],
      tags: [ 'semanal', 'mensal' ]
    },

    {
      _id: 3,
      name: 'Sophia Smith',
      dob: new Date(1989, 2, 21),
      phone: '5511988776655',
      email: 'sophia@gmail.com',
      contact: [ Contact.ALL ],
      indicatedBy: 'John',
      plan: Plan.SIMPLE,
      adresses: [
        {
          street: 'R. Bacharel Clito César Rabelo',
          number: 86,
          neighborhood: 'São Judas',
          cep: '',
          city: 'Itajaí',
          state: 'Santa Catarina',
          complement: 'Perto da panificadora Big Pão',
          alias: 'Residencial'
        },
      ],
      tags: [ 'semanal', 'mensal' ]
    },

    {
      _id: 4,
      name: 'Noah Patel',
      dob: new Date(2002, 1, 28),
      phone: '5511988776655',
      email: 'noah@gmail.com',
      contact: [ Contact.ALL ],
      indicatedBy: 'Liam',
      plan: Plan.SIMPLE,
      adresses: [
        {
          street: 'R. Indaial',
          number: 86,
          neighborhood: 'Centro',
          cep: '',
          city: 'Curitiba',
          state: 'Santa Catarina',
          complement: 'Perto da panificadora Big Pão',
          alias: 'Residencial'
        },
      ],
      tags: [ 'semanal' ]
    },

    {
      _id: 5,
      name: 'Emma Singh',
      dob: new Date(2001, 5, 12),
      phone: '5511988776660',
      email: 'emma.singh@gmail.com',
      contact: [ Contact.EMAIL, Contact.CALL ],
      indicatedBy: 'John',
      plan: Plan.PREMIUM,
      adresses: [
        {
          street: 'R. Lauro Muller',
          number: 86,
          neighborhood: 'Alphaville',
          cep: '',
          city: 'Itajaí',
          state: 'São Paulo',
          complement: 'Perto da drogaria Catarinense',
          alias: 'Residencial'
        },
      ],
      tags: [ 'semanal', 'mensal' ]
    },

    {
      _id: 6,
      name: 'Kim Tanaka',
      dob: new Date(2002, 10, 2),
      phone: '5511988776655',
      email: 'kim@gmail.com',
      contact: [ Contact.ALL ],
      indicatedBy: 'Julian',
      plan: Plan.SIMPLE,
      adresses: [
        {
          street: 'R. Afonso ',
          number: 86,
          neighborhood: 'São Judas',
          cep: '',
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

  deleteById(id: number) {
    this.clients = this.clients.filter(client => client._id !== id);
    this.onClientListChange.next(this.findAll());
  }

  create(newClient: Client) {
    const clientData = Object.assign(newClient);

    const clientIndex = this.clients
    .findIndex(client => client.name === newClient.name);

    if (clientIndex !== -1) {  // Should update
      this.clients[clientIndex] = clientData;
    } else {
      clientData._id = this.clients.at(-1)._id + 1;
      this.clients.push(clientData);
    }

    this.onClientListChange.next(this.findAll());
  }
}
