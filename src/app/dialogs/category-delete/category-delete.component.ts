import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { CategoryResponse } from 'src/app/controller/interfaces/category-response';
import { CategoryService } from 'src/app/controller/services/category.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.scss']
})
export class CategoryDeleteComponent implements OnInit {

  category: CategoryResponse;

  public form: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private categoryService: CategoryService, public dialogRef: MatDialogRef<CategoryDeleteComponent>,
    public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.category = this.data.category;
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group ( {
      borrar: [null , Validators.compose ( [ Validators.required, Validators.pattern(/ELIMINAR$/) ] )]
    });
  }

  onSubmit() {
    this.categoryService.delete(this.category.id).toPromise()
    .then(() => this.dialogRef.close())
    .catch(() => this.snackBar.open('Error. No se ha podido eliminar la categoría.', 'Cerrar', {duration: 3000}));
  }
}
