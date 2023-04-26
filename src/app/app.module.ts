import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/Layouts/header/header.component';
import { FooterComponent } from './Components/Layouts/footer/footer.component';
import { ChangeH1Component } from './Components/Templates/change-h1/change-h1.component';
import { AboutUsComponent } from './Components/Templates/about-us/about-us.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Templates/login/login.component';
import { RegisterComponent } from './Components/Templates/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from './Components/Templates/home/home.component';
import { CustomerSupportComponent } from './Components/Templates/customer-support/customer-support/customer-support.component';
import { ProfileComponent } from './Components/Templates/profile/profile.component';
import { SearchFilterComponent } from './Components/Templates/search-filter/search-filter.component';
import { GetUsersComponent } from './Components/Admin/User/get-users/get-users.component';
import { EditDeleteUserComponent } from './Components/Admin/User/edit-delete-user/edit-delete-user.component';
import { GetCoursesComponent } from './Components/Admin/Course/get-courses/get-courses.component';
import { EditDeleteCourseComponent } from './Components/Admin/Course/edit-delete-course/edit-delete-course.component';
import { EditDeleteCategoryComponent } from './Components/Admin/Category/edit-delete-category/edit-delete-category.component';
import { GetCategoriesComponent } from './Components/Admin/Category/get-categories/get-categories.component';
import { AdministratorGuard } from './Guards/administrator.guard';
import { CreateCourseComponent } from './Components/Templates/courses/create-course/create-course.component';
import { GetRolesComponent } from './Components/Admin/Role/get-roles/get-roles.component';
import { EditDeleteRoleComponent } from './Components/Admin/Role/edit-delete-role/edit-delete-role.component';
import { CreateCategoryComponent } from './Components/Admin/Category/create-category/create-category.component';
import { CreateRoleComponent } from './Components/Admin/Role/create-role/create-role/create-role.component';
import { UserCoursesComponent } from './Components/Templates/courses/user-courses/user-courses.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CourseComponent } from './Components/Templates/courses/course/course.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PurchasedCoursesComponent } from './Components/Templates/purchased-courses/purchased-courses/purchased-courses.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesSearchComponent } from './Components/Category/categories-search/categories-search.component';
import { TrainersSearchComponent } from './Components/Trainer/trainers-search/trainers-search.component';
import { CoursesSearchComponent } from './Components/Templates/courses-search/courses-search/courses-search.component';
import { ModalComponent } from './Partials/Modal/modal/modal.component';
import { TrainerProfileComponent } from './Components/Templates/TrainerProfile/trainer-profile/trainer-profile.component';



const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'about', component: AboutUsComponent },
  { path: 'customer-support', component: CustomerSupportComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'courses/search', component: CoursesSearchComponent},
  { path: 'global/search/:query', component: SearchFilterComponent},
  { path: 'course/:id', component: CourseComponent},
  { path: 'course/trainer/create', component: CreateCourseComponent},
  { path: 'course/update/:id', component: EditDeleteCourseComponent},
  { path: 'trainers/search', component: TrainersSearchComponent},
  { path: 'trainer/:id', component: TrainerProfileComponent},
  { path: 'categories/search', component: CategoriesSearchComponent},
  { path: 'user/courses', component:  UserCoursesComponent},
  { path: 'customer/purchased-courses/:id', component:  PurchasedCoursesComponent},
  { path: 'admin/user', component: GetUsersComponent, canActivate: [AdministratorGuard]},
  { path: 'admin/category', component: GetCategoriesComponent, canActivate: [AdministratorGuard]},
  { path: 'admin/course', component: GetCoursesComponent, canActivate: [AdministratorGuard]},
  { path: 'admin/role', component: GetRolesComponent, canActivate: [AdministratorGuard]},
  { path: 'admin/user/create', component: GetRolesComponent, canActivate: [AdministratorGuard]},
  { path: 'admin/course/create', component: GetRolesComponent, canActivate: [AdministratorGuard]},
  { path: 'admin/role/create', component: CreateRoleComponent, canActivate: [AdministratorGuard]},
  { path: 'admin/category/create', component: CreateCategoryComponent, canActivate: [AdministratorGuard]},
  { path: 'admin/user/update/:id', component: EditDeleteUserComponent, canActivate: [AdministratorGuard]},
  { path: 'admin/course/update/:id', component: EditDeleteCourseComponent, canActivate: [AdministratorGuard]},
  { path: 'admin/category/update/:id', component: EditDeleteCategoryComponent, canActivate: [AdministratorGuard]},
  { path: 'admin/role/update/:id', component: EditDeleteRoleComponent, canActivate: [AdministratorGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CustomerSupportComponent,
    ChangeH1Component,
    AboutUsComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CustomerSupportComponent,
    ProfileComponent,
    SearchFilterComponent,
    GetUsersComponent,
    EditDeleteUserComponent,
    GetCoursesComponent,
    EditDeleteCourseComponent,
    EditDeleteCategoryComponent,
    GetCategoriesComponent,
    CreateCourseComponent,
    GetRolesComponent,
    EditDeleteRoleComponent,
    CreateCategoryComponent,
    CreateRoleComponent,
    UserCoursesComponent,
    CourseComponent,
    PurchasedCoursesComponent,
    CategoriesSearchComponent,
    TrainersSearchComponent,
    CoursesSearchComponent,
    ModalComponent,
    TrainerProfileComponent,
  ],
  imports: [
    [RouterModule.forRoot(routes)],
    BrowserModule,
    MatSlideToggleModule,
    FormsModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    [BrowserModule, HttpClientModule]

  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
