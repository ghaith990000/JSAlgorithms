class PrimMST {
    constructor(matrix){
        this.graph = matrix;
        this.numVertices = matrix.length;
    }

    prim(){
        const parent = Array(this.numVertices).fill(-1);
        const key = Array(this.numVertices).fill(Infinity);
        const mstSet = Array(this.numVertices).fill(false);

        key[0] = 0;
        parent[0] = -1;

        for(let count=0; count < this.numVertices - 1; count++){
            const u = this.minKey(key, mstSet);
            mstSet[u] = true;

            for(let v = 0; v < this.numVertices; v++){
                if(graph[u][v] && !mstSet[v] && this.graph[u][v] < key[v]){
                    parent[v] = u;
                    key[v] = this.graph[u][v];
                }
            }
        }

        const mst = [];
        for (let i = 1; i < this.numVertices; i++) {
            mst.push({ u: parent[i], v: i, weight: this.graph[i][parent[i]] });
        }

        return mst;
    }

    minKey(key, mstSet) {
        let min = Infinity;
        let minIndex = -1;

        for (let v = 0; v < this.numVertices; v++) {
            if (!mstSet[v] && key[v] < min) {
                min = key[v];
                minIndex = v;
            }
        }
        return minIndex;
    }
}

// Example usage of Prim's Algorithm
const matrix = [
    [0, 2, 4, 0, 0, 0],
    [2, 0, 1, 4, 2, 0],
    [4, 1, 0, 0, 3, 0],
    [0, 4, 0, 0, 0, 2],
    [0, 2, 3, 0, 0, 2],
    [0, 0, 0, 2, 2, 0]
];

const primGraph = new PrimMST(matrix);
const primMST = primGraph.prim();
console.log("Prim's MST:", primMST);