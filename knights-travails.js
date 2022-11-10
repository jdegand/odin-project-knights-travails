// import Queue from separate file

class Queue {
    constructor() {
      this.items = {};
      this.headIndex = 0;
      this.tailIndex = 0;
    }
    enqueue(item) {
      this.items[this.tailIndex] = item;
      this.tailIndex++;
    }
    dequeue() {
      const item = this.items[this.headIndex];
      delete this.items[this.headIndex];
      this.headIndex++;
      return item;
    }
    peek() {
      return this.items[this.headIndex];
    }
    get length() {
      return this.tailIndex - this.headIndex;
    }
}

const isWithinBoard = (pos) => {
  return pos[0] >= 0 && pos[0] < 8 && pos[1] >= 0 && pos[1] < 8;
};

const posToString = (pos) => {
  return `[${pos[0]},${pos[1]}]`;
}

const getAdjacentMoves = (node) => adjacencyList.get(`[${node}]`);

const getPath = (previousMoves, start, end) => {
  // use queue here -> path returns [objectObject]
  // can or does this have to be optimized 
  const path = [posToString(end)];
  const startToString = posToString(start);
  let endToString = posToString(end);
  
  while (endToString !== startToString){
    const predecessor = previousMoves.get(endToString);
    path.unshift(predecessor);
    endToString = predecessor;
  }

  return path;
}

// creating the adjacencyList is only dependent on the grid size
// break off into own file ?

const adjacencyList = new Map();

for (let x = 0; x < 8; x++){
  for (let y = 0; y < 8; y++){
        let possibleMoves = [
            [x+2,y+1],[x+2,y-1],
            [x-2,y+1],[x-2,y-1],
            [x+1,y+2],[x-1,y+2],
            [x+1,y-2],[x-1,y-2]
          ];

        possibleMoves = possibleMoves.filter(move => {
            return isWithinBoard(move);
        });

        adjacencyList.set(`[${x},${y}]`, possibleMoves);
    }
}

const knightMoves = (startPos, endPos) => {
    if (!isWithinBoard(startPos) || !isWithinBoard(endPos)){
      throw new Error("Outside the board");
    }
    
    const queue = new Queue;
    queue.enqueue(startPos)

    const previous = new Map();
    const visited = new Set();
    visited.add(posToString(startPos));
  
    while (queue.length > 0){
          const node = queue.dequeue();

          if (node[0] === endPos[0] && node[1] === endPos[1]){
            const path = getPath(previous, startPos, endPos);
            const result = `=> You made it in ${path.length - 1} moves! Here's your path: ${path}`;
            
            return result;
          }
  
          const possibleMoves = getAdjacentMoves(node);

          for (const move of possibleMoves){
              if (!visited.has(posToString(move))){
                queue.enqueue(move);

                previous.set(posToString(move), posToString(node));
                visited.add(posToString(node));
              }
          }
      }
  }
  
  const data = knightMoves([0,0],[3,3]);
  console.log(data)
  console.log(adjacencyList)