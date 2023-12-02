import Team from "../models/team-model.js";

class TeamController {
  constructor() {}

  /**
   * @method addTeam
   */
  async addTeam(req, res) {
    try {
      const newTeam = await Team.create(req.body);

      res
        .status(201)
        .json({ message: "Team created successfully", team: newTeam });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /**
   * @method getTeam
   */
  async getTeam(req, res) {
    try {
      const team = await Team.findById(req.params.id);

      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }

      res.status(200).json({ team });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default TeamController = new TeamController();
