import * as Icon from 'react-feather';
import { Dialog, Transition } from '@headlessui/react';
import FacebookPixel from 'components/FacebookPixel';
import { MobileExpandableMenu } from 'components/MobileExpandableMenu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { Facebook, GitHub, Menu, Twitter, X } from 'react-feather';

interface TeamMember {
  name: string;
  position: string;
  img: string;
  linkedIn: string;
  twitter: string;
}

interface Contributor {
  name: string;
  position: string;
  img: string;
  linkedIn: string;
  twitter: string;
  github: string;
}

const TEAM: TeamMember[] = [
  {
    name: 'Anthony Martin',
    position: 'Founder & Director, Technology',
    img: 'anthony',
    linkedIn: 'https://linkedin.com/in/admartin',
    twitter: 'https://twitter.com/amart_tech',
  },
  {
    name: 'Michael Kisselgof',
    position: 'Co-founder & Director, Operations',
    img: 'michael',
    linkedIn: 'https://www.linkedin.com/in/michael-kisselgof-8932a38/',
    twitter: 'https://twitter.com/SerKisselgof',
  },
  {
    name: 'Melody Song',
    position: 'Director, Global Impact',
    img: 'melody',
    linkedIn:
      'https://www.linkedin.com/in/melody-song-%E5%AE%8B%E5%80%A9-ma-cfre-83016714/',
    twitter: 'https://twitter.com/FundraisingInn1',
  },
  {
    name: 'Mehul Mandania',
    position: 'Software Developer',
    img: 'mehul',
    linkedIn: 'https://www.linkedin.com/in/mandania',
    twitter: 'https://www.twitter.com/mandameh',
  },
  {
    name: '@horsefacts',
    position: 'Software Developer',
    img: 'connor',
    linkedIn: '',
    twitter: 'https://twitter.com/eth_call',
  },
  {
    name: 'Leon Adler',
    position: 'Software Developer',
    img: 'leon',
    linkedIn: 'https://www.linkedin.com/in/leon-niesler-903720150/',
    twitter: 'https://twitter.com/Leon_Niesler',
  },
  {
    name: 'Annisha Firdausy',
    position: 'Product Designer',
    img: 'annisha',
    linkedIn: 'https://www.linkedin.com/in/annishafirdausy/',
    twitter: '',
  },
  {
    name: 'Oscar Jacobsen',
    position: 'Coordinator',
    img: 'oscar',
    linkedIn: 'https://www.linkedin.com/in/oscar-jacobsen-b03b1a213',
    twitter: 'https://twitter.com/OscarTapio',
  },
  {
    name: 'Fan Wu',
    position: 'Product Manager',
    img: 'fan',
    linkedIn: 'https://www.linkedin.com/in/fan-wu-3093039/',
    twitter: 'https://twitter.com/fanwu___',
  },
  {
    name: 'Anna-Marie Swan',
    position: 'Project Manager',
    img: 'annamarie',
    linkedIn: 'https://www.linkedin.com/in/anna-marieswan17dm0001/',
    twitter: 'https://twitter.com/MrsBadgerface',
  },
  {
    name: 'Will Nicoll',
    position: 'Community Lead',
    img: 'will',
    linkedIn: 'https://www.linkedin.com/in/will-nicoll-5357b4b4/',
    twitter: 'https://twitter.com/illhelm1',
  },
  {
    name: 'Fernando0x		',
    position: 'Developer',
    img: 'fernando',
    linkedIn: 'https://www.linkedin.com/in/fernandotorres2/				',
    twitter: '',
  },
  {
    name: 'Bhanu Sanghi',
    position: 'Developer',
    img: 'bhanu',
    linkedIn: 'https://www.linkedin.com/in/bhanu-sanghi-943204126/							',
    twitter: 'https://twitter.com/bhanusanghi				',
  },
  {
    name: 'Leo Marlo',
    position: 'Developer',
    img: 'leo',
    linkedIn: 'https://at.linkedin.com/in/leonhard-horstmeyer				',
    twitter: 'https://twitter.com/Leo_Marlo				',
  },
  {
    name: 'Ashish Mishra',
    position: 'Developer',
    img: 'ashish',
    linkedIn: 'https://www.linkedin.com/in/ashish-mishra-b31226b1/				',
    twitter: 'https://twitter.com/mishraashish006				',
  },
  //  {
  //    name: 'Olga S.',
  //    position: 'Illustrator',
  //    img: 'olga',
  //    linkedIn: '',
  //    twitter: '',
  //  },
];

