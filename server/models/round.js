'use strict';
const _ = require('lodash');

module.exports = function(Round) {
  Round.draw = function(roundId, cb) {
    Round.findOne({where: {id: roundId}}, function (err, instance) {
      if(err || !instance) {
        console.error(err);
        return cb(err);
      }

      var lots = '';
      var error = null;

      _.forEach(['1', '2'], index => {
        var cnt = 0;
        var availableArr = _.reduce(instance.dice[index], (results, value, key) => {
          if(cnt < instance.max && !value) {
            results.push(key);
          }
          cnt = cnt + 1;
          return results;
        }, []);

        var availableLength = availableArr.length;
        if(!availableLength) {
          error = '跟張明禾說 GG 惹'
          return false;
        }

        var lot = availableArr[_.random(availableLength - 1)];
        lots = lots + lot;
        instance.dice[index][lot] = true;
      });

      if(error) {
        return cb(null, error);
      }

      instance.save((err, instance) => {
        if(err) {
          console.error(err);
          return cb(err);
        }
        cb(null, lots);
      });
    });
  }
  Round.remoteMethod (
    'draw',
    {
      http: {path: '/:id/draw', verb: 'get'},
      accepts: {arg: 'id', type: 'string', required: true},
      returns: {arg: '您抽中的籤為', type: 'string'}
    }
  );
  Round.remoteMethod (
    'draw',
    {
      http: { verb: 'get'},
      accepts: {arg: 'roundId', type: 'string', http: { source: 'query' }, required: true},
      returns: {arg: 'result', type: 'string'}
    }
  );
};
