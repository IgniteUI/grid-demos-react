export class FetchApi {
  private constructor() {}

  public static async fetchApiResponse<T>(
    url: string,
    result?: T,
    method: string = "GET",
    body?: string,
    headers?: Record<string, string>,
    includeCredentials?: boolean
  ): Promise<T> {
    const options: {
      method: string;
      body?: string;
      headers?: Record<string, string>;
      credentials?: RequestCredentials;
    } = {
      method,
      headers
    };

    if (body !== null && body !== undefined) {
      options.body = body;
    }
    
    if (includeCredentials) {
      options.credentials = 'include';
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        console.error(response.statusText);
        return Promise.resolve(result as T);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      console.error(error);
    }

    return Promise.resolve(result as T);
  }
}
