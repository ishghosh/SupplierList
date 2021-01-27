/*global QUnit*/

sap.ui.define([
	"com/supplier/SupplierList/controller/SupplierListView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("SupplierListView Controller");

	QUnit.test("I should test the SupplierListView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});