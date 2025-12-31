import Paste from "../schema/Paste.js";
import {renderPasteHTML} from "../Views/PasteView.js";

export const createPaste = async (req, res, next) => {
  try {
    const { content, ttl_seconds, max_views } = req.body;

    const expiresAt = ttl_seconds
      ? new Date(Date.now() + ttl_seconds * 1000)
      : null;
    const paste = await Paste.create({
      content,
      expiresAt,
      maxViews: max_views ?? null,
    });
    res.status(201).json({
      id: paste._id.toString(),
      url: `${process.env.BASE_URL}/api/pastes/view/${paste._id}`,
    });
  } catch (err) {
    next(err);
  }
};

export const fetchPaste = async (req, res, next) => {
  try {
    const paste = await Paste.findById(req.params.id);
    if (!paste) {
      return res.status(404).json({ error: "Not found" });
    }

    if (paste.expiresAt && req.now > paste.expiresAt) {
      return res.status(404).json({ error: "Expired" });
    }

    if (paste.maxViews !== null && paste.views >= paste.maxViews) {
      return res.status(404).json({ error: "View limit reached" });
    }
    paste.views += 1;
    await paste.save();
    res.json({
      content: paste.content,
      remaining_views: paste.maxViews ? paste.maxViews - paste.views : null,
      expires_at: paste.expiresAt,
    });
  } catch (err) {
    next(err);
  }
};

export const renderHTML = async (req, res, next) => {
  try {
    const paste = await Paste.findById(req.params.id);
    if (!paste) return res.sendStatus(404);

    if (paste.expiresAt && new Date() > paste.expiresAt) {
      return res.sendStatus(404);
    }

    if (paste.maxViews !== null && paste.views >= paste.maxViews) {
      return res.sendStatus(404);
    }

    paste.views += 1;
    await paste.save();

    res.status(200).send(renderPasteHTML(paste.content));
  } catch (err) {
    next(err);
  }
};
