var findAncestor = require('../index');
var assert = require('assert');

describe('Basic DAG LCA Test 1: ', function () {
  // First create DAG
  var nodes = {
    1: [],
    2: [1],
    3: [2],
    4: [2],
    5: [4],
    6: [3, 5],
    7: [6],
    8: [5],
    9: [8]
  }

  var readParents = function(id, cb) {
    cb(null, nodes[id])
  }

  // LCA Test for nodes [9,7] in DAG
  it('Should return the LCA of nodes [9,7] as node 5', function () {
    findAncestor([9,7], readParents, function(err, res) {
      assert.equal(res, 5);
    })
  });

  // LCA Test for nodes [9,9] in DAG
  it('Should return the LCA of nodes [9,9] as node 9', function () {
    findAncestor([9,9], readParents, function(err, res) {
      assert.equal(res, 9);
    })
  });

  // LCA Test for nodes [4,7] in DAG
  it('Should return the LCA of nodes [4,7] as node 2', function () {
    findAncestor([4,7], readParents, function(err, res) {
      assert.equal(res, 2);
    })
  });
});

describe('Basic DAG LCA Test 2: ', function () {
  // First create DAG
  var nodes = {
    1: [4],
    2: [4, 5],
    3: [6, 7],
    4: [6, 7],
    5: [],
    6: [],
    7: []
  }

  var readParents = function(id, cb) {
    cb(null, nodes[id])
  }

  // LCA Test for nodes [3,4] in DAG
  it('Should return the LCA of nodes [3,4] as node 6', function () {
    findAncestor([3,4], readParents, function(err, res) {
      assert.equal(res, 6);
    })
  });

  // LCA Test for nodes [2,1] in DAG
  it('Should return the LCA of nodes [2,1] as node 4', function () {
    findAncestor([2,1], readParents, function(err, res) {
      assert.equal(res, 4);
    })
  });

  // LCA Test for nodes [1] in DAG
  it('Should return the LCA of nodes [1] as node 1', function () {
    findAncestor([1], readParents, function(err, res) {
      assert.equal(res, 1);
    })
  });
});
