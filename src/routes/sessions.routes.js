const { Router } = require("express");

const sessionsController = require("../controllers/sessionsController");
const sessionscontroller = new sessionsController();

const sessionsRouter = Router();

sessionsRouter.post("/", sessionscontroller.create);

module.exports = sessionsRouter;
