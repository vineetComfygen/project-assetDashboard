"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Wallet, Filter, ExternalLink, Home, ChevronRight, AlertCircle } from "lucide-react";

interface GameAsset {
  id: number;
  name: string;
  image: string;
  owner: string;
}

export default function Dashboard() {
  const [assets, setAssets] = useState<GameAsset[]>([]);
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const [showOnlyOwned, setShowOnlyOwned] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [ownerSearch, setOwnerSearch] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<GameAsset | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  useEffect(() => {
    // Fetch from external assets.json
    fetch("/assets.json")
      .then((res) => res.json())
      .then((data: GameAsset[]) => {
        setAssets(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading assets:", error);
        setIsLoading(false);
      });

    // Check if wallet was previously connected (localStorage simulation)
    const savedAddress = localStorage.getItem("connectedWallet");
    if (savedAddress) {
      setConnectedAddress(savedAddress);
    }
  }, []);

  const generateRandomAddress = () => {
    const chars = "0123456789abcdef";
    let address = "0x";
    for (let i = 0; i < 40; i++) {
      address += chars[Math.floor(Math.random() * chars.length)];
    }
    return address;
  };

  const connectWallet = async (walletType: string) => {
    setIsConnecting(true);
    
    // Simulate wallet connection delay (like MetaMask approval)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a random address or use predefined ones for demo
    const demoAddresses = [
      "0x1234567890abcdef",
      "0x9999999999999999", 
      "0xabcdef1234567890",
      "0xfedcba0987654321"
    ];
    
    const address = demoAddresses[Math.floor(Math.random() * demoAddresses.length)];
    
    setConnectedAddress(address);
    localStorage.setItem("connectedWallet", address);
    setShowWalletModal(false);
    setIsConnecting(false);
  };

  const disconnectWallet = () => {
    setConnectedAddress(null);
    localStorage.removeItem("connectedWallet");
    setShowOnlyOwned(false);
  };

  // Filtering logic
  let filtered = assets;

  if (showOnlyOwned && connectedAddress) {
    filtered = filtered.filter(
      (a) => a.owner.toLowerCase() === connectedAddress.toLowerCase()
    );
  }

  if (searchTerm.trim()) {
    filtered = filtered.filter((a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (ownerSearch.trim()) {
    filtered = filtered.filter((a) =>
      a.owner.toLowerCase().includes(ownerSearch.toLowerCase())
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <main className="p-6 md:p-10 space-y-8">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-sm"
        >
          <a href="/" className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors">
            <Home size={16} />
            <span>Home</span>
          </a>
          <ChevronRight size={16} className="text-gray-500" />
          <span className="text-gray-300">Dashboard</span>
        </motion.nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-white mb-2">
              Game Asset Dashboard
            </h1>
            <p className="text-gray-300">
              Manage and explore your gaming NFT collection
            </p>
          </div>

          {connectedAddress ? (
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2 px-4 py-3 bg-green-500/20 border border-green-500 rounded-lg text-green-400"
              >
                <Wallet size={20} />
                <span className="font-mono text-sm">
                  {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)}
                </span>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={disconnectWallet}
                className="px-4 py-3 bg-slate-700/50 border border-slate-600 text-gray-300 rounded-lg font-semibold hover:bg-slate-700 transition-all"
              >
                Disconnect
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowWalletModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              <Wallet size={20} />
              Connect Wallet
            </motion.button>
          )}
        </motion.div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl border border-purple-500/30 p-6 bg-slate-800/50 backdrop-blur-sm shadow-xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="text-purple-400" size={20} />
            <h2 className="font-semibold text-xl text-white">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search by name */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by asset name…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            {/* Search by owner */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by owner address…"
                value={ownerSearch}
                onChange={(e) => setOwnerSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            {/* Owned filter */}
            {connectedAddress && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowOnlyOwned(!showOnlyOwned)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  showOnlyOwned
                    ? "bg-purple-600 text-white"
                    : "bg-slate-700/50 text-gray-300 border border-slate-600"
                }`}
              >
                {showOnlyOwned ? "Show All Assets" : "Show Only My Assets"}
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}

        {/* Asset Grid */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((asset, index) => {
              const isOwned =
                connectedAddress &&
                asset.owner.toLowerCase() === connectedAddress.toLowerCase();

              return (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  onClick={() => setSelectedAsset(asset)}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all ${
                    isOwned
                      ? "ring-2 ring-green-500 shadow-green-500/50"
                      : "ring-1 ring-slate-700"
                  } bg-slate-800`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={asset.image}
                      alt={asset.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                    
                    {isOwned && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full"
                      >
                        OWNED
                      </motion.div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                      {asset.name}
                    </h3>
                    <p className="text-sm text-gray-400 font-mono">
                      Owner: {asset.owner.slice(0, 6)}...{asset.owner.slice(-4)}
                    </p>
                    <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold pt-2">
                      <span>View Details</span>
                      <ExternalLink size={14} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {!isLoading && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-lg">No assets found matching your filters.</p>
          </motion.div>
        )}
      </main>

      {/* Wallet Connection Modal */}
      <AnimatePresence>
        {showWalletModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isConnecting && setShowWalletModal(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-800 rounded-2xl max-w-md w-full p-8 shadow-2xl border border-purple-500/30"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Connect Wallet</h2>
                {!isConnecting && (
                  <button
                    onClick={() => setShowWalletModal(false)}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <X className="text-gray-400" size={20} />
                  </button>
                )}
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
                <div className="text-sm text-blue-300">
                  <p className="font-semibold mb-1">Demo Mode</p>
                  <p className="text-blue-300/80">This is a simulated wallet connection. Select any option to connect with a random demo address.</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { name: "MetaMask", icon: "🦊" },
                  { name: "WalletConnect", icon: "🔗" },
                  { name: "Coinbase Wallet", icon: "💼" },
                  { name: "Trust Wallet", icon: "🛡️" }
                ].map((wallet) => (
                  <motion.button
                    key={wallet.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => connectWallet(wallet.name)}
                    disabled={isConnecting}
                    className="w-full flex items-center gap-4 p-4 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-3xl">{wallet.icon}</span>
                    <span className="text-white font-semibold text-lg">{wallet.name}</span>
                    {isConnecting && (
                      <div className="ml-auto">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-purple-500"></div>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              {isConnecting && (
                <p className="text-center text-gray-400 text-sm mt-4">
                  Connecting to wallet...
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Asset Detail Modal */}
      <AnimatePresence>
        {selectedAsset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAsset(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-purple-500/30"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedAsset(null)}
                className="absolute top-4 right-4 p-2 bg-slate-900/80 rounded-full hover:bg-slate-700 transition-colors z-10"
              >
                <X className="text-white" size={24} />
              </button>

              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={selectedAsset.image}
                  alt={selectedAsset.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-2">
                    {selectedAsset.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-purple-600/20 text-purple-400 text-sm font-semibold rounded-full">
                      #{selectedAsset.id}
                    </span>
                    {connectedAddress &&
                      selectedAsset.owner.toLowerCase() === connectedAddress.toLowerCase() && (
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-semibold rounded-full">
                          Owned by You
                        </span>
                      )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-700">
                    <span className="text-gray-400">Asset ID</span>
                    <span className="text-white font-semibold">#{selectedAsset.id}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-slate-700">
                    <span className="text-gray-400">Owner Address</span>
                    <span className="text-white font-mono text-sm">
                      {selectedAsset.owner}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-slate-700">
                    <span className="text-gray-400">Status</span>
                    <span className="text-green-400 font-semibold">Active</span>
                  </div>

                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-400">Blockchain</span>
                    <span className="text-white font-semibold">Ethereum</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
                >
                  View on Blockchain
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}