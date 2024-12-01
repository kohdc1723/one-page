export default function JobApplicationsSummary() {
  return (
    <section className="flex-1 flex flex-col gap-4 border border-emerald-900/20 p-4">
      <h2 className="text-emerald-900 font-bold text-2xl">Job Applications</h2>
      <div className="flex justify-between">
        <div className="flex-1">
          <div className="font-medium">Position</div>
          <div>Software Developer</div>
        </div>
        <div className="flex-1">
          <div className="font-medium">Date</div>
          <div>2025/JAN/01</div>
        </div>
        <div className="flex-1">
          <div className="font-medium">Salary Range</div>
          <div>$30 - $40</div>
        </div>
      </div>
    </section>
  )
}