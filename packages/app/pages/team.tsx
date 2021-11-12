import { Dialog, Transition } from '@headlessui/react';

import { XIcon } from '@heroicons/react/solid';
import FacebookPixel from 'components/FacebookPixel';
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

const TEAM: TeamMember[] = [
  {
    name: 'Anthony Martin',
    position: 'Founder & CTO',
    img: 'anthony',
    linkedIn: 'https://www.linkedin.com/',
    twitter: 'https://www.twitter.com/',
  },
  {
    name: 'Michael Kisselgof',
    position: 'Co-founder',
    img: 'michael',
    linkedIn: 'https://www.linkedin.com/',
    twitter: 'https://www.twitter.com/',
  },
  {
    name: 'Mehul Mandania',
    position: 'Dev',
    img: 'mehul',
    linkedIn: 'https://www.linkedin.com/',
    twitter: 'https://www.twitter.com/',
  },

  {
    name: 'Oscar',
    position: 'Exec Asst',
    img: 'oscar',
    linkedIn: 'https://www.linkedin.com/',
    twitter: 'https://www.twitter.com/',
  },
  {
    name: 'Anna Marie',
    position: '',
    img: 'annamarie',
    linkedIn: 'https://www.linkedin.com/',
    twitter: 'https://www.twitter.com/',
  },
  {
    name: 'Melody',
    position: '',
    img: 'melody',
    linkedIn: 'https://www.linkedin.com/',
    twitter: 'https://www.twitter.com/',
  },
  {
    name: 'Melody',
    position: '',
    img: 'melody',
    linkedIn: 'https://www.linkedin.com/',
    twitter: 'https://www.twitter.com/',
  },
  {
    name: 'Melody',
    position: '',
    img: 'melody',
    linkedIn: 'https://www.linkedin.com/',
    twitter: 'https://www.twitter.com/',
  },
  {
    name: 'Melody',
    position: '',
    img: 'melody',
    linkedIn: 'https://www.linkedin.com/',
    twitter: 'https://www.twitter.com/',
  },
  {
    name: 'Melody',
    position: '',
    img: 'melody',
    linkedIn: 'https://www.linkedin.com/',
    twitter: 'https://www.twitter.com/',
  },
  {
    name: 'Melody',
    position: '',
    img: 'melody',
    linkedIn: 'https://www.linkedin.com/',
    twitter: 'https://www.twitter.com/',
  },
  {
    name: 'Melody',
    position: '',
    img: 'melody',
    linkedIn: 'https://www.linkedin.com/',
    twitter: 'https://www.twitter.com/',
  },
];

const TeamMemberCard = ({ name, position, image, linkedIn, twitter }) => {
  return (
    <div
      className="mx-auto flex flex-col items-center "
      style={{ width: 359, height: 441 }}
    >
      <div className="w-36 h-36 flex items-center">
        <img
          src={`/images/team/${image}.svg`}
          alt="Cartoon of team member"
          className="mx-auto mb-1"
        ></img>
      </div>
      <h3 className="font-semibold text-3xl pt-8">{name}</h3>
      <h3 className="font-normal text-2xl pt-3">{position}</h3>
      <div className="w-10/12 flex flex-row justify-center mt-4">
        <a href={linkedIn}>
          <h3 className="inline-flex px-8 mr-1 py-2 rounded-full text-xl font-light hover:bg-primaryLight border-2 border-gray-700">
            LinkedIn
          </h3>
        </a>
        <a href={twitter}>
          <h3 className="inline-flex px-8 ml-1 py-2 rounded-full text-xl font-light hover:bg-primaryLight border-2 border-gray-700">
            Twitter
          </h3>
        </a>
      </div>
    </div>
  );
};

const ContributorCard = ({ name, position, image, linkedIn, twitter }) => {
  return (
    <div
      className="mx-auto flex flex-col items-center mb-12"
      style={{ width: 359, height: 330 }}
    >
      <div className="w-36 h-36  flex items-center relative">
        <img
          src={`/images/contributors/popcorn-v2.svg`}
          className="mx-auto mb-1 rounded-full absolute -bottom-10 -left-8 z-30"
          // style={{ width: 46, height: 47 }}
        ></img>
        <img
          src={`/images/contributors/bg.svg`}
          className="mx-auto mb-1 rounded-full absolute top-0 left-0 z-10"
          style={{ width: 241, height: 223 }}
        ></img>
        <img
          src={`/images/contributors/${image}.png`}
          alt="Black and white contributor headshot with overlayed cartoon popcorn"
          className="mx-auto mb-1 rounded-full absolute top-5 right-4 z-20"
        ></img>
      </div>
      <h3 className="font-semibold text-3xl pt-16">{name}</h3>
      <h3 className="font-normal text-2xl pt-3">{position}</h3>
      <div className="w-10/12 flex flex-row justify-center mt-4">
        <a href={linkedIn}>
          <h3 className="inline-flex px-8 mr-1 py-2 rounded-full text-xl font-light hover:bg-primaryLight border-2 border-gray-700">
            LinkedIn
          </h3>
        </a>
        <a href={twitter}>
          <h3 className="inline-flex px-8 mr-1 py-2 rounded-full text-xl font-light hover:bg-primaryLight border-2 border-gray-700">
            Twitter
          </h3>
        </a>
      </div>
    </div>
  );
};

