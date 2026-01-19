import { Request, Response } from "express";
import TeamRepository from "./team.repository";
import { TeamService } from "./team.service";

export class TeamController {
  private teamService: TeamService;

  constructor() {
    const repo = new TeamRepository();
    this.teamService = new TeamService(repo);
  }

  createTeam = async (req: Request, res: Response) => {
    const team = await this.teamService.createTeam(req.body);
    res.status(201).json({
      success: true,
      data: team,
    });
  };

  getAllTeams = async (_req: Request, res: Response) => {
    const teams = await this.teamService.getAllTeams();
    res.status(200).json({
      success: true,
      data: teams,
    });
  };

  getTeamById = async (req: Request, res: Response) => {
    const team = await this.teamService.getTeamById(req.params.id);
    res.status(200).json({
      success: true,
      data: team,
    });
  };

  getTeamsByCompetition = async (req: Request, res: Response) => {
    const teams = await this.teamService.getTeamsByCompetition(req.params.competitionId);
    res.status(200).json({
      success: true,
      data: teams,
    });
  };

  getTeamsByLeader = async (req: Request, res: Response) => {
    const teams = await this.teamService.getTeamsByLeader(req.params.leaderId);
    res.status(200).json({
      success: true,
      data: teams,
    });
  };

  updateTeam = async (req: Request, res: Response) => {
    const team = await this.teamService.updateTeam(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: team,
    });
  };

  deleteTeam = async (req: Request, res: Response) => {
    await this.teamService.deleteTeam(req.params.id);
    res.status(200).json({
      success: true,
      message: "Team deleted successfully",
    });
  };

  addTeamMember = async (req: Request, res: Response) => {
    let member;
    if (req.body.email) {
      member = await this.teamService.addTeamMemberByEmail(req.params.teamId, req.body.email);
    } else {
      member = await this.teamService.addTeamMember(req.params.teamId, req.body.userId);
    }

    res.status(201).json({
      success: true,
      data: member,
    });
  };

  removeTeamMember = async (req: Request, res: Response) => {
    await this.teamService.removeTeamMember(req.params.teamId, req.params.userId);
    res.status(200).json({
      success: true,
      message: "Member removed from team successfully",
    });
  };

  getTeamMembers = async (req: Request, res: Response) => {
    const members = await this.teamService.getTeamMembers(req.params.teamId);
    res.status(200).json({
      success: true,
      data: members,
    });
  };

  acceptInvitation = async (req: Request, res: Response) => {
    // Assuming userId comes from auth middleware (req.user.id)
    // But route might differ. Let's see. 
    // Route: /teams/:teamId/accept 
    // We need to know WHICH user is accepting. It must be the logged in user.
    const userId = res.locals.user.id;
    await this.teamService.acceptInvitation(req.params.teamId, userId);
    res.status(200).json({ success: true, message: "Invitation accepted" });
  }

  rejectInvitation = async (req: Request, res: Response) => {
    const userId = res.locals.user.id;
    await this.teamService.rejectInvitation(req.params.teamId, userId);
    res.status(200).json({ success: true, message: "Invitation rejected" });
  }

  getPendingInvitations = async (req: Request, res: Response) => {
    console.log("TeamController.getPendingInvitations called");
    const userId = res.locals.user?.id;
    console.log("UserID from locals:", userId);

    if (!userId) {
      console.error("User ID missing in locals");
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    try {
      const invites = await this.teamService.getPendingInvitations(userId);
      console.log("Invites fetched:", invites);
      res.status(200).json({ success: true, data: invites });
    } catch (err) {
      console.error("Error in getPendingInvitations:", err);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
}
