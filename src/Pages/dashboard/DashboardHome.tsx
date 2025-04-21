import { useEffect, useState } from 'react';
import { 
  Activity, ArrowUpRight, Wallet, ArrowDownLeft, UserPlus, 
  TrendingUp, LineChart, Bell
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

// Mock data for chart
const apiUsageData = [
  { name: 'Mon', payments: 65, refunds: 45, invoices: 15 },
  { name: 'Tue', payments: 59, refunds: 49, invoices: 12 },
  { name: 'Wed', payments: 80, refunds: 90, invoices: 18 },
  { name: 'Thu', payments: 81, refunds: 39, invoices: 25 },
  { name: 'Fri', payments: 56, refunds: 75, invoices: 10 },
  { name: 'Sat', payments: 55, refunds: 32, invoices: 9 },
  { name: 'Sun', payments: 40, refunds: 19, invoices: 5 },
];

const chartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 1100 }
];

const DashboardHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transaction Hub</h1>
          <p className="text-muted-foreground mt-1">
            Your financial activity looks strong today.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Balance Card */}
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Funds</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,456.78</div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                <span className="flex items-center text-emerald-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +12%
                </span>
                <span>since last settlement</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Total Transactions */}
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processed Payments</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                <span className="flex items-center text-emerald-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +8.2%
                </span>
                <span>from last billing cycle</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* API Requests */}
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transaction Volume</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$89,450</div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                <span className="flex items-center text-emerald-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +23.1%
                </span>
                <span>over target forecast</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Remaining Quota */}
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.4%</div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                <span>of transactions completed successfully</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* API Usage Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Transaction Analytics</CardTitle>
              <CardDescription>
                Daily financial activity by transaction type
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={apiUsageData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="payments" name="Payments" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="refunds" name="Refunds" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="invoices" name="Invoices" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Usage Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>
                Monthly transaction revenue growth
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8b5cf6" 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Your latest payment activities and account updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Activity items */}
              {[
                {
                  icon: <ArrowUpRight className="h-5 w-5 text-emerald-500" />,
                  title: "Payment Processed",
                  description: "Customer payment of $2,500.00 successfully processed",
                  time: "Just now"
                },
                {
                  icon: <Bell className="h-5 w-5 text-amber-500" />,
                  title: "Chargeback Alert",
                  description: "Potential dispute on transaction #45678",
                  time: "2 hours ago"
                },
                {
                  icon: <ArrowDownLeft className="h-5 w-5 text-blue-500" />,
                  title: "Settlement Completed",
                  description: "Weekly settlement of $12,450.00 transferred to your bank account",
                  time: "Yesterday"
                },
                {
                  icon: <UserPlus className="h-5 w-5 text-purple-500" />,
                  title: "New Payment Method Added",
                  description: "Business account connected for automatic withdrawals",
                  time: "2 days ago"
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="p-2 rounded-full bg-background border">
                    {activity.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{activity.title}</p>
                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardHome;