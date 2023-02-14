import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../model/client.model';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[];
  length: number;
  pageSize: number;

  constructor(
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit() {
    this.clients = this.clientService.findAll();
    this.length = this.clients.length;
    this.pageSize = this.length < 3 ? this.length : 3;
  }

  addClient() {
    this.router.navigate(['register']);
  }
}