const TeamPage = () => {
  const router = useRouter();
  const endDate = 1638172800000; //Nov 29, 08.00.00 UTC
  const [countdown, setCountdown] = useState<number[]>([]);
  const [countdownActive, disableCountdown] = useState<boolean>(true);
  const [menuVisible, toggleMenu] = useState<boolean>(false);
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
              <Link href="/about" passHref>
                <a className="font-normal text-base hover:text-blue-600">
                  About Us
                </a>
              </Link>
              <Link href="/products" passHref>
                <a className="font-normal text-base hover:text-blue-600">
                  Products
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
              <Link href="/" passHref>
                <a className="font-normal text-base hover:text-blue-600">
                  PopcornDAO
                </a>
              </Link>
              <Link href="/team" passHref>
                <a className="font-medium text-base hover:text-blue-600">
                  Team
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
            <ContributorCard
              name={'Name'}
              position={'Job'}
              image={'contributor'}
              linkedIn={'https://www.linkedin.com/ex'}
              twitter={'https://www.twitter.com/ex'}
            />
            <ContributorCard
              name={'Name'}
              position={'Job'}
              image={'contributor'}
              linkedIn={'https://www.linkedin.com/ex'}
              twitter={'https://www.twitter.com/ex'}
            />

            <ContributorCard
              name={'Name'}
              position={'Job'}
              image={'contributor'}
              linkedIn={'https://www.linkedin.com/ex'}
              twitter={'https://www.twitter.com/ex'}
            />

            <ContributorCard
              name={'Name'}
              position={'Job'}
              image={'contributor'}
              linkedIn={'https://www.linkedin.com/ex'}
              twitter={'https://www.twitter.com/ex'}
            />
          </div>
        </section>

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
                  Don’t miss the liquidity event!
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
        </section>
        <section className="w-full bg-secondary py-52">
          <div className="w-8/12 mx-auto text-center">
            <h2 className="font-bold text-4xl leading-snug mb-4">Notify Me</h2>
            <p className="text-2xl font-medium">
              Can’t wait to see you when we are launching. Get earlier
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
                Popcorn is a carbon-neutral crypto savings account where fees
                fund educational, environmental and open source initiatives
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
                <a className="hover:text-blue-600" target="_window">
                  Blog
                </a>
              </Link>
              <Link
                href="https://etherscan.io/token/0xd0cd466b34a24fcb2f87676278af2005ca8a78c4"
                passHref
              >
                <a className="hover:text-blue-600" target="_window">
                  Popcorn (POP) Token
                </a>
              </Link>
            </div>
            <div className="flex flex-col space-y-3">
              <p className="font-medium text-base uppercase">Connect</p>
              <Link href="https://twitter.com/Popcorn_DAO" passHref>
                <a className="hover:text-blue-600" target="_window">
                  Twitter
                </a>
              </Link>
              <Link href="https://discord.gg/w9zeRTSZsq" passHref>
                <a className="hover:text-blue-600" target="_window">
                  Discord
                </a>
              </Link>
              <Link href="https://github.com/popcorndao" passHref>
                <a className="hover:text-blue-600" target="_window">
                  Github
                </a>
              </Link>
            </div>
          </div>
          <p className="font-base text-center py-4">
            ©2021, Popcorn Network. All Rights Reserved
          </p>
        </section>
      </div>
      {/* MOBILE VERSION */}
      <div className="w-full h-full lg:hidden">
        {menuVisible && (
          <div className="absolute z-10 w-full">
            <div className="relative w-full bg-bg-gradient py-6">
              <div className="w-10/12 mx-auto ">
                <div className="grid justify-items-stretch">
                  <XIcon
                    onClick={() => toggleMenu(!menuVisible)}
                    className="my-3 text-white h-5 w-5 justify-self-end"
                  />
                </div>
                <div
                  className="w-full bg-white "
                  style={{ height: 0.32 }}
                ></div>
                <h1 className="ml-3 my-3 text-4xl font-bold text-white font-landing">
                  About Us
                </h1>
                <div
                  className="w-full bg-white opacity-50"
                  style={{ height: 0.72 }}
                ></div>
                <h1 className="ml-3 my-3 text-4xl font-bold text-white font-landing">
                  Products
                </h1>
                <div
                  className="w-full bg-white opacity-50"
                  style={{ height: 0.72 }}
                ></div>
                <h1 className="ml-3 my-3 text-4xl font-bold text-white font-landing">
                  PopcornDAO
                </h1>
                <div
                  className="w-full bg-white opacity-50"
                  style={{ height: 0.72 }}
                ></div>
                <h1 className="ml-3 my-3 text-4xl font-bold text-gray-700 font-landing">
                  Team
                </h1>
                <div
                  className="w-full bg-white opacity-50"
                  style={{ height: 0.72 }}
                ></div>
                <div className="w-10/12 grid grid-cols-4 my-5 mx-auto">
                  <div>
                    <Link href="https://github.com/popcorndao" passHref>
                      <GitHub
                        className="text-white cursor-pointer"
                        style={{ width: 33, height: 33 }}
                      />
                    </Link>
                  </div>
                  <div>
                    <Link href="https://www.facebook.com/PopcornDAO" passHref>
                      <Facebook
                        className="text-white cursor-pointer"
                        style={{ width: 33, height: 33 }}
                      />
                    </Link>
                  </div>
                  <div>
                    <Link href="https://twitter.com/Popcorn_DAO" passHref>
                      <Twitter
                        className="text-white cursor-pointer"
                        style={{ width: 33, height: 33 }}
                      />
                    </Link>
                  </div>
                  <div>
                    <Link href="https://discord.gg/w9zeRTSZsq" passHref>
                      <img
                        src="/images/discord-white.svg"
                        alt="discord"
                        className=" text-white cursor-pointer discord"
                        style={{ width: 33, height: 33 }}
                      ></img>
                    </Link>
                  </div>
                </div>
                <div className="w-full bg-white" style={{ height: 0.72 }}></div>
                <div className="flex flex-row justify-evenly py-6">
                  <div className="flex flex-col space-y-3 w-1/2">
                    <p className="font-bold uppercase text-base font-landing text-white">
                      Site
                    </p>
                    <Link href="/" passHref>
                      <a className="text-xl text-white text-semibold">Home</a>
                    </Link>
                    <Link href="/about" passHref>
                      <a
                        className="text-xl text-white text-semibold"
                        target="_window"
                      >
                        About us
                      </a>
                    </Link>
                    <Link href="https://medium.com/popcorndao" passHref>
                      <a
                        className="text-xl text-white text-semibold"
                        target="_window"
                      >
                        Blog
                      </a>
                    </Link>
                  </div>
                  <div className="ml-20 flex flex-col space-y-3 w-1/2">
                    <p className="font-bold uppercase text-base font-landing text-white">
                      Connect
                    </p>
                    <Link href="https://twitter.com/Popcorn_DAO" passHref>
                      <a
                        className="text-xl text-white text-semibold"
                        target="_window"
                      >
                        Twitter
                      </a>
                    </Link>
                    <Link href="https://discord.gg/w9zeRTSZsq" passHref>
                      <a
                        className="text-xl text-white text-semibold"
                        target="_window"
                      >
                        Discord
                      </a>
                    </Link>
                    <Link href="https://github.com/popcorndao" passHref>
                      <a
                        className="text-xl text-white text-semibold"
                        target="_window"
                      >
                        Github
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col space-y-3 mt-10">
                  <p className="font-bold uppercase text-base font-landing text-white">
                    Documentation
                  </p>
                  <Link href="/" passHref>
                    <a className="text-xl text-white text-semibold">Gitbook</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        <header className="w-full bg-primary">
          <nav className="w-10/12 mx-auto pt-12 pb-3 border-b border-primaryLight flex flex-row items-center justify-between">
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
            <Menu onClick={(e) => toggleMenu(true)} />
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
              <img src="images/team.svg" />
              <h1 className="font-bold text-4xl leading-snug mb-8">
                Our team & contributors
              </h1>
              <p className="text-lg font-landing">
                This is DeFi for the People. We believe in breaking down social
                and cultural barriers by creating a welcoming community to
                anyone who is interested in creating positive social impact
                through DeFi.
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
          <section className="w-10/12 mx-auto mb-24">
            <h2 className="font-bold text-3xl mb-8 text-center">Core Team</h2>
            <TeamMemberCard
              name={'Anthony Martin'}
              position={'Founder & CTO'}
              image={'anthony'}
              linkedIn={'https://www.linkedin.com/ex'}
              twitter={'https://www.twitter.com/ex'}
            />
            <TeamMemberCard
              name={'Michael Kisselgof'}
              position={'Founder'}
              image={'michael'}
              linkedIn={'https://www.linkedin.com/ex'}
              twitter={'https://www.twitter.com/ex'}
            />
            <TeamMemberCard
              name={'Oscar Jacobson'}
              position={'Executive Assistant'}
              image={'oscar'}
              linkedIn={'https://www.linkedin.com/ex'}
              twitter={'https://www.twitter.com/ex'}
            />
            <TeamMemberCard
              name={'Dawqi Lueamw'}
              position={'Role & Position'}
              image={'dawqi'}
              linkedIn={'https://www.linkedin.com/ex'}
              twitter={'https://www.twitter.com/ex'}
            />
            <TeamMemberCard
              name={'Member Name'}
              position={'Role & Position'}
              image={'melody'}
              linkedIn={'https://www.linkedin.com/ex'}
              twitter={'https://www.twitter.com/ex'}
            />
            <TeamMemberCard
              name={'Member Name'}
              position={'Role & Position'}
              image={'mehul'}
              linkedIn={'https://www.linkedin.com/ex'}
              twitter={'https://www.twitter.com/ex'}
            />
            <TeamMemberCard
              name={'Member Name'}
              position={'Role & Position'}
              image={'annamarie'}
              linkedIn={'https://www.linkedin.com/ex'}
              twitter={'https://www.twitter.com/ex'}
            />
            <TeamMemberCard
              name={'Member Name'}
              position={'Role & Position'}
              image={'dawqi2'}
              linkedIn={'https://www.linkedin.com/ex'}
              twitter={'https://www.twitter.com/ex'}
            />
            <TeamMemberCard
              name={'Member Name'}
              position={'Role & Position'}
              image={'leon'}
              linkedIn={'https://www.linkedin.com/ex'}
              twitter={'https://www.twitter.com/ex'}
            />
            <TeamMemberCard
              name={'Member Name'}
              position={'Role & Position'}
              image={'anthony'}
              linkedIn={'https://www.linkedin.com/ex'}
              twitter={'https://www.twitter.com/ex'}
            />
            <TeamMemberCard
              name={'Member Name'}
              position={'Role & Position'}
              image={'annisha'}
              linkedIn={'https://www.linkedin.com/ex'}
              twitter={'https://www.twitter.com/ex'}
            />
          </section>
        )}

        {!teamVisible && (
          <section className="w-10/12 mx-auto mb-24">
            <h2 className="font-bold text-3xl mb-4 text-center">
              Contributors
            </h2>
            <ContributorCard
              name={'Name'}
              position={'Job'}
              image={'contributor'}
              linkedIn={'https://www.linkedin.com/ex'}
              twitter={'https://www.twitter.com/ex'}
            />
            <ContributorCard
              name={'Name'}
              position={'Job'}
              image={'contributor'}
              linkedIn={'https://www.linkedin.com/ex'}
              twitter={'https://www.twitter.com/ex'}
            />

            <ContributorCard
              name={'Name'}
              position={'Job'}
              image={'contributor'}
              linkedIn={'https://www.linkedin.com/ex'}
              twitter={'https://www.twitter.com/ex'}
            />
          </section>
        )}

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
                <h3 className="font-medium text-4xl pt-20 pb-12 text-center">
                  Don’t miss the liquidity event!
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
        <section className="w-full bg-secondary py-24">
          <div className="w-10/12 mx-auto text-center">
            <h2 className="font-bold text-2xl leading-snug mb-4">Notify Me</h2>
            <p className="text-lg">
              Can’t wait to see you when we are launching. Get earlier
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
              Popcorn is a new eco-friendly paradigm for DeFi, where users can
              earn high yield on their crypto assets while creating real world
              impact.
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
                  <a className="hover:text-blue-600" target="_window">
                    Blog
                  </a>
                </Link>
                <Link
                  href="https://etherscan.io/token/0xd0cd466b34a24fcb2f87676278af2005ca8a78c4"
                  passHref
                >
                  <a className="hover:text-blue-600" target="_window">
                    Popcorn (POP) Token
                  </a>
                </Link>
              </div>
              <div className="flex flex-col space-y-3 w-1/2">
                <p className="font-medium text-base uppercase">Connect</p>
                <Link href="https://twitter.com/Popcorn_DAO" passHref>
                  <a className="hover:text-blue-600" target="_window">
                    Twitter
                  </a>
                </Link>
                <Link href="https://discord.gg/w9zeRTSZsq" passHref>
                  <a className="hover:text-blue-600" target="_window">
                    Discord
                  </a>
                </Link>
                <Link href="https://github.com/popcorndao" passHref>
                  <a className="hover:text-blue-600" target="_window">
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
              ©2021, Popcorn Network. All Rights Reserved
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeamPage;
