import net from "net";
import { createEventLoop } from "../domain";

const CLI_PREFIX = "$ ";

const PORT = process.env.PORT || 23;
const { commandMapper } = createEventLoop();
const server = new net.Server();

server.on("connection", async (socket) => {
  console.log(`Recieved connection from ${socket.remoteAddress}`);
  socket.write(CLI_PREFIX);
  socket.on("data", async function (data) {
    socket.setEncoding("utf8");
    const input = data.toString().replace(/(\r\n|\n|\r)/gm, "");
    if (input === "exit") {
      socket.destroy();
      return;
    }

    const result = commandMapper(input);
    socket.write(`${result}\n${CLI_PREFIX}`);
  });
});

server.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
