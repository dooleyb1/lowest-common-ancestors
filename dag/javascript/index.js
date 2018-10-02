// Data Structure taken from https://github.com/mirkokiefer/ancestor
var _ = require('underscore')
var async = require('async')

// Walker method to record visited nodes
function Walker(startNode) {
  this.visited = []
  this.queue = [startNode]
}

// Merging walker method
Walker.prototype.merge = function(walker) {
  this.queue = _.union(this.queue, walker.queue)
}

// Method to find LCA
function lowestCommonAncestor(startNodes, readParents, cb) {

  // If less than 2 nodes, return the first node as LCA
  if (startNodes.length < 2)
    return cb(null, startNodes[0])

  // Map each search node with a walker
  var walkerStack = startNodes.map(function(each){
    return new Walker(each)
  })

  //
  function whileCond() {
    return _.some(walkerStack, function(walker) {
      return walker.queue.length
    })
  }
  
  async.whilst(whileCond, function(continueCb) {
    var walker = walkerStack.shift()
    if (walker.queue.length == 0) {
      walkerStack.push(walker)
      return continueCb()
    }
    var node = walker.queue.shift()
    var walkerWithCommonAncestor = _.find(walkerStack, function(otherWalker) {
      return _.contains(otherWalker.visited, node)
    })
    if (walkerWithCommonAncestor) {
      if (walkerStack.length == 1) {
        return cb(null, node)
      } else {
        walkerWithCommonAncestor.merge(walker)
        continueCb()
      }
    } else {
      walker.visited.push(node)
      readParents(node, function(err, parents) {
        if (err) parents = []
        walker.queue = walker.queue.concat(parents)
        walkerStack.push(walker)
        continueCb()
      })
    }
  }, cb)
}

module.exports = lowestCommonAncestor
