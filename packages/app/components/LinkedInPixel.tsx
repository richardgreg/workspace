interface LinkedInPixelProps {
  conversionId: string;
}

export default function LinkedInPixel({conversionId} : LinkedInPixelProps): JSX.Element {
  return (
    <>
      <img height="1" width="1" style={{display: 'none'}} alt="" src={`https://px.ads.linkedin.com/collect/?pid=3379538&conversionId=${conversionId}&fmt=gif`} />
    </>

  );
}
