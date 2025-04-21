// src/pages/admin/DashboardHome.tsx
import { 
    BarChart, 
    LineChart,
    Users,
    ArrowLeftRight,
    Activity,
    Clock,
    User as UserIcon,
    CreditCard,
    AlertCircle,
    CheckCircle,
    Shield
  } from 'lucide-react';
  import { Link } from 'react-router-dom';
  
  export function AdminDashboardHome() {
    // Recent activities data
    const activities = [
      {
        id: 1,
        type: 'user',
        action: 'New registration',
        user: 'john.doe@example.com',
        time: '2 minutes ago',
        icon: <UserIcon className="h-4 w-4 text-blue-500" />
      },
      {
        id: 2,
        type: 'transaction',
        action: 'Large transfer processed',
        amount: '$5,000',
        time: '15 minutes ago',
        icon: <CreditCard className="h-4 w-4 text-green-500" />
      },
      {
        id: 3,
        type: 'alert',
        action: 'Suspicious login attempt',
        location: 'Germany',
        time: '1 hour ago',
        icon: <AlertCircle className="h-4 w-4 text-yellow-500" />
      },
      {
        id: 4,
        type: 'system',
        action: 'Database backup completed',
        time: '2 hours ago',
        icon: <CheckCircle className="h-4 w-4 text-purple-500" />
      },
    ];
  
    // Recent users data
    const recentUsers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        status: 'verified',
        avatar: '/avatars/01.png'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        status: 'pending',
        avatar: '/avatars/02.png'
      },
      {
        id: 3,
        name: 'Robert Johnson',
        email: 'robert.j@example.com',
        status: 'verified',
        avatar: '/avatars/03.png'
      },
    ];
  
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</span>
          </div>
        </div>
  
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">New Users</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                +24
              </span>
            </div>
            <div className="text-xl font-semibold mt-1">142</div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Pending KYC</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                12
              </span>
            </div>
            <div className="text-xl font-semibold mt-1">12</div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Fraud Alerts</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                3
              </span>
            </div>
            <div className="text-xl font-semibold mt-1">3</div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Server Load</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Normal
              </span>
            </div>
            <div className="text-xl font-semibold mt-1">32%</div>
          </div>
        </div>
  
        {/* Main Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Users Overview */}
          <div className="border rounded-lg">
            <div className="flex flex-row items-center justify-between p-6 pb-2">
              <h3 className="text-sm font-medium">Total Users</h3>
              <Users className="h-4 w-4 text-gray-500" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-gray-500">+12.3% from last month</p>
            </div>
          </div>
  
          {/* Transactions */}
          <div className="border rounded-lg">
            <div className="flex flex-row items-center justify-between p-6 pb-2">
              <h3 className="text-sm font-medium">Transactions</h3>
              <ArrowLeftRight className="h-4 w-4 text-gray-500" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">$42,678</div>
              <p className="text-xs text-gray-500">+19% from last month</p>
            </div>
          </div>
  
          {/* System Health */}
          <div className="border rounded-lg">
            <div className="flex flex-row items-center justify-between p-6 pb-2">
              <h3 className="text-sm font-medium">System Status</h3>
              <Activity className="h-4 w-4 text-gray-500" />
            </div>
            <div className="p-6 pt-0">
              <div className="flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                <span className="font-medium">All systems operational</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Last incident: 3 days ago</p>
            </div>
          </div>
  
          {/* Recent Activities */}
          <div className="border rounded-lg md:col-span-2">
            <div className="p-6">
              <h3 className="text-lg font-medium">Recent Activities</h3>
            </div>
            <div className="px-6 pb-6">
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-3">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {activity.user || activity.amount || activity.location}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          {/* User Management Preview */}
          <div className="border rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium">User Management</h3>
            </div>
            <div className="px-6 pb-6">
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <button className={`px-3 py-1 text-sm rounded-md ${
                      user.status === 'verified' 
                        ? 'border border-gray-200 hover:bg-gray-50' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}>
                      {user.status === 'verified' ? 'Verified' : 'Review'}
                    </button>
                  </div>
                ))}
                <Link to="/admin/users" className="w-full text-center block text-blue-600 text-sm hover:underline">
                  View all users
                </Link>
              </div>
            </div>
          </div>
  
          {/* Analytics */}
          <div className="border rounded-lg md:col-span-3">
            <div className="flex flex-row items-center justify-between p-6">
              <h3 className="text-lg font-medium">Platform Analytics</h3>
              <div className="flex space-x-2">
                <button className="text-sm px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200">
                  <BarChart className="h-4 w-4" />
                </button>
                <button className="text-sm px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200">
                  <LineChart className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="px-6 pb-6">
              <div className="h-[300px] bg-gray-50 rounded-md flex items-center justify-center">
                <p className="text-gray-400">Analytics chart will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }