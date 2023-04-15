const ExprienceModel = require("../db/models/expriences.model");
module.exports = {
  createExprience: async (req, res) => {
    try {
      const {
        title,
        companyName,
        companyLogo,
        des,
        duration,
        position,
        skills,
      } = req.body;

      const exprience = ExprienceModel({
        title,
        companyName,
        companyLogo,
        des,
        duration,
        position,
        skills,
      });

      await exprience.save((err, result) => {
        if (err) {
          res.status(404).json({
            status: 0,
            message: "something went wrong.",
            error: err.message,
          });
        }
        res.status(200).json({
          status: 1,
          message: "Exprience Added Successfully.",
          result: result,
        });
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        status: 0,
        message: "something went wrong.",
        error: error.message,
      });
    }
  },
  getExpriences: async (req, res) => {
    try {
      await ExprienceModel.find().exec((error, result) => {
        if (error) {
          res.status(404).json({
            status: 0,
            message: "something went wrong.",
            error: error.message,
          });
        }
        res.status(200).json({
          status: 1,
          message: "success",
          expriences: result,
        });
      });
    } catch (error) {
      res.status(404).json({
        status: 0,
        message: "something went wrong.",
        error: error.message,
      });
    }
  },
  deleteExprience: async (req, res) => {
    try {
      const { id } = req.params;
      await ExprienceModel.findByIdAndDelete({ _id: id }).exec(
        (error, result) => {
          if (error) {
            res.status(404).json({
              status: 0,
              message: "something went wrong.",
              error: error.message,
            });
          }
          res.status(200).json({
            status: 1,
            message: "exprience deleted.",
          });
        }
      );
    } catch (error) {
      res.status(404).json({
        status: 0,
        message: "something went wrong.",
        error: error.message,
      });
    }
  },
};
