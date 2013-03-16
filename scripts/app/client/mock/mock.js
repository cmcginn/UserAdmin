define('mock/mock',
    [
    'mock/mock.generator',
    'mock/mock.dataservice.users'
    ],
    function (generator, users) {
        var
            model = generator.model,
            
            dataserviceInit = function () {
                lookup.defineApi(model);
                person.defineApi(model);
                session.defineApi(model);
                attendance.defineApi(model);
                booking.defineApi(model);
                location.defineApi(model);
            };

    return {
        dataserviceInit: dataserviceInit    
    };
});