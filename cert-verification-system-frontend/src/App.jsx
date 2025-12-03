import React, { useState, useEffect, createContext, useContext } from 'react';
import { Camera, Shield, CheckCircle, XCircle, Share2, FileText, Award, Search, ExternalLink, Sparkles, Users, Lock, Zap, Loader2, ExternalLinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CryptoJS from 'crypto-js';
import certificateAPI from './services/api.js';

// Certificate image URL
const CERTIFICATE_IMAGE_URL =
  'https://static.vecteezy.com/system/resources/previews/065/977/934/non_2x/a-certificate-icon-with-a-red-ribbon-and-a-paper-document-free-png.png';

// Context
const AppContext = createContext();

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// Router Implementation
const RouterContext = createContext();

const useRouter = () => useContext(RouterContext);

const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

const Route = ({ path, element }) => {
  const { currentPath } = useRouter();
  
  if (path.includes(':id')) {
    const pathPattern = path.replace(':id', '([^/]+)');
    const regex = new RegExp(`^${pathPattern}$`);
    const match = currentPath.match(regex);
    if (match) {
      return React.cloneElement(element, { id: match[1] });
    }
    return null;
  }
  
  return currentPath === path ? element : null;
};

const Link = ({ to, children, className }) => {
  const { navigate } = useRouter();
  
  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };
  
  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

// Confetti Component
const Confetti = ({ show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          initial={{
            x: '50vw',
            y: '50vh',
            opacity: 1
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 0.5
          }}
        />
      ))}
    </div>
  );
};

