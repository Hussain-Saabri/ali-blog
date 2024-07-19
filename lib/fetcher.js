import useSWR from 'swr';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const response = (...args) => fetch(...args).then(res => res.json());

const useFetcher = (endpoint) => {
    const { data, error } = useSWR(`${baseURL}${endpoint}`, response);
    return {
        data,
        isLoading: !error && !data,
        isError: error
    };
};

export default useFetcher;

