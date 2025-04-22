
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle,
//     CardFooter
// } from "@/components/ui/card";

// import {
//     Table,
//     TableHeader,
//     TableRow,
//     TableHead,
//     TableBody,
//     TableCell
// } from "@/components/ui/table";

// import {
//     Select,
//     SelectTrigger,
//     SelectValue,
//     SelectContent,
//     SelectItem
// } from "@/components/ui/select";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//     ArrowUpRight,
//     ArrowDownRight,
//     FileText,
//     Search,
//     ChevronLeft,
//     ChevronRight,
//     Filter,
//     Download,
//     Menu
// } from "lucide-react";

// // Mock transaction data
// const generateMockTransactions = (): Transaction[] => {
//     const types = ['deposit', 'withdrawal', 'transfer', 'fee', 'payment'];
//     const statuses: ('completed' | 'pending' | 'failed')[] = ['completed', 'pending', 'failed'];
//     const descriptions = [
//         'Direct Deposit - Payroll',
//         'ATM Withdrawal',
//         'Transfer to Account',
//         'Transfer from Account',
//         'Monthly Service Fee',
//         'Interest Payment',
//         'Card Payment',
//         'Bill Payment',
//         'Online Purchase',
//         'Refund'
//     ];

//     const transactions: Transaction[] = [];
//     const today = new Date();

//     for (let i = 0; i < 50; i++) {
//         const type = types[Math.floor(Math.random() * types.length)];
//         const amount = type === 'deposit' || type === 'transfer' && i % 3 === 0 ?
//             Math.random() * 2000 + 100 :
//             -1 * (Math.random() * 1000 + 50);

//         const date = new Date(today);
//         date.setDate(today.getDate() - Math.floor(Math.random() * 30));

//         // Get random status from the statuses array
//         const status = statuses[Math.floor(Math.random() * statuses.length)];

//         transactions.push({
//             id: `trx_${i}`,
//             date: date.toISOString(),
//             type,
//             description: descriptions[Math.floor(Math.random() * descriptions.length)],
//             amount,
//             status: Math.random() > 0.1 ? 'completed' : (Math.random() > 0.5 ? 'pending' : 'failed')
//         });
//     }

//     return transactions;
// };

// interface Transaction {
//     id: string;
//     date: string;
//     type: string;
//     description: string;
//     amount: number;
//     status: 'completed' | 'pending' | 'failed';
// }

// const Transactions = () => {
//     const [transactions, setTransactions] = useState<Transaction[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [pageSize, setPageSize] = useState(10);
//     const [totalTransactions, setTotalTransactions] = useState(0);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [typeFilter, setTypeFilter] = useState<string>('all');
//     const [statusFilter, setStatusFilter] = useState<string>('all');
//     const [isMobileView, setIsMobileView] = useState(false);
//     const [showMobileFilters, setShowMobileFilters] = useState(false);

//     // Handle responsive layout detection
//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobileView(window.innerWidth < 640);
//         };

//         handleResize(); // Check on initial load
//         window.addEventListener('resize', handleResize);

//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     useEffect(() => {
//         fetchTransactions();
//     }, [currentPage, pageSize, searchTerm, typeFilter, statusFilter]);

//     // Mock API call to fetch transactions
//     const fetchTransactions = async () => {
//         setIsLoading(true);

//         // Simulate API call delay
//         setTimeout(() => {
//             const allTransactions = generateMockTransactions();

//             // Apply filters
//             let filtered = allTransactions;

//             if (searchTerm) {
//                 filtered = filtered.filter(t =>
//                     t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                     t.id.toLowerCase().includes(searchTerm.toLowerCase())
//                 );
//             }

//             if (typeFilter !== 'all') {
//                 filtered = filtered.filter(t => t.type === typeFilter);
//             }

//             if (statusFilter !== 'all') {
//                 filtered = filtered.filter(t => t.status === statusFilter);
//             }

//             // Sort by date (newest first)
//             filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

//             setTotalTransactions(filtered.length);

//             // Apply pagination
//             const start = (currentPage - 1) * pageSize;
//             const end = start + pageSize;
//             const paginatedTransactions: Transaction[] = filtered.slice(start, end);

//             setTransactions(paginatedTransactions);
//             setIsLoading(false);
//         }, 800);
//     };

