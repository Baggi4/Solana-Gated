import { ThirdwebSDK } from '@thirdweb-dev/sdk/solana';
import { useLogout } from '@thirdweb-dev/react/solana';
import type { GetServerSideProps } from 'next';
import { getUser } from '../auth.config';
import { network } from './_app';
import Image from 'next/image';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const sdk = ThirdwebSDK.fromNetwork(network);
  const user = await getUser(req);

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // Check if the user has the NFT and then allow access
  const program = await sdk.getNFTDrop(
    process.env.NEXT_PUBLIC_PROGRAM_ADDRESS!,
  );
  const nfts = await program.getAllClaimed();
  const nft = nfts.find((nft) => nft.owner === user.address);

  if (!nft) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Home = () => {
  const logout = useLogout();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center bg-[#f5ab0b] -z-20 px-5">
      <p className="fixed top-10 text-xs md:text-base bg-red-500 rounded-full px-4 md:px-8 py-3 font-bold text-white mx-10">
        MEMBERS ONLY: This page is only accessible to users who have purchased &
        hold a PAPAFAM NFT.
      </p>

      <div className="absolute top-50 left-0 w-full h-1/2 bg-transparent -skew-y-6 z-10 overflow-hidden">
        <div className="flex items-center w-full h-full opacity-30">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-center -mx-20">
            MEMBERS ONLY MEMBERS ONLY MEMBERS ONLY MEMBERS ONLY MEMBERS ONLY
            MEMBERS ONLY MEMBERS ONLY MEMBERS ONLY MEMBERS ONLY MEMBERS ONLY
            MEMBERS ONLY MEMBERS ONLY MEMBERS ONLY MEMBERS ONLY MEMBERS ONLY
            MEMBERS ONLY MEMBERS ONLY MEMBERS ONLY MEMBERS ONLY MEMBERS ONLY
            MEMBERS ONLY MEMBERS ONLY MEMBERS ONLY MEMBERS ONLY MEMBERS ONLY
            MEMBERS ONLY MEMBERS ONLY MEMBERS ONLY MEMBERS ONLY MEMBERS ONLY
          </h1>
        </div>
      </div>

      <section className="md:mb-10 z-10 space-y-2">
        <h1 className="text-3xl lg:text-6xl font-bold">
          Introducing the{' '}
          <span className="text-fuchsia-600">University of Code</span>
        </h1>
        <h2 className="text-xl lg:text-3xl">
          <span className="font-extrabold underline decoration-fuchsia-600">
            Daily
          </span>{' '}
          Coding problems (with solutions) delivered straight to your inbox!
        </h2>
      </section>

      <Image
        className="mt-5 z-10 shadow-2xl mb-10"
        src="https://links.papareact.com/w2m"
        alt="logo"
        width={400}
        height={400}
      />

      <Link
        href="https://www.papareact.com/universityofcode"
        className="font-extrabold text-lg md:text-2xl text-black transition duration-200 hover:underline my-5 z-50"
      >
        Visit{' '}
        <span className="font-extrabold underline decoration-fuchsia-600 text-fuchsia-600 transition duration-200">
          papareact.com/universityofcode
        </span>{' '}
        to sign up Today!
      </Link>

      <button
        className="bg-fuchsia-600 text-white py-4 px-10 border-2 border-fuchsia-600 rounded-md hover:bg-white hover:text-fuchsia-600 mt-5 uppercase font-bold transition duration-200 z-50"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
