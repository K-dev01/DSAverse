export const templates = [
  {
    id: 'binary-search',
    title: 'Binary Search',
    description: 'Search in a sorted array by halving the search range until the target is found.',
    syntax: `int left = 0;
int right = n - 1;
while (left <= right) {
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
}
return -1;`,
    explanation: 'Binary search works on sorted data and reduces the search space by half each step. Use it for exact matches or boundary conditions when the data is ordered.',
  },
  {
    id: 'dfs',
    title: 'DFS',
    description: 'Depth-first traversal using recursion or an explicit stack.',
    syntax: `void dfs(int node) {
    visited[node] = true;
    for (int next : graph[node]) {
        if (!visited[next]) dfs(next);
    }
}
`,
    explanation: 'DFS explores one branch fully before backtracking. It is ideal for connectivity, path finding, and recursive structure traversal.',
  },
  {
    id: 'bfs',
    title: 'BFS',
    description: 'Breadth-first traversal using a queue to process nodes level by level.',
    syntax: `queue<int> q;
q.push(start);
visited[start] = true;
while (!q.empty()) {
    int node = q.front();
    q.pop();
    for (int next : graph[node]) {
        if (!visited[next]) {
            visited[next] = true;
            q.push(next);
        }
    }
}
`,
    explanation: 'BFS expands outward from the start node in layers, making it the right choice for shortest paths in unweighted graphs and level-order traversals.',
  },
  {
    id: 'merge-sort',
    title: 'Merge Sort',
    description: 'Divide-and-conquer sort that splits the array, sorts halves, and merges them.',
    syntax: `void mergeSort(vector<int>& arr, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}
`,
    explanation: 'Merge sort recursively sorts halves and merges them back together. It is stable and predictable with O(n log n) runtime.',
  },
  {
    id: 'quick-sort',
    title: 'Quick Sort',
    description: 'A pivot-based divide-and-conquer sort with average case O(n log n).',
    syntax: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) swap(arr[++i], arr[j]);
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pivot = partition(arr, low, high);
        quickSort(arr, low, pivot - 1);
        quickSort(arr, pivot + 1, high);
    }
}
`,
    explanation: 'Quick sort partitions around a pivot and recursively sorts each side. Use random pivots or median selection to avoid worst-case behavior.',
  },
  {
    id: 'union-find',
    title: 'Union Find',
    description: 'Disjoint-set structure for efficient connectivity and component queries.',
    syntax: `int find(int x) {
    return parent[x] == x ? x : parent[x] = find(parent[x]);
}

void unite(int a, int b) {
    a = find(a);
    b = find(b);
    if (a != b) parent[b] = a;
}
`,
    explanation: 'Use union-find to group nodes and answer connectivity questions quickly with nearly constant time operations.',
  },
  {
    id: 'trie',
    title: 'Trie',
    description: 'Prefix tree for efficient string lookup and prefix search.',
    syntax: `struct Node {
    Node* next[26] = {};
    bool end = false;
};

void insert(Node* root, const string& s) {
    Node* node = root;
    for (char c : s) {
        int i = c - 'a';
        if (!node->next[i]) node->next[i] = new Node();
        node = node->next[i];
    }
    node->end = true;
}
`,
    explanation: 'Trie stores characters in a tree structure, making prefix operations and search efficient for large string sets.',
  },
  {
    id: 'dijkstra',
    title: 'Dijkstra',
    description: 'Shortest path algorithm for weighted graphs with non-negative edges.',
    syntax: `priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
vector<int> dist(n, INT_MAX);
dist[start] = 0;
pq.push({0, start});
while (!pq.empty()) {
    auto [d, node] = pq.top();
    pq.pop();
    if (d > dist[node]) continue;
    for (auto& edge : graph[node]) {
        int next = edge.first;
        int w = edge.second;
        if (dist[next] > d + w) {
            dist[next] = d + w;
            pq.push({dist[next], next});
        }
    }
}
`,
    explanation: 'Dijkstra finds shortest paths from a source by continuously selecting the closest unsettled node.',
  },
  {
    id: 'fenwick-tree',
    title: 'Fenwick Tree',
    description: 'Binary indexed tree for prefix sums and point updates in logarithmic time.',
    syntax: `void update(int i, int delta) {
    while (i <= n) {
        fenw[i] += delta;
        i += i & -i;
    }
}

int query(int i) {
    int sum = 0;
    while (i > 0) {
        sum += fenw[i];
        i -= i & -i;
    }
    return sum;
}
`,
    explanation: 'Fenwick tree is a compact structure for dynamic prefix queries and updates.',
  },
  {
    id: 'segment-tree',
    title: 'Segment Tree',
    description: 'Tree structure supporting range queries and updates over an array.',
    syntax: `void build(int idx, int left, int right) {
    if (left == right) tree[idx] = arr[left];
    else {
        int mid = (left + right) / 2;
        build(idx*2, left, mid);
        build(idx*2+1, mid+1, right);
        tree[idx] = combine(tree[idx*2], tree[idx*2+1]);
    }
}
`,
    explanation: 'Segment trees support efficient range queries and modifications in logarithmic time per operation.',
  },
  {
    id: 'kadane',
    title: 'Kadane',
    description: 'Maximum subarray algorithm using dynamic programming over a running sum.',
    syntax: `int maxSoFar = nums[0];
int maxEndingHere = nums[0];
for (int i = 1; i < n; i++) {
    maxEndingHere = max(nums[i], maxEndingHere + nums[i]);
    maxSoFar = max(maxSoFar, maxEndingHere);
}
`,
    explanation: 'Kadane computes the maximum contiguous subarray in linear time by tracking the best segment ending at each position.',
  },
  {
    id: 'prefix-sum',
    title: 'Prefix Sum',
    description: 'Precompute cumulative sums to answer range queries quickly.',
    syntax: `vector<int> prefix(n + 1);
prefix[0] = 0;
for (int i = 0; i < n; i++) {
    prefix[i+1] = prefix[i] + arr[i];
}
int rangeSum = prefix[r+1] - prefix[l];
`,
    explanation: 'Prefix sums are ideal for static range queries that require repeated subarray calculations.',
  },
]
