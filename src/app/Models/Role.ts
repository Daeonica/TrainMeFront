export class Role{
   public id = null;
   public key_value = null;
   public name = null;

   constructor (id:any,name:any,key_value:any){
    this.id = id;
    this.name = name;
    this.key_value = key_value;
  }
}