import { useState } from "react";
import { motion } from "framer-motion";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowRightLeft, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle,CardFooter } from "@/components/ui/card";
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// Mock account data
const mockAccounts = [
  { id: "acc_123456", name: "Main Account", balance: 12489.32 },
  { id: "acc_789012", name: "Savings Account", balance: 34567.89 },
  { id: "acc_345678", name: "Investment Account", balance: 56789.01 }
];

// Form schema
const transferSchema = z.object({
  sourceAccountId: z.string({
    required_error: "Please select a source account",
  }),
  destinationAccountId: z.string({
    required_error: "Please select a destination account",
  }),
  amount: z.coerce.number()
    .positive("Amount must be positive")
    .min(0.01, "Amount must be at least 0.01"),
  description: z.string().optional(),
}).refine(
  (data) => data.sourceAccountId !== data.destinationAccountId,
  {
    message: "Source and destination accounts must be different",
    path: ["destinationAccountId"],
  }
);

const Transfers = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  // Get current balance for the selected account
  const getAccountBalance = (accountId: string) => {
    const account = mockAccounts.find(acc => acc.id === accountId);
    return account ? account.balance : 0;
  };

  // Form setup
  const form = useForm<z.infer<typeof transferSchema>>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      sourceAccountId: "",
      destinationAccountId: "",
      amount: undefined,
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof transferSchema>) => {
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setErrorMessage(null);
    
    // Check if source account has enough funds
    const sourceBalance = getAccountBalance(data.sourceAccountId);
    if (data.amount > sourceBalance) {
      setErrorMessage("Insufficient funds in the source account.");
      setIsSubmitting(false);
      return;
    }
    
    try {
      // In a real app, this would be an API call to process the transfer
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock success response
      setSubmitSuccess(true);
      setTransactionId(`trx_${Math.floor(Math.random() * 1000000)}`);
      
      // Reset form
      form.reset();
    } catch (error) {
      setSubmitSuccess(false);
      setErrorMessage("Transfer failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get selected accounts for display
  const sourceAccountId = form.watch("sourceAccountId");
  const destinationAccountId = form.watch("destinationAccountId");
  
  const sourceAccount = mockAccounts.find(acc => acc.id === sourceAccountId);
  const destinationAccount = mockAccounts.find(acc => acc.id === destinationAccountId);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Transfer Funds</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5" />
                New Transfer
              </CardTitle>
              <CardDescription>
                Transfer funds between your accounts or to external accounts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitSuccess === true ? (
                <Alert className="bg-green-500/10 text-green-500 border-green-500/20">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Transfer Successful</AlertTitle>
                  <AlertDescription>
                    Your transfer has been processed successfully.<br />
                    Transaction ID: {transactionId}
                  </AlertDescription>
                </Alert>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {errorMessage && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{errorMessage}</AlertDescription>
                      </Alert>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="sourceAccountId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>From Account</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={isSubmitting}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select source account" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {mockAccounts.map((account) => (
                                  <SelectItem key={account.id} value={account.id}>
                                    {account.name} ({formatCurrency(account.balance)})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="destinationAccountId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>To Account</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={isSubmitting}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select destination account" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {mockAccounts.map((account) => (
                                  <SelectItem 
                                    key={account.id} 
                                    value={account.id}
                                    disabled={account.id === sourceAccountId}
                                  >
                                    {account.name} ({formatCurrency(account.balance)})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                              <Input
                                {...field}
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="pl-8"
                                disabled={isSubmitting}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter a description for this transfer"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Transfer Funds"
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Transfer Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium">From</div>
                <div className="text-lg">
                  {sourceAccount ? sourceAccount.name : "Select source account"}
                </div>
                {sourceAccount && (
                  <div className="text-sm text-muted-foreground">
                    Available balance: {formatCurrency(sourceAccount.balance)}
                  </div>
                )}
              </div>
              
              <div>
                <div className="text-sm font-medium">To</div>
                <div className="text-lg">
                  {destinationAccount ? destinationAccount.name : "Select destination account"}
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium">Amount</div>
                <div className="text-2xl font-bold">
                  {form.watch("amount") ? formatCurrency(form.watch("amount")) : "$0.00"}
                </div>
              </div>
              
              {form.watch("description") && (
                <div>
                  <div className="text-sm font-medium">Description</div>
                  <div className="text-muted-foreground">
                    {form.watch("description")}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Transfers between accounts are processed immediately. 
                External transfers may take 1-3 business days to complete.
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Transfers;