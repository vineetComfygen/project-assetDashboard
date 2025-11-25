"use client"
import { useState, useEffect } from 'react';
import { Wallet, Search, Grid3x3, List, ExternalLink, Sparkles, Trophy, Zap, X, Shield, Swords, Award } from 'lucide-react';

interface GameAsset {
  id: number;
  name: string;
  image: string;
  owner: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  type?: string;
}

// Mock data - in real app, this would come from /assets.json
const MOCK_ASSETS: GameAsset[] = [
  {
    id: 1,
    name: "Crimson Blade",
    image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=400&fit=crop",
    owner: "0x1234567890abcdef",
    rarity: "legendary",
    type: "Weapon"
  },
  {
    id: 2,
    name: "Dragon Shield",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=400&fit=crop",
    owner: "0x9999999999999999",
    rarity: "epic",
    type: "Armor"
  },
  {
    id: 3,
    name: "Mystic Staff",
    image: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=400&h=400&fit=crop",
    owner: "0x1234567890abcdef",
    rarity: "rare",
    type: "Weapon"
  },
  {
    id: 4,
    name: "Phoenix Wings",
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=400&fit=crop",
    owner: "0xabcdef1234567890",
    rarity: "legendary",
    type: "Accessory"
  },
  {
    id: 5,
    name: "Stealth Dagger",
    image: "https://images.unsplash.com/photo-1598300188942-f883b8a21d56?w=400&h=400&fit=crop",
    owner: "0x9999999999999999",
    rarity: "common",
    type: "Weapon"
  },
  {
    id: 6,
    name: "Crystal Helm",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&h=400&fit=crop",
    owner: "0x1234567890abcdef",
    rarity: "epic",
    type: "Armor"
  },
  {
    id: 7,
    name: "Thunder Gauntlets",
    image: "https://images.unsplash.com/photo-1614732484003-ef9881555dc3?w=400&h=400&fit=crop",
    owner: "0xfedcba0987654321",
    rarity: "rare",
    type: "Armor"
  },
  {
    id: 8,
    name: "Void Orb",
    image: "https://images.unsplash.com/photo-1614732539742-1f0b6f7d9b72?w=400&h=400&fit=crop",
    owner: "0x1234567890abcdef",
    rarity: "legendary",
    type: "Artifact"
  },
  {
    id: 9,
    name: "Shadow Cloak",
    image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=400&h=400&fit=crop",
    owner: "0x9999999999999999",
    rarity: "epic",
    type: "Armor"
  }
];

const DEMO_WALLETS = [
  "0x1234567890abcdef",
  "0x9999999999999999",
  "0xabcdef1234567890",
  "0xfedcba0987654321"
];

