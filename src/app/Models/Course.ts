export class Course {
  public id = null;
  public name = null;
  public description = null;
  public price = null;
  public image = null;
  public user = null;
  public category = null;
  public document = null;
  public video = null;

  constructor(id: any, name: any, description: any, price: any, document_root: any, img_path: any, user: any, category: any, video: any) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.document = document_root;
    this.image = img_path;
    this.video = video;
    this.user = user;
    this.category = category;
  }
}
