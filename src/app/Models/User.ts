import { Role } from "./Role";

export class User{
  public id = null;
  public name = null;
  public surname = null;
  public email = null ;
  public password = null ;
  public confirmPassword = null;
  public description = null ;
  public role: Role;

  constructor (email: any,password: any, confirmPassword:any, id :any, name :any, surname :any, description: any,role:Role){
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.description = description;
    this.confirmPassword=confirmPassword;
    this.role=role;
  }
}