// Landing Page
const LandingPage = () => {
  const { connectWallet } = useApp();
  const { navigate } = useRouter();

  const handleConnect = () => {
    connectWallet();
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-2xl font-bold text-white"
          >
            <Award className="w-8 h-8 text-purple-400" />
            <span>CertChain</span>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleConnect}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Connect Wallet
          </motion.button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-6"
          >
            <div className="p-4 bg-white/10 backdrop-blur-lg rounded-full">
              <Sparkles className="w-16 h-16 text-yellow-400" />
            </div>
          </motion.div>
          
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Academic Credentials
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Secured on Blockchain
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Issue, verify, and manage academic certificates with the power of blockchain technology. 
            Transparent, immutable, and instantly verifiable.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                role: 'Student',
                address: '0x2222222222222222222222222222222222222222',
                icon: Award,
                description: 'View and manage your academic certificates. Share verification links with employers and institutions.',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                role: 'Issuer',
                address: '0x1111111111111111111111111111111111111111',
                icon: FileText,
                description: 'Issue and manage certificates as an educational institution. Revoke credentials when necessary.',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                role: 'Verifier',
                address: '0x3333333333333333333333333333333333333333',
                icon: Shield,
                description: 'Verify the authenticity of certificates instantly. Check credentials from any institution.',
                gradient: 'from-green-500 to-emerald-500'
              }
            ].map((item, i) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 hover:border-white/20 transition-all"
              >
                <div className={`p-4 bg-gradient-to-br ${item.gradient} bg-opacity-20 rounded-2xl w-fit mb-4`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Start as {item.role}</h3>
                <p className="text-gray-400 mb-6 min-h-[60px]">
                  {item.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    connectWallet(item.address);
                    navigate('/app');
                  }}
                  className={`w-full px-6 py-3 bg-gradient-to-r ${item.gradient} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all`}
                >
                  Connect as {item.role}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mt-24"
        >
          {[
            { icon: Shield, title: 'Immutable Records', desc: 'Certificates stored on blockchain cannot be altered or forged' },
            { icon: Zap, title: 'Instant Verification', desc: 'Verify any certificate in seconds with a simple link' },
            { icon: Lock, title: 'Secure & Private', desc: 'Your credentials are cryptographically secured' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.2 }}
              whileHover={{ y: -10 }}
              className="p-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all"
            >
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl w-fit mb-4">
                <feature.icon className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Dashboard - Issuer View
const IssuerDashboard = () => {
  const { certificates, issueCertificate, revokeCertificate } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isIssuing, setIsIssuing] = useState(false);
  const [revokingIds, setRevokingIds] = useState(new Set());
  const [lastTxHash, setLastTxHash] = useState(null);
  const [lastTxType, setLastTxType] = useState(null);
  const [formData, setFormData] = useState({
    studentName: '',
    studentAddress: '',
    courseName: '',
    grade: ''
  });

  const handleIssue = async () => {
    // Validate student address format BEFORE submitting
    if (!formData.studentAddress || formData.studentAddress.length !== 42) {
      alert(`❌ Invalid Student Address Format!\n\nEthereum addresses must be exactly 42 characters (0x + 40 hex characters).\n\nYou entered: "${formData.studentAddress || '(empty)'}" (${formData.studentAddress?.length || 0} characters)\n\nPlease use a valid address like:\n0x1234567890123456789012345678901234567890\n\nOr revert to:\n0x2222222222222222222222222222222222222222`);
      return;
    }
    
    // Validate other required fields
    if (!formData.studentName || !formData.courseName || !formData.grade) {
      alert('Please fill in all required fields: Student Name, Course Name, and Grade.');
      return;
    }
    
    setIsIssuing(true);
    try {
      await issueCertificate(formData);
      setShowModal(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
      setFormData({ studentName: '', studentAddress: '', courseName: '', grade: '' });
    } catch (error) {
      console.error('Failed to issue certificate:', error);
      
      // Extract detailed error message
      let errorMessage = 'Failed to issue certificate. Please try again.';
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      // Check for invalid address format
      if (formData.studentAddress && formData.studentAddress.length < 42) {
        errorMessage = `Invalid student address format! Ethereum addresses must be exactly 42 characters (0x + 40 hex characters).\n\nYou entered: "${formData.studentAddress}" (${formData.studentAddress.length} characters)\n\nPlease use a valid address like:\n0x1234567890123456789012345678901234567890\n\nOr revert to:\n0x2222222222222222222222222222222222222222`;
      }
      
      alert(errorMessage);
    } finally {
      setIsIssuing(false);
    }
  };

  const handleRevoke = async (certId) => {
    setRevokingIds((prev) => new Set([...prev, certId]));
    try {
      await revokeCertificate(certId);
    } catch (error) {
      console.error('Failed to revoke certificate:', error);
      alert('Failed to revoke certificate. Please try again.');
    } finally {
      setRevokingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(certId);
        return newSet;
      });
    }
  };

  return (
    <div className="space-y-6">
      <Confetti show={showConfetti} />
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Issue Certificates</h2>
          <p className="text-gray-400">Manage and issue academic credentials</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg flex items-center gap-2"
        >
          <Award className="w-5 h-5" />
          Issue New Certificate
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-gray-400 font-semibold">ID</th>
                <th className="px-6 py-4 text-left text-gray-400 font-semibold">Student</th>
                <th className="px-6 py-4 text-left text-gray-400 font-semibold">Course</th>
                <th className="px-6 py-4 text-left text-gray-400 font-semibold">Grade</th>
                <th className="px-6 py-4 text-left text-gray-400 font-semibold">Issue Date</th>
                <th className="px-6 py-4 text-left text-gray-400 font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-gray-400 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert) => (
                <motion.tr
                  key={cert.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 text-white font-mono">#{cert.id}</td>
                  <td className="px-6 py-4 text-white">{cert.studentName}</td>
                  <td className="px-6 py-4 text-gray-300">{cert.courseName}</td>
                  <td className="px-6 py-4 text-gray-300">{cert.grade}</td>
                  <td className="px-6 py-4 text-gray-300">{cert.issueDate}</td>
                  <td className="px-6 py-4">
                    {cert.isRevoked ? (
                      <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">Revoked</span>
                    ) : (
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Active</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {!cert.isRevoked && (
                      <button
                        onClick={() => handleRevoke(cert.id)}
                        disabled={revokingIds.has(cert.id)}
                        className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {revokingIds.has(cert.id) ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Revoking...
                          </>
                        ) : (
                          'Revoke'
                        )}
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 max-w-md w-full border border-white/10 shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Issue New Certificate</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Student Name"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  placeholder="Student Address (0x...)"
                  value={formData.studentAddress}
                  onChange={(e) => setFormData({ ...formData, studentAddress: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  placeholder="Course Name"
                  value={formData.courseName}
                  onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  placeholder="Grade"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleIssue}
                    disabled={isIssuing}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isIssuing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Issuing...
                      </>
                    ) : (
                      'Issue'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Dashboard - Student View
const StudentDashboard = () => {
  const { walletAddress, certificates: inMemoryCerts } = useApp();
  const [studentCerts, setStudentCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStudentCertificates = async () => {
      if (!walletAddress) {
        setStudentCerts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // First, get in-memory certificates for this student (recently issued in this session)
        const inMemoryStudentCerts = inMemoryCerts.filter(
          c => c.studentAddress && c.studentAddress.toLowerCase() === walletAddress.toLowerCase()
        );
        
        // Fetch certificate IDs for this recipient from blockchain
        let blockchainCerts = [];
        try {
          const certificateIds = await certificateAPI.getByRecipient(walletAddress);
          
          if (certificateIds && certificateIds.length > 0) {
            // Fetch full details for each certificate
            const certsPromises = certificateIds.map(async (id) => {
              try {
                const certData = await certificateAPI.getById(id.toString());
                
                // Parse metadata JSON if it exists
                let metadata = {};
                try {
                  metadata = certData.metadata ? JSON.parse(certData.metadata) : {};
                } catch (e) {
                  console.warn('Failed to parse metadata:', e);
                }

                // Convert issuedAt timestamp to date string
                const issuedDate = certData.issuedAt 
                  ? new Date(Number(certData.issuedAt) * 1000).toISOString().split('T')[0]
                  : new Date().toISOString().split('T')[0];

                return {
                  id: certData.id,
                  studentName: metadata.studentName || 'Unknown Student',
                  studentAddress: certData.recipient,
                  courseName: metadata.courseName || 'Unknown Course',
                  issuer: metadata.issuer || 'Unknown Issuer',
                  issuerAddress: certData.issuer,
                  issueDate: issuedDate,
                  grade: metadata.grade || 'N/A',
                  credentialHash: certData.dataHash,
                  isRevoked: certData.revoked,
                  thumbnail: CERTIFICATE_IMAGE_URL,
                };
              } catch (err) {
                console.error(`Failed to load certificate ${id}:`, err);
                return null;
              }
            });

            blockchainCerts = (await Promise.all(certsPromises)).filter(c => c !== null);
          }
        } catch (err) {
          console.error('Failed to load certificates from blockchain:', err);
        }

        // Merge in-memory and blockchain certificates, removing duplicates by ID
        const allCerts = [...inMemoryStudentCerts];
        blockchainCerts.forEach(bcCert => {
          if (!allCerts.find(c => c.id === bcCert.id)) {
            allCerts.push(bcCert);
          }
        });

        // Sort by ID (newest first)
        allCerts.sort((a, b) => Number(b.id) - Number(a.id));
        
        setStudentCerts(allCerts);
      } catch (err) {
        console.error('Failed to load student certificates:', err);
        // Fallback to in-memory certificates
        const inMemoryStudentCerts = inMemoryCerts.filter(
          c => c.studentAddress && c.studentAddress.toLowerCase() === walletAddress.toLowerCase()
        );
        setStudentCerts(inMemoryStudentCerts);
      } finally {
        setLoading(false);
      }
    };

    loadStudentCertificates();
  }, [walletAddress, inMemoryCerts]);

  const copyLink = (id) => {
    const link = `${window.location.origin}/verify/${id}`;
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">My Certificates</h2>
        <p className="text-gray-400">View and share your academic credentials</p>
      </div>

      {loading ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10"
        >
          <Award className="w-16 h-16 text-gray-500 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-400 text-lg">Loading certificates...</p>
        </motion.div>
      ) : studentCerts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10"
        >
          <Award className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No certificates found</p>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentCerts.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                <img 
                  src={CERTIFICATE_IMAGE_URL} 
                  alt={cert.courseName}
                  className="w-full h-full object-contain object-center bg-white/5 p-4 group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('bg-gradient-to-br', 'from-purple-500/20', 'to-pink-500/20');
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  {cert.isRevoked ? (
                    <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-semibold">Revoked</span>
                  ) : (
                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">Valid</span>
                  )}
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{cert.courseName}</h3>
                  <p className="text-gray-400 text-sm">{cert.issuer}</p>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Grade:</span>
                  <span className="text-purple-400 font-semibold">{cert.grade}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Issued:</span>
                  <span className="text-white">{cert.issueDate}</span>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Link
                    to={`/verify/${cert.id}`}
                    className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-center font-semibold"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => copyLink(cert.id)}
                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// Dashboard - Verifier View
const VerifierDashboard = () => {
  const [searchId, setSearchId] = useState('');
  const { navigate } = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      navigate(`/verify/${searchId.trim()}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-block p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full mb-6">
          <Search className="w-16 h-16 text-purple-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">Verify Certificate</h2>
        <p className="text-gray-400 text-lg">Enter certificate ID to verify authenticity</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSearch}
        className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Certificate ID (e.g., 1, 2, 3...)"
            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-lg focus:outline-none focus:border-purple-500 transition-colors"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg rounded-xl font-semibold shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Verify Certificate
          </motion.button>
        </div>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl"
      >
        <div className="flex gap-3">
          <FileText className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-white font-semibold mb-2">How it works</h4>
            <p className="text-gray-400 text-sm">
              Enter the certificate ID to instantly verify its authenticity. Our blockchain-based system 
              ensures all certificates are tamper-proof and instantly verifiable.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Dashboard Page
const DashboardPage = () => {
  const { walletAddress, disconnectWallet, getUserRole } = useApp();
  const { navigate } = useRouter();
  const role = getUserRole();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
              <Award className="w-6 h-6 text-purple-400" />
              <span>CertChain</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                <span className="text-gray-400 text-sm">Role: </span>
                <span className="text-white font-semibold capitalize">{role}</span>
              </div>
              {walletAddress && (
                <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                  <span className="text-white font-mono text-sm">
                    {walletAddress.length <= 15 ? walletAddress : `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
                  </span>
                </div>
              )}
              <button
                onClick={disconnectWallet}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        {role === 'issuer' && <IssuerDashboard />}
        {role === 'student' && <StudentDashboard />}
        {role === 'verifier' && <VerifierDashboard />}
      </div>
    </div>
  );
};

// Verify Page
const VerifyPage = ({ id }) => {
  const { getCertificate } = useApp();
  const certificate = getCertificate(id);
  const { navigate } = useRouter();

  if (!certificate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-12 text-center"
        >
          <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Certificate Not Found</h2>
          <p className="text-gray-400 mb-8">
            The certificate ID #{id} does not exist in our system.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
          >
            Return Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${certificate.isRevoked ? 'bg-gradient-to-br from-gray-900 via-red-900 to-gray-900' : 'bg-gradient-to-br from-gray-900 via-green-900 to-gray-900'} flex items-center justify-center p-6`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8">
            <Award className="w-5 h-5" />
            <span className="font-semibold">CertChain</span>
          </Link>
        </div>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 overflow-hidden"
        >
          {/* Status Banner */}
          <div className={`p-8 text-center ${certificate.isRevoked ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              {certificate.isRevoked ? (
                <XCircle className="w-24 h-24 text-red-500 mx-auto mb-4" />
              ) : (
                <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-4" />
              )}
            </motion.div>
            <h1 className={`text-4xl font-bold mb-2 ${certificate.isRevoked ? 'text-red-400' : 'text-green-400'}`}>
              {certificate.isRevoked ? 'REVOKED' : 'VALID'}
            </h1>
            <p className="text-gray-300 text-lg">
              Certificate #{certificate.id}
            </p>
          </div>

          {/* Certificate Preview */}
          <div className="p-8">
            <div className="relative h-64 rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
              <img 
                src={CERTIFICATE_IMAGE_URL} 
                alt={certificate.courseName}
                className="w-full h-full object-contain object-center bg-white/5 p-6"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.classList.add('bg-gradient-to-br', 'from-purple-500/30', 'to-pink-500/30');
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-3xl font-bold text-white mb-2">{certificate.courseName}</h2>
                <p className="text-gray-300">{certificate.issuer}</p>
              </div>
            </div>

            {/* Certificate Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-gray-400 text-sm mb-1">Student Name</div>
                  <div className="text-white font-semibold">{certificate.studentName}</div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-gray-400 text-sm mb-1">Student Address</div>
                  <div className="text-white font-mono text-sm break-all">{certificate.studentAddress}</div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-gray-400 text-sm mb-1">Grade</div>
                  <div className="text-white font-semibold">{certificate.grade}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-gray-400 text-sm mb-1">Issuer</div>
                  <div className="text-white font-semibold">{certificate.issuer}</div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-gray-400 text-sm mb-1">Issuer Address</div>
                  <div className="text-white font-mono text-sm break-all">{certificate.issuerAddress}</div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-gray-400 text-sm mb-1">Issue Date</div>
                  <div className="text-white font-semibold">{certificate.issueDate}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
              <div className="text-gray-400 text-sm mb-1">Credential Hash</div>
              <div className="text-purple-400 font-mono text-sm break-all">{certificate.credentialHash}</div>
            </div>

            {certificate.isRevoked && (
              <div className="mt-6 p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-red-400 font-semibold mb-1">Certificate Revoked</h4>
                    <p className="text-gray-400 text-sm">
                      This certificate has been revoked by the issuing institution and is no longer valid.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex-1 px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors font-semibold"
              >
                Return Home
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Print Certificate
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// 404 Page
const NotFoundPage = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        >
          <h1 className="text-9xl font-bold text-white/10 mb-4">404</h1>
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg"
        >
          Go Home
        </motion.button>
      </motion.div>
    </div>
  );
};

// App Provider
const AppProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [certificates, setCertificates] = useState([]);

  const connectWallet = (address = null) => {
    // Mock wallet connection - use provided address or cycle through roles
    if (address) {
      setWalletAddress(address);
    } else {
      const addresses = [
        '0x1111111111111111111111111111111111111111', // Issuer
        '0x2222222222222222222222222222222222222222', // Student
        '0x3333333333333333333333333333333333333333'  // Verifier
      ];
      const randomAddress = addresses[Math.floor(Math.random() * addresses.length)];
      setWalletAddress(randomAddress);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    window.history.pushState({}, '', '/');
    window.location.reload();
  };

  const getUserRole = () => {
    if (!walletAddress) return null;
    if (walletAddress.toLowerCase() === '0x1111111111111111111111111111111111111111') return 'issuer';
    if (walletAddress.toLowerCase() === '0x2222222222222222222222222222222222222222') return 'student';
    return 'verifier';
  };

  const issueCertificate = async (formData) => {
    // Prepare metadata to store on-chain (as a JSON string)
    const issueDate = new Date().toISOString().split('T')[0];
    const metadata = JSON.stringify({
      studentName: formData.studentName,
      studentAddress: formData.studentAddress,
      courseName: formData.courseName,
      grade: formData.grade,
      issuer: 'MIT',
      issuerAddress: walletAddress,
      issueDate,
    });

    // For demo purposes, we use a placeholder CID and hash the metadata
    const cid = 'ipfs://placeholder-cid';
    const hash = CryptoJS.SHA256(metadata).toString();
    const dataHash = `0x${hash}`;

    let certificateId = String(certificates.length + 1);
    let txHash = null; // Initialize txHash outside try block
    let apiResult = null; // Store API result

    try {
      apiResult = await certificateAPI.issue({
        recipient: formData.studentAddress,
        cid,
        dataHash,
        metadata,
      });

      if (apiResult && apiResult.certificateId) {
        certificateId = String(apiResult.certificateId);
      }
      
      // Store transaction hash
      if (apiResult && apiResult.txHash) {
        txHash = apiResult.txHash;
        console.log('✅ Certificate issued on blockchain!');
        console.log('Transaction Hash:', apiResult.txHash);
        console.log('View on Etherscan:', `https://sepolia.etherscan.io/tx/${apiResult.txHash}`);
      }
    } catch (err) {
      // Log the error and throw it so handleIssue can catch it
      console.error('Failed to issue certificate on-chain/backend:', err);
      console.error('Error details:', err.response?.data || err.message);
      
      // Check for common errors
      if (formData.studentAddress && formData.studentAddress.length !== 42) {
        throw new Error(`Invalid student address format. Ethereum addresses must be 42 characters (0x + 40 hex). You provided: "${formData.studentAddress}" (${formData.studentAddress.length} characters). Please use a valid address like: 0x1234567890123456789012345678901234567890`);
      }
      
      throw err; // Re-throw the error so handleIssue can catch it
    }

    // Only create certificate if we got here without errors
    const newCert = {
      id: certificateId,
      studentName: formData.studentName,
      studentAddress: formData.studentAddress,
      courseName: formData.courseName,
      issuer: 'MIT',
      issuerAddress: walletAddress,
      issueDate,
      grade: formData.grade,
      credentialHash: dataHash,
      isRevoked: false,
      thumbnail: CERTIFICATE_IMAGE_URL,
      txHash: txHash, // Use variable defined in scope
    };

    setCertificates((prev) => [...prev, newCert]);
  };

  const revokeCertificate = async (id) => {
    try {
      const result = await certificateAPI.revoke(id);
      
      // Log transaction hash for blockchain verification
      if (result && result.txHash) {
        console.log('✅ Certificate revoked on blockchain!');
        console.log('Transaction Hash:', result.txHash);
        console.log('View on Etherscan:', `https://sepolia.etherscan.io/tx/${result.txHash}`);
      }
    } catch (err) {
      console.error('Failed to revoke certificate on-chain/backend:', err);
    }

    setCertificates((prev) =>
      prev.map((cert) =>
        cert.id === id ? { ...cert, isRevoked: true } : cert
      )
    );
  };

  const getCertificate = (id) => {
    return certificates.find(cert => cert.id === id);
  };

  return (
    <AppContext.Provider value={{
      walletAddress,
      certificates,
      connectWallet,
      disconnectWallet,
      getUserRole,
      issueCertificate,
      revokeCertificate,
      getCertificate
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Main App Component
const App = () => {
  return (
    <AppProvider>
      <Router>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<DashboardPage />} />
        <Route path="/verify/:id" element={<VerifyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Router>
    </AppProvider>
  );
};

export default App