import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import VideoPlayer from '../../components/video-player';
import Spinner from '../../components/spinner';
import { MUX_HOME_PAGE_URL } from '../../constants';

export function getStaticProps ({ params: { id: playbackId } }) {
  const src = `https://stream.mux.com/${playbackId}.m3u8`;
  const poster = `https://image.mux.com/${playbackId}/thumbnail.png`;

  return { props: { playbackId, src, poster } };
}

export function getStaticPaths () {
  return {
    paths: [],
    fallback: true,
  };
}

export default function Playback ({ src, poster }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  return (
    <Layout
      metaTitle="View this video created with Mux + Next.js"
      image={poster}
      loadTwitterWidget
    >
      <div className="flash-message">This video is ready for playback</div>
      <VideoPlayer src={src} poster={poster} />
      <p>
        Go{' '}
        <Link href="/">
          <a>back home</a>
        </Link>{' '}
        to upload another video.
      </p>
      <div className="about-playback">
        <p>
          This video was uploaded and processed by{' '}
          <a href={MUX_HOME_PAGE_URL} target="_blank" rel="noopener noreferrer">
            Mux
          </a>
        </p>
        <p>
          This page is sharable and anyone who comes to this URL will be able to watch this video. Try clicking the Twitter button below to share:
        </p>
        <div className="share-button">
          <a
            className="twitter-share-button"
            data-size="large"
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/intent/tweet?text=Check%20out%20the%20video%20I%20uploaded%20with%20Next.js%2C%20%40Vercel%2C%20and%20%40muxhq%20"
          >
            Tweet this
          </a>
        </div>
        <p>
          To learn more,{' '}
          <a
            href="https://github.com/muxinc/examples/stream.new"
            target="_blank"
            rel="noopener noreferrer"
          >
            check out the source code on GitHub
          </a>
          .
        </p>
      </div>
      <style jsx>{`
        .flash-message {
          position: absolute;
          top: 0;
          background-color: #c1dcc1;
          width: 100%;
          text-align: center;
          padding: 20px 0;
        }
        .share-button {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 40px 0;
        }
      `}
      </style>
    </Layout>
  );
}
