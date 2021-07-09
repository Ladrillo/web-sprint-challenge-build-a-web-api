const projects = require('./projects-model');


/**
 * Gets the project specified by the id and attaches it to the request object.
 * Sends a 404 response if the id is not found
 * @type {import("express").RequestHandler}
 * */
const validateId = (req, res, next) => {
	const { id } = req.params;

	projects.get(id).then(project => {
		if (project) {
			req.project = project;
			req.projectId = id;
			next();
		}
		else {
			res.status(404).send("Post not found!");
		}
	}, err => next(err));
};


/**
 * Verifies that the req.body contains all the required properties for a project
 * @type {import("express").RequestHandler}
 *  */
const validateProject = (req, res, next) => {
	if (req.body) {
		const { name, description, completed } = req.body;

		if (name && name.length > 0
			&& description && description.length > 0
			&& (completed !== undefined || req.method === "POST")) {
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

module.exports = {
	validateProject,
	validateId,
};
