sap.ui.define([
	"jquery.sap.global",
	"com/supplier/SupplierList/controller/BaseController"
], function (jquery, BaseController) {
	"use strict";

	return BaseController.extend("com.supplier.SupplierList.controller.SupplierListView", {
		onInit: function () {
			this.oService = this.getOwnerComponent().getModel();
			this._fnInitialCall();
			this.oDialog = new sap.m.BusyDialog();
			this.oDialog.open();
			this.getRouter().attachRouteMatched(this._fnInitialCall, this);
		},
		// onBeforeRendering: function () {
		// 	this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		// 	this._oRouter.attachRouteMatched(this._fnInitialCall, this);
		// },
		//initial getCall
		_fnInitialCall: function () {
			this.oService.read("/Suppliers", {
				success: jQuery.proxy(this._fnSuccessGet, this),
				error: jQuery.proxy(this._fnErrorGet, this)
			});
		},
		//function for success call
		_fnSuccessGet: function (odata, response) {
			this.oDialog.close();
			var oModel = new sap.ui.model.json.JSONModel(odata);
			var oList = this.getView().byId("idsupplierlist");

			var oModel2 = new sap.ui.model.json.JSONModel(oModel.getProperty("/results"));
			oList.setModel(oModel2);

			oList.setHeaderText(oModel.getObject("/results/0/Name"));

		},
		//function for error call
		_fnErrorGet: function (err) {
			this.oDialog.close();
		},

		onListItemPressed: function (oEvent) {
			var oItem, oCtx;

			oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext();

			this.getRouter().navTo("RouteSupplierDetailView", {
				supplierId: oCtx.getProperty("ID")
			});

		}
	});
});