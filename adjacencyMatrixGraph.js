class AdjacencyMatrixGraph {
    constructor(matrix){
        this.graph = matrix;
        this.numVertices = matrix.length;
    }

    dijkstra(src){
        const distances = Array(this.numVertices).fill(Infinity);
        const visited = Array(this.numVertices).fill(false);
        distances[src] = 0;

        for(let i = 0; i < this.numVertices - 1; i++){
            const u = this.minDistance(distances, visited);
            visited[u] = true;

            for(let v = 0; v < this.numVertices; v++){
                if(!visited[v] && this.graph[u][v] > 0 && distances[u] + this.graph[u][v] < distances[v]){
                    distances[v] = distances[u] + this.graph[u][v];
                }
            }
        }
        return distances;
    }

    minDistance(distances, visited){
        let min = Infinity;
        let minIndex = -1;

        for(let v = 0; v < this.numVertices; v++){
            if(!visited[v] && distances[v] <= min){
                min = distances[v];
                minIndex = v;
            }
        }
        return minIndex;
    }

    // Floyd-Warshall algorithm to find the shortest path between all pairs of vertices
    floydWarshall(){
        const dist = Array.from({length: this.numVertices }, (_, i) => 
            Array.from({length: this.numVertices}, (_, j) => this.graph[i][j])
        );

        for( let k = 0; k < this.numVertices; k++){
            for (let i = 0; i < this.numVertices; i++){
                for (let j = 0; j < this.numVertices; j++){
                    if(dist[i][k] + dist[k][j] < dist[i][j]){
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }
        return dist;
    }
}

// Example usage
const matrix = [
    [0, 2, 4, Infinity, Infinity, Infinity],
    [Infinity, 0, 1, 4, 2, Infinity],
    [Infinity, Infinity, 0, Infinity, 3, Infinity],
    [Infinity, Infinity, Infinity, 0, Infinity, 2],
    [Infinity, Infinity, Infinity, 3, 0, 2],
    [Infinity, Infinity, Infinity, Infinity, Infinity, 0]
];

const graph = new AdjacencyMatrixGraph(matrix);

// Testing Dijkstra's algorithm
const sourceVertex = 0;
const shortestDistances = graph.dijkstra(sourceVertex);
console.log(`Shortest distances from vertex ${sourceVertex} (Dijkstra):`);
shortestDistances.forEach((distance, vertex) => {
    console.log(`To vertex ${vertex}: ${distance}`);
});

// Testing Floyd-Warshall algorithm
const allPairsShortestPaths = graph.floydWarshall();
console.log("All-pairs shortest paths (Floyd-Warshall):");
allPairsShortestPaths.forEach((row, i) => {
    console.log(`From vertex ${i}: ${row}`);
});