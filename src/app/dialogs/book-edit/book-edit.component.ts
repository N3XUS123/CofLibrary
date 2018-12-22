import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { BookCreateDto } from 'src/app/controller/dto/bookCreate.dto';
import { ResourceResponse } from 'src/app/controller/interfaces/resource-response';
import { SuperCategoryResponse } from 'src/app/controller/interfaces/super-category-response';
import { TypeResponse } from 'src/app/controller/interfaces/type-response';
import { ResourceService } from 'src/app/controller/services/resource.service';
import { SuperCategoryService } from 'src/app/controller/services/super-category.service';
import { TypeService } from 'src/app/controller/services/type.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  resource: ResourceResponse;
  types: TypeResponse[];
  superCategories: SuperCategoryResponse[];

  public form: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private router: Router,
    private typeService: TypeService, private superCategoryService: SuperCategoryService,
    private resourceService: ResourceService, public dialogRef: MatDialogRef<BookEditComponent>,
    public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.resource = this.data.resource;
    this.createForm();
    this.getData();
  }

  createForm() {
    this.form = this.fb.group ( {
      title: [this.resource.title , Validators.compose ( [ Validators.required ] )],
      autor: [this.resource.autor , Validators.compose ( [ Validators.required ] )],
      anyo: [this.resource.anyo , Validators.compose ( [ Validators.required ] )],
      url: [this.resource.url],
      content: [this.resource.content , Validators.compose ( [ Validators.required ] )],
      typeId: [this.resource.type.id , Validators.compose ( [ Validators.required ] )],
      categoryId: [this.resource.category.id , Validators.compose ( [ Validators.required ] )]
    } );
  }

  getData() {
    this.typeService.getAll().toPromise()
    .then(t => this.types = t);
    this.superCategoryService.getAll().toPromise()
    .then(sc => this.superCategories = sc)
    .catch(() => this.snackBar.open('Error al cargar los datos.', 'Cerrar', {duration: 3000}));
  }

  onSubmit() {
    const bookEdited: BookCreateDto = <BookCreateDto>this.form.value;
    this.resourceService.editResource(this.resource.id, bookEdited).toPromise()
    .then(resp => this.dialogRef.close(resp))
    .catch(() => this.snackBar.open('Error al editar el recurso.', 'Cerrar', {duration: 3000}));
  }
}
