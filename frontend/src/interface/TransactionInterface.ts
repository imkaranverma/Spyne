export module TransactionInterface {
  export interface Response {
    total_pages_data_count: number;
    current_page_data_count: number;
    result: Result[];
  }

  export interface Result {
    transaction_date: string;
    transaction_id: string;
    order_id: string;
    transaction_amount: number;
    balance_amount: number;
    currency: string;
    transaction_type: string;
    transaction_description: string;
    message: string;
  }
}

export declare module AddMoneyInterface {
  export interface Request {
    company: string;
    amount: number;
    payment_type: string;
    payment_reference_number?: string;
    wallet_id: string;
  }

  export interface Response {
    info: string;
  }
}
