function longRunOperation(callback) {
    setTimeout(callback,3000);
}

function webRequest(request) {
    console.log('starting long operation for request:', request.id);
    longRunOperation(function() {
        console.log('ending a long operation for request:', request.id);
    });
}

webRequest({ id: 1});

webRequest({ id: 2});