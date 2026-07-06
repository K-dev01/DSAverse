export const patterns = [
  {
    id: 'arrays',
    title: 'Arrays',
    definition: 'Fixed-size or dynamic sequences of contiguous elements, ideal for index-based access and sequential scans.',
    keywords: ['index', 'loop', 'slice', 'contiguous', 'subarray'],
    whenToUse: 'Use arrays when you need ordered storage with direct element access and predictable memory layout.',
    visualization: 'Think of a horizontal row of values where you can look up or update any position directly.',
    template: `for (int i = 0; i < n; i++) {
    // access arr[i]
}
`,
    complexities: 'Access O(1), search O(n), insert/delete O(n) in the middle.',
    mistakes: 'Ignoring bounds checks, using expensive shifts for frequent inserts, and assuming dynamic resizing is free.',
    tips: 'Prefer arrays for dense data and preallocate size when possible to avoid reallocation overhead.',
  },
  {
    id: 'strings',
    title: 'Strings',
    definition: 'A specialized sequence of characters with support for substring search, concatenation, and parsing.',
    keywords: ['substring', 'concatenate', 'search', 'parse', 'tokenize'],
    whenToUse: 'Use strings when working with text, parsing input, or performing pattern matching and transformations.',
    visualization: 'Imagine a chain of characters where operations can split, join, and search patterns across the sequence.',
    template: `std::string s = "";
for (char c : input) {
    // build or modify string
}
`,
    complexities: 'Access O(1), append amortized O(1), substring/find O(n).',
    mistakes: 'Using repeated concatenation in loops without reserving and confusing size() with length().',
    tips: 'Use reserve for growing strings and use find/substr carefully to avoid extra copies.',
  },
  {
    id: 'sliding-window',
    title: 'Sliding Window',
    definition: 'A technique that examines a moving window of elements over a sequence for optimal subarray and substring solutions.',
    keywords: ['window', 'subarray', 'two pointers', 'dynamic window', 'continuous range'],
    whenToUse: 'Use sliding window for problems that require a bounded subrange, such as sum, maximum, or unique count over contiguous elements.',
    visualization: 'Slide a frame across the array, expanding and contracting the range while maintaining the current result.',
    template: `int left = 0;
for (int right = 0; right < n; right++) {
    // include arr[right]
    while (needShrink) {
        // remove arr[left]
        left++;
    }
}
`,
    complexities: 'O(n) for one-pass window problems, assuming updates inside the loop are O(1).',
    mistakes: 'Forgetting to shrink the left pointer correctly or using a nested loop that degrades to O(n^2).',
    tips: 'Track window invariants carefully and update your result only after the window meets the target condition.',
  },
  {
    id: 'two-pointer',
    title: 'Two Pointer',
    definition: 'A pattern using two indices moving through a sequence to compare, pair, or partition values efficiently.',
    keywords: ['left right', 'sorted', 'pair sum', 'in-place', 'partition'],
    whenToUse: 'Use two pointers on sorted arrays, linked lists, or when looking for pairs or partitions with linear time.',
    visualization: 'Place one pointer at the start and one at the end, then move them based on the condition you are trying to satisfy.',
    template: `int left = 0, right = n - 1;
while (left < right) {
    // compare arr[left] and arr[right]
    if (condition) left++;
    else right--;
}
`,
    complexities: 'O(n) when each pointer moves monotonically through the array.',
    mistakes: 'Assuming the array is unsorted or failing to update both pointers correctly after a match.',
    tips: 'Use this pattern for sum pair problems, palindrome checks, and removing duplicates in-place.',
  },
  {
    id: 'prefix-sum',
    title: 'Prefix Sum',
    definition: 'A method that precomputes cumulative values to answer range queries quickly.',
    keywords: ['cumulative', 'range query', 'sum', 'precompute', 'difference array'],
    whenToUse: 'Use prefix sum when you need repeated range sums or counts over a static array.',
    visualization: 'Build a running total so any subarray sum can be retrieved by subtracting two prefix values.',
    template: `std::vector<int> prefix(n + 1);
prefix[0] = 0;
for (int i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + arr[i];
}
int rangeSum = prefix[r + 1] - prefix[l];
`,
    complexities: 'Precompute O(n), query O(1).',
    mistakes: 'Off-by-one errors in prefix indices and using it for problems with frequent updates without a segment tree.',
    tips: 'Use prefix sums for static arrays and consider partial sums for multiple dimensions or constraints.',
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    definition: 'A divide-and-conquer method that reduces search space by half each step on sorted data.',
    keywords: ['sorted', 'mid', 'lower_bound', 'upper_bound', 'predicate'],
    whenToUse: 'Use binary search for sorted arrays, monotonic conditions, or answer-finding with a boolean check.',
    visualization: 'Split the range in half repeatedly until the target or boundary is found.',
    template: `int left = 0, right = n - 1;
while (left <= right) {
    int mid = left + (right - left) / 2;
    if (check(mid)) right = mid - 1;
    else left = mid + 1;
}
`,
    complexities: 'O(log n).',
    mistakes: 'Off-by-one errors in mid updates and using binary search on a non-monotonic predicate.',
    tips: 'Check the invariant carefully and prefer left + (right - left) / 2 to avoid overflow.',
  },
  {
    id: 'recursion',
    title: 'Recursion',
    definition: 'A technique where a function calls itself to solve subproblems with a base case.',
    keywords: ['base case', 'divide and conquer', 'stack', 'call tree', 'self reference'],
    whenToUse: 'Use recursion for naturally recursive structures like trees, divide-and-conquer problems, and backtracking.',
    visualization: 'Imagine a tree of calls where each branch solves a smaller problem until the base case returns a result.',
    template: `ReturnType solve(Parameters) {
    if (base case) return result;
    return solve(smaller parameters);
}
`,
    complexities: 'Depends on branching factor and depth; common cases are O(n) or O(2^n).',
    mistakes: 'Missing a proper base case and forgetting to return or combine recursive results correctly.',
    tips: 'Keep recursion depth controlled and memoize when overlapping subproblems appear.',
  },
  {
    id: 'backtracking',
    title: 'Backtracking',
    definition: 'A search strategy that builds candidates incrementally and abandons a path when it cannot lead to a valid solution.',
    keywords: ['DFS', 'undo', 'choices', 'constraints', 'combinatorics'],
    whenToUse: 'Use backtracking for constraint-satisfaction, permutations, subsets, and exact-cover problems.',
    visualization: 'Explore a decision tree, backtracking when a branch violates the constraints.',
    template: `void backtrack(State &state) {
    if (solution) record result;
    for (choice : options) {
        make choice;
        backtrack(state);
        undo choice;
    }
}
`,
    complexities: 'Often exponential; pruning is key to reduce the search space.',
    mistakes: 'Not undoing state correctly and exploring duplicate branches without pruning.',
    tips: 'Add early pruning and use sorted or deduplicated choices to avoid repeated work.',
  },
  {
    id: 'linked-list',
    title: 'Linked List',
    definition: 'A sequence of nodes connected by pointers, excellent for inserts and deletes at arbitrary positions.',
    keywords: ['node', 'next', 'prev', 'pointer', 'dummy head'],
    whenToUse: 'Use linked list patterns when you need sequential access and frequent insertions or deletions without contiguous memory.',
    visualization: 'Picture a chain of nodes where each node points to the next element in the list.',
    template: `ListNode* curr = head;
while (curr) {
    // process curr->val
    curr = curr->next;
}
`,
    complexities: 'Traversal O(n), insert/delete O(1) when node pointer is known.',
    mistakes: 'Forgetting to update next/prev pointers and mishandling null head or tail cases.',
    tips: 'Use dummy nodes for cleaner edge-case handling and prefer two-pointer techniques for kth-from-end problems.',
  },
  {
    id: 'stack-pattern',
    title: 'Stack',
    definition: 'A LIFO structure used for nested state, undo history, and parsing applications.',
    keywords: ['push', 'pop', 'top', 'stack frame', 'nested'],
    whenToUse: 'Use stack patterns to solve parentheses validation, expression evaluation, and DFS-style traversal iteratively.',
    visualization: 'Imagine pushing frames onto a stack and popping them off in reverse order.',
    template: `std::stack<Type> st;
for (item : items) {
    if (condition) st.push(item);
    else if (!st.empty()) st.pop();
}
`,
    complexities: 'Push/pop/top are O(1).',
    mistakes: 'Failing to check empty() before top() and ignoring stack state after a pop.',
    tips: 'Use stacks for matching problems and convert recursive DFS into iterative DFS with an explicit stack.',
  },
  {
    id: 'queue-pattern',
    title: 'Queue',
    definition: 'A FIFO structure used for level-order traversal, scheduling, and breadth-first search.',
    keywords: ['enqueue', 'dequeue', 'front', 'breadth-first', 'level order'],
    whenToUse: 'Use queues for BFS, sliding-window order maintenance, and scheduling tasks in insertion order.',
    visualization: 'Picture items entering the back and leaving from the front, preserving order.',
    template: `std::queue<Type> q;
q.push(start);
while (!q.empty()) {
    auto item = q.front();
    q.pop();
}
`,
    complexities: 'Enqueue/dequeue/front O(1).',
    mistakes: 'Not checking empty() before accessing front/back and using queue for random access.',
    tips: 'Track levels separately in BFS and use queue when order matters through processing.',
  },
  {
    id: 'heap',
    title: 'Heap',
    definition: 'A priority-based tree structure implemented as an array, useful for top-k and greedy selection.',
    keywords: ['priority', 'top', 'heapify', 'push_heap', 'pop_heap'],
    whenToUse: 'Use heaps for retrieving the largest or smallest item efficiently and for priority-driven processes.',
    visualization: 'Visualize a nearly complete tree where the highest priority item stays at the root.',
    template: `std::priority_queue<Type> heap;
heap.push(value);
auto top = heap.top();
heap.pop();
`,
    complexities: 'Push/pop O(log n), top O(1).',
    mistakes: 'Using heap for ordered traversal and ignoring the cost of repeated heap operations.',
    tips: 'Use a min-heap by inverting comparators and reserve capacity for large batch inserts when available.',
  },
  {
    id: 'greedy',
    title: 'Greedy',
    definition: 'A choice strategy that picks the locally optimal option hoping to build a globally optimal solution.',
    keywords: ['local optimum', 'sort', 'priority', 'choice', 'interval scheduling'],
    whenToUse: 'Use greedy when the problem has a clear optimal substructure and local choices lead to a global solution.',
    visualization: 'Pick the best available option at each step and move forward without revisiting previous choices.',
    template: `sort(items.begin(), items.end(), compare);
for (item : items) {
    if (canPick(item)) select(item);
}
`,
    complexities: 'O(n log n) when sorting is needed, otherwise O(n).',
    mistakes: 'Applying greedy to problems without a provable strategy and ignoring edge cases where local choices fail.',
    tips: 'Validate greedy choices with counterexamples and combine with sorting or heaps for efficiency.',
  },
  {
    id: 'trees',
    title: 'Trees',
    definition: 'A hierarchical data structure with parent-child relationships, ideal for recursive traversal and divide-and-conquer operations.',
    keywords: ['node', 'left', 'right', 'depth', 'traversal'],
    whenToUse: 'Use tree patterns for hierarchical data, parsing expressions, and recursive containment problems.',
    visualization: 'A root node branches into children, forming a structure that can be explored recursively or level by level.',
    template: `void traverse(Node* node) {
    if (!node) return;
    traverse(node->left);
    traverse(node->right);
}
`,
    complexities: 'Traversal is O(n); balanced trees offer O(log n) search and insert.',
    mistakes: 'Mixing tree traversal orders and failing to handle null nodes consistently.',
    tips: 'Use recursive or iterative DFS clearly, and know when BFS is the better choice for level-based results.',
  },
  {
    id: 'bst',
    title: 'BST',
    definition: 'A binary search tree maintains ordered left and right subtrees for efficient search and insertion.',
    keywords: ['binary search tree', 'left smaller', 'right larger', 'inorder', 'balanced'],
    whenToUse: 'Use BST patterns for sorted data, range queries, and when you need ordered traversal without arrays.',
    visualization: 'A tree where left children are smaller and right children are larger than the parent node.',
    template: `Node* search(Node* root, int target) {
    if (!root || root->val == target) return root;
    return target < root->val ? search(root->left, target) : search(root->right, target);
}
`,
    complexities: 'Average O(log n), worst-case O(n) for unbalanced trees.',
    mistakes: 'Assuming all BSTs are balanced and using recursive formulas without base cases.',
    tips: 'Know how to rebalance or use self-balancing trees if worst-case complexity matters.',
  },
  {
    id: 'graphs',
    title: 'Graphs',
    definition: 'A general structure of nodes and edges representing relationships between entities.',
    keywords: ['vertex', 'edge', 'directed', 'undirected', 'adjacency'],
    whenToUse: 'Use graph patterns for network, dependency, connectivity, and path-finding problems.',
    visualization: 'Nodes connected by edges form a network; traverse it with BFS or DFS depending on the problem.',
    template: `for (auto node : graph[start]) {
    if (!visited[node]) dfs(node);
}
`,
    complexities: 'Traversal is O(V + E); specific algorithms vary by problem.',
    mistakes: 'Confusing adjacency list and matrix, and failing to mark visited nodes in cycles.',
    tips: 'Choose the right representation and remember that BFS finds shortest paths in unweighted graphs.',
  },
  {
    id: 'dfs',
    title: 'DFS',
    definition: 'Depth-first search explores as far as possible along each branch before backtracking.',
    keywords: ['depth', 'stack', 'recursive', 'backtrack', 'postorder'],
    whenToUse: 'Use DFS for connectivity, path discovery, backtracking, and tree-like recursive problems.',
    visualization: 'Dive deep into one branch until it ends, then backtrack and explore the next option.',
    template: `void dfs(int node) {
    visited[node] = true;
    for (auto next : graph[node]) {
        if (!visited[next]) dfs(next);
    }
}
`,
    complexities: 'O(V + E) for graph traversal.',
    mistakes: 'Stack overflow on deep recursion and not marking nodes before exploring neighbors.',
    tips: 'Use iterative DFS for deep graphs and always manage state before recursion to avoid revisits.',
  },
  {
    id: 'bfs',
    title: 'BFS',
    definition: 'Breadth-first search visits nodes level by level from the source.',
    keywords: ['breadth', 'queue', 'level order', 'shortest path', 'layered'],
    whenToUse: 'Use BFS for shortest paths in unweighted graphs, level-order traversal, and finding the smallest number of steps.',
    visualization: 'Expand outward layer by layer from the start node until the target is found.',
    template: `std::queue<int> q;
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
    complexities: 'O(V + E).',
    mistakes: 'Using DFS when BFS is needed for shortest paths and mixing level tracking incorrectly.',
    tips: 'Store levels explicitly if you need distance or grouped output.',
  },
  {
    id: 'union-find',
    title: 'Union Find',
    definition: 'A disjoint-set structure for managing connected components and connectivity queries.',
    keywords: ['disjoint set', 'union', 'find', 'path compression', 'component'],
    whenToUse: 'Use union-find for connectivity, cycle detection, and grouping problems where dynamic connectivity matters.',
    visualization: 'Each node points to a parent; union merges roots and find climbs to the representative parent.',
    template: `int find(int x) {
    return parent[x] == x ? x : parent[x] = find(parent[x]);
}
void unite(int a, int b) {
    parent[find(a)] = find(b);
}
`,
    complexities: 'Amortized inverse Ackermann time per operation, effectively constant.',
    mistakes: 'Failing to compress paths and merging without rank/size heuristics.',
    tips: 'Always use path compression and union by size or rank for best performance.',
  },
  {
    id: 'trie',
    title: 'Trie',
    definition: 'A character tree useful for prefix search and efficient retrieval of string-based keys.',
    keywords: ['prefix', 'dictionary', 'autocomplete', 'character tree', 'trie node'],
    whenToUse: 'Use trie for prefix matching, word search, and sets of strings with shared prefixes.',
    visualization: 'A branching tree where each edge adds a character to the prefix being formed.',
    template: `struct Node { Node* next[26]; bool end = false; };
void insert(Node* root, const string &s) {
    for (char c : s) {
        // navigate nodes
    }
}
`,
    complexities: 'Insert/search O(length of key).',
    mistakes: 'Using trie for sparse keys without memory consideration and not handling end-of-word markers.',
    tips: 'Use trie for prefix-heavy datasets and combine with hashing for memory optimization if needed.',
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    definition: 'A method that solves problems by caching results of overlapping subproblems.',
    keywords: ['memoization', 'tabulation', 'state', 'transition', 'optimal substructure'],
    whenToUse: 'Use DP when the problem can be broken into overlapping subproblems with optimal substructure.',
    visualization: 'Fill a table or memo store where each state depends on smaller states already computed.',
    template: `for (state : states) {
    dp[state] = combine(dp[smaller states]);
}
`,
    complexities: 'Depends on state size and transitions; typically polynomial time.',
    mistakes: 'Designing the wrong state and forgetting to handle base cases or state transitions correctly.',
    tips: 'Start with recursion and memoization before converting to tabulation for faster performance.',
  },
  {
    id: 'bit-manipulation',
    title: 'Bit Manipulation',
    definition: 'A low-level technique using bitwise operators for efficient numeric operations and masks.',
    keywords: ['xor', 'and', 'or', 'shift', 'mask'],
    whenToUse: 'Use bit manipulation for parity, masks, state compression, and power-of-two checks.',
    visualization: 'Think in binary digits and use shifts/masks to read or modify individual bits.',
    template: `if (x & (1 << i)) {
    // bit i is set
}
`,
    complexities: 'O(1) per operation.',
    mistakes: 'Mixing operator precedence and using incorrect masks for the wrong bit position.',
    tips: 'Use bit tricks for constant-time checks and represent subsets as bitmasks when n is small.',
  },
  {
    id: 'math',
    title: 'Math',
    definition: 'Core numeric strategies such as modular arithmetic, geometry, and number theory.',
    keywords: ['modulo', 'gcd', 'primes', 'combinatorics', 'geometry'],
    whenToUse: 'Use math patterns for numeric constraints, combinatorial formulas, and modular calculations.',
    visualization: 'Visualize results as numbers or equations rather than data structures.',
    template: `int result = (a + b) % mod;
int g = std::gcd(x, y);
`,
    complexities: 'Varies by algorithm; many operations are O(log n) for gcd or O(n) for prime sieve.',
    mistakes: 'Ignoring overflow, using floating-point comparisons, and forgetting modular reduction.',
    tips: 'Always consider integer limits and use exact arithmetic for discrete problems.',
  },
]
