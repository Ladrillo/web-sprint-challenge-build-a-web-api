const actions = require('./actions-model');
const projects = require('../projects/projects-model');

/**
 * Gets the action specified by the id and attaches it to the request object.
 * Sends a 404 response if the id is not found
 * @type {import("express").RequestHandler}
 * */
const validateId = async (req, res, next) => {
	const { id } = req.params;

	actions.get(id).then(action => {
		if (action) {
			req.actionId = id;
			req.action = action;
			next();
		}
		else {
			res.status(404).send("Action not found!");
		}
	}, err => next(err));
};

/**
 * Verifies that the req.body contains all the required properties for an action
 * @type {import("express").RequestHandler}
 *  */
const validateAction = (req, res, next) => {
	if (req.body) {
		const { project_id, description, notes, completed } = req.body;

		if (project_id !== undefined) {
			projects.get(project_id).then(result => {
				if (!result) {
					res.status(400).send("invalid project id");
					return;
				}

				if (description && description.length > 0
					&& notes && notes.length > 0
					&& (completed != null | req.method === "POST")) {
					req.action = {
						project_id,
						description,
						notes,
						completed: Boolean(completed)
					};
					next();
				}
				else
					res.status(400).send("Bad request");
			}, err => next(err));
		}

		else {
			res.status(400).send("Bad request");
		}
	}
};

module.exports = {
	validateId,
	validateAction
};
