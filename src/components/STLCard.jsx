import { useMemo, useState } from 'react'
import { ClipboardCopy, AlertTriangle, Sparkles, CircleDot } from 'lucide-react'
import Button from './Button'

const quickFacts = {
  vector: {
    header: '<vector>',
    type: 'Sequence',
    layout: 'Contiguous',
    iterator: 'Random access',
    randomAccess: 'Yes',
    duplicates: 'Yes',
    order: 'Ordered',
    dynamic: 'Yes',
  },
  string: {
    header: '<string>',
    type: 'Sequence',
    layout: 'Contiguous',
    iterator: 'Random access',
    randomAccess: 'Yes',
    duplicates: 'Yes',
    order: 'Ordered',
    dynamic: 'Yes',
  },
  deque: {
    header: '<deque>',
    type: 'Sequence',
    layout: 'Segmented',
    iterator: 'Random access',
    randomAccess: 'Yes',
    duplicates: 'Yes',
    order: 'Ordered',
    dynamic: 'Yes',
  },
  stack: {
    header: '<stack>',
    type: 'Container adaptor',
    layout: 'Adapter',
    iterator: 'None',
    randomAccess: 'No',
    duplicates: 'Yes',
    order: 'LIFO',
    dynamic: 'Yes',
  },
  queue: {
    header: '<queue>',
    type: 'Container adaptor',
    layout: 'Adapter',
    iterator: 'None',
    randomAccess: 'No',
    duplicates: 'Yes',
    order: 'FIFO',
    dynamic: 'Yes',
  },
  priority_queue: {
    header: '<queue>',
    type: 'Container adaptor',
    layout: 'Heap',
    iterator: 'None',
    randomAccess: 'No',
    duplicates: 'Yes',
    order: 'Heap order',
    dynamic: 'Yes',
  },
  set: {
    header: '<set>',
    type: 'Associative',
    layout: 'Tree-based',
    iterator: 'Bidirectional',
    randomAccess: 'No',
    duplicates: 'No',
    order: 'Ordered',
    dynamic: 'Yes',
  },
  unordered_set: {
    header: '<unordered_set>',
    type: 'Associative',
    layout: 'Hash-based',
    iterator: 'Forward',
    randomAccess: 'No',
    duplicates: 'No',
    order: 'Unordered',
    dynamic: 'Yes',
  },
  map: {
    header: '<map>',
    type: 'Associative',
    layout: 'Tree-based',
    iterator: 'Bidirectional',
    randomAccess: 'No',
    duplicates: 'No',
    order: 'Ordered',
    dynamic: 'Yes',
  },
  unordered_map: {
    header: '<unordered_map>',
    type: 'Associative',
    layout: 'Hash-based',
    iterator: 'Forward',
    randomAccess: 'No',
    duplicates: 'No',
    order: 'Unordered',
    dynamic: 'Yes',
  },
  multiset: {
    header: '<multiset>',
    type: 'Associative',
    layout: 'Tree-based',
    iterator: 'Bidirectional',
    randomAccess: 'No',
    duplicates: 'Yes',
    order: 'Ordered',
    dynamic: 'Yes',
  },
  algorithm: {
    header: '<algorithm>',
    type: 'Algorithm header',
    layout: 'Iterator-based',
    iterator: 'Depends',
    randomAccess: 'Depends',
    duplicates: 'Depends',
    order: 'Depends',
    dynamic: 'N/A',
  },
  numeric: {
    header: '<numeric>',
    type: 'Numeric header',
    layout: 'Iterator-based',
    iterator: 'Depends',
    randomAccess: 'Depends',
    duplicates: 'Depends',
    order: 'Depends',
    dynamic: 'N/A',
  },
}

