export default function PublicLovedexLoading() {
  return (
    <main className="min-h-screen bg-tile px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <div className="pixel-panel w-full bg-cream-100 p-5">
          <div className="dialog-box bg-cream-50 p-5">
            <div className="h-4 w-28 animate-pulse border-2 border-midnight-700 bg-rosebit-100" />
            <div className="mt-5 h-8 w-full animate-pulse border-2 border-midnight-700 bg-cream-200" />
            <div className="mt-3 h-8 w-4/5 animate-pulse border-2 border-midnight-700 bg-cream-200" />
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="h-20 animate-pulse border-2 border-midnight-700 bg-rosebit-100" />
              <div className="h-20 animate-pulse border-2 border-midnight-700 bg-violetbit-100" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
