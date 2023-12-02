import express from "express";
const router = express.Router();
import UserController from "../controllers/user-controller.js";
import TeamController from "../controllers/team-controller.js";
import teamModel from "../models/team-model.js";
// Users ----->
router.post("/users", UserController.addUser);
router.get("/users", UserController.getUsers);
router.get("/users/:id", UserController.getDetails);
router.put("/users/:id", UserController.editUser);
router.delete("/users/:id", UserController.deleteUser);

// Teams ------>

const TEAM = teamModel;

router.get("/allTeam", async (req, res) => {
    try {
      const teams = await TEAM.find();
      res.json({ success: true, teams });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, error: "Internal server error occurred" });
    }
  });
router.get("/Team/:id",async (req, res) => {
    try {
        let success=false;
        const team = await TEAM.findById(req.params.id);
        if(team.length<0){
            return res.status(200).json({ success, error: "Team is not found" })
        }
        success=true;
        res.json({success,team});

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
});


router.post("/addTeam", async (req, res) => {
    try {
        let success=false;
        const { teamName, description, member } = req.body;
        const team = new TEAM({
            teamName,
            description,
            member,
        });

        // Save the team
        const savedTeam = await team.save();

        res.json({ success: true, savedTeam });

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
})
//search 

router.get("/searchByName", async (req, res) => {
    try {
        let success=false;
        var query = req.query.search;
        const query_data = await USER.find({
            $or: [
                { "first_name": { $regex: ".*" + query + ".*", $options: 'i' } },
                { "last_name": { $regex: ".*" + query + ".*", $options: 'i' } }
            ]
        });

        if (query_data === 0) {
            return res.status(200).json({ success, error: "Data is not found" })
        }
        success=true;
        res.json({success,query_data});

    } catch (error) {
        res.status(500).json("Internal server error occured");
    }
});
router.get('/domains', async (req, res) => {
    try {
        const uniqueDomains = await USER.distinct('domain');
        res.json(uniqueDomains);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/gender', async (req, res) => {
    try {
        const uniqueDomains = await USER.distinct('gender');
        res.json(uniqueDomains);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/available', async (req, res) => {
    try {
        const queryObject={};
        queryObject.available=true
        const uniqueAvailable =   await USER.find(queryObject);
        
        res.json(uniqueAvailable);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get("/searchByFilter", async (req, res) => {
    let success = false;
    try {
        const domain = req.query.domain;
        const gender = req.query.gender;
        const available =req.query.available;
        const queryObject={};
        if(domain){
            queryObject.domain=domain;
        }
        if(gender){
            queryObject.gender=gender;
        }
        if(available==="true"){
            queryObject.available=true
        }
        if(available==="false"){
            queryObject.available=false
            
        }
        const filter_data = await USER.find(queryObject);

        if (filter_data.length === 0) {
            return res.status(200).json({ success, error: "Data is not found" })

        } 
        success=true
        res.json({success,filter_data});

    } catch (error) {
        res.status(500).json("Internal server error occured");
    }
});



export default router;
