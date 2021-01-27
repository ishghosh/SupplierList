function initModel() {
	var sUrl = "/northwind/V2/(S(hdmnjeihm5qfqr2fy5wfuvzz))/OData/OData.svc/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}