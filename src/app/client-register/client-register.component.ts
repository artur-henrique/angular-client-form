import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
      {name: 'SMS', completed: false, color: 'accent'},
      {name: 'Ligação', completed: false, color: 'accent'},
      {name: 'E-mail', completed: false, color: 'accent'},
    ],
  };


  ngOnInit() {
    this.clientRegisterForm = new FormGroup({
      'name': new FormControl(null),
      'dob': new FormControl(null),
      'phone':  new FormControl(null),
      'email': new FormControl(null),
      'contact': new FormControl(null),
      'indicatedBy': new FormControl(null),
      'plan': new FormControl(null),
      'address': new FormGroup({
        'street': new FormControl(null),
        'number': new FormControl(null),
        'neighborhood': new FormControl(null),
        'city': new FormControl(null),
        'state': new FormControl(null),
        'complement': new FormControl(null),
        'alias': new FormControl(null),
      }),
      'tags': new FormControl(null),
    })
  }

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
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
  }

  save() {
    console.log(this.clientRegisterForm);
  }
}