const CONTRIBUTORS: Contributor[] = [
  {
    name: '@Amirjab21',
    position: 'Software Developer',
    img: 'Amirjab21.jpg',
    linkedIn: '',
    twitter: '',
    github: 'https://github.com/Amirjab21',
  },
  {
    name: '@izayl',
    position: 'Software Developer',
    img: 'izayl.jpg',
    linkedIn: '',
    twitter: '',
    github: 'https://github.com/izayl',
  },
  {
    name: 'Rene Aavik',
    position: 'Software Developer',
    img: 'leetdev.jpg',
    linkedIn: '',
    twitter: '',
    github: 'https://github.com/leetdev',
  },
  {
    name: 'Emilio Tagua',
    position: 'Software Developer',
    img: 'miloops.jpg',
    linkedIn: '',
    twitter: '',
    github: 'https://github.com/miloops',
  },
  {
    name: '@partywave',
    position: 'Software Developer',
    img: 'partywave.png',
    linkedIn: '',
    twitter: '',
    github: 'https://github.com/partywave',
  },
  {
    name: '@saharAP',
    position: 'Software Developer',
    img: 'saharAP.jpg',
    linkedIn: '',
    twitter: '',
    github: 'https://github.com/saharAP',
  },
  {
    name: '@soptq',
    position: 'Software Developer',
    img: 'Soptq.jpg',
    linkedIn: '',
    twitter: '',
    github: 'https://github.com/Soptq',
  },
  {
    name: 'Stanlee Okwii',
    position: 'Software Developer',
    img: 'stanley.jpg',
    linkedIn: '',
    twitter: '',
    github: 'https://github.com/Stanley-Okwii',
  },
  {
    name: '@the-emerald',
    position: 'Software Developer',
    img: 'the-emerald.png',
    linkedIn: '',
    twitter: '',
    github: 'https://github.com/the-emerald',
  },
  {
    name: 'Andrew Yao',
    position: 'Software Developer',
    img: 'yaoandrew.jpg',
    linkedIn: '',
    twitter: '',
    github: 'https://github.com/yaoandrew',
  },
];

const TeamMemberCard = ({ name, position, image, linkedIn, twitter }) => {
  return (
    <div
      className="mx-auto flex flex-col items-center"
      style={{ width: 359, height: 441 }}
    >
      <div className="w-36 h-36 flex items-center">
        <img
          src={`/images/team/${image}.svg`}
          alt="Cartoon of team member"
          className="mx-auto mb-1"
          style={{ width: 228, height: 225 }}
        ></img>
      </div>
      <h3 className="font-semibold text-3xl pt-8">{name}</h3>
      <h3 className="font-normal text-xl pt-3 pb-6">{position}</h3>
      <div className="w-10/12 flex flex-row justify-center mt-4">
        {linkedIn && (
          <a href={linkedIn} target="_blank">
            <h3
              className="inline-flex px-8 py-2 rounded-full text-xl font-light hover:bg-primaryLight border-gray-700"
              style={{ border: 'solid', borderWidth: 1, marginRight: 16 }}
            >
              LinkedIn
            </h3>
          </a>
        )}

        {twitter && (
          <a href={twitter} target="_blank">
            <h3
              className="inline-flex px-8 py-2 rounded-full text-xl font-light hover:bg-primaryLight border-gray-700"
              style={{ border: 'solid', borderWidth: 1, marginLeft: 16 }}
            >
              Twitter
            </h3>
          </a>
        )}
      </div>
    </div>
  );
};

