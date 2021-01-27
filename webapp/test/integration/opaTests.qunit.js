/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/supplier/SupplierList/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});