// Unit tests for lca.go
package main

import (
	ds "github.com/berryjam/leetcode-golang/datastructure"
	"testing"
)

func TestExampleTree(t *testing.T) {
  threeNode := ds.NewTreeNode(3)
	fiveNode := ds.NewTreeNode(5)
	oneNode := ds.NewTreeNode(1)
	sixNode := ds.NewTreeNode(6)
	twoNode := ds.NewTreeNode(2)
	zeroNode := ds.NewTreeNode(0)
	eightNode := ds.NewTreeNode(8)
	sevenNode := ds.NewTreeNode(7)
	fourNode := ds.NewTreeNode(4)

	threeNode.Left = fiveNode
	threeNode.Right = oneNode
	fiveNode.Left = sixNode
	fiveNode.Right = twoNode
	oneNode.Left = zeroNode
	oneNode.Right = eightNode
	twoNode.Left = sevenNode
	twoNode.Right = fourNode

  // Expecting LCA of 7 and 0 to be 3 (root)
	res1 := LowestCommonAncestor(threeNode, sevenNode, zeroNode)

  if res1.Val != 3 {
       t.Errorf("LCA was incorrect, received node.Val: %d, expected node.Val: %d.", res1.Val, 3)
    }


}
