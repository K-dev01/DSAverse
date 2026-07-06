export const stlItems = [
  {
    id: 'vector',
    title: 'vector',
    category: 'Sequence',
    intro: 'Resizable array container offering contiguous storage and fast random access.',
    syntax: 'std::vector<T> container;',
    functions: ['push_back', 'emplace_back', 'at', 'size', 'reserve', 'clear', 'insert', 'erase'],
    complexity: 'Access O(1), push_back amortized O(1), insert/erase at arbitrary position O(n).',
    example: `#include <vector>
#include <iostream>

int main() {
    std::vector<int> values;
    values.reserve(10);
    values.push_back(5);
    values.push_back(12);
    for (int value : values) {
        std::cout << value << " ";
    }
}
`,
    tips: 'Reserve capacity before bulk push_back operations and prefer emplace_back for in-place construction.',
    mistakes: 'Assuming push_back never reallocates and using [] without checking size first.',
  },
  {
    id: 'string',
    title: 'string',
    category: 'Sequence',
    intro: 'A dynamic character sequence with convenient text manipulation and search methods.',
    syntax: 'std::string text;',
    functions: ['size', 'substr', 'find', 'replace', 'append', 'insert', 'erase', 'c_str'],
    complexity: 'Access O(1), append amortized O(1), insert/erase O(n) depending on position.',
    example: `#include <string>
#include <iostream>

int main() {
    std::string name = "DSA Verse";
    std::string message = name + " revision hub";
    std::cout << message << std::endl;
}
`,
    tips: 'Use reserve when building strings incrementally and prefer operator+ for small concatenations.',
    mistakes: 'Confusing size() with capacity() and relying on c_str() after mutating the string.',
  },
  {
    id: 'pair',
    title: 'pair',
    category: 'Utility',
    intro: 'A simple aggregate type for grouping two heterogeneous values together.',
    syntax: 'std::pair<T1, T2> item;\nstd::make_pair(a, b);',
    functions: ['first', 'second', 'make_pair', 'tie'],
    complexity: 'Construction and access run in constant time.',
    example: `#include <utility>
#include <iostream>

int main() {
    std::pair<std::string, int> student = {"Asha", 42};
    std::cout << student.first << " - " << student.second << std::endl;
}
`,
    tips: 'Prefer structured bindings or std::tuple for richer return types and use pair for small grouped values.',
    mistakes: 'Relying on first/second without naming meaning clearly and using pair for large heterogeneous payloads.',
  },
  {
    id: 'stack',
    title: 'stack',
    category: 'Adapter',
    intro: 'LIFO adapter providing push/pop access on top of an underlying container.',
    syntax: 'std::stack<T> st;\nstd::stack<T, Container> st;',
    functions: ['push', 'pop', 'top', 'empty', 'size'],
    complexity: 'Operations are O(1) on average.',
    example: `#include <stack>
#include <iostream>

int main() {
    std::stack<int> history;
    history.push(1);
    history.push(2);
    std::cout << history.top();
    history.pop();
}
`,
    tips: 'Use stack for backtracking and parsing problems; underlying container is usually deque by default.',
    mistakes: 'Reading top() on an empty stack and assuming stack supports iterator traversal.',
  },
  {
    id: 'queue',
    title: 'queue',
    category: 'Adapter',
    intro: 'FIFO adapter for sequential processing of elements in insertion order.',
    syntax: 'std::queue<T> q;\nstd::queue<T, Container> q;',
    functions: ['push', 'pop', 'front', 'back', 'empty', 'size'],
    complexity: 'All operations run in constant time.',
    example: `#include <queue>
#include <iostream>

int main() {
    std::queue<int> tasks;
    tasks.push(10);
    tasks.push(20);
    std::cout << tasks.front();
    tasks.pop();
}
`,
    tips: 'Use queue for breadth-first search and processing event streams in order.',
    mistakes: 'Using queue for indexed access and forgetting to check empty() before front().',
  },
  {
    id: 'deque',
    title: 'deque',
    category: 'Sequence',
    intro: 'Double-ended queue with fast insertion and removal at both ends.',
    syntax: 'std::deque<T> dq;',
    functions: ['push_back', 'push_front', 'pop_back', 'pop_front', 'at', 'front', 'back'],
    complexity: 'Access O(1), insertion at ends O(1), middle operations O(n).',
    example: `#include <deque>
#include <iostream>

int main() {
    std::deque<int> window;
    window.push_back(5);
    window.push_front(1);
    std::cout << window.back();
}
`,
    tips: 'Use deque when you need efficient head/tail operations and stable random access.',
    mistakes: 'Assuming deque elements are contiguous and mixing it with vector semantics unnecessarily.',
  },
  {
    id: 'priority_queue',
    title: 'priority_queue',
    category: 'Adapter',
    intro: 'Max-heap adapter for quick access to the largest element.',
    syntax: 'std::priority_queue<T> pq;\nstd::priority_queue<T, Container, Compare> pq;',
    functions: ['push', 'pop', 'top', 'empty', 'size'],
    complexity: 'push/pop are O(log n), top is O(1).',
    example: `#include <queue>
#include <vector>
#include <iostream>

int main() {
    std::priority_queue<int> pq;
    pq.push(10);
    pq.push(5);
    std::cout << pq.top();
}
`,
    tips: 'Use priority_queue for greedy selection and Dijkstra-like algorithms.',
    mistakes: 'Using default comparator when a min-heap is required and relying on iteration order.',
  },
  {
    id: 'set',
    title: 'set',
    category: 'Associative',
    intro: 'Ordered unique container backed by a balanced binary tree.',
    syntax: 'std::set<T> s;',
    functions: ['insert', 'erase', 'find', 'lower_bound', 'upper_bound', 'begin', 'end'],
    complexity: 'Search, insert, and erase are O(log n).',
    example: `#include <set>
#include <iostream>

int main() {
    std::set<int> values = {1, 3, 2};
    if (values.find(2) != values.end()) {
        std::cout << "Found";
    }
}
`,
    tips: 'Use set for sorted unique data and use lower_bound for efficient range queries.',
    mistakes: 'Using set when duplicates are required and assuming O(1) lookup time.',
  },
  {
    id: 'unordered_set',
    title: 'unordered_set',
    category: 'Associative',
    intro: 'Hash-based unique container with average constant-time lookups.',
    syntax: 'std::unordered_set<T> s;',
    functions: ['insert', 'erase', 'find', 'count', 'bucket_count', 'load_factor'],
    complexity: 'Average O(1) lookup, worst-case O(n) on hash collisions.',
    example: `#include <unordered_set>
#include <iostream>

int main() {
    std::unordered_set<std::string> seen;
    seen.insert("hello");
    if (seen.count("hello")) {
        std::cout << "Seen";
    }
}
`,
    tips: 'Choose unordered_set for fast membership tests and reserve capacity when size is known.',
    mistakes: 'Ignoring hash collision risk and using it for ordered traversal.',
  },
  {
    id: 'map',
    title: 'map',
    category: 'Associative',
    intro: 'Ordered key-value container with log-time access and sorted iteration.',
    syntax: 'std::map<Key, T> m;',
    functions: ['insert', 'erase', 'find', 'operator[]', 'lower_bound', 'upper_bound'],
    complexity: 'Lookup, insert, and erase are O(log n).',
    example: `#include <map>
#include <iostream>

int main() {
    std::map<std::string, int> scores;
    scores["Alice"] = 95;
    std::cout << scores["Alice"];
}
`,
    tips: 'Use map when order matters and prefer find() over operator[] for read-only lookups.',
    mistakes: 'Using operator[] for read-only access and assuming insertion order is preserved.',
  },
  {
    id: 'unordered_map',
    title: 'unordered_map',
    category: 'Associative',
    intro: 'Hash-based key-value container with average constant-time lookups.',
    syntax: 'std::unordered_map<Key, T> m;',
    functions: ['insert', 'erase', 'find', 'operator[]', 'reserve', 'bucket_count'],
    complexity: 'Average O(1) lookup, worst-case O(n) with collisions.',
    example: `#include <unordered_map>
#include <iostream>

int main() {
    std::unordered_map<std::string, int> ids;
    ids["node"] = 7;
    std::cout << ids["node"];
}
`,
    tips: 'Reserve expected size to reduce rehashing and choose unordered_map for fast access without ordering.',
    mistakes: 'Using it for sorted output and not reserving when the size is known ahead of time.',
  },
  {
    id: 'multiset',
    title: 'multiset',
    category: 'Associative',
    intro: 'Ordered container that allows duplicate keys while maintaining sorted order.',
    syntax: 'std::multiset<T> ms;',
    functions: ['insert', 'erase', 'find', 'equal_range', 'count'],
    complexity: 'Insert and erase are O(log n), search is O(log n).',
    example: `#include <set>
#include <iostream>

int main() {
    std::multiset<int> weights;
    weights.insert(5);
    weights.insert(5);
    std::cout << weights.count(5);
}
`,
    tips: 'Use multiset for sorted duplicates and equal_range for range-based retrieval.',
    mistakes: 'Expecting unique values and using multiset when a vector with sorting is sufficient.',
  },
  {
    id: 'algorithm',
    title: 'algorithm',
    category: 'Algorithm',
    intro: 'Header with generic algorithms for sorting, searching, and transforming ranges.',
    syntax: 'std::sort(begin, end);\nstd::find(begin, end, value);',
    functions: ['sort', 'find', 'lower_bound', 'upper_bound', 'binary_search', 'unique', 'transform'],
    complexity: 'Most algorithms are O(n) or O(n log n); check individual function complexity.',
    example: `#include <algorithm>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> data = {3, 1, 2};
    std::sort(data.begin(), data.end());
    if (std::binary_search(data.begin(), data.end(), 2)) {
        std::cout << "Found";
    }
}
`,
    tips: 'Combine algorithms with iterators and prefer lower_bound for ordered containers.',
    mistakes: 'Using sort on unsorted ranges without checking and misunderstanding iterator invalidation rules.',
  },
  {
    id: 'numeric',
    title: 'numeric',
    category: 'Numeric',
    intro: 'Header for numeric operations and accumulation helpers.',
    syntax: 'std::accumulate(begin, end, init);\nstd::iota(begin, end, value);',
    functions: ['accumulate', 'inner_product', 'iota', 'gcd', 'lcm', 'partial_sum'],
    complexity: 'Most functions are O(n) over the input range.',
    example: `#include <numeric>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> values = {1, 2, 3};
    int sum = std::accumulate(values.begin(), values.end(), 0);
    std::cout << sum;
}
`,
    tips: 'Use numeric for concise accumulation and avoid manual loops when standard algorithms suffice.',
    mistakes: 'Using accumulate for non-associative operations without care and ignoring type promotion.',
  },
]
