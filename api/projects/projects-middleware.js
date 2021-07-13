const projects = require('./projects-model');



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
