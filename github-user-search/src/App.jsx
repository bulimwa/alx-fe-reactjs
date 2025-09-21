import Search from './components/Search';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="text-center p-6 bg-blue-600 text-white">
        <h1 className="text-3xl font-bold">GitHub User Search</h1>
        <p className="text-sm mt-2">Search by username, location, and repo count</p>
      </header>
      <main className="p-4">
        <Search />
      </main>
    </div>
  );
}

export default App;