//     const totalPages = Math.ceil(totalTransactions / pageSize);

//     const formatCurrency = (amount: number) => {
//         return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: 'USD'
//         }).format(amount);
//     };

//     const formatDate = (dateString: string) => {
//         const date = new Date(dateString);

//         // Use shorter date format on mobile devices
//         if (isMobileView) {
//             return date.toLocaleDateString();
//         }

//         return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     };

//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case 'completed':
//                 return 'bg-green-500/10 text-green-500 border-green-500/20';
//             case 'pending':
//                 return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
//             case 'failed':
//                 return 'bg-red-500/10 text-red-500 border-red-500/20';
//             default:
//                 return 'bg-muted text-muted-foreground';
//         }
//     };

//     const getTypeIcon = (type: string) => {
//         switch (type) {
//             case 'deposit':
//                 return <ArrowDownRight className="h-4 w-4 text-green-500" />;
//             case 'withdrawal':
//             case 'payment':
//                 return <ArrowUpRight className="h-4 w-4 text-red-500" />;
//             case 'transfer':
//                 return <ArrowUpRight className="h-4 w-4 text-blue-500" />;
//             default:
//                 return <FileText className="h-4 w-4 text-muted-foreground" />;
//         }
//     };

//     // Render standard table for desktop/tablet view
//     const renderDesktopTable = () => (
//         <Table>
//             <TableHeader>
//                 <TableRow>
//                     <TableHead className="w-[180px]">Date</TableHead>
//                     <TableHead>Description</TableHead>
//                     <TableHead>Type</TableHead>
//                     <TableHead className="text-right">Amount</TableHead>
//                     <TableHead className="text-right">Status</TableHead>
//                 </TableRow>
//             </TableHeader>
//             <TableBody>
//                 {isLoading ? (
//                     [...Array(pageSize)].map((_, i) => (
//                         <TableRow key={i} className="animate-pulse">
//                             <TableCell><div className="h-5 bg-muted rounded w-24"></div></TableCell>
//                             <TableCell><div className="h-5 bg-muted rounded w-52"></div></TableCell>
//                             <TableCell><div className="h-5 bg-muted rounded w-20"></div></TableCell>
//                             <TableCell><div className="h-5 bg-muted rounded w-24 ml-auto"></div></TableCell>
//                             <TableCell><div className="h-5 bg-muted rounded w-20 ml-auto"></div></TableCell>
//                         </TableRow>
//                     ))
//                 ) : transactions.length > 0 ? (
//                     transactions.map((transaction) => (
//                         <TableRow key={transaction.id}>
//                             <TableCell className="font-medium">{formatDate(transaction.date)}</TableCell>
//                             <TableCell>{transaction.description}</TableCell>
//                             <TableCell>
//                                 <div className="flex items-center">
//                                     {getTypeIcon(transaction.type)}
//                                     <span className="ml-1 capitalize">{transaction.type}</span>
//                                 </div>
//                             </TableCell>
//                             <TableCell className={`text-right ${transaction.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//                                 {formatCurrency(transaction.amount)}
//                             </TableCell>
//                             <TableCell className="text-right">
//                                 <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
//                                     {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
//                                 </span>
//                             </TableCell>
//                         </TableRow>
//                     ))
//                 ) : (
//                     <TableRow>
//                         <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
//                             No transactions found
//                         </TableCell>
//                     </TableRow>
//                 )}
//             </TableBody>
//         </Table>
//     );

//     // Render card-style layout for mobile view
//     const renderMobileCards = () => (
//         <div className="space-y-4">
//             {isLoading ? (
//                 [...Array(pageSize)].map((_, i) => (
//                     <div key={i} className="border rounded p-4 animate-pulse">
//                         <div className="h-5 bg-muted rounded w-24 mb-3"></div>
//                         <div className="h-5 bg-muted rounded w-full mb-3"></div>
//                         <div className="flex justify-between">
//                             <div className="h-5 bg-muted rounded w-20"></div>
//                             <div className="h-5 bg-muted rounded w-24"></div>
//                         </div>
//                     </div>
//                 ))
//             ) : transactions.length > 0 ? (
//                 transactions.map((transaction) => (
//                     <div key={transaction.id} className="border rounded p-4">
//                         <div className="flex justify-between items-start mb-2">
//                             <div className="font-medium">{formatDate(transaction.date)}</div>
//                             <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
//                                 {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
//                             </span>
//                         </div>
//                         <div className="mb-3 text-sm">{transaction.description}</div>
//                         <div className="flex justify-between items-center">
//                             <div className="flex items-center text-sm">
//                                 {getTypeIcon(transaction.type)}
//                                 <span className="ml-1 capitalize">{transaction.type}</span>
//                             </div>
//                             <div className={`font-medium ${transaction.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//                                 {formatCurrency(transaction.amount)}
//                             </div>
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <div className="border rounded p-6 text-center text-muted-foreground">
//                     No transactions found
//                 </div>
//             )}
//         </div>
//     );

