const projects = require('./projects-model');

// add middlewares here related to projects

/** @type {import("express").RequestHandler} */
const validateProject = (req, res, next) => {
	if (req.body) {
		const { name, description, completed } = req.body;

		if (name && name.length > 0 && description && description.length > 0) {
			req.project = {
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

/** @type {import("express").RequestHandler} */
const validateId = async (req, res, next) => {
	if (req.params.id) {
		try {
			const project = projects.get(req.params.id);
			if (project) {
				req.project = project;
				req.projectId = req.params.id;
				next();
			}
			else {
				res.status(404).send("Post not found!");
			}
		}
		catch (err) {
			next(err);
		}
	}
};

module.exports = {
	validateProject,
	validateId,
};
