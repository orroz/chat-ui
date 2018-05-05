'use strict';

var $ = require('jquery');
var _ = require('lodash');
var Backbone = require('backbone');
var SCOPE = {};

var qs = typeof location !== 'undefined' ? location.search : '';

SCOPE.QueryString = (function () {
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split('&');
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split('=');
		// If first entry with this name
		if (typeof query_string[pair[0]] === 'undefined') {
			query_string[pair[0]] = decodeURIComponent(pair[1]);
			// If second entry with this name
		} else if (typeof query_string[pair[0]] === 'string') {
			var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
			query_string[pair[0]] = arr;
			// If third or later entry with this name
		} else {
			query_string[pair[0]].push(decodeURIComponent(pair[1]));
		}
	}
	return query_string;
}());
if(typeof Backbone !== 'undefined'){
	if (!SCOPE.Events) {
		SCOPE.Events = _.extend({}, Backbone.Events);
	}
}

SCOPE.baseConfig = {
	enableLog: true,
	enableMobile: qs.indexOf('enableMobile=1') > -1,
	format_cms_id: 'ZipRecruiter_multy',
	package_style: 'showbox_ziprecruiter_1515581609555',
	maxArrayLength:5,
	apiUrl: '//api.showbox.com',
	//apiUrl: '//api.showbox.com',
	//apiUrl: 'http://localhost:3100',
	embedUrl: "//embed.showbox.com/embed",
	apiKey:'579a320b8eafdeb40b956858',
	accessToken: "5988e25754472e364d1f6658",//  "5a7998629ed5ebdb7f6d8c2e",
	userId: "589e4997a58b784e65c8ddc6",// "5a7998629ed5ebdb7f6d8c2f",
	defaults: {
	},
	pusherConfig: function(){
		return {
			active: true,
			appKey: "f7aad5bc9e1058bc23d1",
			globalChannel: 'global'
		};
	}

};


SCOPE.getCampaign = (callback) => {
	if(SCOPE.QueryString.id &&  /^[a-f\d]{24}$/i.test(SCOPE.QueryString.id)) {
		return $.getJSON(`${SCOPE.baseConfig.apiUrl}/pubCampaign/${SCOPE.QueryString.id}`,callback)
	}
	console.log('could not find campaign id');
	callback();
}

$(document).ajaxSend(function (event, xhr, settings) {
	if (settings.url.indexOf(SCOPE.baseConfig.apiUrl) !== -1) {
		xhr.setRequestHeader('accessToken', SCOPE.baseConfig.accessToken);
		xhr.setRequestHeader('userId',SCOPE.baseConfig.userId);
		xhr.setRequestHeader('apiKey', SCOPE.baseConfig.apiKey);
	}
});

$(document).ajaxError(function (event, xhr) {
	if (xhr.status == 401) {

	} else if (xhr.status == 403) {
		// user tried to get somewhere he can't due to permissions
		console.error('ajaxError 403');
		//localStorage.clear();
		location.href = '/';
	}
});


window.SCOPE = SCOPE;

module.exports = SCOPE;