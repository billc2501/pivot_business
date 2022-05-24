// @ts-ignore
import db from "./car-rental-export-public.json"

class ApiService {

  private db: any;

  constructor() {
    this.db = db;
  }

  async update(path, updateModel) {
    const productId = path.split("/").slice(-1)[0];
    this.db.products[productId] = {...this.db.products[productId], ...updateModel }
  }

  async uploadFile(params) {
    return {url: params.localFullPath}
  }

  addValueEventListener(onValueEvent, path) {
    onValueEvent(this.db.products)
    return {
      path: path,
      listeners: this.db.products
    }

  }
}

export default new ApiService;
