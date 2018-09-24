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

  tables := []struct {
		root *ds.TreeNode
		x *ds.TreeNode
		y *ds.TreeNode
    expectedLCA int
	}{
		{threeNode, sevenNode, zeroNode, 3},
	}

  // For every search root, x, y and expectedLCA in table do
  for _, table := range tables {

		res := LowestCommonAncestor(table.root, table.x, table.y)

		if res.Val != table.expectedLCA {
			t.Errorf("LCA of %d and %d with root %d was incorrect, got: %d, want: %d.", table.x.Val, table.y.Val, table.root.Val, res.Val, table.expectedLCA)
		}
	}


}
