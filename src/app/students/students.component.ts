import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../student.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];

  formGroupStudent: FormGroup;

  isEditing: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: StudentService
  ) {
    this.formGroupStudent = formBuilder.group({
      id: [''],
      name: [''],
      course: [''],
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.service.getStudents().subscribe({
      next: (data) => (this.students = data),
    });
  }

  save() {
    //this.students.push(this.formGroupStudent.value);
    if (this.isEditing) {
      this.service.update(this.formGroupStudent.value).subscribe({
        next: () => {
          this.loadStudents();
          this.isEditing = false;
          this.formGroupStudent.reset();
        },
      });
    } else {
      this.service.save(this.formGroupStudent.value).subscribe({
        next: (data) => this.students.push(data),
      });
    }
  }

  delete(student: Student) {
    this.service.delete(student).subscribe({
      next: () => this.loadStudents(),
    });
  }

  edit(student: Student) {
    this.formGroupStudent.setValue(student);
    this.isEditing = true;
  }
}
