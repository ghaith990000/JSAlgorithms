import Queue from './Queue.js';

class Dictionary {
    constructor(){
        this.items = {};
    }

    set(key, value){
        this.items[key] = value;
    }

    get(key){
        return this.items.hasOwnProperty(key) ? this.items[key] : undefined;
    }

    has(key){
        return this.items.hasOwnProperty(key);
    }

    remove(key){
        if(this.has(key)){
            delete this.items[key];
            return true;
        }
        return false;
    }

    keys(){
        return Object.keys(this.items);
    }
}

class Graph {
    constructor(){
        this.vertices = [];
        this.adjList = new Dictionary();
    }

    addVertex(v){
        this.vertices.push(v);
        this.adjList.set(v, []);
    }

    addEdge(v, w){
        this.adjList.get(v).push(w);
        this.adjList.get(w).push(v);
    }
    
    initializeColor(){
        const color = {};
        for(let i = 0; i < this.vertices.length; i++){
            color[this.vertices[i]] = 'white';
        }
        return color;
    }

    dfs(callback){
        const color = this.initializeColor();
        for (let i = 0; i < this.vertices.length; i++){
            if(color[this.vertices[i]] === 'white'){
                this.dfsVisit(this.vertices[i], color, callback);
            }
        }
    }

    dfsVisit(u, color, callback){
        color[u] = 'grey';
        if(callback){
            callback(u);
        }
        const neighbors = this.adjList.get(u);
        for(let i = 0; i < neighbors.length; i++){
            const w = neighbors[i];
            if(color[w] === 'white'){
                this.dfsVisit(w, color, callback);
            }
        }
        color[u] = 'black';
    }

    bfs(v, callback){
        const color = this.initializeColor();
        const queue = new Queue();
        queue.enqueue(v);

        while(!queue.isEmpty()){
            const u = queue.dequeue();
            const neighbors = this.adjList.get(u);
            color[u] = 'grey';

            for(let i = 0; i < neighbors.length; i++){
                const w = neighbors[i];
                if(color[w] === 'white'){
                    color[w] = 'grey';
                    queue.enqueue(w);
                }
            }
            color[u] = 'black';
            if(callback){
                callback(u);
            }
        }
    }

    shortestPathWithBFS(v){
        const color = this.initializeColor();
        const queue = new Queue();
        const distances = {};
        const predecessors = {};

        for(let i = 0; i < this.vertices.length; i++){
            distances[this.vertices[i]] = 0;
            predecessors[this.vertices[i]] = null;
        }

        queue.enqueue(v);

        while(!queue.isEmpty()){
            const u = queue.dequeue();
            const neighbors = this.adjList.get(u);
            color[u] = 'grey';

            for(let i = 0; i < neighbors.length; i++){
                const w = neighbors[i];
                if(color[w] === 'white'){
                    color[w] = 'grey';
                    distances[w] = distances[u] + 1;
                    predecessors[w] = u;
                    queue.enqueue(w);
                }
            }
            color[u] = 'black';
        }

        return {
            distances: distances,
            predecessors: predecessors
        }
    }

    printShortestPaths(source){
        const shortestPathData = this.shortestPathWithBFS(source);
        const { distances, predecessors} = shortestPathData;

        console.log("Distances from source:", distances);
        console.log("Predecessors:", predecessors);

        for( let i = 0; i < this.vertices.length; i++){
            const toVertex = this.vertices[i];
            if(toVertex !== source){
                const path = [];
                for (let v = toVertex; v !== null; v = predecessors[v]){
                    path.push(v);
                }
                path.reverse();
                console.log(`Path from ${source} to ${toVertex} : ${path.join(" - ")}`);
            }
        }
    }

    toString(){
        let s = '';
        for (let i = 0; i < this.vertices.length; i++){
            s += this.vertices[i] + '->';
            const neighbors = this.adjList.get(this.vertices[i]);
            for( let j = 0; j < neighbors.length; j++){
                s += neighbors[j] + ' ';
            }
            s += '\n';
        }
        return s;
    }
}

// Example usage:
const graph = new Graph();
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F'];

for (let i = 0; i < myVertices.length; i++) {
    graph.addVertex(myVertices[i]);
}

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('B', 'E');
graph.addEdge('C', 'F');

const printNode = (value) => console.log(`Visited vertex: ${value}`);
graph.dfs(printNode);