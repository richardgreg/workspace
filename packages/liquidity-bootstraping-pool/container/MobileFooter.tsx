export default function MobileFooter() {
  return (
    <section className="w-10/12 mx-auto mt-8 border-t border-gray-500">
      <div className="flex flex-row">
        <p className="w-1/2">
          <a href="https://popcorn.network" target="_blank">popcorn.network</a>
        </p>
        <p className="w-1/2">
          <a href="https://forum.popcorn.network/" target="_blank">popcorn.community</a>
        </p>
      </div>
      <div className="flex flex-row">
        <p className="w-1/2">
          <a href="https://discord.gg/w9zeRTSZsq" target="_blank">discord</a>
        </p>
        <p className="w-1/2">
          <a href="https://twitter.com/Popcorn_DAO" target="_blank">@popcorn on twitter</a>
        </p>
      </div>
    </section>
  );
}
