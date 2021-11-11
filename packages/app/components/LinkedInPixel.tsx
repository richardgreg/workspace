interface LinkedInPixelProps {
  conversionId: string;
}

export default function LinkedInPixel({conversionId} : LinkedInPixelProps): JSX.Element {

  return (
    <>
    <script
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s)
      {f._linkedin_data_partner_ids.push('3379538'); if (!f.lintrk) {
      f.linktrk= function(a,b) { f.linktrk.q.push([a,b])};f.linktrk.q=[]}
      t=b.createElement(e);s=b.getElementsByTagName(e)[0];
      t.src=v;t.type="text/javascript";t.async=true;
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://snap.licdn.com/li.lms-analytics/insight.min.js');`,
        }}
      />
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<img height="1" width="1" style="display:none"
      src="https://px.ads.linkedin.com/collect/?pid=3379538&conversionId=${conversionId}&fmt=gif" />`,
        }}
      />
    </>

  );
}
