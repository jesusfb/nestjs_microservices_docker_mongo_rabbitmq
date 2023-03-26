print('START ##############################################');
db.auth('root', 'root');
db = db.getSiblingDB('superflights');
db.createUser({
  user: 'administrator',
  pwd: 'administrator',
  roles: [{ role: 'readWrite', db: 'superflights' }]
});
db.createCollection('users');
db.createCollection('passengers');
db.createCollection('flights');
print('END ##############################################');