import { Model } from "mongoose";
import { MerchDocument, MerchModel } from "./merch.model.ts";

export class MerchRepository {
  private model: Model<MerchDocument>;

  constructor() {
    this.model = MerchModel;
  }

  create(data: Partial<MerchDocument>) {
    return this.model.create(data); 
  }

  findAll() {
    return this.model.find({ isActive: true });
  }

  findById(id: string) {
    return this.model.findById(id);
  }

  updateById(id: string, data: Partial<MerchDocument>) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  deleteById(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
