class UnionFind {
    constructor(size){
        this.parent = Array.from({ length: size}, (_, i) => i);
        this.rank = Array(size).fill(0);
    }

    find(x){
        if (this.parent[x] !== x){
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x, y){
        const rootX = this.find(x);
        const rootY = this.find(y);

        if(rootX !== rootY){
            if(this.rank[rootX] > this.rank[rootY]){
                this.parent[rootY] = rootY;
            } else if(this.rank[rootX] < this.rank[rootY]){
                this.parent[rootX] = rootY;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
        }
    }
}

class KruskalMST {
    constructor(numVertices){
        this.numVertices = numVertices;
        this.edges = [];
    }

    addEdge(u, v, weight){
        this.edges.push({u, v, weight});
    }

    kruskal(){
        const mst = [];
        const uf = new UnionFind(this.numVertices);

        this.edges.sort((a, b) => a.weight - b.weight);

        for(const edge of this.edges){
            if(uf.find(edge.u) !== uf.find(edge.v)){
                mst.push(edge);
                uf.union(edge.u, edge.v);
            }
        }

        return mst;
    }
}

const kruskalGraph = new KruskalMST(6);
kruskalGraph.addEdge(0, 1, 2);
kruskalGraph.addEdge(0, 2, 4);
kruskalGraph.addEdge(1, 2, 1);
kruskalGraph.addEdge(1, 3, 4);
kruskalGraph.addEdge(1, 4, 2);
kruskalGraph.addEdge(2, 4, 3);
kruskalGraph.addEdge(3, 5, 2);
kruskalGraph.addEdge(4, 5, 2);

const kruskalMST = kruskalGraph.kruskal();
console.log("Kruskal's MST:", kruskalMST);