const ContributorCard = ({
  name,
  position,
  image,
  linkedIn,
  twitter,
  github,
}) => {
  return (
    <div
      className="mx-auto flex flex-col items-center mb-12"
      style={{ width: 359, height: 330 }}
    >
      <div className="w-36 h-36  flex items-center relative">
        {/* TODO: Fix popcorn overlay clipping issues */}
        {/* <img
          src={`/images/contributors/popcorn.svg`}
          className="mx-auto mb-1 rounded-full absolute -bottom-10 -left-8 z-30"
          style={{ overflow: 'clip' }}
        ></img> */}
        <img
          src={`/images/contributors/bg.svg`}
          className="mx-auto mb-1 rounded-full absolute top-0 left-0 z-10"
          style={{ width: 241, height: 223 }}
        ></img>
        <img
          src={`/images/contributors/${image}`}
          alt="Black and white contributor headshot with overlayed cartoon popcorn"
          className="filter grayscale mx-auto mb-1 rounded-full absolute top-5 right-4 z-20"
        ></img>
      </div>
      <h3 className="font-semibold text-3xl pt-16">{name}</h3>
      <h3 className="font-normal text-2xl pt-3">{position}</h3>
      <div className="w-10/12 flex flex-row justify-center mt-4">
        {linkedIn && (
          <a href={linkedIn} target="_blank">
            <h3
              className="inline-flex px-8 py-2 rounded-full text-xl font-light hover:bg-primaryLight border-gray-700"
              style={{ border: 'solid', borderWidth: 1, marginRight: 16 }}
            >
              LinkedIn
            </h3>
          </a>
        )}

        {twitter && (
          <a href={twitter} target="_blank">
            <h3
              className="inline-flex px-8 py-2 rounded-full text-xl font-light hover:bg-primaryLight border-gray-700"
              style={{ border: 'solid', borderWidth: 1, marginLeft: 16 }}
            >
              Twitter
            </h3>
          </a>
        )}
        {github && (
          <a href={github} target="_blank">
            <h3
              className="inline-flex px-8 py-2 rounded-full text-xl font-light hover:bg-primaryLight border-gray-700 mr-4"
              style={{ border: 'solid', borderWidth: 1, marginLeft: 16 }}
            >
              GitHub
            </h3>
          </a>
        )}
      </div>
    </div>
  );
};

