import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ResourceResponse } from 'src/app/controller/interfaces/resource-response';
import { ResourceService } from 'src/app/controller/services/resource.service';

@Component({
  selector: 'app-resource-return-dialog',
  templateUrl: './resource-return-dialog.component.html',
  styleUrls: ['./resource-return-dialog.component.scss']
})
export class ResourceReturnDialogComponent implements OnInit {

  resource: ResourceResponse;

  public form: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private router: Router,
    private resourceService: ResourceService, public dialogRef: MatDialogRef<ResourceReturnDialogComponent>,
    public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.resource = this.data.resource;
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group ( {
      return: [null , Validators.compose ( [ Validators.required, Validators.pattern(/DEVOLVER$/) ] )]
    });
  }

  onSubmit() {
    this.resourceService.return(this.resource.id).toPromise()
    .then(resp => this.dialogRef.close(resp))
    .catch(() => this.snackBar.open('Error al devolver el recurso.', 'Cerrar', {duration: 3000}));
  }
}
