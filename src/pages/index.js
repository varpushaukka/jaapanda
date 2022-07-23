import Head from "next/head";

import Map from "../components/Map";

import styles from "../../styles/Home.module.css";

const DEFAULT_CENTER = [60.23165, 25.03633];

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jääpanda jäätelökioski</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Jääpanda</h1>

        <p className={styles.kuvaus}>Liikkuva jäätelökioski</p>
        <p className={styles.aukiolo}>Auki nyt! Katso sijainti kartalta</p>

        <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={15}>
          {({ TileLayer, Marker, Popup }) => (
            <>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={DEFAULT_CENTER}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </>
          )}
        </Map>

        <p className={styles.kuvaus}>Jääpanda on Liekin oma jäätelöyritys.</p>
      </main>

      <footer className={styles.footer}> moi </footer>
    </div>
  );
}
