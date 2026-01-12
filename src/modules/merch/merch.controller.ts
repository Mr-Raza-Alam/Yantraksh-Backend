import { Request, Response } from "express";
import { MerchService } from "./merch.service";
import { MerchRepository } from "./merch.repository";

export class MerchController {
  private merchService: MerchService;

  constructor() {
    const repo = new MerchRepository();
    this.merchService = new MerchService(repo);
  }

  createMerch = async (req: Request, res: Response) => {
    const merch = await this.merchService.createMerch(req.body);
    res.status(201).json({ success: true, data: merch });
  };

  getAllMerch = async (_req: Request, res: Response) => {
    const merch = await this.merchService.getAllMerch();
    res.status(200).json({ success: true, data: merch });
  };

  getMerchById = async (req: Request, res: Response) => {
    const merch = await this.merchService.getMerchById(req.params.id);
    res.status(200).json({ success: true, data: merch });
  };

  updateMerch = async (req: Request, res: Response) => {
    const merch = await this.merchService.updateMerch(
      req.params.id,
      req.body
    );
    res.status(200).json({ success: true, data: merch });
  };

  deleteMerch = async (req: Request, res: Response) => {
    await this.merchService.deleteMerch(req.params.id);
    res.status(204).send();
  };
}
