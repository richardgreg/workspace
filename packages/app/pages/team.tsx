import { Dialog, Transition } from '@headlessui/react';
import Burger from 'components/Burger';
import FacebookPixel from 'components/FacebookPixel';
import Menu from 'components/Menu';
import { MobileExpandableMenu } from 'components/MobileExpandableMenu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Facebook, GitHub, Twitter } from 'react-feather';
import FocusLock from 'react-focus-lock';
import { useOnClickOutside } from '../hooks';

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
      className="flex flex-col items-center mx-auto"
      style={{ width: 359, height: 441 }}
    >
      <div className="flex items-center w-36 h-36">
        <img
          src={`/images/team/${image}.svg`}
          alt="Cartoon of team member"
          className="mx-auto mb-1"
          style={{ width: 228, height: 225 }}
        ></img>
      </div>
      <h3 className="pt-8 text-3xl font-semibold">{name}</h3>
      <h3 className="pt-3 pb-6 text-xl font-normal">{position}</h3>
      <div className="flex flex-row justify-center w-10/12 mt-4">
        {linkedIn && (
          <a href={linkedIn} target="_blank">
            <h3
              className="inline-flex px-8 py-2 text-xl font-light border-gray-700 rounded-full hover:bg-primaryLight"
              style={{ border: 'solid', borderWidth: 1, marginRight: 16 }}
            >
              LinkedIn
            </h3>
          </a>
        )}

        {twitter && (
          <a href={twitter} target="_blank">
            <h3
              className="inline-flex px-8 py-2 text-xl font-light border-gray-700 rounded-full hover:bg-primaryLight"
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
      className="flex flex-col items-center mx-auto mb-12"
      style={{ width: 359, height: 330 }}
    >
      <div className="relative flex items-center w-36 h-36">
        {/* TODO: Fix popcorn overlay clipping issues */}
        {/* <img
          src={`/images/contributors/popcorn.svg`}
          className="absolute z-30 mx-auto mb-1 rounded-full -bottom-10 -left-8"
          style={{ overflow: 'clip' }}
        ></img> */}
        <img
          src={`/images/contributors/bg.svg`}
          className="absolute top-0 left-0 z-10 mx-auto mb-1 rounded-full"
          style={{ width: 241, height: 223 }}
        ></img>
        <img
          src={`/images/contributors/${image}`}
          alt="Black and white contributor headshot with overlayed cartoon popcorn"
          className="absolute z-20 mx-auto mb-1 rounded-full filter grayscale top-5 right-4"
        ></img>
      </div>
      <h3 className="pt-16 text-3xl font-semibold">{name}</h3>
      <h3 className="pt-3 text-2xl font-normal">{position}</h3>
      <div className="flex flex-row justify-center w-10/12 mt-4">
        {linkedIn && (
          <a href={linkedIn} target="_blank">
            <h3
              className="inline-flex px-8 py-2 text-xl font-light border-gray-700 rounded-full hover:bg-primaryLight"
              style={{ border: 'solid', borderWidth: 1, marginRight: 16 }}
            >
              LinkedIn
            </h3>
          </a>
        )}

        {twitter && (
          <a href={twitter} target="_blank">
            <h3
              className="inline-flex px-8 py-2 text-xl font-light border-gray-700 rounded-full hover:bg-primaryLight"
              style={{ border: 'solid', borderWidth: 1, marginLeft: 16 }}
            >
              Twitter
            </h3>
          </a>
        )}
        {github && (
          <a href={github} target="_blank">
            <h3
              className="inline-flex px-8 py-2 mr-4 text-xl font-light border-gray-700 rounded-full hover:bg-primaryLight"
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

  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = "main-menu";

  useOnClickOutside(node, () => setOpen(false));
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
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={(e) => toggleCtaModal(false)}
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 text-center pb-60 sm:block sm:p-0">
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
                className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
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
              <div className="inline-block w-full align-middle transition-all transform md:w-1/2 xl:w-1/3">
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
                    className="flex flex-col items-center justify-between w-full px-2 py-2 mt-8 bg-white shadow-xl rounded-xl md:flex-row"
                  >
                    <input
                      type="email"
                      name="EMAIL"
                      className="w-10/12 p-2 mx-4 text-base text-gray-900"
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
                        className="px-4 py-2 mt-4 text-base font-medium text-white bg-blue-600 cursor-pointer hover:bg-blue-500 rounded-xl md:mt-0"
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
      <div className="flex-col hidden w-full h-full lg:flex">
        <header className=" bg-primary">
          <nav className="flex flex-row items-center justify-between w-10/12 pt-12 pb-4 mx-auto border-b border-primaryLight">
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
                <a className="text-base font-normal hover:text-blue-600">
                  Token Launch Auction
                </a>
              </Link>
              <Link href="/docs/Popcorn_whitepaper_v1.pdf" passHref>
                <a
                  className="text-base font-normal hover:text-blue-600"
                  target="_window"
                >
                  Whitepaper
                </a>
              </Link>
              <Link href="/team" passHref>
                <a className="text-base font-medium hover:text-blue-600">
                  Team & Contributors
                </a>
              </Link>
              <a
                className="p-4 text-base font-medium text-white bg-blue-600 cursor-pointer hover:bg-blue-500 rounded-xl"
                onClick={(e) => toggleCtaModal(true)}
              >
                Early Access
              </a>
            </div>
          </nav>
        </header>

        {/* Hero/Header */}
        <section className="min-h-full">
          <div className="w-full h-8 bg-primary 2xl:h-28 "></div>
          <div
            className="flex-grow-0 flex-shrink-0 w-full h-full bg-header-team"
            style={{
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="flex flex-col items-center justify-between w-10/12 pb-48 mx-auto lg:flex-row ">
              <div className="order-2 w-full lg:w-6/12 xl:w-5/12 lg:order-1">
                <div className="w-10/12 mx-auto text-center lg:text-left lg:mx-0">
                  <h1 className="mb-3 font-normal leading-snug font-landing lg:text-5xl xl:text-7xl">
                    Our team
                  </h1>
                  <h1 className="mb-8 font-normal leading-snug font-landing lg:text-5xl xl:text-7xl ">
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
              <div className="order-1 w-full mb-8 lg:w-6/12 xl:w-7/12 lg:order-2 lg:mb-0">
                <img src="images/team.svg" />
              </div>
            </div>
            <div className="w-full h-24 2xl:h-100"></div>
          </div>
        </section>

        {/* Core team */}
        <section className="w-full mx-auto mb-24 ">
          <h2 className="w-10/12 mx-auto mb-4 text-5xl font-normal font-landing xl:text-6xl">
            Core Team
          </h2>
          <div className="grid w-10/12 grid-cols-2 mx-auto mt-12 laptop:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
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
              <span className="px-2 text-gray-500 bg-white">
                <img src="images/catsWithSunglasses.svg" />
              </span>
            </div>
          </div>
        </section>

        {/* Contributors */}
        <section className="w-full mx-auto my-24">
          <h2 className="w-10/12 mx-auto mb-4 text-5xl font-normal font-landing xl:text-6xl">
            Contributors
          </h2>
          <div className="grid w-10/12 grid-cols-3 mx-auto mt-12 xl:grid-cols-4 2xl:grid-cols-5 ">
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

        <section className="w-full bg-secondary py-52">
          <div className="w-8/12 mx-auto text-center">
            <h2 className="mb-4 text-4xl font-bold leading-snug">Notify Me</h2>
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
                className="flex flex-row items-center justify-between w-8/12 px-2 py-2 mx-auto mt-8 bg-white shadow-xl rounded-xl"
              >
                <input
                  type="email"
                  name="EMAIL"
                  className="w-10/12 p-2 mx-4 text-base text-gray-900"
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
                    className="px-4 py-2 text-base font-medium text-white bg-blue-600 cursor-pointer hover:bg-blue-500 rounded-xl"
                    readOnly
                  />
                </div>
              </div>
            </form>
          </div>
        </section>
        <section className="w-full bg-secondary">
          <div className="flex flex-row justify-between w-10/12 pb-12 mx-auto border-b border-gray-500">
            <div className="w-6/12">
              <Link href="/" passHref>
                <a>
                  <img src="/images/logo.png" alt="Logo" className="h-10"></img>
                </a>
              </Link>
              <p className="w-7/12 py-4 text-base font-medium">
                Earn high yield on your cryptoassets while helping
                fund educational, environmental and open source initiatives.
              </p>
              <div className="flex flex-row items-center space-x-4">
                <Link href="https://github.com/popcorndao" passHref>
                  <GitHub className="cursor-pointer hover:text-blue-600" />
                </Link>
                <Link href="https://www.facebook.com/PopcornDAO" passHref>
                  <Facebook className="cursor-pointer hover:text-blue-600" />
                </Link>
                <Link href="https://twitter.com/Popcorn_DAO" passHref>
                  <Twitter className="cursor-pointer hover:text-blue-600" />
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
              <p className="text-base font-medium uppercase">Site</p>
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
              <p className="text-base font-medium uppercase">Connect</p>
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
          <p className="py-4 text-center font-base">
            ©2021, Popcorn Ltd All Rights Reserved{' '}
            <span className="block text-xs ">
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
            <nav className="flex flex-row items-center justify-between p-6 border-b border-primaryLight">
                <div>
                  <Link href="/" passHref>
                    <a>
                      {/*TODO The logo is slightly blurred even though its copied straight from figma*/}
                      <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="flex-grow-0 flex-shrink-0 h-14"
                      ></img>
                    </a>
                  </Link>
                </div>
                <div ref={node}>
                  <FocusLock disabled={!open}>
                    <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
                    <Menu open={open} setOpen={setOpen} id={menuId} />
                  </FocusLock>
                </div>
              </nav>
            </header>
            <section className="min-h-full">
              <div className="w-full h-12 bg-primary"></div>
              <div
                className="flex-grow-0 flex-shrink-0 w-full h-full pt-6 bg-header-team md:pt-10"
                style={{
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="flex flex-col items-center justify-between w-10/12 pb-48 mx-auto text-center lg:flex-row">
                  <img className="w-9/12 mb-8" src="images/team.svg" />
                  <h1 className="mb-8 text-4xl font-bold leading-snug">
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
            <div className="flex flex-row justify-center w-10/12 mx-auto mt-4 mb-12">
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
                <h2 className="mb-8 text-3xl font-bold text-center">
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
                <h2 className="mb-4 text-3xl font-bold text-center">
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
                  className="flex-grow-0 flex-shrink-0 w-full h-full bg-countdown-pattern pt-60"
                  style={{
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="w-full pt-32">
                    <div className="w-10/12 mx-auto bg-white shadow-xl rounded-xl">
                      <h3 className="pt-20 pb-12 text-5xl font-medium text-center">
                        Don’t miss the token launch event!
                      </h3>
                      <div className="w-9/12 pb-20 mx-auto">
                        <div className="flex flex-row justify-between mb-8">
                          <div className="w-5/12 text-center">
                            <h1 className="font-bold leading-snug text-7xl">
                              {countdown[0]}
                            </h1>
                            <p className="text-3xl text-gray-500 font-landing">
                              Days
                            </p>
                          </div>
                          <div className="w-5/12 text-center">
                            <h1 className="font-bold leading-snug text-7xl">
                              {countdown[1]}
                            </h1>
                            <p className="text-3xl text-gray-500 font-landing">
                              Hours
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-row justify-between">
                          <div className="w-5/12 text-center">
                            <h1 className="font-bold leading-snug text-7xl">
                              {countdown[2]}
                            </h1>
                            <p className="text-3xl text-gray-500 font-landing">
                              Minutes
                            </p>
                          </div>
                          <div className="w-5/12 text-center">
                            <h1 className="font-bold leading-snug text-7xl">
                              {countdown[3]}
                            </h1>
                            <p className="text-3xl text-gray-500 font-landing">
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
            <section className="w-full py-24 bg-secondary">
              <div className="w-10/12 mx-auto text-center">
                <h2 className="mb-4 text-2xl font-bold leading-snug">
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
                    className="flex flex-row items-center justify-between w-full px-2 py-2 mx-auto mt-8 bg-white shadow-xl rounded-xl"
                  >
                    <input
                      type="email"
                      name="EMAIL"
                      className="w-10/12 p-2 mx-4 text-base text-gray-900"
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
                        className="px-4 py-2 text-base font-medium text-white bg-blue-600 cursor-pointer hover:bg-blue-500 rounded-xl"
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
                      className="flex-grow-0 flex-shrink-0 h-10"
                    ></img>
                  </a>
                </Link>
                <p className="py-4 text-base font-medium">
                  <span translate="no">Popcorn</span> is a new eco-friendly
                  paradigm for DeFi, where users can earn high yield on their
                  crypto assets while creating real world impact.
                </p>
                <div className="flex flex-row items-center space-x-4">
                  <Link href="https://github.com/popcorndao" passHref>
                    <GitHub className="cursor-pointer hover:text-blue-600" />
                  </Link>
                  <Link href="https://www.facebook.com/PopcornDAO" passHref>
                    <Facebook className="cursor-pointer hover:text-blue-600" />
                  </Link>
                  <Link href="https://twitter.com/Popcorn_DAO" passHref>
                    <Twitter className="cursor-pointer hover:text-blue-600" />
                  </Link>
                  <Link href="https://discord.gg/w9zeRTSZsq" passHref>
                    <img
                      src="/images/discord.svg"
                      alt="discord"
                      className="w-8 h-8 cursor-pointer discord"
                    ></img>
                  </Link>
                </div>
                <div className="flex flex-row py-6 justify-evenly">
                  <div className="flex flex-col w-1/2 space-y-3">
                    <p className="text-base font-medium uppercase">Site</p>
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
                  <div className="flex flex-col w-1/2 space-y-3">
                    <p className="text-base font-medium uppercase">Connect</p>
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
            <p className="text-base font-medium uppercase">Documentation</p>
            <Link href="/" passHref>
              <a className="hover:text-blue-600">Gitbook</a>
            </Link>
          </div>*/}
              </div>
              <div className="w-10/12 mx-auto mt-12 border-t border-gray-700 ">
                <p className="py-4 text-center font-base">
                  ©2021, Popcorn Ltd All Rights Reserved{' '}
                  <span className="block text-xs ">
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
