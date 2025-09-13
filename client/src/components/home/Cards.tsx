import { useQuery } from "@apollo/client/react";
import Card from "./Card"
import { GET_TRANSACTIONS } from "../../graphql/queries/transaction.query";
import type { GetTransactionsData, Transaction } from "../../types";

const Cards = () => {
	const {data,loading} = useQuery<GetTransactionsData>(GET_TRANSACTIONS)
	
	if(loading) return <p>Loading ...</p>

	const transactions = data?.transactions ?? []
	
	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10 text-white'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				{!loading && transactions.map((transaction:Transaction) => (
					<Card key={transaction._id} transaction={transaction} />
				))}

				{!loading && transactions.length === 0 && (
					<p className="text-2xl font-bold text-center w-full">No transaction history found</p>
				)}
			</div>
		</div>
	);
};
export default Cards;