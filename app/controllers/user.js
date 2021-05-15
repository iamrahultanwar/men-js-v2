module.exports = (ctx) => {
  const User = ctx.container.Models.get("User");

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
    const data = req.body;
    try {
      const user = await User.create(data);
      return res.send(user);
    } catch (error) {
      return res.send(error);
    }
  };

  const show = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      return res.send(user);
    } catch (error) {
      return res.send(error);
    }
  };

  const update = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const user = await User.findByIdAndUpdate(id, data);
      return res.send(user);
    } catch (error) {
      return res.send(error);
    }
  };

  const destroy = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(id);
      return res.send(user);
    } catch (error) {
      return res.send(error);
    }
  };

   const query = async (req, res) => {
    const query = req.body;
    try {
      const user = await User.find()
        .field(query)
        .keyword(query)
        .filter(query)
        .order(query)
        .page(query);
      return res.send(user);
    } catch (error) {
      return res.send(error);
    }
  };

  return { index, create, show, update, destroy, query };
};
