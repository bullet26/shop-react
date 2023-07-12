import axios from 'axios';

type RequestType = 'GET' | 'POST' | 'DELETE' | 'PUT';

interface HTTPResp<T> {
    data?: T;
    status?: number;
}

export const request = async <T>(url: string, method: RequestType = 'GET', data?: object, headers?: object, token?: string): Promise<T> => {
    axios.defaults.baseURL = 'https://dummyjson.com/';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    if (!!token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        axios.defaults.headers.common['Authorization'] = ``;
    }
    const fetchData = () => {
        if (method === 'GET') return axios.get(url, { params: data });
        else return axios(url, { method, data, headers });
    };

    try {
        const { data, status } = await fetchData();

        if (status !== 200) {
            throw new Error('Something went wrong');
        }
        return data;
    } catch (e: any) {
        throw new Error(e);
    }
};
