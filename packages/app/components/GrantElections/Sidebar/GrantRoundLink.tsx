import { Check, Lock } from 'react-feather';

export interface IGrantRound {
  name: string;
  id: number;
  active: boolean;
  year: number;
}

interface GrantRoundLinkProps {
  grantRound: IGrantRound;
  scrollToGrantRound: (grantId: number) => void;
}

const GrantRoundLink: React.FC<GrantRoundLinkProps> = ({
  grantRound,
  scrollToGrantRound,
}) => {
  return (
    <li
      id={`${grantRound.id}-GrantLink`}
      className="flex flex-row items-center cursor-pointer"
      onClick={() => scrollToGrantRound(grantRound.id)}
    >
      <div className="h-5 w-5 mr-2 rounded-full border border-black flex items-center justify-center flex-shrink-0">
        {grantRound.active ? <Check size={14} /> : <Lock size={10} />}
      </div>
      <p className="text-base">{grantRound.name}</p>
    </li>
  );
};
export default GrantRoundLink;
