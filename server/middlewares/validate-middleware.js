// const validate = (schema) => async (req, res, next) => {
//     try {
//       const parseBody = await schema.parseAsync(req.body);
//       req.body = parseBody;
//       return next();
//     } catch (err) {
//         const status= 422;
//         const message = "Fill the input properly";
//         const extraDetails= err.errors[0].message;
//         const error={
//             status,
//             message,
//             extraDetails,
//         }
//         console.log(error);
//         // res.status(400).json({ msg: message});
//         next(error);
    
//     }
//   };
  
//   module.exports = validate;

const validate = (schema) => async (req, res, next) => {
  try {
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody;
      return next();
  } catch (err) {
      // console.error("Validation Error:", err.errors); // Debugging log

      const error = {
          status: 422,
          message: "Fill the form properly",
          extraDetails: err.errors.map(e => e.message).join(", "), // Collect multiple errors
      };

      next(error); // Pass error to middleware
  }
};

module.exports = validate;

