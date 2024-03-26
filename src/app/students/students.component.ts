import { Component } from '@angular/core';
import { Student } from '../student';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {

  students: Student[] = [
    {
      id: 1,
      name: 'Leonardo Alencar',
      course: 'Computaria'
    },
    {
      id: 2,
      name: 'Gabriel Lopez',
      course: 'Artes Modernas'
    },
    {
      id: 3,
      name: 'Gabriel Correa',
      course: 'Fisica'
    }
  ];

  formGroupStudent : FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.formGroupStudent = formBuilder.group({
      id : [''],
      name : [''],
      course : ['']
    });
  }

  save(){
    this.students.push(this.formGroupStudent.value);
  }

}
