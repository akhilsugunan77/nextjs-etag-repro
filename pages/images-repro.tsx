import Image from "next/image";

export default function Home() {
  return (
    <main>
      <h1>generateEtags: false — ETag reproduction</h1>
      <p>
        <code>generateEtags: false</code> is set in next.config.ts, but{" "}
        <code>/_next/image</code> responses still include an ETag header.
      </p>
      <Image src="/test.jpg" alt="test" width={200} height={200} />
    </main>
  );
}
