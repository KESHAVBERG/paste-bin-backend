import express from "express";
import { createPaste, fetchPaste, renderHTML } from "../controllers/PasteController.js";
import { validateCreatePaste } from "../middleware/validatePaste.js";
import { timeProvider } from "../middleware/timeProvider.js";

const router = express.Router()
router.post("/", validateCreatePaste, createPaste);

// router.post('/', validateCreatePaste, createPaste)
router.get('/:id', timeProvider,fetchPaste)
router.get('/view/:id', renderHTML)

export default router