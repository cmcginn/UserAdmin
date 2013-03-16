define('mock/mock.dataservice.user',
    ['amplify'],
    function (amplify) {
        var
		    defineApi = function (model) {

		    amplify.request.define('users', function (settings) {
		        settings.success(model.generateUsers().users);
		    });

		};
        
        return {
            defineApi: defineApi
        };
    });