const functionDescriptions = {
  push_back: 'Append element at the end',
  emplace_back: 'Construct element in place at the end',
  push_front: 'Insert element at the front',
  pop_back: 'Remove last element',
  pop_front: 'Remove first element',
  push: 'Push element to container',
  pop: 'Remove top element',
  top: 'Access top element',
  front: 'Access first element',
  back: 'Access last element',
  size: 'Get current size',
  empty: 'Check whether container is empty',
  reserve: 'Allocate storage in advance',
  clear: 'Remove all elements',
  at: 'Bounds-checked access',
  insert: 'Insert one or more elements',
  erase: 'Remove one or more elements',
  find: 'Locate element by key',
  count: 'Count matching elements',
  lower_bound: 'Find first not-less element',
  upper_bound: 'Find first greater element',
  'operator[]': 'Access mapped element by key',
  sort: 'Sort a range',
  binary_search: 'Search sorted range',
  transform: 'Apply a function to each element',
  accumulate: 'Compute a running total',
  iota: 'Fill range with sequential values',
  gcd: 'Compute greatest common divisor',
  lcm: 'Compute least common multiple',
  unique: 'Remove consecutive duplicates',
}

const complexityPresets = {
  vector: ['O(1)', 'O(n)', 'O(n)', 'O(n)', 'O(n)', 'O(n)'],
  string: ['O(1)', 'O(n)', 'O(n)', 'O(n)', 'O(n)', 'O(n)'],
  deque: ['O(1)', 'O(n)', 'O(1)', 'O(1)', 'O(n)', 'O(n)'],
  stack: ['N/A', 'N/A', 'O(1)', 'O(1)', 'O(n)', 'O(n)'],
  queue: ['N/A', 'N/A', 'O(1)', 'O(1)', 'O(n)', 'O(n)'],
  priority_queue: ['N/A', 'N/A', 'O(log n)', 'O(log n)', 'O(n)', 'O(n)'],
  set: ['O(log n)', 'O(log n)', 'O(log n)', 'O(log n)', 'O(n)', 'O(n)'],
  unordered_set: ['O(1)', 'O(1)', 'O(1)', 'O(1)', 'O(n)', 'O(n)'],
  map: ['O(log n)', 'O(log n)', 'O(log n)', 'O(log n)', 'O(n)', 'O(n)'],
  unordered_map: ['O(1)', 'O(1)', 'O(1)', 'O(1)', 'O(n)', 'O(n)'],
  multiset: ['O(log n)', 'O(log n)', 'O(log n)', 'O(log n)', 'O(n)', 'O(n)'],
  algorithm: ['Varies', 'Varies', 'Varies', 'Varies', 'O(n)', 'Varies'],
  numeric: ['Varies', 'Varies', 'Varies', 'Varies', 'O(n)', 'Varies'],
}

function getFunctionTime(fn) {
  if (['push_back', 'push_front', 'pop_back', 'pop_front', 'push', 'pop', 'top', 'front', 'back', 'empty', 'size', 'reserve', 'clear'].includes(fn)) {
    return 'O(1)'
  }
  if (['find', 'lower_bound', 'upper_bound', 'count', 'erase', 'insert'].includes(fn)) {
    return 'O(log n)'
  }
  if (['sort', 'binary_search', 'transform', 'accumulate', 'iota', 'unique'].includes(fn)) {
    return 'O(n)' }
  return 'Depends'
}

