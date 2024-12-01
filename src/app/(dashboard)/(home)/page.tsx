import CareerGoal from "@/components/(dashboard)/(home)/career-goal"
import GettingStarted from "@/components/(dashboard)/(home)/getting-started";
import JobApplicationsSummary from "@/components/(dashboard)/(home)/job-applications-summary";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex-1 flex flex-col gap-4">
        <CareerGoal />
        <JobApplicationsSummary />
      </div>
      <div className="h-full flex-1">
        <GettingStarted />
      </div>
    </div>
  );
}
