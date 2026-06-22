import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const API_URL = `${BASE_URL}/transactions`;



export async function getTransactions(
  token: string
) {
  console.log("BASE_URL =", BASE_URL);
  console.log("TOKEN =", token);

  const response = await axios.get(
    API_URL,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}
export async function addTransaction(
  transaction: {
    amount: number;
    category: string;
    type: string;
    description: string;
  },
  token: string
) {
  const response = await axios.post(
    API_URL,
    {
      amount: transaction.amount,
      category: transaction.category,
      type: transaction.type,
      description: transaction.description,
      date: new Date()
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}
export async function deleteTransaction(
  id: number,
  token: string
) {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}
export async function updateTransaction(
  id: number,
  data: {
    amount?: number;
    category?: string;
    type?: string;
    description?: string;
  },
  token: string
) {
  const response = await axios.put(
    `${API_URL}/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}
export async function getAIInsights(
  transactions: any[],
  token: string
) {
  const response = await axios.post(
    `${BASE_URL}/ai-insights`,
    { transactions },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data.insights;
}