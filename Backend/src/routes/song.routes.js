const { Router } = require("express");
const upload = require("../middlewares/upload.middleware");
const { uploadSong } = require("../controllers/song.controller");

const router = Router();

router.post("/", upload.single("song"), uploadSong)

module.exports = router;