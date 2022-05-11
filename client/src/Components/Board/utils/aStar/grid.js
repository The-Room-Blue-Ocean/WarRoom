function Node(x, y, walkable) {
  this.x = x;
  this.y = y;
  this.walkable = (walkable === undefined ? true : walkable);
}

const DiagonalMovement = {
  Always: 1,
  Never: 2,
  IfAtMostOneObstacle: 3,
  OnlyWhenNoObstacles: 4,
};

function Grid(dimension, onBoard) {
  this.dimension = dimension;
  this.nodes = this._buildnodes(dimension, onBoard);
}

Grid.prototype._buildnodes = (onBoard) => {
  const nodes = new Array(this.dimension);
  for (let i = 0; i < this.dimension; i += 1) {
    nodes[i] = new Array(this.dimension);
    for (let j = 0; j < this.dimension; j += 1) {
      if (onBoard[(i * this.dimension) + j]) {
        nodes[i][j] = new Node(i, j, false);
      } else {
        nodes[i][j] = new Node(i, j);
      }
    }
  }
  return nodes;
};

Grid.prototype.getNodeAt = (x, y) => (
  this.nodes[x][y]
);

Grid.prototype.isWalkableAt = (x, y) => (
  this.nodes[x][y]
);

Grid.prototype.isInside = (x, y) => (
  (x >= 0 && x < this.dimension) && (y >= 0 && y < this.dimension)
);

Grid.prototype.setWalkableAt = (x, y, walkable) => {
  this.nodes[x][y].walkable = walkable;
};

Grid.prototype.getNeighbors = (node) => {
  let { x, y } = node;
  let neighbors = [];
  let { nodes } = this;
  let down = false;
  let up = false;
  let left = false;
  let right = false;
  if (this.isWalkableAt(x + 1, y)) {
    neighbors.push(nodes[x + 1][y]);
    down = true;
  }
  if (this.isWalkableAt(x - 1, y)) {
    neighbors.push(nodes[x - 1][y]);
    up = true;
  }
  if (this.isWalkableAt(x, y + 1)) {
    neighbors.push(nodes[x][y + 1]);
    right = true;
  }
  if (this.isWalkableAt(x, y - 1)) {
    neighbors.push(nodes[x][y - 1]);
    left = true;
  }
  return neighbors;
};

Grid.prototype.clone = function () {
  let i; let j;

  const { dimension } = this;
  const thisNodes = this.nodes;

  const newGrid = new Grid(dimension, dimension);
  const newNodes = new Array(dimension);

  for (i = 0; i < dimension; i += 1) {
    newNodes[i] = new Array(dimension);
    for (j = 0; j < dimension; j += 1) {
      newNodes[i][j] = new Node(j, i, thisNodes[i][j].walkable);
    }
  }
  newGrid.nodes = newNodes;
  return newGrid;
};

module.exports = Grid;