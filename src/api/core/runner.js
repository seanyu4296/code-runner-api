const ivm = require("isolated-vm");

async function runner(code) {
  const logs = [];
  const isolate = new ivm.Isolate({ memoryLimit: 128 });
  const context = await isolate.createContext();
  const jail = context.global;
  await jail.set("global", jail.derefInto());
  const logCallback = function (...args) {
    logs.push(args);
  };
  await context.evalClosure(
    `global.console.log = function(...args) {
	$0.applyIgnored(undefined, args, { arguments: { copy: true } });
    }`,
    [logCallback],
    { arguments: { reference: true } }
  );
  try {
    const script = await isolate.compileScript(code, {
      filename: "sandbox.js",
    });
    const result = await script.run(context, {
      promise: true,
      timeout: 150000,
    });
    return { logs, result };
  } catch (err) {
    return { logs, result: err.stack };
  }
}

module.exports = runner;
