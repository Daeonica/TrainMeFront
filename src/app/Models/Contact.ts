export class Contact{  
    public name = null;
    public email = null ;
    public message = null ;
   
  
    constructor (email:any,name:any,message:any){
      this.email = email;
      this.name = name;
      this.message = message;
    }
  }