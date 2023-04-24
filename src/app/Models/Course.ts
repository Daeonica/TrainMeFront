export class Course {
  public id = null;
  public name = null;
  public description = null;
  public price = null;
  public img_path = null;
  public user = null;
  public category = null;
  public document_root = null;


  constructor(id: any, name: any, description: any, price: any, document_root: any, img_pat: any, user: any, category: any) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.document_root = document_root;
    this.img_path = img_pat;
    this.user = user;
    this.category = category;
  }
}
