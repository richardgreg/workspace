import { Proposal, ProposalType } from '@popcorn/contracts/adapters';
import CardBody from 'components/CommonComponents/CardBody';
import Link from 'next/link';
import VotingInformation from './Voting/VotingInformation';

export interface ProposalCardProps {
  proposal: Proposal;
  proposalType: ProposalType;
}

const ProposalCard: React.FC<ProposalCardProps> = ({
  proposal,
  proposalType = 0,
}) => {
  return (
    <div
      key={proposal?.id}
      className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white"
    >
      <Link
        href={`${
          proposalType === ProposalType.Takedown
            ? '/proposals/takedowns/'
            : '/proposals/nominations/'
        }${proposal.id}`}
        passHref
      >
        <a>
          <CardBody
            image={proposal?.application?.files?.profileImage}
            name={proposal?.application?.organizationName}
            missionStatement={proposal?.application?.missionStatement}
          />
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
          </div>
          <VotingInformation {...proposal} />
        </a>
      </Link>
    </div>
  );
};
export default ProposalCard;
