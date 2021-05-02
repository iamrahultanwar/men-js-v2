module.exports = (ctx) => {
  const Todo = ctx.Models.get("Todo");

  const index = async (req, res) => {
    try {
      const todos = await Todo.find({}).lean();
      return res.send({ status: true, todos });
    } catch (error) {
      console.log(error);
      return res.send({ status: false, error });
    }
  };

  const create = async (req, res) => {
    const data = req.body;
    try {
      const todo = await Todo.create(data);
      return res.send(todo);
    } catch (error) {
      return res.send(error);
    }
  };

  const show = async (req, res) => {
    const { id } = req.params;
    try {
      const todo = await Todo.findById(id);
      return res.send(todo);
    } catch (error) {
      return res.send(error);
    }
  };

  const update = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const todo = await Todo.findByIdAndUpdate(id, data);
      return res.send(todo);
    } catch (error) {
      return res.send(error);
    }
  };

  const destroy = async (req, res) => {
    const { id } = req.params;
    try {
      const todo = await Todo.findByIdAndDelete(id);
      return res.send(todo);
    } catch (error) {
      return res.send(error);
    }
  };
  return { index, create, show, update, destroy };
};
