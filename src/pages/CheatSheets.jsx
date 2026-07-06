import { cheatSheets } from '../data/cheatSheets'
import DownloadCard from '../components/DownloadCard'

function CheatSheets() {
  return (
    <section className="space-y-10 py-14 text-slate-900 dark:text-slate-100">
      <div className="rounded-[2rem] border border-slate-200/90 bg-white/85 p-12 shadow-xl shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/80">
        <h1 className="text-3xl font-semibold tracking-tight">Cheat Sheets</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
          Concise concept summaries and printable sheets for your DSA revision flow.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        {cheatSheets.map((sheet) => (
          <DownloadCard key={sheet.id} sheet={sheet} />
        ))}
      </div>
    </section>
  )
}

export default CheatSheets
