import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Task } from '../model/client.model';
import { ClientService } from '../services/client.service';

//
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

// MatChip
import { COMMA, ENTER } from '@angular/cdk/keycodes';
// import { ElementRef, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit {
  action: string;
  clientRegisterForm: FormGroup;
  phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  // Contact
  task: Task = {
    name: 'Todos',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'SMS', value: 'sms', completed: false, color: 'accent' },
      { name: 'Ligação', value: 'call', completed: false, color: 'accent' },
      { name: 'E-mail', value: 'email', completed: false, color: 'accent' },
    ],
  };
  allComplete: boolean = false;

  // Indication
  clientNamesList: string[];
  filteredNames: Observable<string[]>;

  // MatChips
  // @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  tagControl = new FormControl(null);
  separatorKeysCodes: number[] = [ENTER, COMMA];
  allTags: string[] = ['Diário', 'Semanal', 'Mensal', 'Anual'];
  filteredTags: Observable<string[]>;
  tags: string[] = [];

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.clientRegisterForm = new FormGroup({
      'name': new FormControl(null),
      'dob': new FormControl(null),
      'phone': new FormControl(null),
      'email': new FormControl(null, Validators.email),
      'contact': new FormControl(null),
      'indicatedBy': new FormControl(null),
      'plan': new FormControl(null),
      'adresses': new FormArray([
        new FormGroup({
          'street': new FormControl(null),
          'number': new FormControl(null),
          'neighborhood': new FormControl(null),
          'city': new FormControl(null),
          'state': new FormControl(null),
          'complement': new FormControl(null),
          'alias': new FormControl(null),
        }),
      ]),
      'tags': new FormControl(null),
    })

    this.route.queryParams
      .subscribe(
        (info) => {
          this.action = info['action'];

          if (this.action !== 'Editar') return  // Continua apenas quando for uma edição de cliente

          const client = JSON.parse(info['client']);

          // const addressList = client.adresses.map(address => new FormControl(address));
          // console.log(addressList); // Tentativa de adicionar os endereços adicionais no cliente

          this.clientRegisterForm.setValue({
            name: client.name,
            dob: client.dob,
            phone: client.phone,
            email: client.email,
            contact: client.contact,
            indicatedBy: client.indicatedBy,
            plan: client.plan,
            adresses:
              [ {
                street: client.adresses[0].street,
                number: client.adresses[0].number,
                neighborhood: client.adresses[0].neighborhood,
                city: client.adresses[0].city,
                state: client.adresses[0].state,
                complement: client.adresses[0].complement,
                alias: client.adresses[0].alias
              } ],
            tags: client.tags
          })
        }
    )

    this.clientNamesList = this.clientNames;
    this.filteredNames = this.clientRegisterForm.get('indicatedBy').valueChanges.pipe(
      startWith(''),
      map(typedName => this._filter(typedName || '')),
    );

    // MatChip
    this.filteredTags = this.tagControl.valueChanges.pipe(
      startWith(''),
      map(tag => this._filterTags(tag || '')),
    );
  }

  private _filterTags(typedTag: string): string[] {
    const filteredTag = typedTag.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filteredTag));
  }

  private _filter(typedName: string): string[] {
    const filteredName = typedName.toLowerCase();

    return this.clientNamesList.filter(name => name.toLowerCase().includes(filteredName));
  }


  // Helper functions of Contact
  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
    this.clientRegisterForm.get('contact').setValue(
      this.task.subtasks.filter(t => t.completed).map(contact => contact.value)
    );
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));

    if(this.allComplete) {
      (<FormControl>this.clientRegisterForm.get('contact'))
        .setValue(this.task.subtasks.map(contact => contact.value));
    } else {
      (<FormControl>this.clientRegisterForm.get('contact')).setValue(null);
    }
  }

  // End of Helper functions of Contact

  save() {
    console.log(this.clientRegisterForm);
  }

  get adresses() {
    return (<FormArray>this.clientRegisterForm.get('adresses')).controls
  }

  get clientNames() {
    return this.clientService.findAll().map(client => client.name);
  }

  onAddAdress() {
    const newAddressGroup = new FormGroup({
      'street': new FormControl(null),
      'number': new FormControl(null),
      'neighborhood': new FormControl(null),
      'city': new FormControl(null),
      'state': new FormControl(null),
      'complement': new FormControl(null),
      'alias': new FormControl(null),
    });
    (<FormArray>this.clientRegisterForm.get('adresses')).push(newAddressGroup);
  }

  // MatChip functions

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our tag
    if (value) {
      this.tags.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.tagControl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    // this.tagInput.nativeElement.value = '';
    this.tagControl.setValue(null);
  }



}
