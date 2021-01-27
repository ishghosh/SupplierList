sap.ui.define([
	"jquery.sap.global",
	"com/supplier/SupplierList/controller/BaseController"
], function (jquery, BaseController) {
	"use strict";

	return BaseController.extend("com.supplier.SupplierList.controller.SupplierDetailView", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.supplier.SupplierList.view.SupplierDetailView
		 */
		onInit: function () {
			var oRouter = this.getRouter();

			this.oView = this.getView();
			this.oFlag = false;

			oRouter.getRoute("RouteSupplierDetailView").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			var oView = this.getView();
			if (this.oFlag === false) {
				this.oArgs = oEvent.getParameter("arguments");
				var Path = "/Suppliers(" + this.oArgs.supplierId + ")";
			} else {
				Path = "/Suppliers(" + oEvent + ")";
			}

			oView.bindElement({
				path: Path,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function () {
						oView.setBusy(true);
					},
					dataReceived: function () {
						oView.setBusy(false);
					}
				}
			});

		},

		_onBindingChange: function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		},
		onOpenLinkPressF4: function () {

			var oView = this.getView();
			if (!this.F4linkName) {
				this.F4linkName = sap.ui.xmlfragment(oView.getId(), "com.supplier.SupplierList.view.Fragment.Change", this);
				this.getView().addDependent(this.F4linkName);
				var F4NameModel = this.getView().getModel();
				this.F4linkName.setModel(F4NameModel);

			}

			this.F4linkName.open();

		},
		onSaveLinkPressF4: function () {

			var that = this;

			var oID = that.byId("idtext").getValue(),
				oName = that.byId("idname").getValue(),

				oConcurrency = that.byId("idconcurrency").getValue(),
				oState = that.byId("idstate").getValue(),
				oCity = that.byId("idcity").getValue(),
				oCountry = that.byId("idcountry").getValue(),
				oZipcode = that.byId("idcode").getValue(),
				oStreet = that.byId("idstreet").getValue();

			var newItem = {
				Address: {
					"State": oState,
					"City": oCity,
					"Street": oStreet,
					"ZipCode": oZipcode,
					"Country": oCountry
				}
			};

			newItem["ID"] = oID;
			newItem["Name"] = oName;

			newItem["Concurrency"] = oConcurrency;

			var sString = "/Suppliers";
			this.sServiceUrl = this.getOwnerComponent().getModel().sServiceUrl;
			var oDefaultModel = new sap.ui.model.odata.ODataModel(this.sServiceUrl);
			// var oDefaultModel = that.getOwnerComponent().getModel();

			oDefaultModel.create(sString, newItem, null,
				function (oData, oResponse) {

					jQuery.sap.require("sap.m.MessageBox");
					sap.m.MessageBox.show("Saving", sap.m.MessageBox.Icon.SUCCESS);
					that.oFlag = true;

					that._onRouteMatched(oID);

					oDefaultModel.setRefreshAfterChange(true);

				},
				function (data_error) {
					var errorMsg;
					errorMsg = JSON.parse(data_error.response.body);
					errorMsg = errorMsg.error.message.value;

					if (errorMsg.length > 0) {
						jQuery.sap.require("sap.m.MessageBox");
						sap.m.MessageBox.show(errorMsg, sap.m.MessageBox.Icon.ERROR);
					} else {
						jQuery.sap.require("sap.m.MessageBox");
						sap.m.MessageBox.show("Error : not successful", sap.m.MessageBox.Icon.ERROR);
					}

				}

			);
			this.F4linkName.close();

		},
		onCloseLinkPressF4: function () {

			if (this.F4linkName) {
				this.F4linkName.close();
			}
		}

	});

});