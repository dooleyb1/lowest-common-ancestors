// Data Structure taken from https://github.com/mirkokiefer/ancestor

// Import libraries
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

  // Return the length of each walker queue
  function whileCond() {
    return _.some(walkerStack, function(walker) {
      return walker.queue.length
    })
  }

  // Concurrently while there is still a quueu
  async.whilst(whileCond, function(continueCb) {

    // Grab a walker
    var walker = walkerStack.shift()

    // If the walkers queue isn't zero push to stack
    if (walker.queue.length == 0) {
      walkerStack.push(walker)
      return continueCb()
    }

    // Grab node from walker queue
    var node = walker.queue.shift()

    // Grab walker with common ancestor to node
    var walkerWithCommonAncestor = _.find(walkerStack, function(otherWalker) {
      return _.contains(otherWalker.visited, node)
    })

    // If a walker with common ancestor exists
    if (walkerWithCommonAncestor) {
      // If only node in stack return node
      if (walkerStack.length == 1) {
        console.log(walkerStack)
        return cb(null, node)
      } else {
        // Otherwise merge walker with current common ancestors
        walkerWithCommonAncestor.merge(walker)
        continueCb()
      }
    } else {

      // Otherwise declare walker as visited
      walker.visited.push(node)

      // Read parents of node
      readParents(node, function(err, parents) {

        // If error, no parents exist
        if (err) parents = []

        // If parents, add to queue of walker
        walker.queue = walker.queue.concat(parents)

        // Push walker to stack
        walkerStack.push(walker)
        continueCb()
      })
    }
  }, cb)
}

module.exports = lowestCommonAncestor