const TeamPage = () => {
  const router = useRouter();
  const endDate = 1638172800000; //Nov 29, 08.00.00 UTC
  const [countdown, setCountdown] = useState<number[]>([]);
  const [countdownActive, disableCountdown] = useState<boolean>(true);
  const [menuVisible, toggleMenuVisible] = useState<boolean>(false);
  const [ctaModalVisible, toggleCtaModal] = useState<boolean>(false);
  const [teamVisible, setTeamVisible] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.replace(window.location.pathname);
    }
  }, [router.pathname]);

  useEffect(() => {
    if (countdownActive) {
      setInterval(function () {
        const now = new Date().getTime();

        const distance = endDate - now;
        if (distance < 0) {
          disableCountdown(false);
          setCountdown([0, 0, 0, 0]);
        }

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown([days, hours, minutes, seconds]);
      }, 1000);
    }
  }, []);

  return (
    <div className="font-landing">
      <FacebookPixel />
      {/* Modal to display signup form*/}
      <Transition.Root show={ctaModalVisible} as={Fragment}>
        <Dialog
          as="div"
          auto-reopen="true"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={(e) => toggleCtaModal(false)}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-60 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                style={{ backdropFilter: 'blur(5px)' }}
              />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="w-full md:w-1/2 xl:w-1/3 inline-block transform transition-all align-middle">
                <form
                  action="https://network.us1.list-manage.com/subscribe/post?u=5ce5e82d673fd2cfaf12849a5&amp;id=e85a091ed3"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  className="validate"
                  target="_blank"
                  noValidate
                >
                  <div
                    id="mc_embed_signup_scroll"
                    className="shadow-xl bg-white rounded-xl py-2 px-2 mt-8 w-full flex flex-col md:flex-row items-center justify-between"
                  >
                    <input
                      type="email"
                      name="EMAIL"
                      className="w-10/12 p-2 text-base mx-4 text-gray-900"
                      id="mce-EMAIL"
                      placeholder="Email Address"
                      required
                    />
                    <div
                      style={{ position: 'absolute', left: '-5000px' }}
                      aria-hidden="true"
                    >
                      <input
                        type="text"
                        name="b_5ce5e82d673fd2cfaf12849a5_e85a091ed3"
                        tabIndex={-1}
                      />
                    </div>
                    <div className="clear">
                      <input
                        type="submit"
                        value="Join Waitlist"
                        name="subscribe"
                        id="mc-embedded-subscribe"
                        className="font-medium text-base bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2 mt-4 md:mt-0 cursor-pointer"
                        readOnly
                        onClick={(e) => toggleCtaModal(false)}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {/* DESKTOP + TABLET VERSION */}
      <div className="hidden lg:flex flex-col w-full h-full">
        <header className=" bg-primary">
          {!countdownActive && (
            <Link href="https://launch.popcorn.network" passHref>
              <a target="_window">
                <div className="w-full h-14 bg-yellow-500 shadow-md flex justify-center cursor-pointer hover:bg-yellow-400">
                  <div className="flex flex-row items-center mx-auto">
                    <p className="text-white text-2xl font-bold">
                      Token Launch Auction Now Live!
                    </p>
                    <Icon.ArrowRightCircle className="ml-2 w-7 h-7 text-white" />
                  </div>
                </div>
              </a>
            </Link>
          )}
          {countdownActive && (
            <Link href="https://launch.popcorn.network/" passHref>
              <a target="_window">
                <div className="w-full h-14 bg-yellow-500 shadow-md flex justify-center cursor-pointer hover:bg-yellow-400">
                  <div className="flex flex-row items-center mx-auto">
                    <p className="text-white text-2xl font-bold">
                      Token Launch Auction
                    </p>
                    <Icon.ArrowRightCircle className="ml-2 w-7 h-7 text-white" />
                  </div>
                </div>
              </a>
            </Link>
          )}
          <nav className="w-10/12 mx-auto pt-12 pb-4 border-b border-primaryLight flex flex-row items-center justify-between">
            <div>
              <Link href="/" passHref>
                <a>
                  {/*TODO The logo is slightly blurred even though its copied straight from figma*/}
                  <img
                    src="/images/textLogo.png"
                    alt="Logo"
                    className="h-12"
                  ></img>
                </a>
              </Link>
            </div>
            <div className="space-x-8">
              <Link href="https://launch.popcorn.network/" passHref>
                <a className="font-normal text-base hover:text-blue-600">
                  Token Launch Auction
                </a>
              </Link>
              <Link href="/docs/Popcorn_whitepaper_v1.pdf" passHref>
                <a
                  className="font-normal text-base hover:text-blue-600"
                  target="_window"
                >
                  Whitepaper
                </a>
              </Link>
              <Link href="/team" passHref>
                <a className="font-medium text-base hover:text-blue-600">
                  Team & Contributors
                </a>
              </Link>
              <a
                className="font-medium text-base bg-blue-600 hover:bg-blue-500 text-white rounded-xl p-4 cursor-pointer"
                onClick={(e) => toggleCtaModal(true)}
              >
                Early Access
              </a>
            </div>
          </nav>
        </header>

        {/* Hero/Header */}
        <section className="min-h-full">
          <div className="bg-primary w-full h-8 2xl:h-28 "></div>
          <div
            className="bg-header-team flex-shrink-0 flex-grow-0 w-full h-full"
            style={{
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="w-10/12 mx-auto flex flex-col lg:flex-row justify-between pb-48 items-center ">
              <div className="w-full lg:w-6/12 xl:w-5/12 order-2 lg:order-1">
                <div className="w-10/12 text-center mx-auto lg:text-left lg:mx-0">
                  <h1 className="font-normal font-landing lg:text-5xl xl:text-7xl leading-snug mb-3">
                    Our team
                  </h1>
                  <h1 className="font-normal font-landing lg:text-5xl xl:text-7xl leading-snug mb-8 ">
                    & Contributors
                  </h1>
                  <p className="text-2xl font-landing">
                    This is DeFi for the People. We believe in breaking down
                    social and cultural barriers by creating a welcoming
                    community to anyone who is interested in creating positive
                    social impact through DeFi.
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-7/12 order-1 lg:order-2 mb-8 lg:mb-0">
                <img src="images/team.svg" />
              </div>
            </div>
            <div className="w-full h-24 2xl:h-100"></div>
          </div>
        </section>

        {/* Core team */}
        <section className="w-full mx-auto mb-24 ">
          <h2 className="w-10/12 font-normal font-landing text-5xl xl:text-6xl mb-4 mx-auto">
            Core Team
          </h2>
          <div className="w-10/12 mx-auto mt-12 grid grid-cols-2 laptop:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {TEAM.map((teamMember) => {
              return (
                <TeamMemberCard
                  key={teamMember.name}
                  name={teamMember.name}
                  position={teamMember.position}
                  image={teamMember.img}
                  linkedIn={teamMember.linkedIn}
                  twitter={teamMember.twitter}
                />
              );
            })}
          </div>
        </section>

        {/* Divider with image in centre*/}
        <section>
          <div className="relative w-10/12 mx-auto">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-gray-500">
                <img src="images/catsWithSunglasses.svg" />
              </span>
            </div>
          </div>
        </section>

        {/* Contributors */}
        <section className="w-full mx-auto my-24">
          <h2 className="w-10/12 font-normal font-landing text-5xl xl:text-6xl mb-4 mx-auto">
            Contributors
          </h2>
          <div className="w-10/12 mx-auto mt-12 grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
            {CONTRIBUTORS.map((contributor) => {
              return (
                <ContributorCard
                  key={contributor.name}
                  name={contributor.name}
                  position={contributor.position}
                  image={contributor.img}
                  linkedIn={contributor.linkedIn}
                  twitter={contributor.twitter}
                  github={contributor.github}
                />
              );
            })}
          </div>
        </section>

