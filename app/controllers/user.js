module.exports = (ctx) => {
  const User = ctx.Models.get("User");
  const index = async (req, res) => {
    try {
      const users = await User.find({}).lean();
      return res.send({ status: true, users });
    } catch (error) {
      console.log(error);
      return res.send({ status: false, error });
    }
  };

  const create = async (req, res) => {
    const { name, email } = req.body;
    try {
      const user = await User.create({ name, email });
      return res.send(user);
    } catch (error) {
      return res.send(error);
    }
  };
  return { index, create };
};
