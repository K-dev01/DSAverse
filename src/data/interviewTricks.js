export const interviewTricks = [
  {
    id: 'fast-io',
    title: 'Fast IO',
    explanation:
      'Use fast input/output routines in C++ when handling large volumes of data to avoid TLE in competitive programming and interview tests.',
    wrongExample:
      `for (int i = 0; i < n; i++) {
    cin >> x;
    cout << x << '\n';
}`,
    correctExample:
      `ios::sync_with_stdio(false);
cin.tie(nullptr);

for (int i = 0; i < n; i++) {
    cin >> x;
    cout << x << '\n';
}`,
    notes:
      'Disable sync with stdio and untie cin/cout for the fastest standard I/O. Use this pattern for large input sizes and repeated output operations.',
  },
  {
    id: 'overflow',
    title: 'Overflow',
    explanation:
      'Prevent arithmetic overflow by choosing the correct data type and by avoiding expressions that exceed the type range.',
    wrongExample:
      `int prod = a * b;
if (prod > limit) { ... }`,
    correctExample:
      `long long prod = 1LL * a * b;
if (prod > limit) { ... }`,
    notes:
      'Use 64-bit integers for intermediate calculations when values can grow beyond 32-bit limits. Always check the expression type before multiplying or adding large values.',
  },
  {
    id: 'lambda',
    title: 'Lambda',
    explanation:
      'Use lambda expressions to keep small comparison and transformation logic close to the code that uses it.',
    wrongExample:
      `struct Compare {
    bool operator()(int a, int b) const { return a > b; }
};
sort(nums.begin(), nums.end(), Compare());`,
    correctExample:
      `sort(nums.begin(), nums.end(), [](int a, int b) {
    return a > b;
});`,
    notes:
      'Lambdas reduce boilerplate and help express custom behavior inline. Use them for sort comparisons, transform callbacks, and small local functions.',
  },
  {
    id: 'comparator',
    title: 'Comparator',
    explanation:
      'Write clear comparator functions to define custom ordering cleanly, especially for tuples or objects.',
    wrongExample:
      `sort(items.begin(), items.end(), [](const Item &a, const Item &b) {
    return a.value < b.value;
});`,
    correctExample:
      `sort(items.begin(), items.end(), [](const Item &a, const Item &b) {
    if (a.value != b.value) return a.value < b.value;
    return a.index < b.index;
});`,
    notes:
      'Always handle tie-breakers explicitly in comparators. A correct comparator must impose a strict weak ordering to avoid undefined behavior.',
  },
  {
    id: 'lower-bound',
    title: 'lower_bound',
    explanation:
      'Use lower_bound to find the first position where an element can be inserted without breaking sorted order.',
    wrongExample:
      `int pos = lower_bound(nums.begin(), nums.end(), target) - nums.begin();
if (nums[pos] == target) { ... }`,
    correctExample:
      `auto it = lower_bound(nums.begin(), nums.end(), target);
if (it != nums.end() && *it == target) {
    int pos = it - nums.begin();
    // found
}`,
    notes:
      'Always compare the iterator against end before dereferencing. lower_bound is ideal for binary-search style lookups and insertion points.',
  },
  {
    id: 'upper-bound',
    title: 'upper_bound',
    explanation:
      'Use upper_bound to find the first element greater than a target in a sorted container.',
    wrongExample:
      `int pos = upper_bound(nums.begin(), nums.end(), target) - nums.begin();
if (nums[pos] == target) { ... }`,
    correctExample:
      `auto it = upper_bound(nums.begin(), nums.end(), target);
if (it != nums.end()) {
    int pos = it - nums.begin();
    // first greater element index
}`,
    notes:
      'upper_bound returns the insertion point after any equal elements. Use it for range queries and next-greater logic.',
  },
  {
    id: 'erase-remove-idiom',
    title: 'erase-remove idiom',
    explanation:
      'Use the erase-remove idiom to remove elements from a vector based on a condition correctly and efficiently.',
    wrongExample:
      `for (int i = 0; i < nums.size(); i++) {
    if (nums[i] == target) nums.erase(nums.begin() + i);
}`,
    correctExample:
      `nums.erase(remove(nums.begin(), nums.end(), target), nums.end());`,
    notes:
      'Never erase from a vector while iterating normally; it invalidates indices. The erase-remove idiom keeps the container compact and handles duplicate removals cleanly.',
  },
  {
    id: 'memset',
    title: 'memset',
    explanation:
      'Use memset for fast block initialization, but only when the target representation is trivial and the value is byte-aligned.',
    wrongExample:
      `memset(dp, -1, sizeof(dp));
// expecting all values to be -1 for an int array`,
    correctExample:
      `memset(visited, 0, sizeof(visited));
memset(parent, -1, sizeof(parent));`,
    notes:
      'memset is safe for zeroing memory and for byte-pattern constants like -1 on signed integer arrays. Avoid it for arbitrary values or non-trivial types.',
  },
  {
    id: 'prefix-xor',
    title: 'Prefix XOR',
    explanation:
      'Use prefix XOR to answer subarray xor queries quickly, because xor is reversible and associative.',
    wrongExample:
      `int total = 0;
for (int i = l; i <= r; i++) total ^= nums[i];`,
    correctExample:
      `vector<int> pref(n + 1);
for (int i = 0; i < n; i++) pref[i + 1] = pref[i] ^ nums[i];
int answer = pref[r + 1] ^ pref[l];`,
    notes:
      'Prefix XOR answers range xor queries in constant time after linear preprocessing. This trick is useful for xor-subarray and parity problems.',
  },
  {
    id: 'modulo',
    title: 'Modulo',
    explanation:
      'Use modular arithmetic carefully to avoid negative results and to keep values within bounds during repeated operations.',
    wrongExample:
      `int x = (a - b) % mod;
if (x < 0) x = -x;`,
    correctExample:
      `int x = (a - b + mod) % mod;`,
    notes:
      'Always add mod before taking the remainder to avoid negative values in C++ and other languages with signed modulo semantics.',
  },
  {
    id: 'sorting-tricks',
    title: 'Sorting Tricks',
    explanation:
      'Sort custom structures and use stable sort when relative order matters for equal keys.',
    wrongExample:
      `sort(events.begin(), events.end(), [](auto &a, auto &b) {
    return a.time < b.time;
});
// loses priority order for equal times`,
    correctExample:
      `stable_sort(events.begin(), events.end(), [](auto &a, auto &b) {
    return a.time < b.time;
});`,
    notes:
      'Stable sort preserves input order for equal keys, which is essential for multi-level sorting or when secondary order is implied by original order.',
  },
  {
    id: 'debugging',
    title: 'Debugging',
    explanation:
      'Keep debugging simple by printing variable snapshots and validating assumptions before optimization.',
    wrongExample:
      `// too much debug data
for (int i = 0; i < n; i++) {
    cerr << i << ' ' << nums[i] << '\n';
}`,
    correctExample:
      `cerr << "l=" << l << " r=" << r << " sum=" << sum << '\n';`,
    notes:
      'Use targeted debug output and avoid printing entire arrays in interviews. Show your reasoning clearly by logging critical state and boundary values.',
  },
]
