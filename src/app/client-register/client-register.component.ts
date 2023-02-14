import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Task } from '../model/client.model';



@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit {
  clientRegisterForm: FormGroup;
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


  ngOnInit() {
    this.clientRegisterForm = new FormGroup({
      'name': new FormControl(null),
      'dob': new FormControl(null),
      'phone': new FormControl(null),
      'email': new FormControl(null),
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
}
