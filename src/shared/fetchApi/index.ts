type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchApiOptions {
    method?: FetchMethod;
    data?: any;
    headers?: Record<string, string>;
}

export async function fetchApi(url: string, options: FetchApiOptions = {}){
    const { method = 'GET', data = null, headers = {} } = options;
    try {
        const config: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            }
        };

        if (data) {
            config.body = JSON.stringify(data);
        }

        const response = await fetch(url, config);

        if (!response.ok) {
            return 'Response not ok';
        }
        const result = await response.json();
        return  result;

    } catch (error) {
        console.error('Fetch API error:', error);
        return 'Has error from server';
    }
}