{countdownActive && (
        <section>
          <div
            className="bg-countdown-pattern flex-shrink-0 flex-grow-0 w-full
          h-full pt-60 xl:pt-72 2xl:pt-104"
            style={{
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="pt-32">
              <div className="w-10/12 mx-auto rounded-xl shadow-xl bg-white">
                <h3 className="font-medium text-4xl pt-20 pb-12 text-center">
                  Don’t miss the token launch event!
                </h3>
                <div className="w-9/12 mx-auto flex flex-row justify-between pb-20">
                  <div className="text-center">
                    <h1 className="font-bold text-7xl leading-snug">
                      {countdown[0]}
                    </h1>
                    <p className="text-3xl font-landing text-gray-500">Days</p>
                  </div>
                  <div className="text-center">
                    <h1 className="font-bold text-7xl leading-snug">
                      {countdown[1]}
                    </h1>
                    <p className="text-3xl font-landing text-gray-500">Hours</p>
                  </div>
                  <div className="text-center">
                    <h1 className="font-bold text-7xl leading-snug">
                      {countdown[2]}
                    </h1>
                    <p className="text-3xl font-landing text-gray-500">
                      Minutes
                    </p>
                  </div>
                  <div className="text-center">
                    <h1 className="font-bold text-7xl leading-snug">
                      {countdown[3]}
                    </h1>
                    <p className="text-3xl font-landing text-gray-500">
                      Seconds
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>)}
        <section className="w-full bg-secondary py-52">
          <div className="w-8/12 mx-auto text-center">
            <h2 className="font-bold text-4xl leading-snug mb-4">Notify Me</h2>
            <p className="text-2xl font-medium">
              Get early
              notification to be part of our journey
            </p>
            <form
              action="https://network.us1.list-manage.com/subscribe/post?u=5ce5e82d673fd2cfaf12849a5&amp;id=e85a091ed3"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate"
              target="_blank"
              noValidate
            >
              <div
                id="mc_embed_signup_scroll"
                className="shadow-xl bg-white rounded-xl py-2 px-2 mt-8 w-8/12 mx-auto flex flex-row items-center justify-between"
              >
                <input
                  type="email"
                  name="EMAIL"
                  className="w-10/12 p-2 text-base mx-4 text-gray-900"
                  id="mce-EMAIL"
                  placeholder="Email Address"
                  required
                />
                <div
                  style={{ position: 'absolute', left: '-5000px' }}
                  aria-hidden="true"
                >
                  <input
                    type="text"
                    name="b_5ce5e82d673fd2cfaf12849a5_e85a091ed3"
                    tabIndex={-1}
                  />
                </div>
                <div className="clear">
                  <input
                    type="submit"
                    value="Join Waitlist"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="font-medium text-base bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2 cursor-pointer"
                    readOnly
                  />
                </div>
              </div>
            </form>
          </div>
        </section>
        <section className="w-full bg-secondary">
          <div className="w-10/12 mx-auto flex flex-row justify-between border-b border-gray-500 pb-12">
            <div className="w-6/12">
              <Link href="/" passHref>
                <a>
                  <img src="/images/logo.png" alt="Logo" className="h-10"></img>
                </a>
              </Link>
              <p className="font-medium text-base w-7/12 py-4">
                Earn high yield on your cryptoassets while helping
                fund educational, environmental and open source initiatives.
              </p>
              <div className="flex flex-row space-x-4 items-center">
                <Link href="https://github.com/popcorndao" passHref>
                  <GitHub className="hover:text-blue-600 cursor-pointer" />
                </Link>
                <Link href="https://www.facebook.com/PopcornDAO" passHref>
                  <Facebook className="hover:text-blue-600 cursor-pointer" />
                </Link>
                <Link href="https://twitter.com/Popcorn_DAO" passHref>
                  <Twitter className="hover:text-blue-600 cursor-pointer" />
                </Link>
                <Link href="https://discord.gg/w9zeRTSZsq" passHref>
                  <img
                    src="/images/discord.svg"
                    alt="discord"
                    className="w-8 h-8 cursor-pointer discord"
                  ></img>
                </Link>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <p className="font-medium text-base uppercase">Site</p>
              <Link href="/" passHref>
                <a className="hover:text-blue-600">Home</a>
              </Link>

              <Link href="https://medium.com/popcorndao" passHref>
                <a className="hover:text-blue-600" target="_blank">
                  Blog
                </a>
              </Link>
              <Link
                href="https://etherscan.io/token/0xd0cd466b34a24fcb2f87676278af2005ca8a78c4"
                passHref
              >
                <a className="hover:text-blue-600" target="_blank">
                  Popcorn (POP) Token
                </a>
              </Link>
            </div>
            <div className="flex flex-col space-y-3">
              <p className="font-medium text-base uppercase">Connect</p>
              <Link href="https://twitter.com/Popcorn_DAO" passHref>
                <a className="hover:text-blue-600" target="_blank">
                  Twitter
                </a>
              </Link>
              <Link href="https://discord.gg/w9zeRTSZsq" passHref>
                <a className="hover:text-blue-600" target="_blank">
                  Discord
                </a>
              </Link>
              <Link href="https://github.com/popcorndao" passHref>
                <a className="hover:text-blue-600" target="_blank">
                  Github
                </a>
              </Link>
            </div>
          </div>
          <p className="font-base text-center py-4">
            ©2021, Popcorn Ltd All Rights Reserved{' '}
            <span className="text-xs block ">
              Winterbotham Place Marlborough &amp; Queen Streets P.O. Box SP
              62556 Nassau, BS
            </span>{' '}
          </p>
        </section>
      </div>
      {/* MOBILE VERSION */}
      <div className="w-full h-full lg:hidden">
        <Transition
          show={menuVisible}
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <MobileExpandableMenu toggleMenuVisible={toggleMenuVisible} />
        </Transition>
        <Transition
          show={!menuVisible}
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div>
            <header className="w-full bg-primary">
              <nav className="w-10/12 mx-auto pt-4 pb-3 border-b border-primaryLight flex flex-row items-center justify-between">
                <div>
                  <Link href="/" passHref>
                    <a>
                      {/*TODO The logo is slightly blurred even though its copied straight from figma*/}
                      <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="h-14 flex-grow-0 flex-shrink-0"
                      ></img>
                    </a>
                  </Link>
                </div>
                <Menu style={{}} onClick={(e) => toggleMenuVisible(true)} />
              </nav>
            </header>
            <section className="min-h-full">
              <div className="bg-primary w-full h-12"></div>
              <div
                className="bg-header-team flex-shrink-0 flex-grow-0 w-full h-full pt-6 md:pt-10"
                style={{
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="w-10/12 mx-auto flex flex-col lg:flex-row justify-between pb-48 items-center text-center">
                  <img className="w-9/12 mb-8" src="images/team.svg" />
                  <h1 className="font-bold text-4xl leading-snug mb-8">
                    Our team & contributors
                  </h1>
                  <p className="font-landing" style={{ fontSize: 24 }}>
                    This is DeFi for the People. We believe in breaking down
                    social and cultural barriers by creating a welcoming
                    community to anyone who is interested in creating positive
                    social impact through DeFi.
                  </p>
                </div>
              </div>
            </section>
            <div className="w-10/12 flex flex-row justify-center mt-4 mx-auto mb-12">
              <h3
                onClick={() => setTeamVisible(!teamVisible)}
                className={`inline-flex px-8 mr-3 py-2 rounded-full text-xl font-normal ${
                  teamVisible ? 'bg-activeYellow' : 'bg-inactiveYellow'
                }`}
              >
                Team
              </h3>
              <h3
                onClick={() => setTeamVisible(!teamVisible)}
                className={`inline-flex px-8 ml-3 py-2 rounded-full text-xl font-normal ${
                  !teamVisible ? 'bg-activeYellow' : 'bg-inactiveYellow'
                }`}
              >
                Contributors
              </h3>
            </div>

            {teamVisible && (
              <section className="mx-auto mb-24">
                <h2 className="font-bold text-3xl mb-8 text-center">
                  Core Team
                </h2>
                {TEAM.map((teamMember) => {
                  return (
                    <TeamMemberCard
                      key={teamMember.name}
                      name={teamMember.name}
                      position={teamMember.position}
                      image={teamMember.img}
                      linkedIn={teamMember.linkedIn}
                      twitter={teamMember.twitter}
                    />
                  );
                })}
              </section>
            )}

            {!teamVisible && (
              <section className="w-10/12 mx-auto mb-24">
                <h2 className="font-bold text-3xl mb-4 text-center">
                  Contributors
                </h2>
                {CONTRIBUTORS.map((contributor) => {
                  return (
                    <ContributorCard
                      key={contributor.name}
                      name={contributor.name}
                      position={contributor.position}
                      image={contributor.img}
                      linkedIn={contributor.linkedIn}
                      twitter={contributor.twitter}
                      github={contributor.github}
                    />
                  );
                })}
              </section>
            )}

            {countdownActive && (
              <section>
                <div
                  className="bg-countdown-pattern flex-shrink-0 flex-grow-0 w-full
          h-full pt-60"
                  style={{
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="w-full pt-32">
                    <div className="w-10/12 mx-auto rounded-xl shadow-xl bg-white">
                      <h3 className="font-medium text-5xl pt-20 pb-12 text-center">
                        Don’t miss the token launch event!
                      </h3>
                      <div className="w-9/12 mx-auto pb-20">
                        <div className="flex flex-row justify-between mb-8">
                          <div className="w-5/12 text-center">
                            <h1 className="font-bold text-7xl leading-snug">
                              {countdown[0]}
                            </h1>
                            <p className="text-3xl font-landing text-gray-500">
                              Days
                            </p>
                          </div>
                          <div className="w-5/12 text-center">
                            <h1 className="font-bold text-7xl leading-snug">
                              {countdown[1]}
                            </h1>
                            <p className="text-3xl font-landing text-gray-500">
                              Hours
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-row justify-between">
                          <div className="w-5/12 text-center">
                            <h1 className="font-bold text-7xl leading-snug">
                              {countdown[2]}
                            </h1>
                            <p className="text-3xl font-landing text-gray-500">
                              Minutes
                            </p>
                          </div>
                          <div className="w-5/12 text-center">
                            <h1 className="font-bold text-7xl leading-snug">
                              {countdown[3]}
                            </h1>
                            <p className="text-3xl font-landing text-gray-500">
                              Seconds
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
            <section className="w-full bg-secondary py-24">
              <div className="w-10/12 mx-auto text-center">
                <h2 className="font-bold text-2xl leading-snug mb-4">
                  Notify Me
                </h2>
                <p className="text-lg">
                  Get early
                  notification to be part of our journey
                </p>
                <form
                  action="https://network.us1.list-manage.com/subscribe/post?u=5ce5e82d673fd2cfaf12849a5&amp;id=e85a091ed3"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  className="validate"
                  target="_blank"
                  noValidate
                >
                  <div
                    id="mc_embed_signup_scroll"
                    className="shadow-xl bg-white rounded-xl py-2 px-2 mt-8 w-full mx-auto flex flex-row items-center justify-between"
                  >
                    <input
                      type="email"
                      name="EMAIL"
                      className="w-10/12 p-2 text-base mx-4 text-gray-900"
                      id="mce-EMAIL"
                      placeholder="Email Address"
                      required
                    />
                    <div
                      style={{ position: 'absolute', left: '-5000px' }}
                      aria-hidden="true"
                    >
                      <input
                        type="text"
                        name="b_5ce5e82d673fd2cfaf12849a5_e85a091ed3"
                        tabIndex={-1}
                      />
                    </div>
                    <div className="clear">
                      <input
                        type="submit"
                        value="Join Waitlist"
                        name="subscribe"
                        id="mc-embedded-subscribe"
                        className="font-medium text-base bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2 cursor-pointer"
                        readOnly
                      />
                    </div>
                  </div>
                </form>
              </div>
            </section>
            <section className="w-full bg-secondary">
              <div className="w-10/12 mx-auto">
                <Link href="/" passHref>
                  <a>
                    {/*TODO The logo is slightly blurred even though its copied straight from figma*/}
                    <img
                      src="/images/logo.png"
                      alt="Logo"
                      className="h-10 flex-shrink-0 flex-grow-0"
                    ></img>
                  </a>
                </Link>
                <p className="font-medium text-base py-4">
                  <span translate="no">Popcorn</span> is a new eco-friendly
                  paradigm for DeFi, where users can earn high yield on their
                  crypto assets while creating real world impact.
                </p>
                <div className="flex flex-row space-x-4 items-center">
                  <Link href="https://github.com/popcorndao" passHref>
                    <GitHub className="hover:text-blue-600 cursor-pointer" />
                  </Link>
                  <Link href="https://www.facebook.com/PopcornDAO" passHref>
                    <Facebook className="hover:text-blue-600 cursor-pointer" />
                  </Link>
                  <Link href="https://twitter.com/Popcorn_DAO" passHref>
                    <Twitter className="hover:text-blue-600 cursor-pointer" />
                  </Link>
                  <Link href="https://discord.gg/w9zeRTSZsq" passHref>
                    <img
                      src="/images/discord.svg"
                      alt="discord"
                      className="w-8 h-8 cursor-pointer discord"
                    ></img>
                  </Link>
                </div>
                <div className="flex flex-row justify-evenly py-6">
                  <div className="flex flex-col space-y-3 w-1/2">
                    <p className="font-medium text-base uppercase">Site</p>
                    <Link href="/" passHref>
                      <a className="hover:text-blue-600">Home</a>
                    </Link>
                    {/*<Link href="/" passHref>
                  <a className="hover:text-blue-600">About us</a>
                </Link>*/}
                    <Link href="https://medium.com/popcorndao" passHref>
                      <a className="hover:text-blue-600" target="_blank">
                        Blog
                      </a>
                    </Link>
                    <Link
                      href="https://etherscan.io/token/0xd0cd466b34a24fcb2f87676278af2005ca8a78c4"
                      passHref
                    >
                      <a className="hover:text-blue-600" target="_blank">
                        <span translate="no">Popcorn</span> (POP) Token
                      </a>
                    </Link>
                  </div>
                  <div className="flex flex-col space-y-3 w-1/2">
                    <p className="font-medium text-base uppercase">Connect</p>
                    <Link href="https://twitter.com/Popcorn_DAO" passHref>
                      <a className="hover:text-blue-600" target="_blank">
                        Twitter
                      </a>
                    </Link>
                    <Link href="https://discord.gg/w9zeRTSZsq" passHref>
                      <a className="hover:text-blue-600" target="_blank">
                        Discord
                      </a>
                    </Link>
                    <Link href="https://github.com/popcorndao" passHref>
                      <a className="hover:text-blue-600" target="_blank">
                        Github
                      </a>
                    </Link>
                  </div>
                </div>
                {/*<div className="flex flex-col space-y-3">
            <p className="font-medium text-base uppercase">Documentation</p>
            <Link href="/" passHref>
              <a className="hover:text-blue-600">Gitbook</a>
            </Link>
          </div>*/}
              </div>
              <div className="w-10/12 border-t border-gray-700 mt-12 mx-auto ">
                <p className="font-base text-center py-4">
                  ©2021, Popcorn Ltd All Rights Reserved{' '}
                  <span className="text-xs block ">
                    Winterbotham Place Marlborough &amp; Queen Streets P.O. Box
                    SP 62556 Nassau, BS
                  </span>
                </p>
              </div>
            </section>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default TeamPage;