//     // Render mobile filter panel
//     const renderMobileFilters = () => (
//         <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: showMobileFilters ? 'auto' : 0, opacity: showMobileFilters ? 1 : 0 }}
//             transition={{ duration: 0.3 }}
//             className="overflow-hidden"
//         >
//             <div className="p-3 space-y-3 border-t">
//                 <div className="relative w-full">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                     <Input
//                         placeholder="Search transactions..."
//                         className="pl-10"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </div>

//                 <div className="grid grid-cols-2 gap-2">
//                     <Select
//                         value={typeFilter}
//                         onValueChange={(value) => {
//                             setTypeFilter(value);
//                             if (isMobileView) setShowMobileFilters(false);
//                         }}
//                     >
//                         <SelectTrigger>
//                             <Filter className="h-4 w-4 mr-2" />
//                             <SelectValue placeholder="Type" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="all">All Types</SelectItem>
//                             <SelectItem value="deposit">Deposits</SelectItem>
//                             <SelectItem value="withdrawal">Withdrawals</SelectItem>
//                             <SelectItem value="transfer">Transfers</SelectItem>
//                             <SelectItem value="fee">Fees</SelectItem>
//                             <SelectItem value="payment">Payments</SelectItem>
//                         </SelectContent>
//                     </Select>

//                     <Select
//                         value={statusFilter}
//                         onValueChange={(value) => {
//                             setStatusFilter(value);
//                             if (isMobileView) setShowMobileFilters(false);
//                         }}
//                     >
//                         <SelectTrigger>
//                             <SelectValue placeholder="Status" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="all">All Statuses</SelectItem>
//                             <SelectItem value="completed">Completed</SelectItem>
//                             <SelectItem value="pending">Pending</SelectItem>
//                             <SelectItem value="failed">Failed</SelectItem>
//                         </SelectContent>
//                     </Select>
//                 </div>
//             </div>
//         </motion.div>
//     );

//     return (
//         <div className="container mx-auto px-2 sm:px-4">
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4 }}
//             >
//                 <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Transaction History</h1>

//                 <Card>
//                     <CardHeader className="pb-0">
//                         <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4">
//                             <div className="flex justify-between items-center w-full">
//                                 <CardTitle className="text-lg sm:text-xl">Transactions</CardTitle>

//                                 {/* Mobile filter toggle button */}
//                                 {isMobileView && (
//                                     <Button
//                                         variant="outline"
//                                         size="sm"
//                                         onClick={() => setShowMobileFilters(!showMobileFilters)}
//                                         className="ml-auto"
//                                     >
//                                         <Filter className="h-4 w-4 mr-2" />
//                                         Filters
//                                     </Button>
//                                 )}
//                             </div>

//                             {/* Desktop search and filters */}
//                             {!isMobileView && (
//                                 <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//                                     <div className="relative w-full sm:w-64">
//                                         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                                         <Input
//                                             placeholder="Search transactions..."
//                                             className="pl-10"
//                                             value={searchTerm}
//                                             onChange={(e) => setSearchTerm(e.target.value)}
//                                         />
//                                     </div>
//                                     <div className="flex flex-wrap gap-2">
//                                         <Select value={typeFilter} onValueChange={setTypeFilter}>
//                                             <SelectTrigger className="min-w-[120px] flex-1 sm:flex-none sm:w-[130px]">
//                                                 <Filter className="h-4 w-4" />
//                                                 <SelectValue placeholder="Type" />
//                                             </SelectTrigger>
//                                             <SelectContent>
//                                                 <SelectItem value="all">All Types</SelectItem>
//                                                 <SelectItem value="deposit">Deposits</SelectItem>
//                                                 <SelectItem value="withdrawal">Withdrawals</SelectItem>
//                                                 <SelectItem value="transfer">Transfers</SelectItem>
//                                                 <SelectItem value="fee">Fees</SelectItem>
//                                                 <SelectItem value="payment">Payments</SelectItem>
//                                             </SelectContent>
//                                         </Select>

