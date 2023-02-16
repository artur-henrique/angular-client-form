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
import { CepService } from '../services/cep.service';

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
  allComplete: boolean = false;
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
    private route: ActivatedRoute,
    private cepService: CepService
  ) {}

  ngOnInit() {
    this.clientRegisterForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'dob': new FormControl(null),
      'phone': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'contact': new FormControl(null),
      'indicatedBy': new FormControl(null),
      'plan': new FormControl(null, Validators.required),
      'adresses': new FormArray([
        new FormGroup({
          'street': new FormControl(null),
          'number': new FormControl(null),
          'neighborhood': new FormControl(null),
          'cep': new FormControl(null),
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

          if (client.adresses.length > 1) { // Verifica qtd de endereços
            for (let i = 1; i < client.adresses.length; i++) {
              this.onAddAdress();
            }
          }

          this.task.subtasks.forEach(task => { // Seta contacts
            if (client.contact?.includes(task.value)) {
              task.completed = true;
            }
          })

          if (client.contact?.length === 3) {
            this.allComplete = true;
          }

          this.clientRegisterForm.patchValue({
            'name': client.name,
            'dob': client.dob,
            'phone': client.phone,
            'email': client.email,
            'contact': client.contact,
            'indicatedBy': client.indicatedBy,
            'plan': client.plan,
            'adresses': client.adresses,
            'tags': client.tags
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
    console.log(this.task.subtasks.every(t => t.completed));
    (<FormControl>this.clientRegisterForm.get('contact')).setValue(
      this.task.subtasks.filter(t => t.completed).map(contact => contact.value)
    ); // Está gerando um bug quando desmarca todas subtasks manualmente
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
    this.clientService.create(this.clientRegisterForm.value);
  }

  get adresses() {
    return (<FormArray>this.clientRegisterForm.get('adresses')).controls
  }

  get clientNames() {
    return this.clientService.findAll().map(client => client.name);
  }

  get contacts() {
    return this.clientRegisterForm.get('contact').value;
  }

  get tagList() {
    return <FormControl>this.clientRegisterForm.get('tags')
  }

  onAddAdress() {
    const newAddressGroup = new FormGroup({
      'street': new FormControl(null),
      'number': new FormControl(null),
      'neighborhood': new FormControl(null),
      'cep': new FormControl(null),
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
      // this.tags.push(value);
      this.tagList.setValue([...this.tagList.value, value]);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.tagControl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tagList.value.indexOf(tag);

    if (index >= 0) {
      this.tagList.value.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tagList.setValue([...this.tagList.value, event.option.viewValue]);
    // this.tags.push(event.option.viewValue);
    // this.tagInput.nativeElement.value = '';
    this.tagControl.setValue(null);
  }

  onCepChange(value: string, vl: number) {
    const cep = value.replace(/\D/g, '');
    if (cep.length === 8) {
      this.cepService.searchForAddress(cep)
        .subscribe(addr => {
        (<FormArray>this.clientRegisterForm.controls['adresses']).controls[vl].patchValue({
            street: addr.logradouro,
            neighborhood: addr.bairro,
            city: addr.localidade,
            state: addr.uf,
            complement: addr.complemento,
          })
        })
    }
  }
}




