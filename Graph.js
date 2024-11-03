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

const graph = new Graph();
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

// Add all vertices
for (let i = 0; i < myVertices.length; i++) {
    graph.addVertex(myVertices[i]);
}

// Add edges between vertices
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

// Print the adjacency list of the graph
console.log(graph.toString());