interface AsSeenInCardProps {
  image: string;
  title: string;
  content: string;
  url: string;
  bgImage: string;
}

export const AsSeenInCard: React.FC<AsSeenInCardProps> = ({
  image,
  title,
  content,
  url,
  bgImage,
}) => {
  return (
    <div
      className="shadow-xl"
      style={{ width: 649, height: 460, borderRadius: 32 }}
    >
      <img src={`images/asseenin/${image}`} style={{paddingTop: 56, paddingLeft: 56}}/>
      <h1 className="text-4xl" style={{ paddingTop: 72, paddingLeft: 56 }}>{title}</h1>
      <p className="text-4xl" style={{ paddingTop: 16, paddingLeft: 56 }}>{`${content} <a href=${url} target="_blank"><span className="text-blue-600>read more...</span>`}</p>
    </div>
  );
};
