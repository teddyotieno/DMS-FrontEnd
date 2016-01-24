var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  require('dotenv').load();
}
var seeder = require('mongoose-seed');
var Users = require('../server/models/user');
var Documents = require('../server/models/document');
var Roles = require('../server/models/role');
var userData;


// Data array containing seed data - documents organized by Model
var userRole = [{
    'model': 'Role',
    'documents': [{
        title: 'Admin'
    }, {
        title: 'Public'
    }]
}, {
    'model': 'User',
    'documents': [{
        name: {
            first: 'Donald',
            second: 'Okwenda'
        },
        username: 'Don',
        title: 'Admin',
        password: 'password',
        email: 'donald@gmail.com'
    }, {
        name: {
            first: 'Peggy',
            second: 'Mutheu'
        },
        username: 'Peggy',
        title: 'Public',

        password: 'password',
        email: 'peggy@gmail.com'
    }, {
        name: {
            first: 'Vaal',
            second: 'Okwenda'
        },
        username: 'Vaal',
        title: 'Public',
        password: 'password',
        email: 'vaal@gmail.com'
    }]
}];

// Connect to MongoDB via Mongoose
seeder.connect(process.env.DB_URL, function() {

    // Load Mongoose models
    seeder.loadModels([
        './server/models/role.js',
        './server/models/user.js',
        './server/models/document.js'

    ]);

    // Clear speerreerrrrrcified collections
    seeder.clearModels(['Role', 'User', 'Document'], function() {
        // Callback to populate DB once collections have been cleared
        seeder.populateModels(userRole);
    });
});

var cb = function(err) {
    if (err) {
        return console.error(err);
    } else {
        console.log('Document successfully seeded!');
    }
};

var seedDocuments = function() {
    Users.find(function(err, users) {
        if (err) {
            return console.error(err);
        }
        userData = users;
        var documentSeed = [{
            title: 'Iphone 6 Review',
            content: 'The phone still features powerful internal components ' +
                'and is being upgraded to Apple’s latest iOS 9 software. ' +
                'The combination of factors mean it could be the ' +
                'ideal choice for bargain hunters.',
            ownerId: userData[0]._id,
            owner: 'Donald'
        }, {
            title: 'Periscope Review',
            content: 'Periscope’s direct tie-ins to Twitter (which bought ' +
                'the company before it even launched) allowed it ' +
                'to quickly be adopted by celebrities ' +
                'and change the way both public figures and ' +
                'Average Joes interact with each other on the Web.',
            ownerId: userData[1]._id,
            owner: 'Peggy'
        }, {
            title: 'Flipboard allows sharing through Facebook Messenger',
            content: 'Flipboard has also added a new button that will ' +
                'show on articles opened from Messenger and allow to easy' +
                'navigate back to their friend’s message to discuss ' +
                'the article or share another story with them.',
            ownerId: userData[2]._id,
            owner: 'Vaal'
        }];
        for (var i = 0, j = documentSeed.length; i < j; i++) {
            var document = new Documents();
            document.title = documentSeed[i].title;
            document.content = documentSeed[i].content;
            document.ownerId = documentSeed[i].ownerId;
            document.owner = documentSeed[i].owner;
            document.save(cb);
        }
    });
};

setTimeout(seedDocuments, 20000);
