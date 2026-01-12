import { MerchDocument } from "./merch.model";
import { MerchRepository } from "./merch.repository";

export class MerchService {
  constructor(private merchRepo: MerchRepository) {}

  async createMerch(data: any) {
    // business rules can go here later
    return this.merchRepo.create(data);
  }

  async getAllMerch() {
    return this.merchRepo.findAll();
  }

  async getMerchById(id: string) {
    const merch = await this.merchRepo.findById(id);
    if (!merch) throw new Error("Merch not found");
    return merch;
  }

  async updateMerch(id: string, data: Partial<MerchDocument>) {
    const merch = await this.merchRepo.updateById(id, data);
    if (!merch) throw new Error("Merch not found");
    return merch;
  }

  async deleteMerch(id: string) {
    const merch = await this.merchRepo.deleteById(id);
    if (!merch) throw new Error("Merch not found");
    return true;
  }
}