//                                         <Select value={statusFilter} onValueChange={setStatusFilter}>
//                                             <SelectTrigger className="min-w-[120px] flex-1 sm:flex-none sm:w-[130px]">
//                                                 <SelectValue placeholder="Status" />
//                                             </SelectTrigger>
//                                             <SelectContent>
//                                                 <SelectItem value="all">All Statuses</SelectItem>
//                                                 <SelectItem value="completed">Completed</SelectItem>
//                                                 <SelectItem value="pending">Pending</SelectItem>
//                                                 <SelectItem value="failed">Failed</SelectItem>
//                                             </SelectContent>
//                                         </Select>
//                                     </div>

//                                     {/* <div className="flex gap-2">
//                     <Select
//                       value={typeFilter}
//                       onValueChange={setTypeFilter}
//                     >
//                       <SelectTrigger className="w-[130px]">
//                         <Filter className="h-4 w-4 mr-2" />
//                         <SelectValue placeholder="Type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="all">All Types</SelectItem>
//                         <SelectItem value="deposit">Deposits</SelectItem>
//                         <SelectItem value="withdrawal">Withdrawals</SelectItem>
//                         <SelectItem value="transfer">Transfers</SelectItem>
//                         <SelectItem value="fee">Fees</SelectItem>
//                         <SelectItem value="payment">Payments</SelectItem>
//                       </SelectContent>
//                     </Select>

//                     <Select
//                       value={statusFilter}
//                       onValueChange={setStatusFilter}
//                     >
//                       <SelectTrigger className="w-[130px]">
//                         <SelectValue placeholder="Status" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="all">All Statuses</SelectItem>
//                         <SelectItem value="completed">Completed</SelectItem>
//                         <SelectItem value="pending">Pending</SelectItem>
//                         <SelectItem value="failed">Failed</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div> */}
//                                 </div>
//                             )}
//                         </div>

//                         {/* Mobile filters panel */}
//                         {isMobileView && renderMobileFilters()}
//                     </CardHeader>

//                     <CardContent className="pt-4 sm:pt-6 px-2 sm:px-6">
//                         <div className="rounded-md border overflow-hidden">
//                             {/* Conditional rendering based on screen size */}
//                             {isMobileView ? renderMobileCards() : renderDesktopTable()}
//                         </div>
//                     </CardContent>

//                     <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 px-2 sm:px-6 py-3 sm:py-4">
//                         <div className="flex items-center gap-2 w-full sm:w-auto">
//                             <span className="text-xs sm:text-sm text-muted-foreground truncate">
//                                 {transactions.length > 0 ? (
//                                     <>Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalTransactions)} of {totalTransactions}</>
//                                 ) : (
//                                     <>0 transactions</>
//                                 )}
//                             </span>

//                             <Select
//                                 value={pageSize.toString()}
//                                 onValueChange={(value) => {
//                                     setPageSize(Number(value));
//                                     setCurrentPage(1); // Reset to first page when changing page size
//                                 }}
//                             >
//                                 <SelectTrigger className="w-[70px]">
//                                     <SelectValue />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="5">5</SelectItem>
//                                     <SelectItem value="10">10</SelectItem>
//                                     <SelectItem value="20">20</SelectItem>
//                                     <SelectItem value="50">50</SelectItem>
//                                 </SelectContent>
//                             </Select>

//                             <span className="text-xs sm:text-sm text-muted-foreground">per page</span>
//                         </div>

//                         <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
//                             <div className="flex items-center">
//                                 <Button
//                                     variant="outline"
//                                     size="icon"
//                                     onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
//                                     disabled={currentPage === 1 || isLoading}
//                                     className="h-8 w-8"
//                                 >
//                                     <ChevronLeft className="h-4 w-4" />
//                                 </Button>

//                                 <div className="mx-2 sm:mx-4 text-xs sm:text-sm">
//                                     Page {currentPage} of {totalPages || 1}
//                                 </div>

