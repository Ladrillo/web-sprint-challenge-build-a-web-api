// add middlewares here related to projects

/** @type {import("express").RequestHandler} */
const validateProject = (req, res, next) => {
	if (req.body) {
		const { name, description, completed } = req.body;

		if (name && name.length > 0 && description && description.length > 0) {
			req.newPost = {
				name,
				description,
				completed: Boolean(completed)
			};
			next();
		}
		else {
			res.status(400).send("bad request");
		}
	}
};

module.exports = {
	validateProject,
};
