import { OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Client } from '../model/client.model';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit, OnDestroy {
  clients: Client[];
  clientsSub: Subscription
  paginationSlice: Client[];
  length: number;
  pageSize: number;
  startIndex: number = 0;
  endIndex: number = 2;

  constructor(
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit() {
    this.clientsSub = this.clientService.onClientListChange
      .subscribe(
        (newClientList) => {
          this.clients = newClientList;
          this.paginationSlice = this.clients.slice(this.startIndex, this.pageSize);
          this.length = this.clients.length;
        }
      )

    this.clients = this.clientService.findAll();
    this.length = this.clients.length;
    this.pageSize = this.length < 3 ? this.length : 3;
    this.paginationSlice = this.clients.slice(0, this.pageSize);
  }

  ngOnDestroy(): void {
    this.clientsSub.unsubscribe();
  }

  addClient() {
    this.router.navigate(
      ['register'],
      { queryParams: { action: 'Cadastrar' } }
      );
  }

  onPageChange(event: PageEvent) {
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;
    this.paginationSlice = this.clients.slice(this.startIndex, this.endIndex);
  }

  onEditClient(event: MouseEvent) {
    console.log(event);
  }

  onDeleteClient(client: Client) {
    this.clientService.deleteById(client._id);
    console.log(this.clientService.findAll());
  }
}
