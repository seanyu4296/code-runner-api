const app = require("express")();
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const runner = require("./core/runner");

app.use(awsServerlessExpressMiddleware.eventContext());
app.use((req, res, next) => {
  bodyParser.json({
    verify: (req, res, buf, encoding) => {
      req.rawBody = buf.toString();
    },
  })(req, res, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
      return;
    }
    next();
  });
});

app.get("/", (req, res) => {
  res.send("Health check");
});

app.post("/", async (req, res) => {
  const { code } = req.body;
  const { logs, result } = await runner(code);
  res.send({ logs, result });
});

module.exports = app;
