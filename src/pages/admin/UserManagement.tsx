import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  UserCheck, 
  UserX, 
  UserMinus, 
  Shield, 
  UserPlus, 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Ban,
  Mail,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../contexts/useAuth';

// Define user types based on our schema
interface IUser {
  _id: string;
  name: string;
  nickname?: string;
  email: string;
  profilePicture?: string;
  emailVerified: Date | null;
  status: 'active' | 'inactive' | 'suspended' | 'banned';
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export function UserManagement() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Keeping for future API implementation
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'activate' | 'deactivate' | 'suspend' | 'ban' | 'verify' | null>(null);
  
  const navigate = useNavigate();
  const { isAuthenticated, session } = useAuth();
  
  // Check if user is admin
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/signin');
      return;
    }
    
    // This is a mock check since we don't have the actual API yet
    // In a real implementation, this would check the user's role from the session
    const isAdmin = true; // Placeholder - will be replaced with actual role check
    
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAuthenticated, navigate, session]);
  
  // Function to fetch users - would be an API call in production
  const fetchUsers = async () => {
    try {
      setLoading(true);
      // In a real implementation, this would be an API call
      // For now, we'll use mock data
      const mockUsers: IUser[] = [
      {
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        status: 'active',
        role: 'user',
        emailVerified: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '2',
        name: 'Jane Smith',
        nickname: 'Janey',
        email: 'jane@example.com',
        status: 'active',
        role: 'admin',
        emailVerified: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        status: 'inactive',
        role: 'user',
        emailVerified: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '4',
        name: 'Alice Williams',
        email: 'alice@example.com',
        status: 'suspended',
        role: 'user',
        emailVerified: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '5',
        name: 'Charlie Brown',
        email: 'charlie@example.com',
        status: 'banned',
        role: 'user',
        emailVerified: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
      setUsers(mockUsers);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Failed to load users. Please try again.'); // Set error message if fetch fails
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Call fetchUsers on component mount
  useEffect(() => {
    fetchUsers();
  }, []);
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.nickname && user.nickname.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Handle user action (activate, deactivate, suspend, ban)
  const handleUserAction = (user: IUser, action: 'activate' | 'deactivate' | 'suspend' | 'ban' | 'verify') => {
    setSelectedUser(user);
    setActionType(action);
    setActionModalOpen(true);
  };
  
  // Confirm user action
  const confirmUserAction = () => {
    if (!selectedUser || !actionType) return;
    
    // In a real implementation, this would call the API
    // For now, we'll update the local state
    const updatedUsers = users.map(user => {
      if (user._id === selectedUser._id) {
        const updatedUser = { ...user };
        
        switch (actionType) {
          case 'activate':
            updatedUser.status = 'active';
            break;
          case 'deactivate':
            updatedUser.status = 'inactive';
            break;
          case 'suspend':
            updatedUser.status = 'suspended';
            break;
          case 'ban':
            updatedUser.status = 'banned';
            break;
          case 'verify':
            updatedUser.emailVerified = new Date();
            break;
        }
        
        return updatedUser;
      }
      return user;
    });
    
    setUsers(updatedUsers);
    setActionModalOpen(false);
    setSelectedUser(null);
    setActionType(null);
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </span>
        );
      case 'inactive':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <UserMinus className="w-3 h-3 mr-1" />
            Inactive
          </span>
        );
      case 'suspended':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Suspended
          </span>
        );
      case 'banned':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <Ban className="w-3 h-3 mr-1" />
            Banned
          </span>
        );
      default:
        return null;
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <RefreshCw className="w-12 h-12 text-indigo-600 animate-spin" />
        <p className="mt-4 text-lg text-gray-600">Loading users...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <XCircle className="w-12 h-12 text-red-600" />
        <p className="mt-4 text-lg text-gray-600">Error: {error}</p>
        <button 
          className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Shield className="w-8 h-8 mr-2 text-indigo-600" />
              User Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage user accounts, permissions, and status
            </p>
          </div>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </button>
        </div>
        
        {/* Search */}
        <div className="mb-6">
          <div className="relative rounded-md shadow-sm max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
              placeholder="Search users by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* User Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email Verified
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {user.profilePicture ? (
                          <img className="h-10 w-10 rounded-full" src={user.profilePicture} alt={user.name} />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <User className="h-6 w-6 text-indigo-600" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        {user.nickname && (
                          <div className="text-sm text-gray-500">Nickname: {user.nickname}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.role === 'admin' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <Shield className="w-3 h-3 mr-1" />
                        Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <User className="w-3 h-3 mr-1" />
                        User
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.emailVerified ? (
                      <span className="inline-flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {new Date(user.emailVerified).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-yellow-600">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Not verified
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {user.status !== 'active' && (
                        <button
                          onClick={() => handleUserAction(user, 'activate')}
                          className="text-green-600 hover:text-green-900"
                          title="Activate user"
                        >
                          <UserCheck className="w-5 h-5" />
                        </button>
                      )}
                      
                      {user.status === 'active' && (
                        <button
                          onClick={() => handleUserAction(user, 'deactivate')}
                          className="text-gray-600 hover:text-gray-900"
                          title="Deactivate user"
                        >
                          <UserMinus className="w-5 h-5" />
                        </button>
                      )}
                      
                      {user.status !== 'suspended' && user.status !== 'banned' && (
                        <button
                          onClick={() => handleUserAction(user, 'suspend')}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Suspend user"
                        >
                          <AlertCircle className="w-5 h-5" />
                        </button>
                      )}
                      
                      {user.status !== 'banned' && (
                        <button
                          onClick={() => handleUserAction(user, 'ban')}
                          className="text-red-600 hover:text-red-900"
                          title="Ban user"
                        >
                          <UserX className="w-5 h-5" />
                        </button>
                      )}
                      
                      {!user.emailVerified && (
                        <button
                          onClick={() => handleUserAction(user, 'verify')}
                          className="text-blue-600 hover:text-blue-900"
                          title="Verify email"
                        >
                          <Mail className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <User className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search terms or add a new user.
            </p>
          </div>
        )}
      </div>
      
      {/* Action Confirmation Modal */}
      {actionModalOpen && selectedUser && actionType && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    {actionType === 'activate' && <UserCheck className="h-6 w-6 text-indigo-600" />}
                    {actionType === 'deactivate' && <UserMinus className="h-6 w-6 text-indigo-600" />}
                    {actionType === 'suspend' && <AlertCircle className="h-6 w-6 text-indigo-600" />}
                    {actionType === 'ban' && <UserX className="h-6 w-6 text-indigo-600" />}
                    {actionType === 'verify' && <Mail className="h-6 w-6 text-indigo-600" />}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {actionType === 'activate' && 'Activate User'}
                      {actionType === 'deactivate' && 'Deactivate User'}
                      {actionType === 'suspend' && 'Suspend User'}
                      {actionType === 'ban' && 'Ban User'}
                      {actionType === 'verify' && 'Verify User Email'}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {actionType === 'activate' && `Are you sure you want to activate ${selectedUser.name}'s account?`}
                        {actionType === 'deactivate' && `Are you sure you want to deactivate ${selectedUser.name}'s account?`}
                        {actionType === 'suspend' && `Are you sure you want to suspend ${selectedUser.name}'s account?`}
                        {actionType === 'ban' && `Are you sure you want to ban ${selectedUser.name}'s account? This action is reversible, but should be used with caution.`}
                        {actionType === 'verify' && `Are you sure you want to manually verify ${selectedUser.name}'s email address (${selectedUser.email})?`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${
                    actionType === 'ban' 
                      ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                      : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                  }`}
                  onClick={confirmUserAction}
                >
                  Confirm
                </button>
                <button 
                  type="button" 
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setActionModalOpen(false);
                    setSelectedUser(null);
                    setActionType(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