function splitBullets(text) {
  return text
    .split(/\.\s+|;\s+/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function STLCard({ item }) {
  const [copied, setCopied] = useState(false)
  const fact = quickFacts[item.id] || {
    header: `<${item.title}>`,
    type: item.category,
    layout: 'N/A',
    iterator: 'Depends',
    randomAccess: 'Depends',
    duplicates: 'Depends',
    order: 'Depends',
    dynamic: 'Yes',
  }

  const functionRows = useMemo(
    () =>
      item.functions.map((fn) => ({
        name: fn,
        time: getFunctionTime(fn),
        description: functionDescriptions[fn] || 'Container operation',
      })),
    [item.functions],
  )

  const complexityBadges = complexityPresets[item.id] || complexityPresets[item.category.toLowerCase()] || ['Varies', 'Varies', 'Varies', 'Varies', 'O(n)', 'O(n)']
  const tips = useMemo(() => splitBullets(item.tips), [item.tips])
  const mistakes = useMemo(() => splitBullets(item.mistakes), [item.mistakes])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.example)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch (error) {
      console.error('Copy failed', error)
    }
  }

  return (
    <div className="rounded-[2rem] border border-[#E4E7EC] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#98A2B3]">{item.category}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#1D2939]">{item.title}</h2>
        </div>
        <Button
          variant="secondary"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm"
          onClick={handleCopy}
        >
          <ClipboardCopy size={16} />
          {copied ? 'Copied' : 'Copy Code'}
        </Button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-sm leading-6 text-[#667085]">{item.intro}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: 'Header file', value: fact.header },
              { label: 'Container type', value: fact.type },
              { label: 'Memory layout', value: fact.layout },
              { label: 'Iterator category', value: fact.iterator },
              { label: 'Random access', value: fact.randomAccess },
              { label: 'Allows duplicates', value: fact.duplicates },
              { label: 'Ordered / unordered', value: fact.order },
              { label: 'Dynamic size', value: fact.dynamic },
            ].map((factItem) => (
              <div key={factItem.label} className="rounded-2xl border border-[#E4E7EC] bg-[#F8F9FC] p-3">
                <p className="text-[0.65rem] uppercase tracking-[0.35em] text-[#98A2B3]">{factItem.label}</p>
                <p className="mt-2 text-sm font-semibold text-[#1D2939]">{factItem.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[#E4E7EC] bg-[#F8FAFF] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#98A2B3]">Syntax</p>
              <p className="mt-2 text-lg font-semibold text-[#1D2939]">{item.title}</p>
            </div>
            <span className="rounded-full bg-[#FCE7F3] px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#EC4899]">
              code
            </span>
          </div>
          <pre className="mt-4 overflow-x-auto rounded-[1.5rem] border border-[#E4E7EC] bg-white p-4 text-sm leading-6 text-[#0F172A]">
            {item.syntax}
          </pre>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-[1.75rem] border border-[#E4E7EC] bg-[#F8F9FC] p-4">
        <div className="flex items-center justify-between gap-4 pb-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#98A2B3]">Members</p>
            <p className="mt-2 text-base font-semibold text-[#1D2939]">Common functions</p>
          </div>
        </div>
        <table className="min-w-full text-sm text-[#334155]">
          <thead>
            <tr className="border-b border-[#E4E7EC] text-left text-xs uppercase tracking-[0.25em] text-[#667085]">
              <th className="py-3 pr-6">Function</th>
              <th className="py-3 pr-6">Time</th>
              <th className="py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4E7EC]">
            {functionRows.map((row) => (
              <tr key={row.name}>
                <td className="py-4 pr-6 font-semibold text-[#1D2939]">{row.name}</td>
                <td className="py-4 pr-6 text-[#667085]">{row.time}</td>
                <td className="py-4 text-[#667085]">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[1.75rem] border border-[#E4E7EC] bg-[#F8FAFF] p-5">
          <p className="text-sm uppercase tracking-[0.35em] text-[#98A2B3]">Complexity</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {['Access', 'Search', 'Insert', 'Delete', 'Traversal', 'Memory'].map((label, index) => (
              <div key={label} className="rounded-2xl bg-[#FCE7F3] p-3 text-sm font-semibold text-[#1D2939]">
                <p className="uppercase tracking-[0.25em] text-[#98A2B3]">{label}</p>
                <p className="mt-2">{complexityBadges[index]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.75rem] border border-[#E4E7EC] bg-white p-5">
            <p className="text-sm uppercase tracking-[0.35em] text-[#98A2B3]">Interview tips</p>
            <ul className="mt-4 space-y-3 text-sm text-[#667085]">
              {tips.map((tip, index) => (
                <li key={index} className="flex gap-3">
                  <Sparkles className="mt-1 h-4 w-4 text-[#EC4899]" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.75rem] border border-[#E4E7EC] bg-white p-5">
            <p className="text-sm uppercase tracking-[0.35em] text-[#98A2B3]">Common mistakes</p>
            <ul className="mt-4 space-y-3 text-sm text-[#667085]">
              {mistakes.map((mistake, index) => (
                <li key={index} className="flex gap-3">
                  <AlertTriangle className="mt-1 h-4 w-4 text-[#EC4899]" />
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default STLCard
