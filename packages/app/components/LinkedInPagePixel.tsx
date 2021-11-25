export default function LinkedInPagePixel(): JSX.Element {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `_linkedin_partner_id = "3379538";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);`,
        }}
      />
      <script 
        dangerouslySetInnerHTML={{
          __html: `(function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);})(window.lintrk);`
        }}
      />
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=3379538&fmt=gif" />`,
        }}
      />
    </>
  );
}

export function LinkedInConversion({ conversionId } : { conversionId: string}) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function() {
            if (window.lintrk) {
              window.lintrk('track', { conversion_id: ${conversionId} });
            }
          })`
        }}
      />
    </>
  )
}