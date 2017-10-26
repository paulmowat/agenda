'use strict';
const debug = require('debug')('agenda:db_init');

/**
 * Setup and initialize the collection used to manage Jobs.
 * @param {String} collection name or undefined for default 'agendaJobs'
 * @param {Function} cb called when the db is initialized
 * @returns {undefined}
 */
module.exports = function(collection, cb) {
  const self = this;
  debug('init database collection using name [%s]', collection);
  this._collection = this._mdb.collection(collection || 'agendaJobs');
  debug('attempting index creation');
  if (this._createIndex) {
    this.createIndex(err => {
      if (!err) {
        debug('index creation success');
        self.emit('ready');
      }

      if (cb) {
        cb(err, self._collection);
      }
    });
  } else {
    self.emit('ready');

    if (cb) {
      cb(null, self._collection);
    }
  }
};
