export default function DesktopFooterNavigation() {
  return (
    <>
      {' '}
      <p className="">
        <a
          href="https://popcorn.network"
          className=" cursor-pointer hover:text-blue-600"
          target="_blank"
        >
          popcorn.network
        </a>
      </p>
      <p className="mx-4">•</p>
      <p className="mx-4">
        <a
          href="https://discord.gg/w9zeRTSZsq"
          className=" cursor-pointer hover:text-blue-600"
          target="_blank"
        >
          discord
        </a>
      </p>
      <p className="mx-4">•</p>
      <p className="mx-4">
        <a
          href="https://forum.popcorn.network/"
          className=" cursor-pointer hover:text-blue-600"
          target="_blank"
        >
          popcorn.community
        </a>
      </p>
      <p className="mx-4">•</p>
      <p className="mx-4">
        <a
          href="https://twitter.com/Popcorn_DAO"
          className=" cursor-pointer hover:text-blue-600"
          target="_blank"
        >
          @popcorn_dao on twitter
        </a>
      </p>
    </>
  );
}
