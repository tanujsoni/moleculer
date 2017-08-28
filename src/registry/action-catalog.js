/*
 * moleculer
 * Copyright (c) 2017 Ice Services (https://github.com/ice-services/moleculer)
 * MIT Licensed
 */

"use strict";

const _ = require("lodash");
//const BaseCatalog = require("./base-catalog");
const EndpointList = require("./endpoint-list");

class ActionCatalog {

	constructor(registry, broker, logger) {
		this.registry = registry;
		this.broker = broker;
		this.logger = logger;

		this.actions = new Map();
	}

	add(node, service, action) {
		let list = this.actions.get(action.name);
		if (!list) {
			// Create a new EndpointList
			list = new EndpointList(this.registry, this.broker, this.logger, action.name);
			this.actions.set(action.name, list);
		}

		list.add(node, service, action);
	}
/*
	has(name, version, nodeID) {
		return this.actions.find(svc => svc.equals(name, version, nodeID)) != null;
	}
*/
	get(actionName) {
		return this.actions.get(actionName);
	}

	removeByService(service) {
		this.actions.forEach(list => {
			list.removeByService(service);
		});
	}
}

module.exports = ActionCatalog;
