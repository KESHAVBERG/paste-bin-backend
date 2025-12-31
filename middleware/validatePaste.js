export const validateCreatePaste = (req, res, next) => {
  console.log("DDDDDDDDDDDDDDDDD")
  const { content, ttl_seconds, max_views } = req.body;

  if (!content || typeof content !== "string" || !content.trim()) {
    return res.status(400).json({ error: "content is required" });
  }

  if (ttl_seconds !== undefined) {
    if (!Number.isInteger(ttl_seconds) || ttl_seconds < 1) {
      return res.status(400).json({ error: "ttl_seconds must be ≥ 1" });
    }
  }

  if (max_views !== undefined) {
    if (!Number.isInteger(max_views) || max_views < 1) {
      return res.status(400).json({ error: "max_views must be ≥ 1" });
    }
  }

  next();
};
