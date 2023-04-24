import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';
import { Role } from 'src/app/Models/Role';
import { User } from 'src/app/Models/User';


@Injectable({
  providedIn: 'root'
})
export class CryptoJsService {

  pwd = '123456789';

  constructor() { }

  encrypt(data: any){
    let dataToArray = JSON.stringify(data);
    let encryptedData = AES.encrypt(dataToArray, this.pwd)
    return encryptedData.toString()
  }

  decrypt(data: any){
    let bytes = AES.decrypt(data, this.pwd);
    let jsonByte = JSON.parse(bytes.toString(enc.Utf8));
    return (this.convertJsonToObject(jsonByte));
  }

  convertJsonToObject(json: any) {
    let role = new Role(json.role.id,json.role.name, json.role.key_value);
    let user = new User(json.email, json.password, '', json.id, json.name, json.surname, json.description, role);
    return user;
  }
}
