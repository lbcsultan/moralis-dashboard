import CustomContainer from './CustomContainer';
import { useMoralisWeb3Api } from 'react-moralis';
import { useEffect, useState } from 'react';
import { Text, Divider } from '@chakra-ui/react';
import Link from 'next/link';

export default function Transactions({ user }) {
  const Web3Api = useMoralisWeb3Api();
  const BASE_URL = 'https://rinkeby.etherscan.io/tx/';

  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const data = await Web3Api.account.getTransactions({
      chain: 'rinkeby',
      address: user.get('ethAddress'),
      limit: 5,
    });
    if (data) {
      setTransactions(data.result);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <CustomContainer>
      <Text fontSize="xl" mb="6" fontWeight="bold">
        My last 5 transactions
      </Text>
      {transactions &&
        transactions.map((transaction) => (
          <div key={transaction.hash}>
            <Link href={`${BASE_URL}${transaction.hash}`} isExternal>
              {transaction.hash}
            </Link>
            <Divider />
          </div>
        ))}
    </CustomContainer>
  );
}
