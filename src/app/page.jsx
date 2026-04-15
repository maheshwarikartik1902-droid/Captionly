


export default function Home() {
  return (
    <div className="p-4 max-w-2xl">
      <header className="flex justify-between my-8">
        <a href="">Captionly</a>
        <nav className="flex gap-6 text-white/70">
          <a href="">Home</a>
          <a href="">Pricing</a>
          <a href="">Contact</a>
        </nav>
      </header>
      <div className="text-center mt-24 mb-8"> 
  
        <h1 className="text-3xl">
          Add captions to the videos
          </h1>
        <h2 className="text-white/80">
          upload your videos
          </h2>
      </div>
      <div className="text-center">
        <button className="bg-green-600 py-2 px-4 rounded-full">Choose file</button>
        </div>
    </div>
  );
}
