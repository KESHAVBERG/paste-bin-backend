export const timeProvider = (req, res, next) => {
  if (process.env.TEST_MODE === "1" && req.headers["x-test-now-ms"]) {
    req.now = new Date(Number(req.headers["x-test-now-ms"]));
  } else {
    req.now = new Date();
  }
  next();
};
