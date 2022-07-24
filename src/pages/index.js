import Head from "next/head";

import Map from "../components/Map";
import { useEffect, useState } from "react";

import styles from "../../styles/Home.module.css";

const DEFAULT_CENTER = [60.23165, 25.03633];

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.github.com/gists/f097ca1b5c5b8d8f7d76720c76fbf061")
      .then((res) => res.json())
      .then((data) => {
        setData(JSON.parse(data.files["jaapanda.json"].content));
        console.log(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Jääpanda jäätelökioski</title>
        <link rel="icon" href="./pandafav.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Jääpanda</h1>

        <p className={styles.kuvaus}>Liikkuva jäätelökioski</p>
        {data.open ? (
          <p className={styles.auki}>Auki nyt! Katso sijainti kartalta</p>
        ) : (
          <p className={styles.kiinni}>Jäätelökioski on nyt kiinni</p>
        )}

        <Map className={styles.homeMap} center={[data.lat, data.lon]} zoom={15}>
          {({ TileLayer, Marker, Popup }) => (
            <>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={DEFAULT_CENTER}>
                <Popup>
                  Jääpanda <br /> jäätelökioski
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
