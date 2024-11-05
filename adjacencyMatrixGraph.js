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
}

const matrix = [
    [0, 2, 4, 0, 0, 0],
    [0, 0, 1, 4, 2, 0],
    [0, 0, 0, 0, 3, 0],
    [0, 0, 0, 0, 0, 2],
    [0, 0, 0, 3, 0, 2],
    [0, 0, 0, 0, 0, 0]
];

const graph = new AdjacencyMatrixGraph(matrix);
const sourceVertex = 0;
const shortestDistances = graph.dijkstra(sourceVertex);

console.log(`Shortest distances from vertex ${sourceVertex}:`);
shortestDistances.forEach((distance, vertex) => {
    console.log(`To vertex ${vertex}: ${distance}`);
});