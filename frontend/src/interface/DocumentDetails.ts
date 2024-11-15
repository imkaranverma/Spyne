export declare module DocumentDetailsInterface {
  export interface Response {
    result: Result[];
    count: number;
  }

  export interface Result {
    id: string;
    business_id: string;
    type: string;
    number: string;
    image: string;
  }
}