//                                 <Button
//                                     variant="outline"
//                                     size="icon"
//                                     onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
//                                     disabled={currentPage === totalPages || totalPages === 0 || isLoading}
//                                     className="h-8 w-8"
//                                 >
//                                     <ChevronRight className="h-4 w-4" />
//                                 </Button>
//                             </div>

//                             {/* Export button visible on all screen sizes */}
//                             <Button
//                                 variant="outline"
//                                 className="ml-2 sm:ml-4 text-xs sm:text-sm px-2 sm:px-3 py-1"
//                                 disabled={isLoading || transactions.length === 0}
//                             >
//                                 <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
//                                 <span className="hidden sm:inline">Export</span>
//                             </Button>
//                         </div>
//                     </CardFooter>
//                 </Card>
//             </motion.div>
//         </div>
//     );
// };

// export default Transactions;


import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ScrollText,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  X,
  RefreshCw,
  User
} from "lucide-react";

import { useUser } from "@/context/UserContextProvider";
import finteckApi from "@/axios/Axios";
// Interface to match the received transaction format
interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
}

interface Account {
  _id: string;
  userId: User;
  balance: number;
  cnic: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Transaction {
  _id: string;
  senderAccountId: Account;
  receiverAccountId: Account;
  amount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  data: Transaction[];
  totalCount: number;
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(true);
  const { accessToken } = useUser();
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, pageSize, searchTerm, showAllTransactions, accessToken]);

  const fetchTransactions = async () => {
    setIsLoading(true);

    try {
      // Prepare params object for axios
      const params: Record<string, string | number> = {};

      // Add pagination parameters based on mode
      if (!showAllTransactions) {
        // For paginated view, use the currentPage directly
        params.page = currentPage;
        params.page_size = pageSize;
      } else {
        // For "show all" view, we want page 1 with large limit
        params.page = 1;
        params.page_size = 1000; // Use large number to get all
      }

      console.log('Fetching transactions with params:', params);

      // Make the API call using finteckApi with the correct parameters
      const response = await finteckApi.get('/account/transaction', {
        params,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      console.log('API response:', response.data);
      const totalPages  = Math.ceil(totalTransactions / pageSize);
      // Access the data from the response
      let transactions: Transaction[];
      let totalCount: number;

      // Handle different potential response formats
      if (Array.isArray(response.data)) {
        transactions = response.data;
        totalCount = response.data.length;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        transactions = response.data.data;
        totalCount = response.data.totalCount || transactions.length;
      } else {
        throw new Error('Unexpected response format');
      }

      setTransactions(transactions);
      setTotalTransactions(totalCount);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);
      setTotalTransactions(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    // if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    // if(newPage<1 || newPage > totalPages ) return
    if (newPage < 1 || newPage > totalPages) return
    setCurrentPage(newPage);
    fetchTransactions()
  };

  // Refresh transactions
  const refreshTransactions = () => {
    fetchTransactions();
  };

  // Toggle between showing all transactions and paginated results
  const toggleTransactionView = () => {
    setShowAllTransactions(!showAllTransactions);
    setCurrentPage(1); // Reset to first page when toggling
  };

  const totalPages = Math.max(1, Math.ceil(totalTransactions / pageSize));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isMobileView) {
      return date.toLocaleDateString();
    }
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderDesktopTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[180px]">Date</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-center">Transaction ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          [...Array(pageSize)].map((_, i) => (
            <TableRow key={i} className="animate-pulse">
              <TableCell><div className="h-5 bg-muted rounded w-24"></div></TableCell>
              <TableCell><div className="h-5 bg-muted rounded w-36"></div></TableCell>
              <TableCell><div className="h-5 bg-muted rounded w-36"></div></TableCell>
              <TableCell><div className="h-5 bg-muted rounded w-24 ml-auto"></div></TableCell>
              <TableCell><div className="h-5 bg-muted rounded w-20 mx-auto"></div></TableCell>
            </TableRow>
          ))
        ) : transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell className="font-medium">{formatDate(transaction.createdAt)}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-500 mr-2" />
                  {transaction.senderAccountId.userId.fullName}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-500 mr-2" />
                  {transaction.receiverAccountId.userId.fullName}
                </div>
              </TableCell>
              <TableCell className="text-right font-medium text-green-500">
                {formatCurrency(transaction.amount)}
              </TableCell>
              <TableCell className="text-center text-xs text-muted-foreground">
                {transaction._id.substring(0, 8)}...
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
              No transactions found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

  const renderMobileCards = () => (
    <div className="space-y-4">
      {isLoading ? (
        [...Array(pageSize)].map((_, i) => (
          <div key={i} className="border rounded p-4 animate-pulse">
            <div className="h-5 bg-muted rounded w-24 mb-3"></div>
            <div className="h-5 bg-muted rounded w-full mb-3"></div>
            <div className="flex justify-between">
              <div className="h-5 bg-muted rounded w-20"></div>
              <div className="h-5 bg-muted rounded w-24"></div>
            </div>
          </div>
        ))
      ) : transactions.length > 0 ? (
        transactions.map((transaction) => (
          <div key={transaction._id} className="border rounded p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="font-medium">{formatDate(transaction.createdAt)}</div>
              <div className="text-xs text-muted-foreground">
                ID: {transaction._id.substring(0, 8)}...
              </div>
            </div>
            <div className="mb-3">
              <div className="flex items-center text-sm mb-1">
                <span className="text-muted-foreground mr-2">From:</span>
                <User className="h-4 w-4 text-gray-500 mr-1" />
                <span>{transaction.senderAccountId.userId.fullName}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-muted-foreground mr-2">To:</span>
                <User className="h-4 w-4 text-gray-500 mr-1" />
                <span>{transaction.receiverAccountId.userId.fullName}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm">
                <ArrowUpRight className="h-4 w-4 text-blue-500 mr-1" />
                <span>Transfer</span>
              </div>
              <div className="font-medium text-green-500">
                {formatCurrency(transaction.amount)}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="border rounded p-6 text-center text-muted-foreground">
          No transactions found
        </div>
      )}
    </div>
  );

  const renderFilters = () => (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div className={`p-3 space-y-3 ${isMobileView ? 'border-t' : 'border rounded-lg mt-2'}`}>
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or transaction ID..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="container mx-auto px-2 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Transaction History</h1>

        <Card>
          <CardHeader className="pb-0">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4">
              <div className="flex justify-between items-center w-full">
                <CardTitle className="text-lg sm:text-xl">Transactions</CardTitle>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size={isMobileView ? "sm" : "default"}
                    onClick={refreshTransactions}
                    className="ml-auto"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>

                  <Button
                    variant="outline"
                    size={isMobileView ? "sm" : "default"}
                    onClick={toggleTransactionView}
                  >
                    {showAllTransactions ? "Show Paginated" : "Show All"}
                  </Button>

                  <Button
                    variant="outline"
                    size={isMobileView ? "sm" : "default"}
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </Button>
                </div>
              </div>
            </div>

            {renderFilters()}
          </CardHeader>

          <CardContent className="pt-4 sm:pt-6 px-2 sm:px-6">
            <div className="rounded-md border overflow-hidden">
              {isMobileView ? renderMobileCards() : renderDesktopTable()}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 px-2 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs sm:text-sm text-muted-foreground truncate">
                {transactions.length > 0 ? (
                  showAllTransactions ?
                    <>Showing all {totalTransactions} transactions</> :
                    <>Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalTransactions)} of {totalTransactions}</>
                ) : (
                  <>0 transactions</>
                )}
              </span>

              {!showAllTransactions && (
                <>
                  <Select
                    value={pageSize.toString()}
                    onValueChange={(value) => {
                      setPageSize(Number(value));
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-[70px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>

                  <span className="text-xs sm:text-sm text-muted-foreground">per page</span>
                </>
              )}
            </div>

            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
              {!showAllTransactions && (
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    // disabled={currentPage === 1 || isLoading}
                    className="h-8 w-8"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="mx-2 sm:mx-4 text-xs sm:text-sm">
                    Page {currentPage} of {totalPages}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    // disabled={currentPage === totalPages || totalPages === 0 || isLoading}
                    className="h-8 w-8"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* <Button
                variant="outline"
                className="ml-2 sm:ml-4 text-xs sm:text-sm px-2 sm:px-3 py-1"
                disabled={isLoading || transactions.length === 0}
              >
                <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Export</span>
              </Button> */}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Transactions;