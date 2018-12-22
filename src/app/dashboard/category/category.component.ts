import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { CategoryResponse } from 'src/app/controller/interfaces/category-response';
import { SuperCategoryResponse } from 'src/app/controller/interfaces/super-category-response';
import { AuthService } from 'src/app/controller/services/auth.service';
import { CategoryService } from 'src/app/controller/services/category.service';
import { SuperCategoryService } from 'src/app/controller/services/super-category.service';
import { CategoryDeleteComponent } from 'src/app/dialogs/category-delete/category-delete.component';

import { CategoryDto } from './../../controller/dto/category.dto';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['name', 'supercategory', 'acciones'];
  dataSource: MatTableDataSource<CategoryResponse>;
  superCategories: SuperCategoryResponse[];
  catEdit: CategoryResponse;
  editMode: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public form: FormGroup;
  constructor(private categoryService: CategoryService, private fb: FormBuilder, public dialog: MatDialog,
    private superCategoryService: SuperCategoryService, private authService: AuthService,
    public router: Router, public snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (this.authService.checkToken()) {
      this.router.navigate(['/']);
    } else {
      this.getAll();
    }
    this.getForm();
  }

  getForm() {
    this.form = this.fb.group ( {
      name: [null , Validators.compose ( [ Validators.required ] )],
      idSuperCategoria: ['']
    });
  }

  getAll() {
    this.categoryService.getAll().toPromise()
    .then(categoryList => this.dataSource = new MatTableDataSource(categoryList))
    .then(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch(() => this.snackBar.open('Error al cargar los datos.', 'Cerrar', {duration: 3000}));

    this.superCategoryService.getAll().toPromise()
    .then(superList => this.superCategories = superList);
  }

  edit(category: CategoryResponse) {
    this.catEdit = category;
    this.form.controls['name'].setValue(category.name);
    this.form.controls['idSuperCategoria'].setValue(category.supercategory.id);
    this.editMode = true;
  }

  delete(cat: CategoryResponse) {
    const dialogDeleteResource = this.dialog.open(CategoryDeleteComponent, {data: {category: cat}});
    dialogDeleteResource.afterClosed().toPromise()
    .then(() => this.getAll())
    .catch(() => this.snackBar.open('Error al actualizar los datos.', 'Cerrar', {duration: 3000}));
  }

  onSubmit() {
    const category: CategoryDto = <CategoryDto>this.form.value;
    if (this.editMode) {
      this.categoryService.edit(this.catEdit.id, category).toPromise()
      .then(() => this.getAll())
      .catch(() => this.snackBar.open('Error al actualizar los datos.', 'Cerrar', {duration: 3000}));
    } else {
      this.categoryService.create(category).toPromise()
      .then(() => this.getAll())
      .catch(() => this.snackBar.open('Error al actualizar los datos.', 'Cerrar', {duration: 3000}));
    }
    this.editMode = false;
    this.form.controls['name'].setValue(null);
    this.form.controls['idSuperCategoria'].setValue(null);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
