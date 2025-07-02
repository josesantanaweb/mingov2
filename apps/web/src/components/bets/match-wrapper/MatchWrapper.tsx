'use client';
import { useParams } from 'next/navigation';
import { useMatch } from '@/hooks/matches/useMatch';
import MatchHeader from '@/components/bets/match-header';

const MatchWrapper = ({ children }): React.ReactElement => {
  const { matchId } = useParams<{ matchId: string }>();
  const { data: match } = useMatch(matchId);

  return (
    <section className="match relative px-3 py-4">
      <div className="flex flex-col gap-3 mb-6 justify-center items-center">
        <MatchHeader match={match} />
        <div className="flex flex-col gap-3 w-full">{children}</div>
      </div>
    </section>
  );
};

export default MatchWrapper;
