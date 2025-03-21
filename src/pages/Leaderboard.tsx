import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Trophy, Award, Medal } from "lucide-react";

// Mock data for leaderboard
const leaderboardData = [
  { rank: 1, name: "Theo Wilden", points: 8643, challenges: 86, streak: 14 },
  { rank: 2, name: "Thomas Burton", points: 7777, challenges: 77, streak: 7 },
  { rank: 3, name: "Mason McHale", points: 1050, challenges: 20, streak: 12 },
  { rank: 4, name: "Nathan Pyanin", points: 920, challenges: 18, streak: 6 },
  { rank: 5, name: "o ee a e a", points: 890, challenges: 17, streak: 9 },
  {
    rank: 6,
    name: "Github Trust and Safety",
    points: 780,
    challenges: 15,
    streak: 4,
  },
  { rank: 7, name: "Edward Puzzleton", points: 760, challenges: 16, streak: 3 },
  { rank: 8, name: "Linus Torvalds", points: 730, challenges: 14, streak: 7 },
  { rank: 9, name: "Tux Linux", points: 710, challenges: 13, streak: 5 },
  { rank: 10, name: "Terry A. Davis", points: 690, challenges: 13, streak: 2 },
];

const Leaderboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pt-24 pb-12 px-6">
        <div className="container max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Prompt Engineers Leaderboard
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See who's mastering the art of prompt engineering. Complete
              challenges and maintain your streak to climb the ranks!
            </p>
          </div>

          {/* Top 3 winners podium */}
          <div className="mb-12 flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8">
            {/* 2nd place */}
            <div className="order-2 md:order-1 flex flex-col items-center">
              <div className="mb-4 relative">
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center overflow-hidden border-4 border-secondary">
                  <span className="text-xl font-bold">
                    {leaderboardData[1].name.split(" ")[0][0]}
                    {leaderboardData[1].name.split(" ")[1][0]}
                  </span>
                </div>
                <div className="absolute -top-2 -right-2 bg-[#C0C0C0] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              <div className="bg-card w-28 h-28 rounded-t-lg flex flex-col items-center justify-center border border-border">
                <p className="font-semibold">
                  {leaderboardData[1].name.split(" ")[0]}
                </p>
                <p className="text-2xl font-bold">
                  {leaderboardData[1].points}
                </p>
                <p className="text-xs text-muted-foreground">points</p>
              </div>
            </div>

            {/* 1st place */}
            <div className="order-1 md:order-2 flex flex-col items-center">
              <div className="mb-4 relative">
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center overflow-hidden border-4 border-primary">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {leaderboardData[0].name.split(" ")[0][0]}
                    {leaderboardData[0].name.split(" ")[1][0]}
                  </span>
                </div>
                <div className="absolute -top-3 -right-3 bg-[#FFD700] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                  <Trophy className="w-6 h-6" />
                </div>
              </div>
              <div className="bg-card w-32 h-36 rounded-t-lg flex flex-col items-center justify-center border border-border">
                <p className="font-semibold">
                  {leaderboardData[0].name.split(" ")[0]}
                </p>
                <p className="text-3xl font-bold">
                  {leaderboardData[0].points}
                </p>
                <p className="text-xs text-muted-foreground">points</p>
              </div>
            </div>

            {/* 3rd place */}
            <div className="order-3 flex flex-col items-center">
              <div className="mb-4 relative">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center overflow-hidden border-4 border-accent">
                  <span className="text-xl font-bold">
                    {leaderboardData[2].name.split(" ")[0][0]}
                    {leaderboardData[2].name.split(" ")[1][0]}
                  </span>
                </div>
                <div className="absolute -top-2 -right-2 bg-[#CD7F32] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                  <Medal className="w-5 h-5" />
                </div>
              </div>
              <div className="bg-card w-28 h-24 rounded-t-lg flex flex-col items-center justify-center border border-border">
                <p className="font-semibold">
                  {leaderboardData[2].name.split(" ")[0]}
                </p>
                <p className="text-2xl font-bold">
                  {leaderboardData[2].points}
                </p>
                <p className="text-xs text-muted-foreground">points</p>
              </div>
            </div>
          </div>

          {/* Full leaderboard table */}
          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="py-4 px-6 text-left font-medium">Rank</th>
                    <th className="py-4 px-6 text-left font-medium">Name</th>
                    <th className="py-4 px-6 text-left font-medium">Points</th>
                    <th className="py-4 px-6 text-left font-medium">
                      Challenges
                    </th>
                    <th className="py-4 px-6 text-left font-medium">Streak</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((entry, index) => (
                    <tr
                      key={index}
                      className={`border-b border-border ${
                        index < 3 ? "bg-muted/20" : ""
                      } ${index === 0 ? "bg-[#FFD700]/10" : ""} ${
                        index === 1 ? "bg-[#C0C0C0]/10" : ""
                      } ${index === 2 ? "bg-[#CD7F32]/10" : ""}`}
                    >
                      <td className="py-4 px-6 font-semibold">
                        {index === 0 && (
                          <Trophy className="inline-block w-4 h-4 mr-1 text-[#FFD700]" />
                        )}
                        {index === 1 && (
                          <Award className="inline-block w-4 h-4 mr-1 text-[#C0C0C0]" />
                        )}
                        {index === 2 && (
                          <Medal className="inline-block w-4 h-4 mr-1 text-[#CD7F32]" />
                        )}
                        {entry.rank}
                      </td>
                      <td className="py-4 px-6">{entry.name}</td>
                      <td className="py-4 px-6 font-semibold">
                        {entry.points}
                      </td>
                      <td className="py-4 px-6">
                        {entry.challenges} completed
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1">
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${
                              entry.streak > 0 ? "bg-green-500" : "bg-muted"
                            }`}
                          ></span>
                          {entry.streak} days
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Leaderboard;
