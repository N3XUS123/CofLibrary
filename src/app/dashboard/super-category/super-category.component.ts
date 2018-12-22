import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { SuperCategoryDto } from 'src/app/controller/dto/superCategory.dto';
import { SuperCategoryResponse } from 'src/app/controller/interfaces/super-category-response';
import { AuthService } from 'src/app/controller/services/auth.service';
import { SuperCategoryService } from 'src/app/controller/services/super-category.service';

@Component({
  selector: 'app-super-category',
  templateUrl: './super-category.component.html',
  styleUrls: ['./super-category.component.scss']
})
export class SuperCategoryComponent implements OnInit {

  displayedColumns: string[] = ['name', 'acciones'];
  dataSource: MatTableDataSource<SuperCategoryResponse>;
  catEdit: SuperCategoryResponse;
  editMode: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public form: FormGroup;
  constructor(private fb: FormBuilder, private superCategoryService: SuperCategoryService,
    private authService: AuthService, public router: Router, public snackBar: MatSnackBar) { }

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
        name: [null , Validators.compose ( [ Validators.required ] )]
      });
    }

    getAll() {
      this.superCategoryService.getAll().toPromise()
      .then(sCategoryList => this.dataSource = new MatTableDataSource(sCategoryList))
      .then(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }).catch(() => this.snackBar.open('Error al cargar los datos.', 'Cerrar', {duration: 3000}));
    }

    edit(superCategory: SuperCategoryResponse) {
      this.catEdit = superCategory;
      this.form.controls['name'].setValue(superCategory.name);
      this.editMode = true;
    }

    // delete(id: number) {
    //   this.superCategoryService.delete(id).toPromise()
    //   .then(() => this.getAll());
    // }

    onSubmit() {
      const superCategory: SuperCategoryDto = <SuperCategoryDto>this.form.value;
      if (this.editMode) {
        this.superCategoryService.edit(this.catEdit.id, superCategory).toPromise()
        .then(() => this.getAll());
      } else {
        this.superCategoryService.create(superCategory).toPromise()
        .then(() => this.getAll());
      }
      this.editMode = false;
      this.form.controls['name'].setValue(null);
    }

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

}
