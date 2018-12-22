import { AgmCoreModule } from '@agm/core';
import { BidiModule } from '@angular/cdk/bidi';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import {
  AccordionAnchorDirective,
  AccordionDirective,
  AccordionLinkDirective,
  AdminLayoutComponent,
  AuthLayoutComponent,
  HeaderComponent,
  MenuComponent,
  OptionsComponent,
  SidebarComponent,
} from './core';
import { BookCreateComponent } from './dialogs/book-create/book-create.component';
import { BookDeleteComponent } from './dialogs/book-delete/book-delete.component';
import { BookEditComponent } from './dialogs/book-edit/book-edit.component';
import { CategoryDeleteComponent } from './dialogs/category-delete/category-delete.component';
import { ResourceLendComponent } from './dialogs/resource-lend/resource-lend.component';
import { ResourceReturnDialogComponent } from './dialogs/resource-return-dialog/resource-return-dialog.component';
import { UserCreateComponent } from './dialogs/user-create/user-create.component';
import { UserDeleteComponent } from './dialogs/user-delete/user-delete.component';
import { UserEditComponent } from './dialogs/user-edit/user-edit.component';
import { UserResourcesComponent } from './dialogs/user-resources/user-resources.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    OptionsComponent,
    MenuComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    BookCreateComponent,
    BookEditComponent,
    BookDeleteComponent,
    CategoryDeleteComponent,
    UserCreateComponent,
    UserDeleteComponent,
    UserEditComponent,
    ResourceLendComponent,
    ResourceReturnDialogComponent,
    UserResourcesComponent,
  ],
  entryComponents: [
    BookCreateComponent,
    BookEditComponent,
    BookDeleteComponent,
    ResourceLendComponent,
    UserCreateComponent,
    UserEditComponent,
    UserDeleteComponent,
    CategoryDeleteComponent,
    ResourceReturnDialogComponent,
    UserResourcesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    LoadingBarRouterModule,
    MatSidenavModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressBarModule,
    FlexLayoutModule,
    BidiModule,
    AgmCoreModule.forRoot({apiKey: 'YOURAPIKEY'}),
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxPaginationModule,
    FilterPipeModule,
    MatExpansionModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
