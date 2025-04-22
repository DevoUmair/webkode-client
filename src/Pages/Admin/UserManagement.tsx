// src/components/admin/UserManagement.tsx
import { useEffect, useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MoreVertical, 
  User, 
  Mail, 
  Calendar,
  XCircle,
  CheckCircle
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'developer';
  subscriptionStatus: 'active' | 'cancelled' | 'expired';
}


import finteckApi from '@/axios/Axios';
import { useUser } from '@/context/UserContextProvider';
export function UserManagement() {
  // Mock user data
  // const [users, setUsers] = useState<User[]>([
  //   {
  //     id: '1',
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     role: 'developer',
  //     subscriptionStatus: 'active',
  //     joinDate: '2023-01-15',
  //     lastActive: '2023-06-20'
  //   },
  //   {
  //     id: '2',
  //     name: 'Jane Smith',
  //     email: 'jane@example.com',
  //     role: 'developer',
  //     subscriptionStatus: 'active',
  //     joinDate: '2023-02-10',
  //     lastActive: '2023-06-18'
  //   },
  //   {
  //     id: '3',
  //     name: 'Admin User',
  //     email: 'admin@example.com',
  //     role: 'admin',
  //     subscriptionStatus: 'active',
  //     joinDate: '2022-11-05',
  //     lastActive: '2023-06-21'
  //   },
  // ]);
  const {accessToken}=useUser()
  const [users,setUsers]=useState<User[]>()

  const cancelSubscription = (userId: string) => {
    setUsers(users?.map(user => 
      user.id === userId 
        ? { ...user, subscriptionStatus: 'cancelled' } 
        : user
    ));
  };

  const activateSubscription = (userId: string) => {
    setUsers(users?.map(user => 
      user.id === userId 
        ? { ...user, subscriptionStatus: 'active' } 
        : user
    ));
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge >Active</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      case 'expired':
        return <Badge variant="secondary">Expired</Badge>;
        case 'inactive':
          return <Badge variant="destructive">inactive</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  useEffect(()=>{
    getUsers()
  },[])
  const getUsers = async () => {
    try {
      const response = await finteckApi.get('/admin/users-data', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      // Assuming the response has a data field with users
      // const users = response.data;
      setUsers(response.data)
      console.log(response?.data);
      console.log("Fetched users:", users);
  
      return users;
  
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch users";
  
      console.error("Error fetching users:", errorMsg);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Status</TableHead>
              {/* <TableHead>Joined</TableHead>
              <TableHead>Last Active</TableHead> */}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {user.fullName}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {user.email}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {user.balance} $
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(user.subscriptionStatus)}
                </TableCell>
                {/* <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {new Date(user.joinDate).toLocaleDateString()}
                  </div>
                </TableCell> */}
                {/* <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {new Date(user.lastActive).toLocaleDateString()}
                  </div>
                </TableCell> */}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {user.subscriptionStatus === 'active' ? (
                        <DropdownMenuItem 
                          onClick={() => cancelSubscription(user.id)}
                          className="text-destructive"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Cancel Subscription
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem 
                          onClick={() => activateSubscription(user.id)}
                          className="text-green-600"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Activate Subscription
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}