export default function GameAssetDashboard() {
  const [assets, setAssets] = useState<GameAsset[]>([]);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOwnedOnly, setShowOwnedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [selectedAsset, setSelectedAsset] = useState<GameAsset | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setAssets(MOCK_ASSETS);
      setIsLoading(false);
    }, 800);
  }, []);

  const connectWallet = async (walletType: string) => {
    setIsConnecting(true);
    
    // Simulate wallet connection delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const randomWallet = DEMO_WALLETS[Math.floor(Math.random() * DEMO_WALLETS.length)];
    setConnectedWallet(randomWallet);
    setShowWalletModal(false);
    setIsConnecting(false);
  };

  const disconnectWallet = () => {
    setConnectedWallet(null);
    setShowOwnedOnly(false);
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOwner = !showOwnedOnly || asset.owner.toLowerCase() === connectedWallet?.toLowerCase();
    const matchesRarity = selectedRarity === 'all' || asset.rarity === selectedRarity;
    return matchesSearch && matchesOwner && matchesRarity;
  });

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-400 to-pink-500';
      case 'rare': return 'from-blue-400 to-cyan-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityBorder = (rarity?: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-500 shadow-yellow-500/50';
      case 'epic': return 'border-purple-500 shadow-purple-500/50';
      case 'rare': return 'border-blue-500 shadow-blue-500/50';
      default: return 'border-gray-500 shadow-gray-500/30';
    }
  };

  const ownedCount = assets.filter(a => a.owner.toLowerCase() === connectedWallet?.toLowerCase()).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
      {/* Header */}
      <header className="border-b border-indigo-800/30 bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Trophy className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Asset Vault</h1>
                <p className="text-indigo-300 text-sm">Manage your gaming collection</p>
              </div>
            </div>

            {connectedWallet ? (
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-lg">
                  <div className="text-xs text-emerald-300 mb-1">Connected Wallet</div>
                  <div className="text-white font-mono text-sm">
                    {connectedWallet.slice(0, 6)}...{connectedWallet.slice(-4)}
                  </div>
                  <div className="text-xs text-emerald-400 mt-1">{ownedCount} assets owned</div>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all text-sm"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowWalletModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-indigo-500/50"
              >
                <Wallet size={20} />
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-4">
            <div className="text-slate-400 text-sm mb-1">Total Assets</div>
            <div className="text-2xl font-bold text-white">{assets.length}</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-4">
            <div className="text-slate-400 text-sm mb-1">Legendary</div>
            <div className="text-2xl font-bold text-yellow-400">
              {assets.filter(a => a.rarity === 'legendary').length}
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-4">
            <div className="text-slate-400 text-sm mb-1">Epic</div>
            <div className="text-2xl font-bold text-purple-400">
              {assets.filter(a => a.rarity === 'epic').length}
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-4">
            <div className="text-slate-400 text-sm mb-1">Your Assets</div>
            <div className="text-2xl font-bold text-emerald-400">{ownedCount}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search assets by name or owner..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Rarity Filter */}
            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Rarities</option>
              <option value="legendary">Legendary</option>
              <option value="epic">Epic</option>
              <option value="rare">Rare</option>
              <option value="common">Common</option>
            </select>

            {/* View Mode */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <Grid3x3 size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <List size={20} />
              </button>
            </div>

            {/* Owned Filter */}
            {connectedWallet && (
              <button
                onClick={() => setShowOwnedOnly(!showOwnedOnly)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  showOwnedOnly
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {showOwnedOnly ? 'Show All' : 'My Assets'}
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400" size={24} />
            </div>
          </div>
        )}

        {/* Assets Grid */}
        {!isLoading && filteredAssets.length > 0 && viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset) => {
              const isOwned = connectedWallet && asset.owner.toLowerCase() === connectedWallet.toLowerCase();
              
              return (
                <div
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className={`group relative bg-slate-800/50 backdrop-blur border-2 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer ${getRarityBorder(asset.rarity)} ${
                    isOwned ? 'ring-2 ring-emerald-500' : ''
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={asset.image}
                      alt={asset.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                    
                    {/* Rarity Badge */}
                    <div className={`absolute top-3 left-3 px-3 py-1 bg-gradient-to-r ${getRarityColor(asset.rarity)} text-white text-xs font-bold rounded-full capitalize flex items-center gap-1`}>
                      <Sparkles size={12} />
                      {asset.rarity}
                    </div>

                    {/* Owned Badge */}
                    {isOwned && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                        OWNED
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {asset.name}
                        </h3>
                        <p className="text-sm text-slate-400">{asset.type}</p>
                      </div>
                      <span className="text-slate-500 text-sm">#{asset.id}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700">
                      <div>
                        <div className="text-xs text-slate-400 mb-1">Owner</div>
                        <div className="text-sm text-white font-mono">
                          {asset.owner.slice(0, 6)}...{asset.owner.slice(-4)}
                        </div>
                      </div>
                      <ExternalLink className="text-indigo-400 group-hover:text-indigo-300" size={16} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Assets List View */}
        {!isLoading && filteredAssets.length > 0 && viewMode === 'list' && (
          <div className="space-y-3">
            {filteredAssets.map((asset) => {
              const isOwned = connectedWallet && asset.owner.toLowerCase() === connectedWallet.toLowerCase();
              
              return (
                <div
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className={`flex items-center gap-4 bg-slate-800/50 backdrop-blur border-2 rounded-xl p-4 hover:bg-slate-800 transition-all cursor-pointer ${getRarityBorder(asset.rarity)} ${
                    isOwned ? 'ring-2 ring-emerald-500' : ''
                  }`}
                >
                  <img
                    src={asset.image}
                    alt={asset.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white">{asset.name}</h3>
                      <span className={`px-2 py-0.5 bg-gradient-to-r ${getRarityColor(asset.rarity)} text-white text-xs font-bold rounded capitalize`}>
                        {asset.rarity}
                      </span>
                      {isOwned && (
                        <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded">
                          OWNED
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400">{asset.type} • ID: #{asset.id}</p>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-slate-400 mb-1">Owner</div>
                    <div className="text-sm text-white font-mono">
                      {asset.owner.slice(0, 6)}...{asset.owner.slice(-4)}
                    </div>
                  </div>

                  <ExternalLink className="text-indigo-400" size={20} />
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredAssets.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-slate-600" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No assets found</h3>
            <p className="text-slate-400">Try adjusting your filters or search query</p>
          </div>
        )}
      </main>

      {/* Wallet Connection Modal */}
      {showWalletModal && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => !isConnecting && setShowWalletModal(false)}
        >
          <div 
            className="bg-slate-900 rounded-2xl max-w-md w-full border-2 border-indigo-500/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Connect Wallet</h2>
                {!isConnecting && (
                  <button
                    onClick={() => setShowWalletModal(false)}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <X className="text-gray-400" size={20} />
                  </button>
                )}
              </div>

            

              {/* Wallet Options */}
              <div className="space-y-3">
                {[
                  { name: 'MetaMask', icon: '🦊', color: 'from-orange-500 to-red-500' },
                  { name: 'WalletConnect', icon: '🔗', color: 'from-blue-500 to-cyan-500' },
                  { name: 'Coinbase Wallet', icon: '💼', color: 'from-blue-600 to-indigo-600' },
                  { name: 'Trust Wallet', icon: '🛡️', color: 'from-cyan-500 to-blue-500' },
                  { name: 'Phantom', icon: '👻', color: 'from-purple-500 to-pink-500' },
                  { name: 'Rainbow', icon: '🌈', color: 'from-pink-500 to-yellow-500' }
                ].map((wallet) => (
                  <button
                    key={wallet.name}
                    onClick={() => connectWallet(wallet.name)}
                    disabled={isConnecting}
                    className="w-full flex items-center gap-4 p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <div className="text-3xl">{wallet.icon}</div>
                    <div className="flex-1 text-left">
                      <p className="text-white font-semibold text-lg group-hover:text-indigo-400 transition-colors">{wallet.name}</p>
                      <p className="text-slate-400 text-xs">Simulated connection</p>
                    </div>
                    {isConnecting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-indigo-500"></div>
                    ) : (
                      <ExternalLink className="text-slate-600 group-hover:text-indigo-400 transition-colors" size={20} />
                    )}
                  </button>
                ))}
              </div>

              {isConnecting && (
                <div className="mt-6 text-center">
                  <p className="text-slate-400 text-sm mb-2">Connecting to wallet...</p>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Asset Detail Modal */}
      {selectedAsset && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedAsset(null)}
        >
          <div 
            className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-indigo-500/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedAsset(null)}
              className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors z-10"
            >
              <X className="text-white" size={24} />
            </button>

            {/* Header Image */}
            <div className="relative h-80 overflow-hidden">
              <img
                src={selectedAsset.image}
                alt={selectedAsset.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
              
              {/* Rarity Badge */}
              <div className={`absolute top-6 left-6 px-4 py-2 bg-gradient-to-r ${getRarityColor(selectedAsset.rarity)} text-white text-sm font-bold rounded-full capitalize flex items-center gap-2 shadow-lg`}>
                <Sparkles size={16} />
                {selectedAsset.rarity}
              </div>

              {/* Owned Badge */}
              {connectedWallet && selectedAsset.owner.toLowerCase() === connectedWallet.toLowerCase() && (
                <div className="absolute top-6 right-6 px-4 py-2 bg-emerald-500 text-white text-sm font-bold rounded-full shadow-lg">
                  OWNED BY YOU
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Title Section */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-4xl font-bold text-white">{selectedAsset.name}</h2>
                  <span className="text-slate-400 text-lg">#{selectedAsset.id}</span>
                </div>
                <p className="text-xl text-indigo-400">{selectedAsset.type}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="text-yellow-400" size={20} />
                    <span className="text-slate-400 text-sm">Rarity</span>
                  </div>
                  <p className="text-white font-bold capitalize">{selectedAsset.rarity}</p>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="text-blue-400" size={20} />
                    <span className="text-slate-400 text-sm">Type</span>
                  </div>
                  <p className="text-white font-bold">{selectedAsset.type}</p>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Swords className="text-red-400" size={20} />
                    <span className="text-slate-400 text-sm">Power Level</span>
                  </div>
                  <p className="text-white font-bold">{selectedAsset.rarity === 'legendary' ? '95' : selectedAsset.rarity === 'epic' ? '85' : selectedAsset.rarity === 'rare' ? '70' : '50'}</p>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="text-purple-400" size={20} />
                    <span className="text-slate-400 text-sm">Token ID</span>
                  </div>
                  <p className="text-white font-bold">#{selectedAsset.id}</p>
                </div>
              </div>

              {/* Details Section */}
              <div className="space-y-4 mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Asset Details</h3>
                
                <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Contract Address</span>
                    <span className="text-white font-mono text-sm">0x1a2b...3c4d</span>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Token Standard</span>
                    <span className="text-white font-semibold">ERC-721</span>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Blockchain</span>
                    <span className="text-white font-semibold">Ethereum</span>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-slate-400">Owner Address</span>
                    <span className="text-white font-mono text-sm break-all">{selectedAsset.owner}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-6 border border-indigo-500/30 mb-8">
                <h3 className="text-xl font-bold text-white mb-3">Description</h3>
                <p className="text-slate-300 leading-relaxed">
                  This {selectedAsset.rarity} tier {selectedAsset.type?.toLowerCase()} is a powerful asset in the game ecosystem. 
                  {selectedAsset.rarity === 'legendary' && ' Its legendary status grants exceptional abilities and makes it one of the most sought-after items in the collection.'}
                  {selectedAsset.rarity === 'epic' && ' With epic rarity, this item provides significant advantages and is highly valued by collectors.'}
                  {selectedAsset.rarity === 'rare' && ' As a rare item, it offers unique benefits and stands out in any collection.'}
                  {selectedAsset.rarity === 'common' && ' While common, this item is essential for gameplay and serves as a foundation for your arsenal.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all shadow-lg">
                  <ExternalLink size={20} />
                  View on Explorer
                </button>
                <button className="flex-1 px-6 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-all">
                  Share Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}