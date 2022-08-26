import { Fetcher, Key } from "swr";

const fetcher: Fetcher<any, string> = (...args) => fetch(...args).then(res => res.json());

export default fetcher;