module.exports = async function routes(fastify, options) {
  fastify.register(require("fastify-jwt"), {
    secret: "subhash",
  });
  fastify.decorate("authenticate", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.get("/secret", { preHandler: [fastify.authenticate] }, (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    fastify.jwt.verify(token, "subhash", (err, data) => {
      if (err)
        return res.status(401).json({ error: true, message: "Unauthorized" });
      req.token_data = data;
      console.log(data);
      return res.send('secret')
    });
  });

  fastify.get("/signup", (req, reply) => {
    const token = fastify.jwt.sign({ foo: "bar" });
    reply.send({
      token,
    });
  });
};
