'use strict';
const debug = require('debug')('agenda:createIndex');

/**
 * Setup and initialize the collection used to manage Jobs.
 * @param {String} collection name or undefined for default 'agendaJobs'
 * @param {Function} cb called when the db is initialized
 * @returns {undefined}
 */
module.exports = function(cb) {
  const self = this;
  debug('attempting index creation');
  this._collection.createIndex(this._indices, {
    name: 'findAndLockNextJobIndex'
  }, (err, result) => {
    if (err) {
      debug('index creation failed');
      self.emit('error', err);
    } else {
      debug('index creation success');
      self.emit('index:created', result);
    }

    if (cb) {
      cb(err);
    }
  });
};
