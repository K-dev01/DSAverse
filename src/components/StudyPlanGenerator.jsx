import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, LoaderCircle, Target, Clock3, BookOpen } from 'lucide-react'
import Button from './Button'

const levelOptions = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'I know the basics' },
  { value: 'expert', label: 'Expert' },
]

function buildFallbackPlan({ level, goal, timePerDay }) {
  const levelLabel = levelOptions.find((item) => item.value === level)?.label || 'Beginner'
  const hours = timePerDay || '45 minutes'

  return [
    `Goal: ${goal || 'build strong DSA confidence'}`,
    `Level: ${levelLabel}`,
    `Daily focus: ${hours}`,
    '',
    'Week 1',
    '- Review arrays, strings, and time complexity basics.',
    '- Solve 3 easy problems and write one short explanation for each.',
    'Week 2',
    '- Study linked lists, stacks, queues, and recursion patterns.',
    '- Practice 4 medium questions and compare multiple approaches.',
    'Week 3',
    '- Move into trees, graphs, and hashing with a strong focus on patterns.',
    '- Finish one mixed revision set and review mistakes carefully.',
    'Week 4',
    '- Attempt a mini mock interview and revisit weak areas.',
    '- Keep a short cheat sheet of formulas, edge cases, and common traps.',
  ].join('\n')
}

function getFriendlyErrorMessage(message) {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('quota')) {
    return 'Gemini free-tier quota has been exceeded, so the planner switched to a built-in study plan. You can wait a bit or upgrade your API plan to use live AI responses.'
  }

  if (lowerMessage.includes('api key')) {
    return 'The Gemini API key looks missing or invalid. Add a valid key in the environment file to enable live generation.'
  }

  return message
}

async function generateGeminiPlan({ level, goal, timePerDay, focus }) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim()
  const model = import.meta.env.VITE_GEMINI_MODEL?.trim() || 'gemini-2.0-flash'

  if (!apiKey) {
    throw new Error('Gemini API key is not configured')
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Create a practical 4-week DSA study plan for a ${level} learner. The user wants to improve in ${focus || 'general problem-solving'}. Goal: ${goal || 'build confidence and improve speed'}. Daily study time: ${timePerDay || '45 minutes'}. Keep the plan concise, motivating, and specific. Format it with week headers and bullet points.`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 700,
        },
      }),
    }
  )

  const data = await response.json()

  if (!response.ok || data.error) {
    const message = data.error?.message || 'Unable to generate a plan right now'
    throw new Error(getFriendlyErrorMessage(message))
  }

  return data.candidates?.[0]?.content?.parts?.[0]?.text || ''
}

function StudyPlanGenerator() {
  const [form, setForm] = useState({
    level: 'intermediate',
    goal: 'Build strong DSA confidence for interviews',
    timePerDay: '45 minutes',
    focus: 'Arrays, trees, and pattern-based problems',
  })
  const [plan, setPlan] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const generatedPlan = await generateGeminiPlan(form)

      if (generatedPlan.trim()) {
        setPlan(generatedPlan.trim())
      } else {
        setPlan(buildFallbackPlan(form))
      }
    } catch (err) {
      setPlan(buildFallbackPlan(form))
      setError(err.message || 'A fallback plan is ready instead.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
      className="rounded-[2rem] border bg-[var(--surface)] p-6 shadow-soft sm:p-8 lg:p-10"
      style={{ borderColor: 'var(--card-border)' }}
    >
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-[var(--primary)]" style={{ background: 'var(--primary-soft)', borderColor: 'var(--card-border)' }}>
            <Sparkles size={18} />
            Gemini study planner
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-[var(--text)]">Create a study plan that fits your current level.</h2>
            <p className="text-sm leading-7 text-[var(--muted)]">
              Tell us whether you are a beginner, know the basics, or are already advanced, and we will shape a focused roadmap around your goals.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-[var(--text)]">Current level</span>
              <select
                value={form.level}
                onChange={(event) => setForm({ ...form, level: event.target.value })}
                className="w-full rounded-2xl border bg-[var(--surface-soft)] px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[var(--primary)]"
                style={{ borderColor: 'var(--card-border)' }}
              >
                {levelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-[var(--text)]">What do you want to improve?</span>
              <textarea
                value={form.goal}
                onChange={(event) => setForm({ ...form, goal: event.target.value })}
                rows="3"
                className="w-full rounded-2xl border bg-[var(--surface-soft)] px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[var(--primary)]"
                style={{ borderColor: 'var(--card-border)' }}
                placeholder="Example: prepare for interviews and build confidence"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-[var(--text)]">Daily time</span>
                <input
                  value={form.timePerDay}
                  onChange={(event) => setForm({ ...form, timePerDay: event.target.value })}
                  className="w-full rounded-2xl border bg-[var(--surface-soft)] px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[var(--primary)]"
                  style={{ borderColor: 'var(--card-border)' }}
                  placeholder="45 minutes"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-semibold text-[var(--text)]">Focus area</span>
                <input
                  value={form.focus}
                  onChange={(event) => setForm({ ...form, focus: event.target.value })}
                  className="w-full rounded-2xl border bg-[var(--surface-soft)] px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[var(--primary)]"
                  style={{ borderColor: 'var(--card-border)' }}
                  placeholder="Example: arrays, trees, patterns"
                />
              </label>
            </div>

            <Button type="submit" className="w-full rounded-2xl px-5 py-3 sm:w-auto" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Creating your plan...
                </span>
              ) : (
                'Generate plan'
              )}
            </Button>
          </form>
        </div>

        <div className="rounded-[1.75rem] border bg-[var(--surface-soft)] p-5 shadow-inner" style={{ borderColor: 'var(--card-border)' }}>
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            <BookOpen size={16} />
            Your generated plan
          </div>

          {error ? (
            <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-700 dark:border-amber-600 dark:bg-amber-950/40 dark:text-amber-300">
              {error}
            </div>
          ) : null}

          {!plan ? (
            <div className="mt-6 space-y-3 rounded-[1.5rem] border border-dashed p-5 text-sm leading-7 text-[var(--muted)]" style={{ borderColor: 'var(--card-border)' }}>
              <div className="flex items-center gap-2 font-semibold text-[var(--text)]">
                <Target size={16} />
                Example roadmap
              </div>
              <p>Pick your level, define your goal, and the planner will create a week-by-week roadmap for you.</p>
              <div className="flex items-center gap-2 text-[var(--primary)]">
                <Clock3 size={16} />
                Great for interviews, revision, or structured learning.
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-3 text-sm leading-7 text-[var(--text)]">
              {plan.split('\n').filter((line) => line.trim()).map((line, index) => {
                const isHeading = line.startsWith('Week') || line.startsWith('Goal:') || line.startsWith('Level:') || line.startsWith('Daily focus:')
                const isBullet = line.startsWith('-')

                return (
                  <div
                    key={`${line}-${index}`}
                    className={isHeading ? 'font-semibold text-[var(--text)]' : isBullet ? 'ml-4 text-[var(--muted)]' : 'text-[var(--muted)]'}
                  >
                    {isBullet ? '•' : ''} {line.replace(/^-\s*/, '')}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  )
}

export default StudyPlanGenerator
