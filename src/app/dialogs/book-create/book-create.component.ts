import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ResourceResponse } from 'src/app/controller/interfaces/resource-response';
import { SuperCategoryResponse } from 'src/app/controller/interfaces/super-category-response';
import { ResourceService } from 'src/app/controller/services/resource.service';
import { SuperCategoryService } from 'src/app/controller/services/super-category.service';

import { BookCreateDto } from './../../controller/dto/bookCreate.dto';
import { TypeResponse } from './../../controller/interfaces/type-response';
import { CategoryService } from './../../controller/services/category.service';
import { TypeService } from './../../controller/services/type.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  resource: ResourceResponse;
  types: TypeResponse[];
  superCategories: SuperCategoryResponse[];

  public form: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private typeService: TypeService, private categoryService: CategoryService,
    private superCategoryService: SuperCategoryService, private resourceService: ResourceService,
    public dialogRef: MatDialogRef<BookCreateComponent>, public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.createForm();
    this.getData();
  }

  createForm() {
    this.form = this.fb.group ( {
      title: [null , Validators.compose ( [ Validators.required ] )],
      autor: [null , Validators.compose ( [ Validators.required ] )],
      anyo: [null , Validators.compose ( [ Validators.required ] )],
      url: [null],
      content: [null , Validators.compose ( [ Validators.required ] )],
      typeId: [null , Validators.compose ( [ Validators.required ] )],
      categoryId: [null , Validators.compose ( [ Validators.required ] )]
    } );
  }

  getData() {
    this.typeService.getAll().toPromise()
    .then(t => this.types = t)
    this.superCategoryService.getAll().toPromise()
    .then(sc => this.superCategories = sc)
    .catch(() => this.snackBar.open('Error al cargar los datos.', 'Cerrar', {duration: 3000}));
  }

  onSubmit() {
    const bookCreateDto: BookCreateDto = <BookCreateDto>this.form.value;
    this.resourceService.createResource(bookCreateDto).toPromise()
    .then(resp => this.dialogRef.close(resp))
    .catch(() => this.snackBar.open('Error al crear el recurso.', 'Cerrar', {duration: 3000}));
  }

}
